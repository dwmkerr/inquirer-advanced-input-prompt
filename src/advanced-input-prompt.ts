// src/advanced-input-prompt.ts
import {
  createPrompt,
  useState,
  useKeypress,
  usePrefix,
  isEnterKey,
  isBackspaceKey,
} from '@inquirer/core';
import type { PartialDeep } from '@inquirer/type';
import colors from 'colors';
import readline from 'readline';

export type InputConfig = {
  message: string;
  default?: string;
  required?: boolean;
  transformer?: (value: string, options: { isFinal: boolean }) => string;
  validate?: (value: string) => boolean | string | Promise<string | boolean>;
  hint?: string; // our custom hint property
  theme?: PartialDeep<any>;
  hideCursor?: boolean; // control whether the cursor should be hidden
};

export default async (options: InputConfig): Promise<string> => {
  // For input prompts, we want the cursor visible by default.
  const { hideCursor = false } = options;
  // Create a readline interface (we need it for key events)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  }) as readline.Interface & { output: NodeJS.WritableStream };

  if (hideCursor) {
    rl.output.write('\x1B[?25l'); // Hide cursor if requested
  }

  const answer = await createPrompt<string, InputConfig>((config, done) => {
    const { required, validate = () => true } = config;
    const [status, setStatus] = useState('idle');
    const [defaultValue = '', setDefaultValue] = useState<string>(config.default);
    const [errorMsg, setError] = useState<string>();
    const [value, setValue] = useState<string>('');
    // Pass status and theme to usePrefix.
    const prefix = usePrefix({ status, theme: config.theme });

    useKeypress(async (key, _rl) => {
      if (status !== 'idle') return;

      if (isEnterKey(key)) {
        const answer = value || defaultValue;
        setStatus('loading');
        const isValid =
          required && !answer ? 'You must provide a value' : await validate(answer);
        if (isValid === true) {
          setValue(answer);
          setStatus('done');
          done(answer);
        } else {
          setError(isValid || 'You must provide a valid value');
          setStatus('idle');
        }
      } else if (isBackspaceKey(key) && !value) {
        setDefaultValue(undefined);
      } else {
        // Update the value on every keypress.
        setValue(_rl.line);
        setError(undefined);
      }
    });

    // Build the prompt message.
    const message = config.message;
    let formattedValue = value;
    if (typeof config.transformer === 'function') {
      formattedValue = config.transformer(value, { isFinal: status === 'done' });
    }
    let defaultStr: string | undefined;
    if (defaultValue && status !== 'done' && !value) {
      defaultStr = defaultValue;
    }
    let error = '';
    if (errorMsg) {
      error = errorMsg;
    }
    // Render the hint below the prompt only if there's no input.
    let hintStr = '';
    if (!value && config.hint) {
      hintStr = colors.gray(config.hint);
    }

    const lineOutput = [prefix, message, defaultStr, formattedValue]
      .filter((v) => v !== undefined)
      .join(' ');

    // Return an array:
    // First element: the editable prompt line.
    // Second element: additional output (error or hint).
    return [lineOutput, error || hintStr];
  })(options);

  // Restore the cursor if it was hidden.
  if (hideCursor) {
    rl.output.write('\x1B[?25h');
  }
  rl.close();

  return answer;
};
