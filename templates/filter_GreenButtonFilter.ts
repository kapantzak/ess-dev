const isHREditor = (state.UserRoles || []).indexOf(1005) !== -1;

let departmentsData = [];
try {
   departmentsData = JSON.parse((state.Datasources || {}).DepartmentsDatasourceJSON);
} catch (e) {
   console.warn('Unable to parse departments datasource');
}

let groupsData = [];
try {
   groupsData = JSON.parse((state.Datasources || {}).GroupsDatasourceJSON);
} catch (e) {
   console.warn('Unable to parse groups datasource');
}

// Selected user
const selectedUser: string[] = [];
if (state.CurrentUserContactID) {
   selectedUser.push(state.CurrentUserContactID.toString());
}

let selectedFilter = GreenButtonFilters.departments;
let selectedDepartment = null;

const currentUserDepartments = state.CurrentUserDepartments || [];
if (currentUserDepartments.length > 0) {
   selectedDepartment = currentUserDepartments[0];
}

const {{id}} = new GreenButtonFilter('{{id}}', {
    departments: {
        data: [], // departmentsData
        datasourceControlPlaceholder: getClientXStaticTranslation('')
    },
    groups: {
        data: [], // groupsData
        datasourceControlPlaceholder: getClientXStaticTranslation(''),
        scenarios: [] // Example --> [{ ScenarioID: 11, IsView: true }, { ScenarioID: 12, IsEdit: true }]
    },
    options: {
        sacOptions: {
            mainButton: {
                className: 'btn btn-default'
            },
            selectedNodes: selectedUser,
            multiSelect: false,
        },
        selectedFilter: selectedFilter,
        selectedDepartment: typeof selectedDepartment !== 'undefined' && selectedDepartment !== null ? selectedDepartment.toString() : null,
        displayInline: true
    },
    required: true,
    validationErrorMessage: getClientXStaticTranslation(''),
    label: getClientXStaticTranslation('')
});
