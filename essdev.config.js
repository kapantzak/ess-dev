module.exports = {
  formName: "ucTest901",
  formFilters: true,
  asyncHandler: true,
  stateHelper: true,
  userControlHelper: {
    mainData: {
      storedProc: {
        name: "XD_Test_StoredProc",
        params: [
          {
            name: "@Param1",
            type: "int",
            isNullable: true
          },
          {
            name: "@Param2",
            type: "string"
          },
          {
            name: "@CurrentUserID",
            type: "int",
            isCurrentUser: true
          },
          {
            name: "@CurrentLanguageID",
            type: "int",
            isCurrentLanguage: true
          }
        ],
        returnDataSet: true
      }
    }
  }
};
