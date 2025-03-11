import prompt from './advanced-input-prompt';

(async () => {
  const answer = await prompt({
    message: 'Enter your input:',
    hint: '<Enter> Show Menu',
    required: true,
    validate: (input: string) => input.trim() !== '' || 'Input cannot be empty'
  });
  console.log(`User input: ${answer}`);
})();
