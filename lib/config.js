const path = require("path");

const base = path.join(process.cwd());
const outBase = base;
const templates = path.join(base, "templates");
const instructions = {
  asyncHandler: [
    {
      template: path.join(templates, "asyncHandler.ashx"),
      output: formName => {
        // const fileName =
        return path.join(outBase, "Async", formName);
      }
    },
    {
      template: path.join(templates, "asyncHandler.ashx.cs"),
      output: formName => {
        return path.join(outBase, "Async", formName);
      }
    }
  ],
  script: [
    {
      template: path.join(templates, "script.ts"),
      output: formName => {
        return path.join(outBase, "src", "pageScripts", formName);
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
