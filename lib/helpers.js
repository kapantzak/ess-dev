const getDateFormatted = date => {
  if (!date || !date.getDate) return null;
  const dd = date.getDate();
  return `${dd}/${date.getMonth() + 1}/${date.getFullYear()}`;
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
 * @param {string} type If undefined, '.ascx' is returned, else 'codebehind' or 'designer'
 */
const getFormFileName = (formName, type) => {
  if (!formName) return null;
  let classExtension = "";
  if (type === "codebehind") classExtension = ".cs";
  else if (type === "designer") classExtension = ".designer.cs";
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

const getUserControlHelperFileName = formName => {
  return formName ? `${removeUcFromFormName(formName)}.cs` : null;
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

const getHandlebarsData = (formName, answers = {}, date = new Date()) => ({
  answers,
  form: {
    name: formName,
    className: removeUcFromFormName(formName),
    date: getDateFormatted(date),
    front: {
      name: getFormFileName(formName)
    },
    backend: {
      name: getFormFileName(formName, "codebehind")
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
  },
  filters: getFiltersObject(answers),
  userControlHelper: getUserControlHelperObject(answers)
});

const getFiltersObject = answers => {
  const filters = (answers || {}).filters;
  if (filters) {
    return Object.assign({}, filters, {
      groups: filters.groups.map(group =>
        Object.assign({}, group, {
          filters: group.filters.map(filter =>
            Object.assign({}, filter, {
              groupId: group.id,
              templateName: getTemplateName(filter.type)
            })
          )
        })
      )
    });
  }
  return null;
};

const getTemplateName = filterType => `filter_${filterType}`;

const getUserControlHelperObject = answers => {
  const userControlHelper = (answers || {}).userControlHelper;
  if (userControlHelper) {
    const storedProc = (userControlHelper.mainData || {}).storedProc || {};

    const methodParams = [];
    const methodPassParams = [];
    (storedProc.params || []).forEach(x => {
      if (x.type) {
        let paramName = getStoredProcMethodParamName(x.name);
        x.paramName = paramName;
        x.paramAssign = paramName;

        const type = x.isNullable ? `${x.type}?` : x.type;
        methodParams.push(`${type} ${paramName}`);
        methodPassParams.push(paramName);

        if (x.isCurrentUser) {
          x.paramAssign = "sp.eUser.User.ContactID";
        } else if (x.isCurrentLanguage) {
          x.paramAssign = "sp.CurrentLanguageID";
        }
      }
    });
    methodParams.push("SessionProvider sp");
    methodPassParams.push("sp");

    userControlHelper.mainData.storedProc.methodParamsString = methodParams.join(
      ", "
    );

    userControlHelper.mainData.storedProc.methodPassParamsString = methodPassParams.join(
      ", "
    );

    return userControlHelper;
  }
  return null;
};

const getStoredProcMethodParamName = sqlName => {
  if (!sqlName || sqlName.length <= 1)
    throw new Error(`Invalid SQL parameter name: ${sqlName}`);
  if (sqlName.indexOf("@") === 0) {
    sqlName = sqlName.slice(1);
  }
  return `${sqlName.slice(0, 1).toLowerCase()}${sqlName.slice(1)}`;
};

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

const renderInstructionItem = (key, answers) => {
  if (
    ((key === "asyncHandler" || key === "asyncHelper") &&
      !answers.asyncHandler) ||
    ((key === "stateHelper" || key === "models") && !answers.stateHelper) ||
    (key === "userControlHelper" &&
      (!answers.stateHelper || !answers.userControlHelper))
  )
    return false;
  return true;
};

module.exports = {
  getDateFormatted,
  removeUcFromFormName,
  getCamelCaseFormName,
  getFormFileName,
  getScriptFileName,
  getAsyncHelperFileName,
  getUserControlHelperFileName,
  getAsyncHelperClassName,
  getStateHelperFileName,
  getModelsFolderName,
  getAsyncHandlerFileName,
  getHandlebarsData,
  getPropsArray,
  objectMutator,
  renderInstructionItem,
  getStoredProcMethodParamName,
  getFiltersObject,
  getTemplateName
};
