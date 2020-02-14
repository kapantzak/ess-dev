const fs = require("fs");
const path = require("path");
const argv = require("minimist")(process.argv.slice(2));
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const treeify = require("treeify");
const files = require("./lib/files");

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

    const formName = answers.formName;
    const useControlFileOutput = config.instructions.userControl[0].output(
      formName
    );
    if (fs.existsSync(useControlFileOutput.filePath)) {
      const err = report.reportError(
        "File exists",
        `File ${useControlFileOutput.fileName} already exists. Terminating job.`
      );
      console.log(err);
      process.exit(1);
    }

    const data = helpers.getHandlebarsData(formName);

    let treeObj = {};
    let warnings = 0;
    const logs = [];

    for await (const x of Object.entries(config.instructions)) {
      const key = x[0];
      if (
        ((key === "asyncHandler" || key === "asyncHelper") &&
          !answers.asyncHandler) ||
        (key === "stateHelper" && !answers.stateHelper)
      ) {
        return;
      }
      const arr = x[1];
      for (const obj of arr) {
        const out = obj.output(formName);
        if (key === "models") {
          files.createModelsFolder(out.filePath);
        }
        const resp = await compile.compileFromTemplate(
          obj.template,
          data,
          out.filePath
        );
        logs.push(resp.response);

        if (resp.success) {
          treeObj = helpers.objectMutator(treeObj, out.treeObj);
        } else {
          warnings++;
        }
      }
    }

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
