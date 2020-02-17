const fs = require("fs");
const path = require("path");
const convert = require("xml-js");

const directoryExists = filePath => {
  return fs.existsSync(path.dirname(filePath));
};

const readFileToString = path => {
  if (directoryExists(path)) {
    const str = fs.readFileSync(path, "utf8");
    return str;
  }
  return null;
};

const createModelsFolder = filePath => {
  if (filePath && !directoryExists(filePath)) {
    fs.mkdirSync(path.dirname(filePath));
  }
};

const includeUserControl = (xmlJson, formName) => {
  if (xmlJson) {
    const compileArr = ((xmlJson.Project || {}).ItemGroup || []).filter(
      x => x.Compile
    );
    if (compileArr.length > 0) {
      const compile = compileArr[0].Compile;
      if (compile) {
        compile.push(...getUserControlInclusion(formName));
      }
    }
  }
  return xmlJson;
};

const readProjectFile = filePath => {
  const xml = readFileToString(filePath);
  if (xml) {
    return convert.xml2js(xml, {
      compact: true
    });
  } else {
    throw new Error(`Could not parse ${filePath}`);
  }
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

const replaceFileWith = (filePath, contents) => {
  fs.writeFileSync(filePath, contents, {
    encoding: "utf8"
  });
};

const getXmlFromObject = obj => {
  const xml = convert.js2xml(obj, {
    compact: true,
    ignoreComment: true,
    spaces: 2
  });
  return xml;
};

module.exports = {
  directoryExists,
  readFileToString,
  createModelsFolder,
  includeUserControl,
  getUserControlInclusion,
  readProjectFile,
  replaceFileWith,
  getXmlFromObject
};
