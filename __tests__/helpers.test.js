const helpers = require("../lib/helpers");

describe("getDateFormatted()", () => {
  test("Returns the correct string", () => {
    const actual = helpers.getDateFormatted(new Date(2020, 1, 13));
    const expected = "13/2/2020";
    expect(actual).toBe(expected);
  });

  test("Returns null for undefined", () => {
    const actual = helpers.getDateFormatted(undefined);
    expect(actual).toBeNull();
  });

  test("Returns null for null", () => {
    const actual = helpers.getDateFormatted(null);
    expect(actual).toBeNull();
  });

  test("Returns null for false", () => {
    const actual = helpers.getDateFormatted(false);
    expect(actual).toBeNull();
  });

  test("Returns null for invalid date object", () => {
    const actual = helpers.getDateFormatted({});
    expect(actual).toBeNull();
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

describe("getModelsFolderName()", () => {
  test("Return the correct folder name", () => {
    const actual = helpers.getModelsFolderName("ucTestForm");
    const expected = "TestForm";
    expect(actual).toBe(expected);
  });

  test("Throws error for form name 'uc'", () => {
    expect(() => {
      helpers.getModelsFolderName("uc");
    }).toThrow();
  });

  test("Throws error for form name ''", () => {
    expect(() => {
      helpers.getModelsFolderName("");
    }).toThrow();
  });

  test("Throws error for null form name", () => {
    expect(() => {
      helpers.getModelsFolderName(null);
    }).toThrow();
  });

  test("Throws error for undefined form name", () => {
    expect(() => {
      helpers.getModelsFolderName(undefined);
    }).toThrow();
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

  test("Returns the correct name when 'extension' is false", () => {
    const actual = helpers.getAsyncHandlerFileName("ucTestForm", true, false);
    const expected = "testForm";
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
      undefined,
      new Date(2020, 1, 13)
    );
    const expected = {
      answers: {},
      form: {
        name: "ucTestForm",
        className: "TestForm",
        date: "13/2/2020",
        front: {
          name: "ucTestForm.ascx"
        },
        backend: {
          name: "ucTestForm.ascx.cs"
        }
      },
      asyncHandler: {
        name: "testForm",
        front: {
          name: "testForm.ashx"
        },
        classFile: {
          name: "testForm.ashx.cs"
        }
      },
      asyncHelper: {
        name: "asyncTestForm.ts",
        import_name: "asyncTestForm",
        className: "AsyncTestForm"
      },
      stateHelper: {
        name: "state_testForm.ts",
        import_name: "state_testForm"
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

describe("objectMutator()", () => {
  test("Should add one property with null value to empty object", () => {
    const obj1 = {};
    const obj2 = {
      prop2: null
    };
    const actual = helpers.objectMutator(obj1, obj2);
    const expected = {
      prop2: null
    };
    expect(actual).toEqual(expected);
  });

  test("Should add one property to empty object", () => {
    const obj1 = {};
    const obj2 = {
      prop2: 2
    };
    const actual = helpers.objectMutator(obj1, obj2);
    const expected = {
      prop2: 2
    };
    expect(actual).toEqual(expected);
  });

  test("Should add one property and preserve old", () => {
    const obj1 = {
      prop1: 1
    };
    const obj2 = {
      prop2: 2
    };
    const actual = helpers.objectMutator(obj1, obj2);
    const expected = {
      prop1: 1,
      prop2: 2
    };
    expect(actual).toEqual(expected);
  });

  test("Should add one property to nested object", () => {
    const obj1 = {
      prop1: 1,
      prop2: {
        prop3: 3
      }
    };
    const obj2 = {
      prop2: {
        prop4: 4
      }
    };
    const actual = helpers.objectMutator(obj1, obj2);
    const expected = {
      prop1: 1,
      prop2: {
        prop3: 3,
        prop4: 4
      }
    };
    expect(actual).toEqual(expected);
  });
});

describe("renderInstructionItem()", () => {
  test("Returns true for key 'asyncHandler' and answer 'asyncHandler: true'", () => {
    const actual = helpers.renderInstructionItem("asyncHandler", {
      asyncHandler: true
    });
    expect(actual).toBe(true);
  });

  test("Returns false for key 'asyncHandler' and answer 'asyncHandler: false'", () => {
    const actual = helpers.renderInstructionItem("asyncHandler", {
      asyncHandler: false
    });
    expect(actual).toBe(false);
  });

  test("Returns true for key 'asyncHelper' and answer 'asyncHelper: true'", () => {
    const actual = helpers.renderInstructionItem("asyncHelper", {
      asyncHandler: true
    });
    expect(actual).toBe(true);
  });

  test("Returns false for key 'asyncHelper' and answer 'asyncHandler: false'", () => {
    const actual = helpers.renderInstructionItem("asyncHelper", {
      asyncHandler: false
    });
    expect(actual).toBe(false);
  });

  test("Returns true for key 'stateHelper' and answer 'stateHelper: true'", () => {
    const actual = helpers.renderInstructionItem("stateHelper", {
      stateHelper: true
    });
    expect(actual).toBe(true);
  });

  test("Returns false for key 'stateHelper' and answer 'stateHelper: false'", () => {
    const actual = helpers.renderInstructionItem("stateHelper", {
      stateHelper: false
    });
    expect(actual).toBe(false);
  });

  test("Returns true for key 'models' and answer 'stateHelper: true'", () => {
    const actual = helpers.renderInstructionItem("models", {
      stateHelper: true
    });
    expect(actual).toBe(true);
  });

  test("Returns false for key 'models' and answer 'stateHelper: false'", () => {
    const actual = helpers.renderInstructionItem("models", {
      stateHelper: false
    });
    expect(actual).toBe(false);
  });

  test("Returns true for key 'userControl'", () => {
    const actual = helpers.renderInstructionItem("userControl", {});
    expect(actual).toBe(true);
  });

  test("Returns true for key 'script'", () => {
    const actual = helpers.renderInstructionItem("script", {});
    expect(actual).toBe(true);
  });
});
