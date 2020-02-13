/*
 * Control name: '{{form.name}}'
 * Date: {{form.date}}
 */

import { Store, createStore } from 'redux';
import {
  localizeKendo,
  getClientXStaticTranslation
} from '../helpers/localizationHelper';
import { {{asyncHelper.className}} } from '../asyncHelpers/{{asyncHelper.fileName}}';
import '@progress/kendo-ui/js/kendo.all.js';
import '@progress/kendo-ui/js/cultures/kendo.culture.el-GR.js';
import * as stateHelper from '../reduxStates/state_assessmentForm';
import { parseDecodedJSON } from '../helpers/htmlHelper';
import { getHiddenReduxStateSelector } from '../reduxStates/reduxHelpers';
import {
  IAsyncResponse,
  AsyncResponseStatus
} from '../asyncHelpers/generalAsyncHelper';
import models = eStudio.classes.HttpRequestsDataModels.AssessmentForm;

localizeKendo();

const asyncHelper = new {{asyncHelper.className}}();

let store: Store<models.AssessmentFormState> = null;

let modals = null;

function initApp(): void {
  console.log('{{form.name}}');
  if (setInitialState()) {
    const state = store.getState();
    
  }
}

function setInitialState(): boolean {
  const stateData = getHiddenFieldData(
    getHiddenReduxStateSelector(
      'div_ucAssessmentForm',
      '[id$=Hidden_InitialState_ucAssessmentForm]'
    )
  );
  if (stateData && stateData.length > 0) {
    const initialState: models.AssessmentFormState = parseDecodedJSON(
      stateData
    );
    store = createStore(stateHelper.appReducer, initialState);
    return true;
  }
  return false;
}
