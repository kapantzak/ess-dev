const fs = require("fs");
const path = require("path");
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

module.exports = {
  directoryExists,
  readFileToString,
  createModelsFolder
};
