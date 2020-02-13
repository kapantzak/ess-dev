const path = require("path");
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
    const data = {
      form: {
        name: answers.formName,
        date: helpers.getDateFormatted(new Date())
      },
      asyncHandler: {
        name: "testControl"
      },
      asyncHelper: {
        fileName: "testAsync",
        className: "TestAsync"
      }
    };

    let treeObj = {};
    let warnings = 0;
    const logs = [];

    // Script ------------------------------------------ //

    const config_script = config.instructions.script[0];
    const resp_script = await compile.compileFromTemplate(
      config_script.template,
      data,
      config_script.output("script.ts")
    );
    logs.push(resp_script.response);

    if (!resp_script.success) warnings++;

    const resp_script_fileName = resp_script.success
      ? "script.js"
      : ">> script.js << NOT CREATED";

    treeObj = Object.assign({}, treeObj, {
      src: {
        pageScripts: {
          [resp_script_fileName]: null
        }
      }
    });

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
