// const path = require("path");
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const treeify = require("treeify");

const config = require("./lib/config");
const qst = require("./lib/questions");
const compile = require("./lib/compile");
const report = require("./lib/report");
const helpers = require("./lib/helpers");

const init = async () => {
  clear();

  const title = chalk.blueBright(
    figlet.textSync("ESS DEV", { horizontalLayout: "full" })
  );
  console.log(title);

  const answers = await qst.introQuestions();
  if (answers && answers.confirmation) {
    const formName = answers.formName;
    const data = helpers.getHandlebarsData(formName);

    let treeObj = {};
    let warnings = 0;
    const logs = [];

    // Script ------------------------------------------ //

    const config_script = config.instructions.script[0];
    const config_script_out = config_script.output(formName);
    const resp_script = await compile.compileFromTemplate(
      config_script.template,
      data,
      config_script_out.filePath
    );
    logs.push(resp_script.response);

    if (!resp_script.success) warnings++;

    // const resp_script_fileName = resp_script.success
    //   ? config_script_out.fileName
    //   : `${config_script_out.fileName} --> NOT CREATED`;

    if (resp_script.success)
      treeObj = Object.assign({}, treeObj, config_script_out.treeObj);

    const final =
      warnings > 0
        ? report.reportWarning("Warnings")
        : report.reportSuccess("Success");
    console.log(final);

    const tree = chalk.blueBright(treeify.asTree(treeObj));
    console.log(tree);

    logs.forEach(x => {
      console.log(x);
    });
  } else {
    process.exit();
  }
};

init();
