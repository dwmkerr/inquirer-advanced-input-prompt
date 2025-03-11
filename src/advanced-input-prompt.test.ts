import advancedInputPrompt, {
  AdvancedInputConfig,
} from "../src/advanced-input-prompt";
import * as inquirerCore from "@inquirer/core";

// Create a fake readline interface that your prompt expects.
const fakeRl = {
  line: "",
  write: jest.fn(),
  clearLine: jest.fn(),
};

describe("advancedInputPrompt", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns the typed input when Enter is pressed", async () => {
    // Spy on useKeypress and simulate typing then pressing Enter.
    const keypressSpy = jest
      .spyOn(inquirerCore, "useKeypress")
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      .mockImplementation((cb: any) => {
        // First, simulate a key event that isn't enter to update the value.
        fakeRl.line = "test input";
        // This simulates the user typing "test input"
        cb({ name: "a" }, fakeRl);
        // Then, simulate pressing enter.
        cb({ name: "enter" }, fakeRl);
      });

    const options: AdvancedInputConfig = {
      message: "Enter input:",
      required: false,
      hint: "<Enter> to submit",
      default: "default input",
      validate: () => true,
    };

    const result = await advancedInputPrompt(options);
    // Since we updated fakeRl.line to 'test input' before simulating Enter, we expect that value.
    expect(result).toBe("test input");

    keypressSpy.mockRestore();
  });

  it("returns the default when no input is provided", async () => {
    // Spy on useKeypress to simulate only Enter being pressed with no update.
    const keypressSpy = jest
      .spyOn(inquirerCore, "useKeypress")
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      .mockImplementation((cb: any) => {
        fakeRl.line = "";
        cb({ name: "enter" }, fakeRl);
      });

    const options: AdvancedInputConfig = {
      message: "Enter input:",
      required: false,
      hint: "<Enter> to submit",
      default: "default input",
      validate: () => true,
    };

    const result = await advancedInputPrompt(options);
    // Since fakeRl.line remains empty, the default should be returned.
    expect(result).toBe("default input");

    keypressSpy.mockRestore();
  });
});
