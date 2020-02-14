const config = require("./config");
const options = config.options;
const report = require("./report");

const validateUserControlName = formName => {
  if (!formName) return false;
  return (
    formName.length > 2 &&
    formName.indexOf("uc") === 0 &&
    formName.indexOf(".") === -1
  );
};

module.exports = {
  validateUserControlName
};
