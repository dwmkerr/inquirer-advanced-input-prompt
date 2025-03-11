# inquirer-advanced-input-prompt

An input prompt implementation for [Inquirer](https://github.com/SBoudrias/Inquirer.js/) that provides some advanced features.

Out of the box, this prompt works just like the [`input`](https://github.com/SBoudrias/Inquirer.js/?tab=readme-ov-file#input) prompt.

This is work in progress - I'm using it to improve the user experience of [Terminal AI](http://github.com/dwmkerr/terminal-ai). Things may not work as expected. When the API stabalises and is well-tested then the demo will be updated and linked back to the original project.

## Installation

```sh
npm install inquirer-interactive-list-prompt
```

## Usage

```js
import prompt from 'inquirer-interactive-list-prompt';

(async () => {
  const answer = await prompt({
    message: 'Select an option:',
    choices: [
      { name: 'Run', value: 'run', key: 'r' },
      { name: 'Quit', value: 'quit', key: 'q' },
    ],
    renderSelected: choice => `❯ ${choice.name} (${choice.key})`, // optional
    renderUnselected: choice => `  ${choice.name} (${choice.key})`, // optional
  });

  console.log(`Selected option: ${answer}`);
})();
```

## API

### `prompt(options)`

Prompts the user with an interactive list prompt.

#### `options`

Type: `object`

##### `message`

Type: `string`
Required: `true`

The message to display to the user.

##### `choices`

Type: `Array<{ name: string, value: any }>`
Required: `true`

An array of choices to display to the user.

##### `renderer`

Type: `(line: string, index: number) => string`
Default: `(line) => line`

A function that is called to render each choice in the prompt. The function should return a string that will be displayed to the user.

##### `hideCursor`

Type: `boolean`
Default: `true`

Whether to hide the cursor while the prompt is active.

## License

MIT
