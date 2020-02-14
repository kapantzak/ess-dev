const fs = require("fs").promises;
const path = require("path");
const Handlebars = require("handlebars");

// const config = require("./config");
const files = require("./files");
const report = require("./report");

const compileFromTemplate = async (templatePath, data, output) => {
  if (!files.directoryExists(output)) {
    return Promise.resolve({
      success: false,
      response: report.reportError("Output not exists", output)
    });
  } else {
    const script = files.readFileToString(templatePath);
    const tmp = Handlebars.compile(script);
    const result = tmp(data);

    try {
      await fs.writeFile(output, result, {
        encoding: "utf8",
        flag: "wx"
      });
      return Promise.resolve({
        success: true,
        response: report.reportSuccess("File created", output)
      });
    } catch (err) {
      if (err.code === "EEXIST") {
        const errMsg = report.reportWarning("File exists", output);
        return Promise.resolve({
          success: false,
          response: errMsg
        });
      }
      return Promise.resolve({
        success: false,
        response: report.reportError(err.code, err.toString())
      });
    }
  }
};

module.exports = {
  compileFromTemplate
};
