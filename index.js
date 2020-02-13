// const path = require("path");
const argv = require("minimist")(process.argv.slice(2));
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const treeify = require("treeify");

const config = require("./lib/config");
const options = config.options;
const defaultAnswers = config.defaultAnswers;
const qst = require("./lib/questions");
const compile = require("./lib/compile");
const report = require("./lib/report");
const helpers = require("./lib/helpers");
const validations = require("./lib/validations");

const init = async () => {
  clear();

  const title = chalk.blueBright(
    figlet.textSync("ESS DEV", { horizontalLayout: "full" })
  );
  console.log(title);

  const validation = validations.validateArguments(argv);
  if (!validation.valid) {
    validation.errors.forEach(x => console.log(x));
    process.exit(1);
  }

  const introAnswers = await qst.introQuestions(argv);
  const confirmationAnswers = await qst.confirmationQuestions(
    argv,
    introAnswers
  );
  let answers = Object.assign({}, introAnswers, confirmationAnswers);
  if (answers && answers.confirmation) {
    if (argv.d) {
      answers = Object.assign({}, answers, defaultAnswers);
    }
    if (argv[options.formName]) {
      answers = Object.assign({}, answers, {
        formName: argv[options.formName]
      });
    }
    console.log(answers);
    const formName = answers.formName;
    const data = helpers.getHandlebarsData(formName);

    let treeObj = {};
    let warnings = 0;
    const logs = [];

    // User control ------------------------------------ //

    // const config_userControl = config.instructions.userControl[0];
    // const config_userControl_out = config_userControl.output(formName);
    // console.log(config_userControl_out);
    // const resp_userControl = await compile.compileFromTemplate(
    //   config_userControl.template,
    //   data,
    //   config_userControl.filePath
    // );
    // logs.push(resp_userControl.response);

    // if (resp_userControl.success) {
    //   treeObj = Object.assign({}, treeObj, config_userControl_out.treeObj);
    // } else {
    //   warnings++;
    // }

    // ------------------------------------------------- //

    // Script ------------------------------------------ //

    const config_script = config.instructions.script[0];
    const config_script_out = config_script.output(formName);
    const resp_script = await compile.compileFromTemplate(
      config_script.template,
      data,
      config_script_out.filePath
    );
    logs.push(resp_script.response);

    if (resp_script.success) {
      treeObj = Object.assign({}, treeObj, config_script_out.treeObj);
    } else {
      warnings++;
    }

    // ------------------------------------------------- //

    const final =
      warnings > 0
        ? report.reportWarning("Warnings")
        : report.reportSuccess("Success");
    console.log(final);

    const tree = chalk.gray(treeify.asTree(treeObj));
    console.log(tree);

    logs.forEach(x => {
      console.log(x);
    });
  } else {
    process.exit();
  }
};

init();
