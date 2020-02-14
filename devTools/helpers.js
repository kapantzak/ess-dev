const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

const files = require("../lib/files");
const report = require("../lib/report");

const resetOutput = () => {
  rimraf("output", err => {
    if (err) {
      const errMsg = report.reportError("Error", err.toString());
      console.log(errMsg);
      process.exit(1);
    } else {
      const del = report.reportSuccess("rm", "Deleted output folder");
      console.log(del);
      rebuildOutput();
      const success = report.reportSuccess("Success", "Rebuilt output folder");
      console.log(success);
    }
  });
};

const rebuildOutput = () => {
  const output = path.join(process.cwd(), "output");
  fs.mkdirSync(output);

  if (files.directoryExists(output)) {
    const src = path.join(output, "src");
    fs.mkdirSync(src);

    if (files.directoryExists(src)) {
      const asyncHelpers = path.join(src, "asyncHelpers");
      fs.mkdirSync(asyncHelpers);

      const pageScripts = path.join(src, "pageScripts");
      fs.mkdirSync(pageScripts);

      const reduxStates = path.join(src, "reduxStates");
      fs.mkdirSync(reduxStates);
    }

    const async = path.join(output, "Async");
    fs.mkdirSync(async);

    const classes = path.join(output, "classes");
    fs.mkdirSync(classes);

    if (files.directoryExists(classes)) {
      const models = path.join(classes, "HttpRequestsDataModels");
      fs.mkdirSync(models);
    }
  }
};

resetOutput();
