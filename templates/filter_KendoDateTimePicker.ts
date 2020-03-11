const now_{{id}} = new Date();
const {{id}} = new KendoDateTimePicker('{{id}}', {
  value: now_{{id}},
  label: getClientXStaticTranslation('')
});
group_{{groupId}}.add({{id}});
