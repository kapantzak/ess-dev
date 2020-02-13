const validations = require("../lib/validations");
const options = require("../lib/config").options;

describe("validateUserControlName()", () => {
  test("Return true for 'ucTestForm'", () => {
    const actual = validations.validateUserControlName("ucTestForm");
    expect(actual).toBe(true);
  });

  test("Return false for 'ucTestForm'", () => {
    const actual = validations.validateUserControlName("ucTestForm.ascx");
    expect(actual).toBe(false);
  });

  test("Return false for 'TestForm'", () => {
    const actual = validations.validateUserControlName("TestForm");
    expect(actual).toBe(false);
  });

  test("Return false for 'uc'", () => {
    const actual = validations.validateUserControlName("uc");
    expect(actual).toBe(false);
  });

  test("Return false for empty string", () => {
    const actual = validations.validateUserControlName("");
    expect(actual).toBe(false);
  });

  test("Return false for null", () => {
    const actual = validations.validateUserControlName(null);
    expect(actual).toBe(false);
  });

  test("Return false for undefined", () => {
    const actual = validations.validateUserControlName(undefined);
    expect(actual).toBe(false);
  });
});

describe("validateArguments()", () => {
  test("Return valid if no arguments passed", () => {
    const actual = validations.validateArguments();
    expect(actual).toEqual({
      valid: true,
      errors: []
    });
  });

  test(`Return valid for --${options.formName} ucTestForm`, () => {
    const actual = validations.validateArguments({
      [options.formName]: "ucTestForm"
    });
    expect(actual).toEqual({
      valid: true,
      errors: []
    });
  });

  test(`Return invalid for --${options.formName} TestForm`, () => {
    const actual = validations.validateArguments({
      [options.formName]: "TestForm"
    });
    expect(actual.valid).toBe(false);
    expect(actual.errors).toHaveLength(1);
  });
});
