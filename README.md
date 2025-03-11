# inquirer-advanced-input-prompt

[![cicd](https://github.com/dwmkerr/inquirer-advanced-input-prompt/actions/workflows/cicd.yaml/badge.svg)](https://github.com/dwmkerr/inquirer-advanced-input-prompt/actions/workflows/cicd.yaml) ![npm (scoped)](https://img.shields.io/npm/v/%40dwmkerr/inquirer-advanced-input-prompt) [![codecov](https://codecov.io/gh/dwmkerr/inquirer-advanced-input-prompt/graph/badge.svg?token=oHFSLfOHGd)](https://codecov.io/gh/dwmkerr/inquirer-advanced-input-prompt)

An input prompt implementation for [Inquirer](https://github.com/SBoudrias/Inquirer.js/) that provides some advanced features.

Out of the box, this prompt works just like the [`input`](https://github.com/SBoudrias/Inquirer.js/?tab=readme-ov-file#input) prompt.

This is work in progress - I'm using it to improve the user experience of [Terminal AI](http://github.com/dwmkerr/inquirer-advanced-input-prompt). Things may not work as expected. When the API stabalises and is well-tested then the demo will be updated and linked back to the original project.

## Installation

```sh
npm install @dwmkerr/advanced-input-prompt
```

## Features

The `hint` parameter shows a hint below the input prompt. As soon as the user starts typing, the hint is hidden:

## Usage

```js
import prompt from "./advanced-input-prompt";

async function demo() {
  const answer = await prompt({
    message: "Enter your input (required):",
    hint: "<Enter> Show Menu",
    required: true,
    validate: (input: string) => input.trim() !== "" || "Input cannot be empty",
  });
  console.log(`User input: ${answer1}`);
}

(async () => {
  await demo();
})();
```

## Developer Guide

Clone the repo, install dependencies and use `npm start` to run the demo:

```bash
git clone git@github.com:dwmkerr/inquirer-advanced-input-prompt
cd inquirer-advanced-input-prompt
npm install
npm start
```

