const inquirer = require("inquirer");
const logSymbols = require("log-symbols");
const chalk = require("chalk");
const validations = require("./validations");
const config = require("./config");
const defaultAnswers = config.defaultAnswers;

const askFormName = argv => ({
  name: "formName",
  type: "input",
  message: "Enter user control name (Prefixed with 'uc', with no extension)",
  validate: val => {
    if (validations.validateUserControlName(val)) {
      return true;
    } else {
      return "Please provide a valid user control name";
    }
  },
  when: () => {
    return !argv.f;
  }
});

const askFilters = argv => ({
  name: "formFilters",
  type: "confirm",
  default: true,
  message: "Add filters to form? (Default: Yes)",
  when: () => {
    return !argv.d;
  }
});

const askForAsyncHandler = argv => ({
  name: "asyncHandler",
  type: "confirm",
  default: true,
  message: "Add async handler? (Default: Yes)",
  when: () => {
    return !argv.d;
  }
});

const askForStateHelper = argv => ({
  name: "stateHelper",
  type: "confirm",
  default: true,
  message: "Add redux state helper? (Default: Yes)",
  when: () => {
    return !argv.d;
  }
});

const askConfirmation = (argv, answers) => {
  const formName = argv.f || answers.formName;
  return {
    name: "confirmation",
    type: "confirm",
    message: `Form name: ${chalk.hex("#5cb85c").bold(`${formName}`)}
    Filters: ${answers.formFilters ? logSymbols.success : logSymbols.error}
    Async hanlder: ${
      answers.asyncHandler ? logSymbols.success : logSymbols.error
    }
    Redux state: ${answers.stateHelper ? logSymbols.success : logSymbols.error}
    Are you sure you want to create new files?`
  };
};

const introQuestions = argv => {
  const questions = [
    askFormName(argv),
    askFilters(argv),
    askForAsyncHandler(argv),
    askForStateHelper(argv)
  ];
  return inquirer.prompt(questions);
};

const confirmationQuestions = (argv, answers) => {
  if (argv.d) {
    answers = Object.assign({}, answers, defaultAnswers);
  }
  const questions = [askConfirmation(argv, answers)];
  return inquirer.prompt(questions);
};

module.exports = {
  introQuestions,
  confirmationQuestions
};
