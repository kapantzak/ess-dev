//  Redux state
//  Date: {{form.date}}
//  Control name: '{{form.name}}'

import * as reduxHelpers from '../reduxStates/reduxHelpers';
import models = eStudio.classes.HttpRequestsDataModels.{{form.className}};

// REDUCERS ============================================================================== //

export function appReducer(state: models.State = undefined, action: IAction): models.State {
  switch (action.type) {
    {{#if answers.formFilters}}
    case actions.CHANGE_FILTERS:
      return Object.assign({}, state, {
        Filters: Object.assign({}, state.Filters, action.payload.filters)
      });    
    case actions.UPDATE_RESULTS:
      return Object.assign({}, state, {
        Results: Object.assign({}, state.Results, action.payload.results)
      });    
    {{/if}}
    default:
      return state;
  }
}

// ACTIONS =============================================================================== //

export enum actions {
  {{#if answers.formFilters}}
  CHANGE_FILTERS,
  UPDATE_RESULTS
  {{/if}}
}

export interface IAction extends reduxHelpers.IFluxAction {
  type: actions;
  payload: IPayload;
}

export interface IPayload {
  {{#if answers.formFilters}}
  filters?: models.Filters;
  results?: models.Results;  
  {{/if}}
}

// ACTION METHODS ======================================================================== //
{{#if answers.formFilters}}
export function changeFilters(filters: models.Filters): IAction {
  return {
    type: actions.CHANGE_FILTERS,
    payload: {
      filters: filters
    }
  };
}

export function updateResults(results: models.Results): IAction {
  return {
    type: actions.UPDATE_RESULTS,
    payload: {
      results: results
    }
  };
}
{{/if}}