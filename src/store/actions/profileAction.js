export const PROFILE_ACTIONS = {
  ATTEMPT_TO_FETCH_PROFILE: 'dashboard/@HOSPICE/ATTEMPT_TO_FETCH_EMPLOYEE',
  SET_FETCH_EMPLOYEE_SUCCEED: 'dashboard/@HOSPICE/SET_FETCH_EMPLOYEE_SUCCEED',
  SET_FETCH_EMPLOYEE_FAILURE: 'dashboard/@HOSPICE/SET_FETCH_EMPLOYEE_FAILURE',
  RESET_FETCH_EMPLOYEE_STATE: 'dashboard/@HOSPICE/RESET_FETCH_EMPLOYEE_STATE',

}
//FETCH EMPLOYEE
export const attemptToFetchEmployee = (data: Object): BaseAction => ({
  type: PROFILE_ACTIONS.ATTEMPT_TO_FETCH_PROFILE,
  payload: data
});
export const setFetchEmployeeSucceed = (payload: Object): BaseAction => ({
  type: PROFILE_ACTIONS.SET_FETCH_PROFILE_SUCCEED,
  payload
});

export const setFetchEmployeeFailure = (payload: Object): BaseAction => ({
  type: PROFILE_ACTIONS.SET_FETCH_PROFILE_FAILURE,
  payload
});
export const resetFetchEmployeeState = (): BaseAction => ({
  type: PROFILE_ACTIONS.RESET_FETCH_PROFILE_STATE
});




