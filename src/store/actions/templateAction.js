export const TEMPLATE_ACTIONS = {
ATTEMPT_TO_FETCH_TEMPLATE: 'dashboard/@HOSPICE/ATTEMPT_TO_FETCH_TEMPLATE',
SET_FETCH_TEMPLATE_SUCCEED: 'dashboard/@HOSPICE/SET_FETCH_TEMPLATE_SUCCEED',
SET_FETCH_TEMPLATE_FAILURE: 'dashboard/@HOSPICE/SET_FETCH_TEMPLATE_FAILURE',
RESET_FETCH_TEMPLATE_STATE: 'dashboard/@HOSPICE/RESET_FETCH_TEMPLATE_STATE',

ATTEMPT_TO_CREATE_TEMPLATE: 'dashboard/@HOSPICE/ATTEMPT_TO_CREATE_TEMPLATE',
SET_CREATE_TEMPLATE_SUCCEED: 'dashboard/@HOSPICE/SET_CREATE_TEMPLATE_SUCCEED',
SET_CREATE_TEMPLATE_FAILURE: 'dashboard/@HOSPICE/SET_CREATE_TEMPLATE_FAILURE',
RESET_CREATE_TEMPLATE_STATE: 'dashboard/@HOSPICE/RESET_CREATE_TEMPLATE_STATE',

ATTEMPT_TO_UPDATE_TEMPLATE: 'dashboard/@HOSPICE/ATTEMPT_TO_UPDATE_TEMPLATE',
SET_UPDATE_TEMPLATE_SUCCEED: 'dashboard/@HOSPICE/SET_UPDATE_TEMPLATE_SUCCEED',
SET_UPDATE_TEMPLATE_FAILURE: 'dashboard/@HOSPICE/SET_UPDATE_TEMPLATE_FAILURE',
RESET_UPDATE_TEMPLATE_STATE: 'dashboard/@HOSPICE/RESET_UPDATE_TEMPLATE_STATE',

ATTEMPT_TO_DELETE_TEMPLATE: 'dashboard/@HOSPICE/ATTEMPT_TO_DELETE_TEMPLATE',
SET_DELETE_TEMPLATE_SUCCEED: 'dashboard/@HOSPICE/SET_DELETE_TEMPLATE_SUCCEED',
SET_DELETE_TEMPLATE_FAILURE: 'dashboard/@HOSPICE/SET_DELETE_TEMPLATE_FAILURE',
RESET_DELETE_TEMPLATE_STATE: 'dashboard/@HOSPICE/RESET_DELETE_TEMPLATE_STATE'

}
//FETCH EMPLOYEE
export const attemptToFetchTemplate =  (data: Object): BaseAction  => ({
    type: TEMPLATE_ACTIONS.ATTEMPT_TO_FETCH_TEMPLATE,
    payload: data
  });
  export const setFetchTemplateSucceed = (payload: Object): BaseAction => ({
    type: TEMPLATE_ACTIONS.SET_FETCH_TEMPLATE_SUCCEED,
    payload
  });
  
  export const setFetchTemplateFailure = (payload: Object): BaseAction => ({
    type: TEMPLATE_ACTIONS.SET_FETCH_TEMPLATE_FAILURE,
    payload
  });
  export const resetFetchTemplateState = (): BaseAction => ({
    type: TEMPLATE_ACTIONS.RESET_FETCH_TEMPLATE_STATE
  });

//CREATE EMPLOYEE
export const attemptToCreateTemplate =  (data: Object): BaseAction  => ({
  type: TEMPLATE_ACTIONS.ATTEMPT_TO_CREATE_TEMPLATE,
  payload: data
});
export const setCreateTemplateSucceed = (payload: Object): BaseAction => ({
  type: TEMPLATE_ACTIONS.SET_CREATE_TEMPLATE_SUCCEED,
  payload
});

export const setCreateTemplateFailure = (payload: Object): BaseAction => ({
  type: TEMPLATE_ACTIONS.SET_CREATE_TEMPLATE_FAILURE,
  payload
});
export const resetCreateTemplateState = (): BaseAction => ({
  type: TEMPLATE_ACTIONS.RESET_CREATE_TEMPLATE_STATE
});

//UPDATE EMPLOYEE
export const attemptToUpdateTemplate =  (data: Object): BaseAction  => ({
  type: TEMPLATE_ACTIONS.ATTEMPT_TO_UPDATE_TEMPLATE,
  payload: data
});
export const setUpdateTemplateSucceed = (payload: Object): BaseAction => ({
  type: TEMPLATE_ACTIONS.SET_UPDATE_TEMPLATE_SUCCEED,
  payload
});

export const setUpdateTemplateFailure = (payload: Object): BaseAction => ({
  type: TEMPLATE_ACTIONS.SET_UPDATE_TEMPLATE_FAILURE,
  payload
});
export const resetUpdateTemplateState = (): BaseAction => ({
  type: TEMPLATE_ACTIONS.RESET_UPDATE_TEMPLATE_STATE
});

//DELETE EMPLOYEE
export const attemptToDeleteTemplate =  (data: Object): BaseAction  => ({
  type: TEMPLATE_ACTIONS.ATTEMPT_TO_DELETE_TEMPLATE,
  payload: data
});
export const setDeleteTemplateSucceed = (payload: Object): BaseAction => ({
  type: TEMPLATE_ACTIONS.SET_DELETE_TEMPLATE_SUCCEED,
  payload
});

export const setDeleteTemplateFailure = (payload: Object): BaseAction => ({
  type: TEMPLATE_ACTIONS.SET_DELETE_TEMPLATE_FAILURE,
  payload
});
export const resetDeleteTemplateState = (): BaseAction => ({
  type: TEMPLATE_ACTIONS.RESET_DELETE_TEMPLATE_STATE
});
