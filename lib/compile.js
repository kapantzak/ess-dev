const fs = require("fs").promises;
const path = require("path");
const Handlebars = require("handlebars");

const config = require("./config");
const files = require("./files");
const report = require("./report");

const registerPartials = () => {
  // KendoDropDownList
  const filter_KendoDropDownList = files.readFileToString(
    path.join(config.templates, "filter_KendoDropDownList.ts")
  );
  Handlebars.registerPartial(
    "filter_KendoDropDownList",
    filter_KendoDropDownList
  );

  // KendoDropDownTree
  const filter_KendoDropDownTree = files.readFileToString(
    path.join(config.templates, "filter_KendoDropDownTree.ts")
  );
  Handlebars.registerPartial(
    "filter_KendoDropDownTree",
    filter_KendoDropDownTree
  );

  // KendoDatePicker
  const filter_KendoDatePicker = files.readFileToString(
    path.join(config.templates, "filter_KendoDatePicker.ts")
  );
  Handlebars.registerPartial("filter_KendoDatePicker", filter_KendoDatePicker);

  // KendoTimePicker
  const filter_KendoTimePicker = files.readFileToString(
    path.join(config.templates, "filter_KendoTimePicker.ts")
  );
  Handlebars.registerPartial("filter_KendoTimePicker", filter_KendoTimePicker);

  // KendoDateTimePicker
  const filter_KendoDateTimePicker = files.readFileToString(
    path.join(config.templates, "filter_KendoDateTimePicker.ts")
  );
  Handlebars.registerPartial(
    "filter_KendoDateTimePicker",
    filter_KendoDateTimePicker
  );

  // KendoDateRangePicker
  const filter_KendoDateRangePicker = files.readFileToString(
    path.join(config.templates, "filter_KendoDateRangePicker.ts")
  );
  Handlebars.registerPartial(
    "filter_KendoDateRangePicker",
    filter_KendoDateRangePicker
  );

  // KendoNumericTextBox
  const filter_KendoNumericTextBox = files.readFileToString(
    path.join(config.templates, "filter_KendoNumericTextBox.ts")
  );
  Handlebars.registerPartial(
    "filter_KendoNumericTextBox",
    filter_KendoNumericTextBox
  );

  // KendoMultiSelect
  const filter_KendoMultiSelect = files.readFileToString(
    path.join(config.templates, "filter_KendoMultiSelect.ts")
  );
  Handlebars.registerPartial(
    "filter_KendoMultiSelect",
    filter_KendoMultiSelect
  );

  // SacFilter
  const filter_SacFilter = files.readFileToString(
    path.join(config.templates, "filter_SacFilter.ts")
  );
  Handlebars.registerPartial("filter_SacFilter", filter_SacFilter);

  // GreenButtonFilter
  const filter_GreenButtonFilter = files.readFileToString(
    path.join(config.templates, "filter_GreenButtonFilter.ts")
  );
  Handlebars.registerPartial(
    "filter_GreenButtonFilter",
    filter_GreenButtonFilter
  );

  // Checkbox
  const filter_Checkbox = files.readFileToString(
    path.join(config.templates, "filter_Checkbox.ts")
  );
  Handlebars.registerPartial("filter_Checkbox", filter_Checkbox);

  // Textbox
  const filter_Textbox = files.readFileToString(
    path.join(config.templates, "filter_Textbox.ts")
  );
  Handlebars.registerPartial("filter_Textbox", filter_Textbox);
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
