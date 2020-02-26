const includes = require("../lib/includes");
const formName = "ucTestForm";

describe("Compile", () => {
  describe("getUserControlInclusionCompile()", () => {
    test("Returns the expected items for the provided user control", () => {
      const actual = includes.getUserControlInclusionCompile(formName);
      const expected = [
        {
          unevaluatedInclude: `${formName}.ascx.cs`,
          metadata: {
            DependentUpon: `${formName}.ascx`,
            SubType: "ASPXCodeBehind"
          }
        },
        {
          unevaluatedInclude: `${formName}.ascx.designer.cs`,
          metadata: {
            DependentUpon: `${formName}.ascx`
          }
        }
      ];
      expect(actual).toEqual(expected);
    });
  });

  describe("getAsyncHandlerInclusionCompile()", () => {
    test("Returns the expected items for the provided user control", () => {
      const actual = includes.getAsyncHandlerInclusionCompile(formName);
      const expected = [
        {
          unevaluatedInclude: `Async\\testForm.ashx.cs`,
          metadata: {
            DependentUpon: `testForm.ashx`
          }
        }
      ];
      expect(actual).toEqual(expected);
    });
  });

  describe("getModelsInclusionCompile()", () => {
    test("Returns the expected items for the provided user control", () => {
      const actual = includes.getModelsInclusionCompile(formName);
      const expected = [
        {
          unevaluatedInclude: `classes\\HttpRequestsDataModels\\TestForm\\State.cs`
        },
        {
          unevaluatedInclude: `classes\\HttpRequestsDataModels\\TestForm\\Filters.cs`
        },
        {
          unevaluatedInclude: `classes\\HttpRequestsDataModels\\TestForm\\RequestParams.cs`
        },
        {
          unevaluatedInclude: `classes\\HttpRequestsDataModels\\TestForm\\Results.cs`
        }
      ];
      expect(actual).toEqual(expected);
    });
  });
});

describe("Content", () => {
  describe("getUserControlInclusionContent()", () => {
    test("Returns the expected items for the provided user control", () => {
      const actual = includes.getUserControlInclusionContent("ucTestForm");
      const expected = [
        {
          unevaluatedInclude: `ucTestForm.ascx`
        }
      ];
      expect(actual).toEqual(expected);
    });
  });

  describe("getAsyncHandlerInclusionContent()", () => {
    test("Returns the expected items for the provided user control", () => {
      const actual = includes.getAsyncHandlerInclusionContent("ucTestForm");
      const expected = [
        {
          unevaluatedInclude: `Async\\testForm.ashx`
        }
      ];
      expect(actual).toEqual(expected);
    });
  });
});

describe("Typescript Compile", () => {
  describe("getPageScriptInclusionTsCompile()", () => {
    test("Returns the expected items for the provided user control", () => {
      const actual = includes.getPageScriptInclusionTsCompile("ucTestForm");
      const expected = [
        {
          unevaluatedInclude: `src\\pageScripts\\testForm.ts`
        }
      ];
      expect(actual).toEqual(expected);
    });

    test("Returns the expected items for the provided user control", () => {
      const actual = includes.getAsyncHelperInclusionTsCompile("ucTestForm");
      const expected = [
        {
          unevaluatedInclude: `src\\asyncHelpers\\asyncTestForm.ts`
        }
      ];
      expect(actual).toEqual(expected);
    });

    test("Returns the expected items for the provided user control", () => {
      const actual = includes.getStateHelperInclusionTsCompile("ucTestForm");
      const expected = [
        {
          unevaluatedInclude: `src\\reduxStates\\state_testForm.ts`
        }
      ];
      expect(actual).toEqual(expected);
    });
  });
});

describe("includeInProjectFile()", () => {
  test("Includes ucTestForm.ascx.cs and ucTestForm.ascx.designer.cs", () => {
    const actual = includes.includeInProjectFile("userControl", formName);
    const expected = [
      {
        itemType: "Content",
        unevaluatedInclude: `${formName}.ascx`,
        metadata: null
      },
      {
        itemType: "Compile",
        unevaluatedInclude: `${formName}.ascx.cs`,
        metadata: {
          DependentUpon: `${formName}.ascx`,
          SubType: "ASPXCodeBehind"
        }
      },
      {
        itemType: "Compile",
        unevaluatedInclude: `${formName}.ascx.designer.cs`,
        metadata: {
          DependentUpon: `${formName}.ascx`
        }
      }
    ];
    expect(actual).toEqual(expected);
  });

  test("Includes src/pageScripts/testForm.ts", () => {
    const actual = includes.includeInProjectFile("script", formName);
    const expected = [
      {
        itemType: "TypeScriptCompile",
        unevaluatedInclude: `src\\pageScripts\\testForm.ts`,
        metadata: null
      }
    ];
    expect(actual).toEqual(expected);
  });

  test("Includes src/asyncHelpers/asyncTestForm.ts", () => {
    const actual = includes.includeInProjectFile("asyncHelper", formName);
    const expected = [
      {
        itemType: "TypeScriptCompile",
        unevaluatedInclude: `src\\asyncHelpers\\asyncTestForm.ts`,
        metadata: null
      }
    ];
    expect(actual).toEqual(expected);
  });

  test("Includes src/reduxStates/state_testForm.ts", () => {
    const actual = includes.includeInProjectFile("stateHelper", formName);
    const expected = [
      {
        itemType: "TypeScriptCompile",
        unevaluatedInclude: `src\\reduxStates\\state_testForm.ts`,
        metadata: null
      }
    ];
    expect(actual).toEqual(expected);
  });

  test("Includes Async/testForm.ashx.cs", () => {
    const actual = includes.includeInProjectFile("asyncHandler", formName);
    const expected = [
      {
        itemType: "Content",
        unevaluatedInclude: `Async\\testForm.ashx`,
        metadata: null
      },
      {
        itemType: "Compile",
        unevaluatedInclude: `Async\\testForm.ashx.cs`,
        metadata: {
          DependentUpon: `testForm.ashx`
        }
      }
    ];
    expect(actual).toEqual(expected);
  });

  test("Includes models in classes/HttpRequestsDataModels/TestForm/ folder", () => {
    const actual = includes.includeInProjectFile("models", formName);
    const expected = [
      {
        itemType: "Compile",
        unevaluatedInclude: `classes\\HttpRequestsDataModels\\TestForm\\State.cs`,
        metadata: null
      },
      {
        itemType: "Compile",
        unevaluatedInclude: `classes\\HttpRequestsDataModels\\TestForm\\Filters.cs`,
        metadata: null
      },
      {
        itemType: "Compile",
        unevaluatedInclude: `classes\\HttpRequestsDataModels\\TestForm\\RequestParams.cs`,
        metadata: null
      },
      {
        itemType: "Compile",
        unevaluatedInclude: `classes\\HttpRequestsDataModels\\TestForm\\Results.cs`,
        metadata: null
      }
    ];
    expect(actual).toEqual(expected);
  });

  test("Includes user control helper in classes/UserControlHelpers/ folder", () => {
    const actual = includes.includeInProjectFile("userControlHelper", formName);
    const expected = [
      {
        itemType: "Compile",
        unevaluatedInclude: "classes\\UserControlHelpers\\TestForm.cs",
        metadata: null
      }
    ];
    expect(actual).toEqual(expected);
  });

  test.each([undefined, null, false, "", "invalidKey"])(
    "Returns empty array if key is '%s'",
    key => {
      const actual = includes.includeInProjectFile(key, formName);
      expect(actual).toHaveLength(0);
    }
  );
});
