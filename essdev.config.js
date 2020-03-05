module.exports = {
  formName: "ucTest901",
  formFilters: true,
  asyncHandler: true,
  stateHelper: true,
  filters: {
    groups: [
      {
        filters: [
          {
            id: "cmbFilter1",
            type: "KendoDropDownList"
          },
          {
            id: "ddtFilter2",
            type: "KendoDropDownTree"
          }
        ]
      },
      {
        filters: [
          {
            id: "sacFilter3",
            type: "SacFilter"
          },
          {
            id: "drpFilter4",
            type: "KendoDateRangePicker"
          }
        ]
      }
    ]
  },
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
        returnData: {
          isDataSet: true,
          data: [
            {
              name: "Main",
              isPivot: true,
              key: "Key",
              value: "Value",
              fields: [
                {
                  name: "ContactID",
                  type: "int?"
                },
                {
                  name: "Employee",
                  type: "string"
                }
              ]
            },
            {
              name: "Criteria",
              fields: [
                {
                  name: "ID",
                  type: "int?"
                },
                {
                  name: "Descr",
                  type: "string"
                }
              ]
            }
          ]
        }
      }
    }
  }
};
