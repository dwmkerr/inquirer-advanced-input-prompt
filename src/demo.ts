import prompt from './advanced-input-prompt';

async function demo() {
  const answer1 = await prompt({
    message: 'Enter your input (required):',
    hint: '<Enter> Show Menu',
    required: true,
    validate: (input: string) => input.trim() !== '' || 'Input cannot be empty'
  });
  console.log(`User input: ${answer1}`);

  const answer2 = await prompt({
    message: 'Enter your input (not required):',
    hint: '<Enter> Show Menu',
  });
  console.log(`User input: ${answer2}`);
}

(async () => {await demo();
})();
