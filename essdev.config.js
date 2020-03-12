module.exports = {
  formName: "ucTest901",
  formFilters: true,
  asyncHandler: true,
  stateHelper: true,
  buttons: true,
  filters: {
    groups: [
      {
        id: "groupMain",
        options: {
          label: "groupMainLabel",
          visibleByDefault: true
        },
        filters: [
          {
            id: "cmbFilter1",
            type: "KendoDropDownList"
          },
          {
            id: "ddtFilter2",
            type: "KendoDropDownTree"
          },
          {
            id: "ddtFilter8",
            type: "KendoNumericTextBox"
          },
          {
            id: "ddtFilter9",
            type: "KendoMultiSelect"
          },
          {
            id: "chkFilter11",
            type: "Checkbox"
          },
          {
            id: "txtFilter12",
            type: "Textbox"
          }
        ]
      },
      {
        id: "groupSecond",
        options: {
          label: "groupSecondLabel",
          visibleByDefault: false
        },
        filters: [
          {
            id: "sacFilter3",
            type: "SacFilter"
          },
          {
            id: "sacFilter10",
            type: "GreenButtonFilter"
          },
          {
            id: "drpFilter4",
            type: "KendoDateRangePicker"
          },
          {
            id: "drpFilter5",
            type: "KendoDatePicker"
          },
          {
            id: "drpFilter6",
            type: "KendoDateTimePicker"
          },
          {
            id: "drpFilter7",
            type: "KendoTimePicker"
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
