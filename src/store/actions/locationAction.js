export const LOCATION_ACTIONS = {
  ATTEMPT_TO_FETCH_LOCATION: "dashboard/@HOSPICE/ATTEMPT_TO_FETCH_LOCATION",
  SET_FETCH_LOCATION_SUCCEED: "dashboard/@HOSPICE/SET_FETCH_LOCATION_SUCCEED",
  SET_FETCH_LOCATION_FAILURE: "dashboard/@HOSPICE/SET_FETCH_LOCATION_FAILURE",
  RESET_FETCH_LOCATION_STATE: "dashboard/@HOSPICE/RESET_FETCH_LOCATION_STATE",

  ATTEMPT_TO_CREATE_LOCATION: "dashboard/@HOSPICE/ATTEMPT_TO_CREATE_LOCATION",
  SET_CREATE_LOCATION_SUCCEED: "dashboard/@HOSPICE/SET_CREATE_LOCATION_SUCCEED",
  SET_CREATE_LOCATION_FAILURE: "dashboard/@HOSPICE/SET_CREATE_LOCATION_FAILURE",
  RESET_CREATE_LOCATION_STATE: "dashboard/@HOSPICE/RESET_CREATE_LOCATION_STATE",

  ATTEMPT_TO_UPDATE_LOCATION: "dashboard/@HOSPICE/ATTEMPT_TO_UPDATE_LOCATION",
  SET_UPDATE_LOCATION_SUCCEED: "dashboard/@HOSPICE/SET_UPDATE_LOCATION_SUCCEED",
  SET_UPDATE_LOCATION_FAILURE: "dashboard/@HOSPICE/SET_UPDATE_LOCATION_FAILURE",
  RESET_UPDATE_LOCATION_STATE: "dashboard/@HOSPICE/RESET_UPDATE_LOCATION_STATE",

  ATTEMPT_TO_DELETE_LOCATION: "dashboard/@HOSPICE/ATTEMPT_TO_DELETE_LOCATION",
  SET_DELETE_LOCATION_SUCCEED: "dashboard/@HOSPICE/SET_DELETE_LOCATION_SUCCEED",
  SET_DELETE_LOCATION_FAILURE: "dashboard/@HOSPICE/SET_DELETE_LOCATION_FAILURE",
  RESET_DELETE_LOCATION_STATE: "dashboard/@HOSPICE/RESET_DELETE_LOCATION_STATE",
};
//FETCH EMPLOYEE
export const attemptToFetchLocation = (data: Object): BaseAction => ({
  type: LOCATION_ACTIONS.ATTEMPT_TO_FETCH_LOCATION,
  payload: data,
});
export const setFetchLocationSucceed = (payload: Object): BaseAction => ({
  type: LOCATION_ACTIONS.SET_FETCH_LOCATION_SUCCEED,
  payload,
});

export const setFetchLocationFailure = (payload: Object): BaseAction => ({
  type: LOCATION_ACTIONS.SET_FETCH_LOCATION_FAILURE,
  payload,
});
export const resetFetchLocationState = (): BaseAction => ({
  type: LOCATION_ACTIONS.RESET_FETCH_LOCATION_STATE,
});

//CREATE EMPLOYEE
export const attemptToCreateLocation = (data: Object): BaseAction => ({
  type: LOCATION_ACTIONS.ATTEMPT_TO_CREATE_LOCATION,
  payload: data,
});
export const setCreateLocationSucceed = (payload: Object): BaseAction => ({
  type: LOCATION_ACTIONS.SET_CREATE_LOCATION_SUCCEED,
  payload,
});

export const setCreateLocationFailure = (payload: Object): BaseAction => ({
  type: LOCATION_ACTIONS.SET_CREATE_LOCATION_FAILURE,
  payload,
});
export const resetCreateLocationState = (): BaseAction => ({
  type: LOCATION_ACTIONS.RESET_CREATE_LOCATION_STATE,
});

//UPDATE EMPLOYEE
export const attemptToUpdateLocation = (data: Object): BaseAction => ({
  type: LOCATION_ACTIONS.ATTEMPT_TO_UPDATE_LOCATION,
  payload: data,
});
export const setUpdateLocationSucceed = (payload: Object): BaseAction => ({
  type: LOCATION_ACTIONS.SET_UPDATE_LOCATION_SUCCEED,
  payload,
});

export const setUpdateLocationFailure = (payload: Object): BaseAction => ({
  type: LOCATION_ACTIONS.SET_UPDATE_LOCATION_FAILURE,
  payload,
});
export const resetUpdateLocationState = (): BaseAction => ({
  type: LOCATION_ACTIONS.RESET_UPDATE_LOCATION_STATE,
});

//DELETE EMPLOYEE
export const attemptToDeleteLocation = (data: Object): BaseAction => ({
  type: LOCATION_ACTIONS.ATTEMPT_TO_DELETE_LOCATION,
  payload: data,
});
export const setDeleteLocationSucceed = (payload: Object): BaseAction => ({
  type: LOCATION_ACTIONS.SET_DELETE_LOCATION_SUCCEED,
  payload,
});

export const setDeleteLocationFailure = (payload: Object): BaseAction => ({
  type: LOCATION_ACTIONS.SET_DELETE_LOCATION_FAILURE,
  payload,
});
export const resetDeleteLocationState = (): BaseAction => ({
  type: LOCATION_ACTIONS.RESET_DELETE_LOCATION_STATE,
});
