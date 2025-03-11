import advancedInputPrompt, {
  AdvancedInputConfig,
} from "./advanced-input-prompt";
import { useKeypress } from "@inquirer/core";

// Create a fake readline interface that your prompt expects.
const fakeRl = {
  line: "test input",
  write: jest.fn(),
  clearLine: jest.fn(),
};

describe("advancedInputPrompt", () => {
  // Restore the original implementation after each test.
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns the input value when Enter is pressed", async () => {
    // Spy on useKeypress so that it immediately invokes the callback with a fake Enter key event.
    const keypressSpy = jest
      .spyOn(require("@inquirer/core"), "useKeypress")
      .mockImplementation((cb: any) => {
        // Simulate a key event for Enter.
        cb({ name: "enter" }, fakeRl);
      });

    // Provide a simple configuration for the prompt.
    const options: AdvancedInputConfig = {
      message: "Enter input:",
      required: false,
      hint: "<Enter> to submit",
      default: "default input",
      validate: () => true,
    };

    // Call your prompt function.
    const result = await advancedInputPrompt(options);
    // Our fakeRl.line is "test input", so we expect the result to be that value.
    expect(result).toBe("test input");

    // Clean up the spy.
    keypressSpy.mockRestore();
  });
});
