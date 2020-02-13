const inquirer = require("inquirer");

module.exports = {
  introQuestions: () => {
    const questions = [
      {
        name: "formName",
        type: "input",
        message: "Enter user control name (Prefixed with 'uc')",
        validate: val => {
          if (val.length > 2 && val.indexOf("uc") === 0) {
            return true;
          } else {
            return "Please provide a valid user control name";
          }
        }
      },
      {
        name: "confirmation",
        type: "confirm",
        message: "Are you sure you want to create new files?"
      }
    ];
    return inquirer.prompt(questions);
  }
};
