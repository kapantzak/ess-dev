/*
 * Control name: '{{form.name}}'
 * Date: {{form.date}}
 */

import { Store, createStore } from 'redux';
import { getHiddenFieldData, waitVisible } from '../helpers/genericHelpers';
import {
  localizeKendo,
  getClientXStaticTranslation
} from '../helpers/localizationHelper';
import { {{asyncHelper.className}} } from '../asyncHelpers/{{asyncHelper.import_name}}';
import '@progress/kendo-ui/js/kendo.all.js';
import '@progress/kendo-ui/js/cultures/kendo.culture.el-GR.js';
import * as stateHelper from '../reduxStates/{{stateHelper.import_name}}';
import { parseDecodedJSON } from '../helpers/htmlHelper';
import { getHiddenReduxStateSelector } from '../reduxStates/reduxHelpers';
import {
  IAsyncResponse,
  AsyncResponseStatus
} from '../asyncHelpers/generalAsyncHelper';
import models = eStudio.classes.HttpRequestsDataModels.{{form.className}};

localizeKendo();

const asyncHelper = new {{asyncHelper.className}}();

let store: Store<models.State> = null;

function initApp(): void {
  console.log('{{form.name}}');
  if (setInitialState()) {
    const state = store.getState();
    
  }
}

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

$(window).load(() => {
  initApp();
});