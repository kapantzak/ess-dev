const report = require("../lib/report");

describe("report()", () => {
  test("Returns function", () => {
    const actual = report.report("#ececec");
    expect(typeof actual).toBe("function");
  });
});

describe("reportSuccess()", () => {
  test("Returns string containing the provided message", () => {
    const actual = report.reportSuccess("Success", "This is a message");
    expect(actual).toContain("Success");
    expect(actual).toContain("This is a message");
  });
});

describe("reportWarning()", () => {
  test("Returns string containing the provided message", () => {
    const actual = report.reportWarning("Warning", "This is a message");
    expect(actual).toContain("Warning");
    expect(actual).toContain("This is a message");
  });
});

describe("reportError()", () => {
  test("Returns string containing the provided message", () => {
    const actual = report.reportError("Error", "This is a message");
    expect(actual).toContain("Error");
    expect(actual).toContain("This is a message");
  });
});
