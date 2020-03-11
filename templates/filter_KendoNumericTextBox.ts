const {{id}} = new KendoNumericTextBox('{{id}}', {
    min: 0,
    max: 10,
    decimals: 0,
    format: 'n0',
    step: 1,
    value: 0
});
group_{{groupId}}.add({{id}});
