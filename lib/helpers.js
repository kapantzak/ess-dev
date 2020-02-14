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
const getAsyncHelperFileName = (formName, extension = true) => {
  const name = removeUcFromFormName(formName);
  const ext = extension ? ".ts" : "";
  return name ? `async${name}${ext}` : null;
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
const getAsyncHandlerFileName = (
  formName,
  classFile = false,
  extension = true
) => {
  const name = getCamelCaseFormName(formName);
  const classExtension = classFile ? ".cs" : "";
  const ext = extension ? (classExtension ? ".ashx.cs" : ".ashx") : "";
  return name ? `${name}${ext}` : null;
};

/**
 * Get state helper file name 'state_testForm.ts'
 * @param {string} formName
 */
const getStateHelperFileName = (formName, extension = true) => {
  const name = getCamelCaseFormName(formName);
  const ext = extension ? ".ts" : "";
  return name ? `state_${name}${ext}` : null;
};

const getModelsFolderName = formName => {
  const name = removeUcFromFormName(formName);
  if (name) {
    return name;
  }
  throw new Error(`Could not create models folder for formName ${formName}`);
};

const getHandlebarsData = (formName, date = new Date()) => ({
  form: {
    name: formName,
    className: removeUcFromFormName(formName),
    date: getDateFormatted(date),
    front: {
      name: getFormFileName(formName)
    },
    backend: {
      name: getFormFileName(formName, true)
    }
  },
  asyncHandler: {
    name: getAsyncHandlerFileName(formName, false, false),
    front: {
      name: getAsyncHandlerFileName(formName)
    },
    classFile: {
      name: getAsyncHandlerFileName(formName, true)
    }
  },
  asyncHelper: {
    name: getAsyncHelperFileName(formName),
    import_name: getAsyncHelperFileName(formName, false),
    className: getAsyncHelperClassName(formName)
  },
  stateHelper: {
    name: getStateHelperFileName(formName),
    import_name: getStateHelperFileName(formName, false)
  }
});

/**
 * Get an array of the propvided object's first properties
 * @param {object} obj
 * @param {array} arr
 */
const getPropsArray = (obj, arr = []) => {
  if (!obj) return arr;
  const props = Object.keys(obj);
  if (props.length === 0) return arr;
  return getPropsArray(obj[props[0]], [...arr, props[0]]);
};

const objectMutator = (obj, newObj) => {
  Object.entries(newObj).forEach(([key, val]) => {
    if (obj[key] === undefined) {
      obj[key] = val;
    } else {
      objectMutator(obj[key], val);
    }
  });
  return obj;
};

module.exports = {
  getDateFormatted,
  removeUcFromFormName,
  getCamelCaseFormName,
  getFormFileName,
  getScriptFileName,
  getAsyncHelperFileName,
  getAsyncHelperClassName,
  getStateHelperFileName,
  getModelsFolderName,
  getAsyncHandlerFileName,
  getHandlebarsData,
  getPropsArray,
  objectMutator
};
