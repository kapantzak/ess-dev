#!/usr/bin/env node

const fs = require("fs");
const yargs = require("yargs");
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const treeify = require("treeify");
const exec = require("child_process").execFile;

const config = require("./config");
const defaultAnswers = config.defaultAnswers;
const qst = require("./questions");
const compile = require("./compile");
const report = require("./report");
const helpers = require("./helpers");
const files = require("./files");
const includes = require("./includes");

let essdevConfig = null;
try {
  essdevConfig = require(config.essdevConfig);
} catch (e) { }

const intro = chalk.blueBright(
  figlet.textSync("ESS DEV", { horizontalLayout: "full" })
);

const init = async () => {
  const argv = yargs
    .usage("Usage init [options]")
    .options("d", {
      alias: "default",
      describe: "If provided, the default files will be created",
      type: "boolean",
      demandOption: false
    })
    .options("f", {
      alias: "form",
      describe: "The user control name to create (Prefixed with 'uc')",
      type: "string",
      demandOption: false
    })
    .options("o", {
      alias: "output",
      describe: "The output directory of the created files",
      type: "string",
      default: "",
      demandOption: false
    })
    .options("i", {
      alias: "include",
      describe: "The csproj file name to update",
      type: "string",
      default: "",
      demandOption: false
    })
    .options("c", {
      alias: "callback",
      describe:
        "The executable to be called provided with two arguments: the project file name and a JSON with the items to be included",
      type: "string",
      default: "",
      demandOption: false
    })
    .options("b", {
      alias: "msbuildextensionspath",
      describe: "Provide the MSBuildExtensionsPath32 value",
      type: "string",
      default: "",
      demandOption: false
    })
    .command(
      "init",
      "Initialize a new form (user control, async handler, scripts, etc)",
      {
        form: {
          alias: "f"
        }
      },
      cmd => {
        cmd_init(cmd);
      }
    )
    .help().argv;
};

const cmd_init = async argv => {
  clear();
  console.log(intro);

  let introAnswers = null;
  if (essdevConfig) {
    introAnswers = essdevConfig;
  } else {
    introAnswers = await qst.introQuestions(argv);
  }
  const confirmationAnswers = await qst.confirmationQuestions(
    argv,
    introAnswers
  );
  let answers = Object.assign({}, introAnswers, confirmationAnswers);
  if (answers && answers.confirmation) {
    if (argv.d) {
      answers = Object.assign({}, answers, defaultAnswers);
    }
    if (argv.f) {
      answers = Object.assign({}, answers, {
        formName: argv.f
      });
    }

    const formName = answers.formName;
    const instructions = config.instructions(argv.o, essdevConfig);
    const userControlItem = instructions.userControl[0];
    const useControlFileOutput = userControlItem.output(formName);

    // Check for templates folder
    if (!files.directoryExists(userControlItem.template)) {
      const err = report.reportError(
        "Folder missing",
        `Templates folder missing (${userControlItem.template})`
      );
      console.log(err);
      process.exit(1);
    }

    // Check for existing user control
    if (fs.existsSync(useControlFileOutput.filePath)) {
      const err = report.reportError(
        "File exists",
        `File ${useControlFileOutput.fileName} already exists. Terminating job.`
      );
      console.log(err);
      process.exit(1);
    }

    // Get templates data
    const data = helpers.getHandlebarsData(formName, answers);

    let treeObj = {};
    let warnings = 0;
    const logs = [];
    const includesCollection = [];

    if (answers.filters) {
      compile.registerPartials();
    }

    // Iterate instructions
    for await (const x of Object.entries(instructions)) {
      const key = x[0];
      if (helpers.renderInstructionItem(key, answers)) {
        const arr = x[1];

        // Iterate templates
        for (const obj of arr) {
          const out = obj.output(formName);
          if (key === "models") {
            files.createModelsFolder(out.filePath);
          }
          let templateData = data;
          if (obj.data) {
            templateData = Object.assign({}, templateData, obj.data);
          }
          const resp = await compile.compileFromTemplate(
            obj.template,
            templateData,
            out.filePath
          );
          logs.push(resp.response);

          if (resp.success) {
            treeObj = helpers.objectMutator(treeObj, out.treeObj);
          } else {
            warnings++;
          }
        }
        includesCollection.push(
          ...includes.includeInProjectFile(key, formName)
        );
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

    if (argv.i && argv.c && argv.b) {
      console.log(`Trying to update ${argv.i}!!!`);
      const itemsJson = JSON.stringify(includesCollection);
      const child = exec(argv.c, [argv.i, argv.b, itemsJson], (err, data) => {
        if (err) {
          report.reportError("Error", err.toString());
        } else {
          report.reportSuccess("Success", data);
        }
      });
      child.stdout.on("data", data => {
        console.log(data);
      });
    }
  } else {
    process.exit();
  }
};

init();
