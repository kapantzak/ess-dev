const helpers = require("./helpers");

const includeCompile = (xmlJson, formName) => {
  if (xmlJson) {
    const compileArr = ((xmlJson.Project || {}).ItemGroup || []).filter(
      x => x.Compile
    );
    if (compileArr.length > 0) {
      const compile = compileArr[0].Compile;
      if (compile) {
        return fnInclusion => {
          compile.push(...fnInclusion(formName));
          return xmlJson;
        };
      }
    }
  }
  return () => xmlJson;
};

const includeUserControl = (xmlJson, formName) => {
  return includeCompile(xmlJson, formName)(getUserControlInclusion);
};

const includeAsyncHandler = (xmlJson, formName) => {
  return includeCompile(xmlJson, formName)(getAsyncHandlerInclusion);
};

const includeModels = (xmlJson, formName) => {
  return includeCompile(xmlJson, formName)(getModelsInclusion);
};

const getUserControlInclusion = formName => {
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

const getAsyncHandlerInclusion = formName => {
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

const getModelsInclusion = formName => {
  const folderName = helpers.getModelsFolderName(formName);
  const files = ["State.cs", "Filters.cs", "RequestParams.cs", "Results.cs"];
  return files.map(fileName => ({
    _attributes: {
      Include: `classes\\HttpRequestsDataModels\\${folderName}\\${fileName}`
    }
  }));
};

const includeInProjectFile = (key, xmlJson, formName) => {
  switch (key) {
    case "userControl":
      return includeUserControl(xmlJson, formName);
    case "asyncHandler":
      return includeAsyncHandler(xmlJson, formName);
    case "models":
      return includeModels(xmlJson, formName);
    default:
      return xmlJson;
  }
};

module.exports = {
  includeUserControl,
  includeAsyncHandler,
  includeModels,
  getUserControlInclusion,
  getAsyncHandlerInclusion,
  getModelsInclusion,
  includeInProjectFile
};
