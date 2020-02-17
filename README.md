# ess-dev
Project specific tool for automatic boileplate code generation.

This tool is a node cli that is intended to be used as a development tool for specific ASP.NET/Typescript project. It uses [Handlebars](https://handlebarsjs.com/](https://handlebarsjs.com/ "https://handlebarsjs.com/") in order to generate biolerplate code. Feel free to fork the repo in order to customize the behaviour according to your needs.

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

### -d
If provided, the default settings will be applied

- Form filters: Yes
- Async handler: Yes
- State hepler: Yes


## Help

### --help
Displays available methods and options

	ess-dev --help

### --version
Displays the package version

	ess-dev --version