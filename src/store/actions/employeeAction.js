export const EMPLOYEE_ACTIONS = {
ATTEMPT_TO_FETCH_EMPLOYEE: 'dashboard/@HOSPICE/ATTEMPT_TO_FETCH_EMPLOYEE',
SET_FETCH_EMPLOYEE_SUCCEED: 'dashboard/@HOSPICE/SET_FETCH_EMPLOYEE_SUCCEED',
SET_FETCH_EMPLOYEE_FAILURE: 'dashboard/@HOSPICE/SET_FETCH_EMPLOYEE_FAILURE',
RESET_FETCH_EMPLOYEE_STATE: 'dashboard/@HOSPICE/RESET_FETCH_EMPLOYEE_STATE',

ATTEMPT_TO_CREATE_EMPLOYEE: 'dashboard/@HOSPICE/ATTEMPT_TO_CREATE_EMPLOYEE',
SET_CREATE_EMPLOYEE_SUCCEED: 'dashboard/@HOSPICE/SET_CREATE_EMPLOYEE_SUCCEED',
SET_CREATE_EMPLOYEE_FAILURE: 'dashboard/@HOSPICE/SET_CREATE_EMPLOYEE_FAILURE',
RESET_CREATE_EMPLOYEE_STATE: 'dashboard/@HOSPICE/RESET_CREATE_EMPLOYEE_STATE',

ATTEMPT_TO_UPDATE_EMPLOYEE: 'dashboard/@HOSPICE/ATTEMPT_TO_UPDATE_EMPLOYEE',
SET_UPDATE_EMPLOYEE_SUCCEED: 'dashboard/@HOSPICE/SET_UPDATE_EMPLOYEE_SUCCEED',
SET_UPDATE_EMPLOYEE_FAILURE: 'dashboard/@HOSPICE/SET_UPDATE_EMPLOYEE_FAILURE',
RESET_UPDATE_EMPLOYEE_STATE: 'dashboard/@HOSPICE/RESET_UPDATE_EMPLOYEE_STATE',

ATTEMPT_TO_DELETE_EMPLOYEE: 'dashboard/@HOSPICE/ATTEMPT_TO_DELETE_EMPLOYEE',
SET_DELETE_EMPLOYEE_SUCCEED: 'dashboard/@HOSPICE/SET_DELETE_EMPLOYEE_SUCCEED',
SET_DELETE_EMPLOYEE_FAILURE: 'dashboard/@HOSPICE/SET_DELETE_EMPLOYEE_FAILURE',
RESET_DELETE_EMPLOYEE_STATE: 'dashboard/@HOSPICE/RESET_DELETE_EMPLOYEE_STATE'

}
//FETCH EMPLOYEE
export const attemptToFetchEmployee =  (data: Object): BaseAction  => ({
    type: EMPLOYEE_ACTIONS.ATTEMPT_TO_FETCH_EMPLOYEE,
    payload: data
  });
  export const setFetchEmployeeSucceed = (payload: Object): BaseAction => ({
    type: EMPLOYEE_ACTIONS.SET_FETCH_EMPLOYEE_SUCCEED,
    payload
  });
  
  export const setFetchEmployeeFailure = (payload: Object): BaseAction => ({
    type: EMPLOYEE_ACTIONS.SET_FETCH_EMPLOYEE_FAILURE,
    payload
  });
  export const resetFetchEmployeeState = (): BaseAction => ({
    type: EMPLOYEE_ACTIONS.RESET_FETCH_EMPLOYEE_STATE
  });

//CREATE EMPLOYEE
export const attemptToCreateEmployee =  (data: Object): BaseAction  => ({
  type: EMPLOYEE_ACTIONS.ATTEMPT_TO_CREATE_EMPLOYEE,
  payload: data
});
export const setCreateEmployeeSucceed = (payload: Object): BaseAction => ({
  type: EMPLOYEE_ACTIONS.SET_CREATE_EMPLOYEE_SUCCEED,
  payload
});

export const setCreateEmployeeFailure = (payload: Object): BaseAction => ({
  type: EMPLOYEE_ACTIONS.SET_CREATE_EMPLOYEE_FAILURE,
  payload
});
export const resetCreateEmployeeState = (): BaseAction => ({
  type: EMPLOYEE_ACTIONS.RESET_CREATE_EMPLOYEE_STATE
});

//UPDATE EMPLOYEE
export const attemptToUpdateEmployee =  (data: Object): BaseAction  => ({
  type: EMPLOYEE_ACTIONS.ATTEMPT_TO_UPDATE_EMPLOYEE,
  payload: data
});
export const setUpdateEmployeeSucceed = (payload: Object): BaseAction => ({
  type: EMPLOYEE_ACTIONS.SET_UPDATE_EMPLOYEE_SUCCEED,
  payload
});

export const setUpdateEmployeeFailure = (payload: Object): BaseAction => ({
  type: EMPLOYEE_ACTIONS.SET_UPDATE_EMPLOYEE_FAILURE,
  payload
});
export const resetUpdateEmployeeState = (): BaseAction => ({
  type: EMPLOYEE_ACTIONS.RESET_UPDATE_EMPLOYEE_STATE
});

//DELETE EMPLOYEE
export const attemptToDeleteEmployee =  (data: Object): BaseAction  => ({
  type: EMPLOYEE_ACTIONS.ATTEMPT_TO_DELETE_EMPLOYEE,
  payload: data
});
export const setDeleteEmployeeSucceed = (payload: Object): BaseAction => ({
  type: EMPLOYEE_ACTIONS.SET_DELETE_EMPLOYEE_SUCCEED,
  payload
});

export const setDeleteEmployeeFailure = (payload: Object): BaseAction => ({
  type: EMPLOYEE_ACTIONS.SET_DELETE_EMPLOYEE_FAILURE,
  payload
});
export const resetDeleteEmployeeState = (): BaseAction => ({
  type: EMPLOYEE_ACTIONS.RESET_DELETE_EMPLOYEE_STATE
});
