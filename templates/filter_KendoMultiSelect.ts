const {{id}} = new KendoMultiSelect('{{id}}', {
    dataSource: [],
    dataValueField: 'ID',
    dataTextField: 'Descr',
    autoClose: false,
    width: 250,
    placeholder: getClientXStaticTranslation(''),
    labelActive: false
});
group_{{groupId}}.add({{id}});
