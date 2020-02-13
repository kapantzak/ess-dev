const helpers = require("../lib/helpers");

describe("getDateFormatted()", () => {
  test("Returns the correct string", () => {
    const actual = helpers.getDateFormatted(new Date(2020, 1, 13));
    const expected = "13/2/2020";
    expect(actual).toBe(expected);
  });
});

describe("removeUcFromFormName()", () => {
  test("Returns the correct file name", () => {
    const actual = helpers.removeUcFromFormName("ucTestForm");
    const expected = "TestForm";
    expect(actual).toBe(expected);
  });

  test("Returns null if name is undefined", () => {
    const actual = helpers.removeUcFromFormName(undefined);
    expect(actual).toBeNull();
  });

  test("Returns null if name is null", () => {
    const actual = helpers.removeUcFromFormName(null);
    expect(actual).toBeNull();
  });

  test("Returns null if name is empty string", () => {
    const actual = helpers.removeUcFromFormName("");
    expect(actual).toBeNull();
  });
});

describe("getCamelCaseFormName()", () => {
  test("Returns the correct file name", () => {
    const actual = helpers.getCamelCaseFormName("ucTestForm");
    const expected = "testForm";
    expect(actual).toBe(expected);
  });

  test("Removes only the first occurence of 'uc'", () => {
    const actual = helpers.getCamelCaseFormName("ucTestucForm");
    const expected = "testucForm";
    expect(actual).toBe(expected);
  });

  test("Returns 'uc' if provided name is 'uc'", () => {
    const actual = helpers.getCamelCaseFormName("uc");
    const expected = "uc";
    expect(actual).toBe(expected);
  });

  test("Returns null if name is undefined", () => {
    const actual = helpers.getCamelCaseFormName(undefined);
    expect(actual).toBeNull();
  });

  test("Returns null if name is null", () => {
    const actual = helpers.getCamelCaseFormName(null);
    expect(actual).toBeNull();
  });

  test("Returns null if name is empty string", () => {
    const actual = helpers.getCamelCaseFormName("");
    expect(actual).toBeNull();
  });
});

describe("getAsyncHelperFileName()", () => {
  test("Return the correct file name", () => {
    const actual = helpers.getAsyncHelperFileName("ucTestForm");
    const expected = "asyncTestForm.ts";
    expect(actual).toBe(expected);
  });

  test("Returns null if name is undefined", () => {
    const actual = helpers.getAsyncHelperFileName(undefined);
    expect(actual).toBeNull();
  });

  test("Returns null if name is null", () => {
    const actual = helpers.getAsyncHelperFileName(null);
    expect(actual).toBeNull();
  });

  test("Returns null if name is empty string", () => {
    const actual = helpers.getAsyncHelperFileName("");
    expect(actual).toBeNull();
  });
});

describe("getStateHelperFileName()", () => {
  test("Returns the correct file name", () => {
    const actual = helpers.getStateHelperFileName("ucTestForm");
    const expected = "state_testForm.ts";
    expect(actual).toBe(expected);
  });

  test("Returns null if name is undefined", () => {
    const actual = helpers.getStateHelperFileName(undefined);
    expect(actual).toBeNull();
  });

  test("Returns null if name is null", () => {
    const actual = helpers.getStateHelperFileName(null);
    expect(actual).toBeNull();
  });

  test("Returns null if name is empty string", () => {
    const actual = helpers.getStateHelperFileName("");
    expect(actual).toBeNull();
  });
});

describe("getAsyncHandlerFrontFileName()", () => {
  test("Returns the correct front file name when 'classFile' is not provided", () => {
    const actual = helpers.getAsyncHandlerFrontFileName("ucTestForm");
    const expected = "testForm.ashx";
    expect(actual).toBe(expected);
  });

  test("Returns the correct front file name when 'classFile' is true", () => {
    const actual = helpers.getAsyncHandlerFrontFileName("ucTestForm", true);
    const expected = "testForm.ashx.cs";
    expect(actual).toBe(expected);
  });

  test("Returns null if name is undefined", () => {
    const actual = helpers.getAsyncHandlerFrontFileName(undefined);
    expect(actual).toBeNull();
  });

  test("Returns null if name is undefined and 'classFile' is true", () => {
    const actual = helpers.getAsyncHandlerFrontFileName(undefined, true);
    expect(actual).toBeNull();
  });

  test("Returns null if name is null", () => {
    const actual = helpers.getAsyncHandlerFrontFileName(null);
    expect(actual).toBeNull();
  });

  test("Returns null if name is null and 'classFile' is true", () => {
    const actual = helpers.getAsyncHandlerFrontFileName(null, true);
    expect(actual).toBeNull();
  });

  test("Returns null if name is empty string", () => {
    const actual = helpers.getAsyncHandlerFrontFileName("");
    expect(actual).toBeNull();
  });

  test("Returns null if name is empty string and 'classFile' is true", () => {
    const actual = helpers.getAsyncHandlerFrontFileName("", true);
    expect(actual).toBeNull();
  });
});
