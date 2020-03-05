const path = require("path");
const helpers = require("./helpers");

const base = path.join(process.cwd());
const out = base;
const templates = path.join(__dirname, "..", "templates");
const essdevConfig = path.join(base, "essdev.config.js");

const getProjectFilePath = outPath => path.join(outPath, "eStudio.csproj");

const instructions = (outPath, essdevConfig) => {
  const outBase = outPath ? path.join(base, outPath) : out;
  const obj = {
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
    ],
    userControlHelper: [
      {
        template: path.join(templates, "userControlHelperClass.cs"),
        output: formName => {
          const fileName = `${helpers.removeUcFromFormName(formName)}.cs`;
          const treeObj = {
            classes: {
              UserControlHelpers: {
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
    ]
  };

  // Check for config data
  const storedProc = (
    ((essdevConfig || {}).userControlHelper || {}).mainData || {}
  ).storedProc;
  if (storedProc) {
    const returnData = storedProc.returnData;
    if (returnData) {
      const dataClassProps = [];
      (returnData.data || {}).forEach(dt => {
        const name = dt.name;
        dataClassProps.push(name);
        const dataModel = {
          name,
          props: []
        };
        (dt.fields || []).forEach(f => {
          dataModel.props.push({
            name: f.name,
            type: f.type
          });
        });

        obj.userControlHelper.push({
          template: path.join(templates, "model_sample.cs"),
          output: formName => {
            const modelsFolderName = helpers.getModelsFolderName(formName);
            const fileName = `${name}.cs`;
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
          },
          data: {
            dataModel
          }
        });
      });

      obj.userControlHelper.push({
        template: path.join(templates, "model_sample.cs"),
        output: formName => {
          const modelsFolderName = helpers.getModelsFolderName(formName);
          const fileName = "Data.cs";
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
        },
        data: {
          dataModel: {
            name: "Data",
            props: dataClassProps.map(p => ({
              type: p,
              name: p
            }))
          }
        }
      });
    }
  }
  return obj;
};

const defaultAnswers = {
  formFilters: true,
  asyncHandler: true,
  stateHelper: true
};

module.exports = {
  templates,
  essdevConfig,
  instructions,
  defaultAnswers,
  getProjectFilePath
};
