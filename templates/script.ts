/*
 * Control name: '{{form.name}}'
 * Date: {{form.date}}
 */

{{#if answers.stateHelper}}
import { Store, createStore } from 'redux';
import * as stateHelper from '../reduxStates/{{stateHelper.import_name}}';
import { getHiddenReduxStateSelector } from '../reduxStates/reduxHelpers';
{{/if}}
import { getHiddenFieldData, waitVisible } from '../helpers/genericHelpers';
import { localizeKendo, getClientXStaticTranslation } from '../helpers/localizationHelper';
import '@progress/kendo-ui/js/kendo.all.js';
import '@progress/kendo-ui/js/cultures/kendo.culture.el-GR.js';
import { parseDecodedJSON } from '../helpers/htmlHelper';
{{#if answers.formFilters}}
import { Filters, FiltersGroup, IFiltersApplyEvent } from '../helpers/filtersApi/filters';
{{/if}}
{{#if answers.asyncHandler}}
import { {{asyncHelper.className}} } from '../asyncHelpers/{{asyncHelper.import_name}}';
import { IAsyncResponse, AsyncResponseStatus } from '../asyncHelpers/generalAsyncHelper';
{{/if}}
import models = eStudio.classes.HttpRequestsDataModels.{{form.className}};

localizeKendo();

const asyncHelper = new {{asyncHelper.className}}();

{{#if answers.stateHelper}}
let store: Store<models.State> = null;
{{/if}}

function initApp(): void {
  console.log('{{form.name}}');
  {{#if answers.stateHelper}}
  if (setInitialState()) {
    const state = store.getState();
    {{#if answers.formFilters}}
    initFilters(state);
    {{/if}}
  }
  {{/if}}
}

{{#if answers.stateHelper}}
function setInitialState(): boolean {
  const stateData = getHiddenFieldData(
    getHiddenReduxStateSelector(
      'div_{{form.name}}',
      '[id$=Hidden_InitialState_{{form.name}}]'
    )
  );
  if (stateData && stateData.length > 0) {
    const initialState: models.State = parseDecodedJSON(
      stateData
    );
    store = createStore(stateHelper.appReducer, initialState);
    return true;
  }
  return false;
}
{{/if}}

{{#if answers.formFilters}}
function initFilters(state: models.State): void {

  {{#each filters.groups}}
  {{#each this.filters}}  
  {{> (lookup . 'templateName') this}}
  
  {{/each}}
  {{/each}}

  const groupMain = new FiltersGroup('fltGroup_Main');

  // Add filters to group
  // groupMain.add(...)

  const filters = new Filters($('#filters'), {
      applyFiltersCallback: applyFiltersCallback,
      useValidation: true,
      sessionStorageKey: 'SESSION_{{form.name}}'
  });

  filters.addGroup(groupMain).init();
}

function applyFiltersCallback(e: IFiltersApplyEvent): void {
  if (e.valid) {
      changeState_Filters(getFiltersData(e));
      tryApply();
  } else {
      new ModalAlert({
          alertType: BootstrapColorClass.danger,
          body: getClientXStaticTranslation('')
      }).show();
  }
}

function getFiltersData(e: IFiltersApplyEvent): models.Filters {
  const f = e.filters || {};
  
  return {};
}

async function tryApply(): Promise<void> {
  const results = $('#divResults');
  const filters = (store.getState() || {}).Filters;
  if (filters) {
      toggleMainLoader(true);
      results.show();
      
      {{#if answers.formFilters}}
      const resp = await asyncHelper.applyFilters(filters);
      if (resp.status === AsyncResponseStatus.success) {
          if (resp.data) {
              if (typeof resp.data === 'string') {
                  console.warn(`Async/{{asyncHandler.name}}.ashx --> applyFilters() --> ${resp.data}`);
              } else {                
                  changeState_Results({
                    Data: resp.data
                  });

                  // Render data from state
              }
          } else {
              console.warn('Async/{{asyncHandler.name}}.ashx --> applyFilters() --> No data returned');
          }
      } else {
          console.warn(`Async/{{asyncHandler.name}}.ashx --> applyFilters() --> ${resp.message}`);
      }
      {{/if}}

      toggleMainLoader(false);        
  } else {
      new ModalAlert({
          alertType: BootstrapColorClass.danger,
          body: getClientXStaticTranslation('')
      }).show();
  }
}
{{/if}}


{{#if answers.stateHelper}}
// STATE ------------------------------------------------------------------------------------- //
{{#if answers.formFilters}}
function changeState_Filters(filters: models.Filters): void {
  store.dispatch(stateHelper.changeFilters(filters));
}

function changeState_Results(results: models.Results): void {
  store.dispatch(stateHelper.updateResults(results));
}
{{/if}}
{{/if}}

$(window).load(() => {
  initApp();
});