const chalk = require("chalk");

const report = hexColor => {
  return (prefix, message = undefined) => {
    const pre = chalk.bgHex(hexColor).black(prefix);
    const post = message ? chalk.hex(hexColor)(`: ${message}`) : "";
    return `${pre}${post}`;
  };
};

const reportSuccess = (prefix, message = undefined) => {
  return report("#5cb85c")(prefix, message);
};

const reportWarning = (prefix, error = undefined) => {
  return report("#f0ad4e")(prefix, error);
};

const reportError = (prefix, error = undefined) => {
  return report("#d9534f")(prefix, error);
};

module.exports = {
  reportSuccess,
  reportWarning,
  reportError
};
