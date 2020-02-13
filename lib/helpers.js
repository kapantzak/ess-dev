const getDateFormatted = date => {
  const dd = date.getDate();
  if (dd) return `${dd}/${date.getMonth() + 1}/${date.getFullYear()}`;
  return null;
};

/**
 * Get form name without 'uc' --> 'TestForm'
 * @param {string} formName
 */
const removeUcFromFormName = formName =>
  formName ? formName.replace(/^uc/g, "") : null;

/**
 * Get came case form name 'testForm'
 * @param {string} formName
 */
const getCamelCaseFormName = formName => {
  if (!formName) return null;
  if (formName === "uc") return formName;
  const name = removeUcFromFormName(formName);
  return `${name.charAt(0).toLowerCase()}${name.slice(1)}`;
};

/**
 * Get form files 'ucTestForm.ascx', 'ucTestForm.ascx.cs'
 * @param {string} formName
 * @param {boolean} classFile
 */
const getFormFileName = (formName, classFile = false) => {
  if (!formName) return null;
  const classExtension = classFile ? ".cs" : "";
  return `${formName}.ascx${classExtension}`;
};

/**
 * Get main script file name 'testForm.ts'
 * @param {string} formName
 */
const getScriptFileName = formName => {
  const name = getCamelCaseFormName(formName);
  return name ? `${name}.ts` : null;
};

/**
 * Get async helper file name 'asyncTestForm.ts'
 * @param {string} formName
 */
const getAsyncHelperFileName = formName => {
  const name = removeUcFromFormName(formName);
  return name ? `async${name}.ts` : null;
};

/**
 * Get async helper class name 'AsyncTestForm'
 * @param {string} formName
 */
const getAsyncHelperClassName = formName => {
  const name = removeUcFromFormName(formName);
  return name ? `Async${name}` : null;
};

/**
 * Get async handler files 'testForm.ashx', 'testForm.ashx.cs'
 * @param {string} formName
 * @param {boolean} classFile
 */
const getAsyncHandlerFileName = (formName, classFile = false) => {
  const name = getCamelCaseFormName(formName);
  const classExtension = classFile ? ".cs" : "";
  return name ? `${name}.ashx${classExtension}` : null;
};

/**
 * Get state helper file name 'state_testForm.ts'
 * @param {string} formName
 */
const getStateHelperFileName = formName => {
  const name = getCamelCaseFormName(formName);
  return name ? `state_${name}.ts` : null;
};

const getHandlebarsData = (formName, date = new Date()) => ({
  form: {
    name: formName,
    date: getDateFormatted(date),
    front: {
      name: getFormFileName(formName)
    },
    backend: {
      name: getFormFileName(formName, true)
    }
  },
  asyncHandler: {
    front: {
      name: getAsyncHandlerFileName(formName)
    },
    classFile: {
      name: getAsyncHandlerFileName(formName, true)
    }
  },
  asyncHelper: {
    name: getAsyncHelperFileName(formName),
    className: getAsyncHelperClassName(formName)
  },
  stateHelper: {
    name: getStateHelperFileName(formName)
  }
});

module.exports = {
  getDateFormatted,
  removeUcFromFormName,
  getCamelCaseFormName,
  getFormFileName,
  getScriptFileName,
  getAsyncHelperFileName,
  getAsyncHelperClassName,
  getStateHelperFileName,
  getAsyncHandlerFileName,
  getHandlebarsData
};
