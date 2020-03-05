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

  const filters = new Filters($('#filters'), {
      applyFiltersCallback: applyFiltersCallback,
      useValidation: true,
      sessionStorageKey: 'SESSION_{{form.name}}'
  });
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
      // Render results
      toggleMainLoader(false);        
  } else {
      new ModalAlert({
          alertType: BootstrapColorClass.danger,
          body: getClientXStaticTranslation('')
      }).show();
  }
}
{{/if}}

$(window).load(() => {
  initApp();
});