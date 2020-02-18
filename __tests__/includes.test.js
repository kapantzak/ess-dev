const includes = require("../lib/includes");

describe("Compile", () => {
  describe("getUserControlInclusionCompile()", () => {
    test("Returns the expected items for the provided user control", () => {
      const actual = includes.getUserControlInclusionCompile("ucTestForm");
      const expected = [
        {
          _attributes: {
            Include: `ucTestForm.ascx.cs`
          },
          DependentUpon: {
            _text: `ucTestForm.ascx`
          },
          SubType: {
            _text: "ASPXCodeBehind"
          }
        },
        {
          _attributes: {
            Include: `ucTestForm.ascx.designer.cs`
          },
          DependentUpon: {
            _text: `ucTestForm.ascx`
          }
        }
      ];
      expect(actual).toEqual(expected);
    });
  });

  describe("getAsyncHandlerInclusionCompile()", () => {
    test("Returns the expected items for the provided user control", () => {
      const actual = includes.getAsyncHandlerInclusionCompile("ucTestForm");
      const expected = [
        {
          _attributes: {
            Include: `Async\\testForm.ashx.cs`
          },
          DependentUpon: {
            _text: `testForm.ashx`
          }
        }
      ];
      expect(actual).toEqual(expected);
    });
  });

  describe("getModelsInclusionCompile()", () => {
    test("Returns the expected items for the provided user control", () => {
      const actual = includes.getModelsInclusionCompile("ucTestForm");
      const expected = [
        {
          _attributes: {
            Include: `classes\\HttpRequestsDataModels\\TestForm\\State.cs`
          }
        },
        {
          _attributes: {
            Include: `classes\\HttpRequestsDataModels\\TestForm\\Filters.cs`
          }
        },
        {
          _attributes: {
            Include: `classes\\HttpRequestsDataModels\\TestForm\\RequestParams.cs`
          }
        },
        {
          _attributes: {
            Include: `classes\\HttpRequestsDataModels\\TestForm\\Results.cs`
          }
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
          _attributes: {
            Include: `src\\pageScripts\\testForm.ts`
          }
        }
      ];
      expect(actual).toEqual(expected);
    });

    test("Returns the expected items for the provided user control", () => {
      const actual = includes.getAsyncHelperInclusionTsCompile("ucTestForm");
      const expected = [
        {
          _attributes: {
            Include: `src\\asyncHelpers\\asyncTestForm.ts`
          }
        }
      ];
      expect(actual).toEqual(expected);
    });

    test("Returns the expected items for the provided user control", () => {
      const actual = includes.getStateHelperInclusionTsCompile("ucTestForm");
      const expected = [
        {
          _attributes: {
            Include: `src\\reduxStates\\state_testForm.ts`
          }
        }
      ];
      expect(actual).toEqual(expected);
    });
  });
});

describe("includeInProjectFile()", () => {
  test("Includes ucTestForm.ascx.cs and ucTestForm.ascx.designer.cs", () => {
    const xml = {
      Project: {
        ItemGroup: [
          {
            Compile: []
          }
        ]
      }
    };
    const actual = includes.includeInProjectFile(
      "userControl",
      xml,
      "ucTestForm"
    );
    const expected = {
      Project: {
        ItemGroup: [
          {
            Compile: [
              {
                _attributes: {
                  Include: `ucTestForm.ascx.cs`
                },
                DependentUpon: {
                  _text: `ucTestForm.ascx`
                },
                SubType: {
                  _text: "ASPXCodeBehind"
                }
              },
              {
                _attributes: {
                  Include: `ucTestForm.ascx.designer.cs`
                },
                DependentUpon: {
                  _text: `ucTestForm.ascx`
                }
              }
            ]
          }
        ]
      }
    };
    expect(actual).toEqual(expected);
  });

  test("Includes Async/testForm.ashx.cs", () => {
    const xml = {
      Project: {
        ItemGroup: [
          {
            Compile: []
          }
        ]
      }
    };
    const actual = includes.includeInProjectFile(
      "asyncHandler",
      xml,
      "ucTestForm"
    );
    const expected = {
      Project: {
        ItemGroup: [
          {
            Compile: [
              {
                _attributes: {
                  Include: `Async\\testForm.ashx.cs`
                },
                DependentUpon: {
                  _text: `testForm.ashx`
                }
              }
            ]
          }
        ]
      }
    };
    expect(actual).toEqual(expected);
  });

  test("Includes models in classes/HttpRequestsDataModels/TestForm/ folder", () => {
    const xml = {
      Project: {
        ItemGroup: [
          {
            Compile: []
          }
        ]
      }
    };
    const actual = includes.includeInProjectFile("models", xml, "ucTestForm");
    const expected = {
      Project: {
        ItemGroup: [
          {
            Compile: [
              {
                _attributes: {
                  Include: `classes\\HttpRequestsDataModels\\TestForm\\State.cs`
                }
              },
              {
                _attributes: {
                  Include: `classes\\HttpRequestsDataModels\\TestForm\\Filters.cs`
                }
              },
              {
                _attributes: {
                  Include: `classes\\HttpRequestsDataModels\\TestForm\\RequestParams.cs`
                }
              },
              {
                _attributes: {
                  Include: `classes\\HttpRequestsDataModels\\TestForm\\Results.cs`
                }
              }
            ]
          }
        ]
      }
    };
    expect(actual).toEqual(expected);
  });
});
