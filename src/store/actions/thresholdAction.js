export const THRESHOLD_ACTIONS = {
  ATTEMPT_TO_FETCH_THRESHOLD: 'dashboard/@HOSPICE/ATTEMPT_TO_FETCH_THRESHOLD',
  SET_FETCH_THRESHOLD_SUCCEED: 'dashboard/@HOSPICE/SET_FETCH_THRESHOLD_SUCCEED',
  SET_FETCH_THRESHOLD_FAILURE: 'dashboard/@HOSPICE/SET_FETCH_THRESHOLD_FAILURE',
  RESET_FETCH_THRESHOLD_STATE: 'dashboard/@HOSPICE/RESET_FETCH_THRESHOLD_STATE',

  ATTEMPT_TO_CREATE_THRESHOLD: 'dashboard/@HOSPICE/ATTEMPT_TO_CREATE_THRESHOLD',
  SET_CREATE_THRESHOLD_SUCCEED: 'dashboard/@HOSPICE/SET_CREATE_THRESHOLD_SUCCEED',
  SET_CREATE_THRESHOLD_FAILURE: 'dashboard/@HOSPICE/SET_CREATE_THRESHOLD_FAILURE',
  RESET_CREATE_THRESHOLD_STATE: 'dashboard/@HOSPICE/RESET_CREATE_THRESHOLD_STATE',

  ATTEMPT_TO_UPDATE_THRESHOLD: 'dashboard/@HOSPICE/ATTEMPT_TO_UPDATE_THRESHOLD',
  SET_UPDATE_THRESHOLD_SUCCEED: 'dashboard/@HOSPICE/SET_UPDATE_THRESHOLD_SUCCEED',
  SET_UPDATE_THRESHOLD_FAILURE: 'dashboard/@HOSPICE/SET_UPDATE_THRESHOLD_FAILURE',
  RESET_UPDATE_THRESHOLD_STATE: 'dashboard/@HOSPICE/RESET_UPDATE_THRESHOLD_STATE',

  ATTEMPT_TO_DELETE_THRESHOLD: 'dashboard/@HOSPICE/ATTEMPT_TO_DELETE_THRESHOLD',
  SET_DELETE_THRESHOLD_SUCCEED: 'dashboard/@HOSPICE/SET_DELETE_THRESHOLD_SUCCEED',
  SET_DELETE_THRESHOLD_FAILURE: 'dashboard/@HOSPICE/SET_DELETE_THRESHOLD_FAILURE',
  RESET_DELETE_THRESHOLD_STATE: 'dashboard/@HOSPICE/RESET_DELETE_THRESHOLD_STATE'

}
//FETCH THRESHOLD_
export const attemptToFetchThreshold = (data: Object): BaseAction => ({
  type: THRESHOLD_ACTIONS.ATTEMPT_TO_FETCH_THRESHOLD,
  payload: data
});
export const setFetchThresholdSucceed = (payload: Object): BaseAction => ({
  type: THRESHOLD_ACTIONS.SET_FETCH_THRESHOLD_SUCCEED,
  payload
});

export const setFetchThresholdFailure = (payload: Object): BaseAction => ({
  type: THRESHOLD_ACTIONS.SET_FETCH_THRESHOLD_FAILURE,
  payload
});
export const resetFetchThresholdState = (): BaseAction => ({
  type: THRESHOLD_ACTIONS.RESET_FETCH_THRESHOLD_STATE
});

//CREATE Threshold
export const attemptToCreateThreshold = (data: Object): BaseAction => ({
  type: THRESHOLD_ACTIONS.ATTEMPT_TO_CREATE_THRESHOLD,
  payload: data
});
export const setCreateThresholdSucceed = (payload: Object): BaseAction => ({
  type: THRESHOLD_ACTIONS.SET_CREATE_THRESHOLD_SUCCEED,
  payload
});

export const setCreateThresholdFailure = (payload: Object): BaseAction => ({
  type: THRESHOLD_ACTIONS.SET_CREATE_THRESHOLD_FAILURE,
  payload
});
export const resetCreateThresholdState = (): BaseAction => ({
  type: THRESHOLD_ACTIONS.RESET_CREATE_THRESHOLD_STATE
});

//UPDATE Threshold
export const attemptToUpdateThreshold = (data: Object): BaseAction => ({
  type: THRESHOLD_ACTIONS.ATTEMPT_TO_UPDATE_THRESHOLD,
  payload: data
});
export const setUpdateThresholdSucceed = (payload: Object): BaseAction => ({
  type: THRESHOLD_ACTIONS.SET_UPDATE_THRESHOLD_SUCCEED,
  payload
});

export const setUpdateThresholdFailure = (payload: Object): BaseAction => ({
  type: THRESHOLD_ACTIONS.SET_UPDATE_THRESHOLD_FAILURE,
  payload
});
export const resetUpdateThresholdState = (): BaseAction => ({
  type: THRESHOLD_ACTIONS.RESET_UPDATE_THRESHOLD_STATE
});

//DELETE Threshold
export const attemptToDeleteThreshold = (data: Object): BaseAction => ({
  type: THRESHOLD_ACTIONS.ATTEMPT_TO_DELETE_THRESHOLD,
  payload: data
});
export const setDeleteThresholdSucceed = (payload: Object): BaseAction => ({
  type: THRESHOLD_ACTIONS.SET_DELETE_THRESHOLD_SUCCEED,
  payload
});

export const setDeleteThresholdFailure = (payload: Object): BaseAction => ({
  type: THRESHOLD_ACTIONS.SET_DELETE_THRESHOLD_FAILURE,
  payload
});
export const resetDeleteThresholdState = (): BaseAction => ({
  type: THRESHOLD_ACTIONS.RESET_DELETE_THRESHOLD_STATE
});
