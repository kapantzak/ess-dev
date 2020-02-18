const fs = require("fs");
const path = require("path");
const convert = require("xml-js");
const helpers = require("./helpers");

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
  readProjectFile,
  replaceFileWith,
  getXmlFromObject
};
