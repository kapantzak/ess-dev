const fs = require("fs").promises;
const path = require("path");
const Handlebars = require("handlebars");

const config = require("./config");
const files = require("./files");
const report = require("./report");

const registerPartials = () => {
  const filter_KendoDropDownList = files.readFileToString(
    path.join(config.templates, "filter_KendoDropDownList.ts")
  );
  Handlebars.registerPartial(
    "filter_KendoDropDownList",
    filter_KendoDropDownList
  );

  const filter_KendoDropDownTree = files.readFileToString(
    path.join(config.templates, "filter_KendoDropDownTree.ts")
  );
  Handlebars.registerPartial(
    "filter_KendoDropDownTree",
    filter_KendoDropDownTree
  );

  const filter_SacFilter = files.readFileToString(
    path.join(config.templates, "filter_SacFilter.ts")
  );
  Handlebars.registerPartial("filter_SacFilter", filter_SacFilter);

  const filter_KendoDateRangePicker = files.readFileToString(
    path.join(config.templates, "filter_KendoDateRangePicker.ts")
  );
  Handlebars.registerPartial(
    "filter_KendoDateRangePicker",
    filter_KendoDateRangePicker
  );
};

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
  compileFromTemplate,
  registerPartials
};
