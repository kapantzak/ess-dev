[![npm version](https://badge.fury.io/js/ess-dev.svg)](https://badge.fury.io/js/ess-dev)
[![Build Status](https://travis-ci.com/kapantzak/ess-dev.svg?token=syJknnbusTbGgY6qksas&branch=master)](https://travis-ci.com/kapantzak/ess-dev)
[![Coverage Status](https://coveralls.io/repos/github/kapantzak/ess-dev/badge.svg?branch=master)](https://coveralls.io/github/kapantzak/ess-dev?branch=master)

# ess-dev
Project specific tool for automatic boileplate code generation.

This tool is a node cli that is intended to be used as a development tool for specific ASP.NET/Typescript project. It uses [Handlebars](https://handlebarsjs.com/ "https://handlebarsjs.com/") in order to generate boilerplate code.

Feel free to fork the repo in order to customize the behaviour according to your needs.

![cli_screen](https://github.com/kapantzak/ess-dev/blob/master/assets/img/cli_screen.png)

## Commands

### init
Initialize a new form. Adds various files, depending on the options provided

	ess-dev init

## Options

### --form (Alias: -f)
`string` The user control name to be created

### --output (Alias -o)
`string` The output directory of the created files

### --default (Alias -d)
`boolean` If provided, the default settings will be applied

- Form filters: Yes
- Async handler: Yes
- State hepler: Yes

### --include (Alias -i)
`string` The csproj file name to update

### --callback (Alias -c)
`string` The executable to be called provided with two arguments

- The project file name
- A JSON with the items to be included

### --msbuildextensionspath (Alias -b)
`string` Path to `MSBuildExtensionsPath32`

## Configuration file

If `essdev.config.js` exists in the root folder, the tool will try to read form it and **will not ask any questions**.

### Options

#### formName [`string`]

The user control name

#### formFilters [`boolean`]

Adds form filters

#### asyncHandler [`boolean`]

Adds async handler files

#### stateHelper [`boolean`]

Adds redux state helper files

#### buttons [`boolean`]

Adds button holders in HTML and initializes sticky header

#### filters [`object`]

Filters configuration object

#### userControlHelper [`object`]

User control helper configuration object 

### Example (DataSet)

`isDataSet: true`

	module.exports = {
	  formName: "ucTest901",
	  formFilters: true,
	  asyncHandler: true,
	  stateHelper: true,
      buttons: true,
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

### Example (DataTable)

`isDataSet: false`

	module.exports = {
	  formName: "ucTest901",
	  formFilters: true,
	  asyncHandler: true,
	  stateHelper: true,
      buttons: true,
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
	          isDataSet: false,
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
	            }	            
	          ]
	        }
	      }
	    }
	  }
	};


## Help

### --help
Displays available methods and options

	ess-dev --help

### --version
Displays the package version

	ess-dev --version