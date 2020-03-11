const {{id}} = new KendoDropDownList('{{id}}', {
  dataSource: [],
  dataValueField: "ID",
  dataTextField: "Descr",
  value: "",
  width: 200,
  dropdownAutoWidth: true,
  labelActive: false,
  optionLabel: getClientXStaticTranslation('')
});
group_{{groupId}}.add({{id}});
