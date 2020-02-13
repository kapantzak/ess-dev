const fs = require("fs");
const path = require("path");

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

module.exports = {
  directoryExists,
  readFileToString
};
