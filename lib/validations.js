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

const validateArguments = argv => {
  let valid = true;
  const errors = [];
  if (argv) {
    Object.keys(argv).forEach(x => {
      if (x !== "_") {
        if (
          x === options.formName &&
          !validateUserControlName(argv[options.formName])
        ) {
          valid = false;
          errors.push(
            report.reportError(
              options.formName,
              `Invalid value ${argv[options.formName]}`
            )
          );
        } else if (Object.values(options).indexOf(x) === -1) {
          valid = false;
          errors.push(
            report.reportError("Options error", `Invalid option ${x}`)
          );
        }
      }
    });
  }
  return {
    valid,
    errors
  };
};

module.exports = {
  validateUserControlName,
  validateArguments
};
