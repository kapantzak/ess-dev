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
 * Get async helper file name 'asyncTestForm.ts'
 * @param {string} formName
 */
const getAsyncHelperFileName = formName => {
  const name = removeUcFromFormName(formName);
  return name ? `async${name}.ts` : null;
};

/**
 * Get async handler files 'testForm.ashx', 'testForm.ashx.cs'
 * @param {string} formName
 * @param {boolean} classFile
 */
const getAsyncHandlerFrontFileName = (formName, classFile = false) => {
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

module.exports = {
  getDateFormatted,
  removeUcFromFormName,
  getCamelCaseFormName,
  getAsyncHelperFileName,
  getStateHelperFileName,
  getAsyncHandlerFrontFileName
};
