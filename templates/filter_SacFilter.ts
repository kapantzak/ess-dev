const sacPositionOptions_{{id}} = getSacEmployeesDefaultOptions({
  data: setAllNodesToOneParent(tranformData(get{{id}}Datasource(state)), {
    name: getClientXStaticTranslation(''),
    attributes: {
      'data-id': '-999'
    }
  }),
  mainButton: {
    className: "btn btn-default",
    defaultText: getClientXStaticTranslation(''),
    defaultAllText: getClientXStaticTranslation(''),
    defaultNoneText: getClientXStaticTranslation('')
  }
});

function get{{id}}Datasource(state: models.State): modelsGeneric.ITreeStructureData[] {
    return [];
}

const {{id}} = new SacFilter('{{id}}', {
  ...sacPositionOptions_{{id}},
  multiSelect: true,
  extendedValueObject: false,
  label: getClientXStaticTranslation('')
});
group_{{groupId}}.add({{id}});
