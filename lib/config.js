const path = require("path");
const helpers = require("./helpers");

const base = path.join(process.cwd());
const out = path.join(base, "output");
const templates = path.join(__dirname, "..", "templates");

const instructions = (outBase = out) => ({
  userControl: [
    {
      template: path.join(templates, "userControl.ascx"),
      output: formName => {
        const fileName = helpers.getFormFileName(formName);
        const treeObj = {
          [fileName]: null
        };
        return {
          treeObj,
          fileName,
          filePath: path.join(outBase, ...helpers.getPropsArray(treeObj))
        };
      }
    },
    {
      template: path.join(templates, "userControl.ascx.cs"),
      output: formName => {
        const fileName = helpers.getFormFileName(formName, "codebehind");
        const treeObj = {
          [fileName]: null
        };
        return {
          treeObj,
          fileName,
          filePath: path.join(outBase, ...helpers.getPropsArray(treeObj))
        };
      }
    },
    {
      template: path.join(templates, "userControl.ascx.designer.cs"),
      output: formName => {
        const fileName = helpers.getFormFileName(formName, "designer");
        const treeObj = {
          [fileName]: null
        };
        return {
          treeObj,
          fileName,
          filePath: path.join(outBase, ...helpers.getPropsArray(treeObj))
        };
      }
    }
  ],
  asyncHandler: [
    {
      template: path.join(templates, "asyncHandler.ashx"),
      output: formName => {
        const fileName = helpers.getAsyncHandlerFileName(formName);
        const treeObj = {
          Async: {
            [fileName]: null
          }
        };
        return {
          treeObj,
          fileName,
          filePath: path.join(outBase, ...helpers.getPropsArray(treeObj))
        };
      }
    },
    {
      template: path.join(templates, "asyncHandler.ashx.cs"),
      output: formName => {
        const fileName = helpers.getAsyncHandlerFileName(formName, true);
        const treeObj = {
          Async: {
            [fileName]: null
          }
        };
        return {
          treeObj,
          fileName,
          filePath: path.join(outBase, ...helpers.getPropsArray(treeObj))
        };
      }
    }
  ],
  script: [
    {
      template: path.join(templates, "script.ts"),
      output: formName => {
        const fileName = helpers.getScriptFileName(formName);
        const treeObj = {
          src: {
            pageScripts: {
              [fileName]: null
            }
          }
        };
        return {
          treeObj,
          fileName,
          filePath: path.join(outBase, ...helpers.getPropsArray(treeObj))
        };
      }
    }
  ],
  asyncHelper: [
    {
      template: path.join(templates, "asyncHelper.ts"),
      output: formName => {
        const fileName = helpers.getAsyncHelperFileName(formName);
        const treeObj = {
          src: {
            asyncHelpers: {
              [fileName]: null
            }
          }
        };
        return {
          treeObj,
          fileName,
          filePath: path.join(outBase, ...helpers.getPropsArray(treeObj))
        };
      }
    }
  ],
  stateHelper: [
    {
      template: path.join(templates, "stateHelper.ts"),
      output: formName => {
        const fileName = helpers.getStateHelperFileName(formName);
        const treeObj = {
          src: {
            reduxStates: {
              [fileName]: null
            }
          }
        };
        return {
          treeObj,
          fileName,
          filePath: path.join(outBase, ...helpers.getPropsArray(treeObj))
        };
      }
    }
  ],
  models: [
    {
      template: path.join(templates, "model_state.cs"),
      output: formName => {
        const modelsFolderName = helpers.getModelsFolderName(formName);
        const fileName = "State.cs";
        const treeObj = {
          classes: {
            HttpRequestsDataModels: {
              [modelsFolderName]: {
                [fileName]: null
              }
            }
          }
        };
        return {
          treeObj,
          fileName,
          filePath: path.join(outBase, ...helpers.getPropsArray(treeObj))
        };
      }
    },
    {
      template: path.join(templates, "model_filters.cs"),
      output: formName => {
        const modelsFolderName = helpers.getModelsFolderName(formName);
        const fileName = "Filters.cs";
        const treeObj = {
          classes: {
            HttpRequestsDataModels: {
              [modelsFolderName]: {
                [fileName]: null
              }
            }
          }
        };
        return {
          treeObj,
          fileName,
          filePath: path.join(outBase, ...helpers.getPropsArray(treeObj))
        };
      }
    },
    {
      template: path.join(templates, "model_requestParams.cs"),
      output: formName => {
        const modelsFolderName = helpers.getModelsFolderName(formName);
        const fileName = "RequestParams.cs";
        const treeObj = {
          classes: {
            HttpRequestsDataModels: {
              [modelsFolderName]: {
                [fileName]: null
              }
            }
          }
        };
        return {
          treeObj,
          fileName,
          filePath: path.join(outBase, ...helpers.getPropsArray(treeObj))
        };
      }
    },
    {
      template: path.join(templates, "model_results.cs"),
      output: formName => {
        const modelsFolderName = helpers.getModelsFolderName(formName);
        const fileName = "Results.cs";
        const treeObj = {
          classes: {
            HttpRequestsDataModels: {
              [modelsFolderName]: {
                [fileName]: null
              }
            }
          }
        };
        return {
          treeObj,
          fileName,
          filePath: path.join(outBase, ...helpers.getPropsArray(treeObj))
        };
      }
    }
  ]
});

const defaultAnswers = {
  formFilters: true,
  asyncHandler: true,
  stateHelper: true
};

module.exports = {
  instructions,
  defaultAnswers
};
