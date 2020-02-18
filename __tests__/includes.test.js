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

describe("Content", () => {
  describe("getUserControlInclusionContent()", () => {
    test("Returns the expected items for the provided user control", () => {
      const actual = includes.getUserControlInclusionContent("ucTestForm");
      const expected = [
        {
          _attributes: {
            Include: `ucTestForm.ascx`
          }
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
          _attributes: {
            Include: `Async\\testForm.ashx`
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

  test("Includes src/pageScripts/testForm.ts", () => {
    const xml = {
      Project: {
        ItemGroup: [
          {
            TypeScriptCompile: []
          }
        ]
      }
    };
    const actual = includes.includeInProjectFile("script", xml, "ucTestForm");
    const expected = {
      Project: {
        ItemGroup: [
          {
            TypeScriptCompile: [
              {
                _attributes: {
                  Include: `src\\pageScripts\\testForm.ts`
                }
              }
            ]
          }
        ]
      }
    };
    expect(actual).toEqual(expected);
  });

  test("Includes src/asyncHelpers/asyncTestForm.ts", () => {
    const xml = {
      Project: {
        ItemGroup: [
          {
            TypeScriptCompile: []
          }
        ]
      }
    };
    const actual = includes.includeInProjectFile(
      "asyncHelper",
      xml,
      "ucTestForm"
    );
    const expected = {
      Project: {
        ItemGroup: [
          {
            TypeScriptCompile: [
              {
                _attributes: {
                  Include: `src\\asyncHelpers\\asyncTestForm.ts`
                }
              }
            ]
          }
        ]
      }
    };
    expect(actual).toEqual(expected);
  });

  test("Includes src/reduxStates/state_testForm.ts", () => {
    const xml = {
      Project: {
        ItemGroup: [
          {
            TypeScriptCompile: []
          }
        ]
      }
    };
    const actual = includes.includeInProjectFile(
      "stateHelper",
      xml,
      "ucTestForm"
    );
    const expected = {
      Project: {
        ItemGroup: [
          {
            TypeScriptCompile: [
              {
                _attributes: {
                  Include: `src\\reduxStates\\state_testForm.ts`
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

  const dummyXml = {
    Project: {
      ItemGroup: [
        {
          Compile: []
        }
      ]
    }
  };
  test.each([undefined, null, false, "", "invalidKey"])(
    "Returns the provided xml if key is '%s'",
    key => {
      const actual = includes.includeInProjectFile(key, dummyXml, "ucTestForm");
      expect(actual).toEqual(dummyXml);
    }
  );
});

describe("includeItem()", () => {
  test("Returns a function returns the provided xml, if the appropriate item group is not found", () => {
    const xml = {
      Project: {
        ItemGroup: [
          {
            Compile: []
          }
        ]
      }
    };
    const actual = includes.includeItem("Content", xml, "ucTestForm")();
    expect(actual).toEqual(xml);
  });

  test("Returns a function returns null if xml is null", () => {
    const actual = includes.includeItem("Content", null, "ucTestForm")();
    expect(actual).toBeNull();
  });

  test("Returns a function returns undefined if xml is undefined", () => {
    const actual = includes.includeItem("Content", undefined, "ucTestForm")();
    expect(actual).toBe(undefined);
  });
});
