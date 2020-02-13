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

describe("getFormFileName()", () => {
  test("Returns the correct front file name when 'classFile' is not provided", () => {
    const actual = helpers.getFormFileName("ucTestForm");
    const expected = "ucTestForm.ascx";
    expect(actual).toBe(expected);
  });

  test("Returns the correct backend file name when 'classFile' is true", () => {
    const actual = helpers.getFormFileName("ucTestForm", true);
    const expected = "ucTestForm.ascx.cs";
    expect(actual).toBe(expected);
  });

  test("Returns null if name is undefined", () => {
    const actual = helpers.getFormFileName(undefined);
    expect(actual).toBeNull();
  });

  test("Returns null if name is undefined and 'classFile' is true", () => {
    const actual = helpers.getFormFileName(undefined, true);
    expect(actual).toBeNull();
  });

  test("Returns null if name is null", () => {
    const actual = helpers.getFormFileName(null);
    expect(actual).toBeNull();
  });

  test("Returns null if name is null and 'classFile' is true", () => {
    const actual = helpers.getFormFileName(null, true);
    expect(actual).toBeNull();
  });

  test("Returns null if name is empty string", () => {
    const actual = helpers.getFormFileName("");
    expect(actual).toBeNull();
  });

  test("Returns null if name is empty string and 'classFile' is true", () => {
    const actual = helpers.getFormFileName("", true);
    expect(actual).toBeNull();
  });
});

describe("getScriptFileName()", () => {
  test("Returns the correct file name", () => {
    const actual = helpers.getScriptFileName("ucTestForm");
    const expected = "testForm.ts";
    expect(actual).toBe(expected);
  });

  test("Returns null if name is undefined", () => {
    const actual = helpers.getScriptFileName(undefined);
    expect(actual).toBeNull();
  });

  test("Returns null if name is null", () => {
    const actual = helpers.getScriptFileName(null);
    expect(actual).toBeNull();
  });

  test("Returns null if name is empty string", () => {
    const actual = helpers.getScriptFileName("");
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

describe("getAsyncHelperClassName()", () => {
  test("Return the correct class name", () => {
    const actual = helpers.getAsyncHelperClassName("ucTestForm");
    const expected = "AsyncTestForm";
    expect(actual).toBe(expected);
  });

  test("Returns null if name is undefined", () => {
    const actual = helpers.getAsyncHelperClassName(undefined);
    expect(actual).toBeNull();
  });

  test("Returns null if name is null", () => {
    const actual = helpers.getAsyncHelperClassName(null);
    expect(actual).toBeNull();
  });

  test("Returns null if name is empty string", () => {
    const actual = helpers.getAsyncHelperClassName("");
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

describe("getAsyncHandlerFileName()", () => {
  test("Returns the correct front file name when 'classFile' is not provided", () => {
    const actual = helpers.getAsyncHandlerFileName("ucTestForm");
    const expected = "testForm.ashx";
    expect(actual).toBe(expected);
  });

  test("Returns the correct class file name when 'classFile' is true", () => {
    const actual = helpers.getAsyncHandlerFileName("ucTestForm", true);
    const expected = "testForm.ashx.cs";
    expect(actual).toBe(expected);
  });

  test("Returns null if name is undefined", () => {
    const actual = helpers.getAsyncHandlerFileName(undefined);
    expect(actual).toBeNull();
  });

  test("Returns null if name is undefined and 'classFile' is true", () => {
    const actual = helpers.getAsyncHandlerFileName(undefined, true);
    expect(actual).toBeNull();
  });

  test("Returns null if name is null", () => {
    const actual = helpers.getAsyncHandlerFileName(null);
    expect(actual).toBeNull();
  });

  test("Returns null if name is null and 'classFile' is true", () => {
    const actual = helpers.getAsyncHandlerFileName(null, true);
    expect(actual).toBeNull();
  });

  test("Returns null if name is empty string", () => {
    const actual = helpers.getAsyncHandlerFileName("");
    expect(actual).toBeNull();
  });

  test("Returns null if name is empty string and 'classFile' is true", () => {
    const actual = helpers.getAsyncHandlerFileName("", true);
    expect(actual).toBeNull();
  });
});

describe("getHandlebarsData()", () => {
  test("Returns the correct object", () => {
    const actual = helpers.getHandlebarsData(
      "ucTestForm",
      new Date(2020, 1, 13)
    );
    const expected = {
      form: {
        name: "ucTestForm",
        date: "13/2/2020",
        front: {
          name: "ucTestForm.ascx"
        },
        backend: {
          name: "ucTestForm.ascx.cs"
        }
      },
      asyncHandler: {
        front: {
          name: "testForm.ashx"
        },
        classFile: {
          name: "testForm.ashx.cs"
        }
      },
      asyncHelper: {
        name: "asyncTestForm.ts",
        className: "AsyncTestForm"
      },
      stateHelper: {
        name: "state_testForm.ts"
      }
    };
    expect(actual).toEqual(expected);
  });
});

describe("getPropsArray()", () => {
  test("Returns the correct array of props when object has one property per level and last property value is null", () => {
    const actual = helpers.getPropsArray({
      prop1: {
        prop2: {
          prop3: null
        }
      }
    });
    const expected = ["prop1", "prop2", "prop3"];
    expect(actual).toEqual(expected);
  });

  test("Returns the correct array of props when object has one property per level and last property value is an empty object", () => {
    const actual = helpers.getPropsArray({
      prop1: {
        prop2: {
          prop3: {}
        }
      }
    });
    const expected = ["prop1", "prop2", "prop3"];
    expect(actual).toEqual(expected);
  });

  test("Returns the correct array of props when object has more than one properties per level", () => {
    const actual = helpers.getPropsArray({
      prop1: {
        prop2: {
          prop3: {}
        },
        prop4: null
      }
    });
    const expected = ["prop1", "prop2", "prop3"];
    expect(actual).toEqual(expected);
  });

  test("Returns empty array of props when object is empty", () => {
    const actual = helpers.getPropsArray({});
    const expected = [];
    expect(actual).toEqual(expected);
  });
});

// describe("getTreeObjectFileName()", () => {
//   test("Return the provided file name if error is undefined", () => {
//     const actual = helpers.getTreeObjectFileName("testForm.ts");
//     const expected = "testForm.ts";
//     expect(actual).toBe(expected);
//   });

//   test("Return the provided file name if error is null", () => {
//     const actual = helpers.getTreeObjectFileName("testForm.ts", null);
//     const expected = "testForm.ts";
//     expect(actual).toBe(expected);
//   });

//   test("Return the provided file name if error is false", () => {
//     const actual = helpers.getTreeObjectFileName("testForm.ts", false);
//     const expected = "testForm.ts";
//     expect(actual).toBe(expected);
//   });

//   test("Return the provided file name with error message if error is true", () => {
//     const actual = helpers.getTreeObjectFileName("testForm.ts", true);
//     const expected = "testForm.ts --> NOT CREATED";
//     expect(actual).toBe(expected);
//   });

//   test("Throws error if file name is undefined", () => {
//     expect(() => {
//       helpers.getTreeObjectFileName();
//     }).toThrow();
//   });

//   test("Throws error if file name is null", () => {
//     expect(() => {
//       helpers.getTreeObjectFileName(null);
//     }).toThrow();
//   });

//   test("Throws error if file name is false", () => {
//     expect(() => {
//       helpers.getTreeObjectFileName(false);
//     }).toThrow();
//   });

//   test("Throws error if file name is empty string", () => {
//     expect(() => {
//       helpers.getTreeObjectFileName("");
//     }).toThrow();
//   });
// });
