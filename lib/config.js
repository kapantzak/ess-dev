const path = require("path");
const helpers = require("./helpers");

const base = path.join(process.cwd());
const outBase = base;
const templates = path.join(base, "templates");
const instructions = {
  userControl: [
    {
      template: path.join(templates, "userControl.ascx"),
      output: formName => {
        const fileName = helpers.getFormFileName(formName);
        return path.join(outBase, fileName);
      }
    },
    {
      template: path.join(templates, "userControl.ascx.cs"),
      output: formName => {
        const fileName = helpers.getFormFileName(formName, true);
        return path.join(outBase, fileName);
      }
    }
  ],
  asyncHandler: [
    {
      template: path.join(templates, "asyncHandler.ashx"),
      output: formName => {
        const fileName = helpers.getAsyncHandlerFileName(formName);
        return path.join(outBase, "Async", fileName);
      }
    },
    {
      template: path.join(templates, "asyncHandler.ashx.cs"),
      output: formName => {
        const fileName = helpers.getAsyncHandlerFileName(formName, true);
        return path.join(outBase, "Async", fileName);
      }
    }
  ],
  script: [
    {
      template: path.join(templates, "script.ts"),
      output: formName => {
        const fileName = helpers.getScriptFileName(formName);
        return path.join(outBase, "src", "pageScripts", fileName);
      }
    }
  ],
  asyncHelper: [
    {
      template: path.join(template, "asyncHelper.ts"),
      output: formName => {
        const fileName = helpers.getAsyncHelperFileName(formName);
        return path.join(outBase, "src", "asyncHelpers", fileName);
      }
    }
  ],
  stateHelper: [
    {
      template: path.join(template, "stateHelper.ts"),
      output: formName => {
        const fileName = helpers.getStateHelperFileName(formName);
        return path.join(outBase, "src", "reduxStates", fileName);
      }
    }
  ]
};

module.exports = {
  base,
  outBase,
  templates,
  instructions
};
