const helpers = require("./helpers");

const includeItem = (item, xmlJson, formName) => {
  if (xmlJson) {
    const groups = ((xmlJson.Project || {}).ItemGroup || []).filter(
      x => x[item]
    );
    if (groups.length > 0) {
      const group = groups[0][item];
      return fnInclusion => {
        group.push(...fnInclusion(formName));
        return xmlJson;
      };
    }
  }
  return () => xmlJson;
};

// Content ------------------------------------------------------------------- //

const includeUserControlContent = (xmlJson, formName) => {
  return includeItem(
    "Content",
    xmlJson,
    formName
  )(getUserControlInclusionContent);
};

const includeAsyncHandlerContent = (xmlJson, formName) => {
  return includeItem(
    "Content",
    xmlJson,
    formName
  )(getAsyncHandlerInclusionContent);
};

const getUserControlInclusionContent = formName => {
  return [
    {
      _attributes: {
        Include: `${formName}.ascx`
      }
    }
  ];
};

const getAsyncHandlerInclusionContent = formName => {
  const fileName = helpers.getAsyncHandlerFileName(formName, false, false);
  return [
    {
      _attributes: {
        Include: `Async\\${fileName}.ashx`
      }
    }
  ];
};

// Typescript Compile -------------------------------------------------------- //

const includePageScriptTsCompile = (xmlJson, formName) => {
  return includeItem(
    "TypeScriptCompile",
    xmlJson,
    formName
  )(getPageScriptInclusionTsCompile);
};

const includeAsyncHelperTsCompile = (xmlJson, formName) => {
  return includeItem(
    "TypeScriptCompile",
    xmlJson,
    formName
  )(getAsyncHelperInclusionTsCompile);
};

const includeStateHelperTsCompile = (xmlJson, formName) => {
  return includeItem(
    "TypeScriptCompile",
    xmlJson,
    formName
  )(getStateHelperInclusionTsCompile);
};

const getPageScriptInclusionTsCompile = formName => {
  const fileName = helpers.getScriptFileName(formName);
  return [
    {
      _attributes: {
        Include: `src\\pageScripts\\${fileName}`
      }
    }
  ];
};

const getAsyncHelperInclusionTsCompile = formName => {
  const fileName = helpers.getAsyncHelperFileName(formName);
  return [
    {
      _attributes: {
        Include: `src\\asyncHelpers\\${fileName}`
      }
    }
  ];
};

const getStateHelperInclusionTsCompile = formName => {
  const fileName = helpers.getStateHelperFileName(formName);
  return [
    {
      _attributes: {
        Include: `src\\reduxStates\\${fileName}`
      }
    }
  ];
};

// Compile ------------------------------------------------------------------- //

const includeUserControlCompile = (xmlJson, formName) => {
  return includeItem(
    "Compile",
    xmlJson,
    formName
  )(getUserControlInclusionCompile);
};

const includeAsyncHandlerCompile = (xmlJson, formName) => {
  return includeItem(
    "Compile",
    xmlJson,
    formName
  )(getAsyncHandlerInclusionCompile);
};

const includeModelsCompile = (xmlJson, formName) => {
  return includeItem("Compile", xmlJson, formName)(getModelsInclusionCompile);
};

const getUserControlInclusionCompile = formName => {
  return [
    {
      _attributes: {
        Include: `${formName}.ascx.cs`
      },
      DependentUpon: {
        _text: `${formName}.ascx`
      },
      SubType: {
        _text: "ASPXCodeBehind"
      }
    },
    {
      _attributes: {
        Include: `${formName}.ascx.designer.cs`
      },
      DependentUpon: {
        _text: `${formName}.ascx`
      }
    }
  ];
};

const getAsyncHandlerInclusionCompile = formName => {
  const fileName = helpers.getAsyncHandlerFileName(formName, false, false);
  return [
    {
      _attributes: {
        Include: `Async\\${fileName}.ashx.cs`
      },
      DependentUpon: {
        _text: `${fileName}.ashx`
      }
    }
  ];
};

const getModelsInclusionCompile = formName => {
  const folderName = helpers.getModelsFolderName(formName);
  const files = ["State.cs", "Filters.cs", "RequestParams.cs", "Results.cs"];
  return files.map(fileName => ({
    _attributes: {
      Include: `classes\\HttpRequestsDataModels\\${folderName}\\${fileName}`
    }
  }));
};

// Include ------------------------------------------------------------------- //

const includeInProjectFile = (key, xmlJson, formName) => {
  switch (key) {
    case "userControl":
      return includeUserControlContent(
        includeUserControlCompile(xmlJson, formName),
        formName
      );
    case "asyncHandler":
      return includeAsyncHandlerContent(
        includeAsyncHandlerCompile(xmlJson, formName),
        formName
      );
    case "script":
      return includePageScriptTsCompile(xmlJson, formName);
    case "asyncHelper":
      return includeAsyncHelperTsCompile(xmlJson, formName);
    case "stateHelper":
      return includeStateHelperTsCompile(xmlJson, formName);
    case "models":
      return includeModelsCompile(xmlJson, formName);
    default:
      return xmlJson;
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
