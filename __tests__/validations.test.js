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
