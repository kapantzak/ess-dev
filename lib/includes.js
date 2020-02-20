const helpers = require("./helpers");

const includeItem = (item, formName) => {
  return fnInclusion =>
    fnInclusion(formName).map(x => ({
      itemType: item,
      unevaluatedInclude: x.unevaluatedInclude,
      metadata: x.metadata || []
    }));
};

// Content ------------------------------------------------------------------- //

const includeUserControlContent = formName => {
  return includeItem("Content", formName)(getUserControlInclusionContent);
};

const includeAsyncHandlerContent = formName => {
  return includeItem("Content", formName)(getAsyncHandlerInclusionContent);
};

const getUserControlInclusionContent = formName => {
  return [
    {
      unevaluatedInclude: `${formName}.ascx`
    }
  ];
};

const getAsyncHandlerInclusionContent = formName => {
  const fileName = helpers.getAsyncHandlerFileName(formName, false, false);
  return [
    {
      unevaluatedInclude: `Async\\${fileName}.ashx`
    }
  ];
};

// Typescript Compile -------------------------------------------------------- //

const includePageScriptTsCompile = formName => {
  return includeItem(
    "TypeScriptCompile",
    formName
  )(getPageScriptInclusionTsCompile);
};

const includeAsyncHelperTsCompile = formName => {
  return includeItem(
    "TypeScriptCompile",
    formName
  )(getAsyncHelperInclusionTsCompile);
};

const includeStateHelperTsCompile = formName => {
  return includeItem(
    "TypeScriptCompile",
    formName
  )(getStateHelperInclusionTsCompile);
};

const getPageScriptInclusionTsCompile = formName => {
  const fileName = helpers.getScriptFileName(formName);
  return [
    {
      unevaluatedInclude: `src\\pageScripts\\${fileName}`
    }
  ];
};

const getAsyncHelperInclusionTsCompile = formName => {
  const fileName = helpers.getAsyncHelperFileName(formName);
  return [
    {
      unevaluatedInclude: `src\\asyncHelpers\\${fileName}`
    }
  ];
};

const getStateHelperInclusionTsCompile = formName => {
  const fileName = helpers.getStateHelperFileName(formName);
  return [
    {
      unevaluatedInclude: `src\\reduxStates\\${fileName}`
    }
  ];
};

// Compile ------------------------------------------------------------------- //

const includeUserControlCompile = formName => {
  return includeItem("Compile", formName)(getUserControlInclusionCompile);
};

const includeAsyncHandlerCompile = formName => {
  return includeItem("Compile", formName)(getAsyncHandlerInclusionCompile);
};

const includeModelsCompile = formName => {
  return includeItem("Compile", formName)(getModelsInclusionCompile);
};

const getUserControlInclusionCompile = formName => {
  return [
    {
      unevaluatedInclude: `${formName}.ascx.cs`,
      metadata: [
        {
          DependentUpon: `${formName}.ascx`
        },
        {
          SubType: "ASPXCodeBehind"
        }
      ]
    },
    {
      unevaluatedInclude: `${formName}.ascx.designer.cs`,
      metadata: [
        {
          DependentUpon: `${formName}.ascx`
        }
      ]
    }
  ];
};

const getAsyncHandlerInclusionCompile = formName => {
  const fileName = helpers.getAsyncHandlerFileName(formName, false, false);
  return [
    {
      unevaluatedInclude: `Async\\${fileName}.ashx.cs`,
      metadata: [
        {
          DependentUpon: `${fileName}.ashx`
        }
      ]
    }
  ];
};

const getModelsInclusionCompile = formName => {
  const folderName = helpers.getModelsFolderName(formName);
  const files = ["State.cs", "Filters.cs", "RequestParams.cs", "Results.cs"];
  return files.map(fileName => ({
    unevaluatedInclude: `classes\\HttpRequestsDataModels\\${folderName}\\${fileName}`
  }));
};

// Include ------------------------------------------------------------------- //

const includeInProjectFile = (key, formName) => {
  switch (key) {
    case "userControl":
      return [
        ...includeUserControlContent(formName),
        ...includeUserControlCompile(formName)
      ];
    case "asyncHandler":
      return [
        ...includeAsyncHandlerContent(formName),
        ...includeAsyncHandlerCompile(formName)
      ];
    case "script":
      return includePageScriptTsCompile(formName);
    case "asyncHelper":
      return includeAsyncHelperTsCompile(formName);
    case "stateHelper":
      return includeStateHelperTsCompile(formName);
    case "models":
      return includeModelsCompile(formName);
    default:
      return [];
  }
};

module.exports = {
  includeItem,
  includePageScriptTsCompile,
  includeAsyncHelperTsCompile,
  includeStateHelperTsCompile,
  includeUserControlCompile,
  includeAsyncHandlerCompile,
  includeModelsCompile,
  includeUserControlContent,
  includeAsyncHandlerContent,
  getPageScriptInclusionTsCompile,
  getAsyncHelperInclusionTsCompile,
  getStateHelperInclusionTsCompile,
  getUserControlInclusionCompile,
  getUserControlInclusionContent,
  getAsyncHandlerInclusionContent,
  getAsyncHandlerInclusionCompile,
  getModelsInclusionCompile,
  includeInProjectFile
};
