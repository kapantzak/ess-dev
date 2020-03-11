const now_{{id}} = new Date();
const {{id}} = new KendoDateRangePicker('{{id}}', {
  range: {
    start: getFirstDayOfMonth(now_{{id}}),
    end: now_{{id}}
  },
  label: getClientXStaticTranslation('')
});
group_{{groupId}}.add({{id}});
