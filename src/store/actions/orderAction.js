export const ORDER_ACTIONS = {
  ATTEMPT_TO_FETCH_ORDER: 'dashboard/@HOSPICE/ATTEMPT_TO_FETCH_ORDER',
  SET_FETCH_ORDER_SUCCEED: 'dashboard/@HOSPICE/SET_FETCH_ORDER_SUCCEED',
  SET_FETCH_ORDER_FAILURE: 'dashboard/@HOSPICE/SET_FETCH_ORDER_FAILURE',
  RESET_FETCH_ORDER_STATE: 'dashboard/@HOSPICE/RESET_FETCH_ORDER_STATE',

  ATTEMPT_TO_CREATE_ORDER: 'dashboard/@HOSPICE/ATTEMPT_TO_CREATE_ORDER',
  SET_CREATE_ORDER_SUCCEED: 'dashboard/@HOSPICE/SET_CREATE_ORDER_SUCCEED',
  SET_CREATE_ORDER_FAILURE: 'dashboard/@HOSPICE/SET_CREATE_ORDER_FAILURE',
  RESET_CREATE_ORDER_STATE: 'dashboard/@HOSPICE/RESET_CREATE_ORDER_STATE',

  ATTEMPT_TO_UPDATE_ORDER: 'dashboard/@HOSPICE/ATTEMPT_TO_UPDATE_ORDER',
  SET_UPDATE_ORDER_SUCCEED: 'dashboard/@HOSPICE/SET_UPDATE_ORDER_SUCCEED',
  SET_UPDATE_ORDER_FAILURE: 'dashboard/@HOSPICE/SET_UPDATE_ORDER_FAILURE',
  RESET_UPDATE_ORDER_STATE: 'dashboard/@HOSPICE/RESET_UPDATE_ORDER_STATE',

  ATTEMPT_TO_DELETE_ORDER: 'dashboard/@HOSPICE/ATTEMPT_TO_DELETE_ORDER',
  SET_DELETE_ORDER_SUCCEED: 'dashboard/@HOSPICE/SET_DELETE_ORDER_SUCCEED',
  SET_DELETE_ORDER_FAILURE: 'dashboard/@HOSPICE/SET_DELETE_ORDER_FAILURE',
  RESET_DELETE_ORDER_STATE: 'dashboard/@HOSPICE/RESET_DELETE_ORDER_STATE'

}
//FETCH Distribution
export const attemptToFetchOrder = (data: Object): BaseAction => ({
  type: ORDER_ACTIONS.ATTEMPT_TO_FETCH_ORDER,
  payload: data
});
export const setFetchOrderSucceed = (payload: Object): BaseAction => ({
  type: ORDER_ACTIONS.SET_FETCH_ORDER_SUCCEED,
  payload
});

export const setFetchOrderFailure = (payload: Object): BaseAction => ({
  type: ORDER_ACTIONS.SET_FETCH_ORDER_FAILURE,
  payload
});
export const resetFetchOrderState = (): BaseAction => ({
  type: ORDER_ACTIONS.RESET_FETCH_ORDER_STATE
});

//CREATE Distribution
export const attemptToCreateOrder = (data: Object): BaseAction => ({
  type: ORDER_ACTIONS.ATTEMPT_TO_CREATE_ORDER,
  payload: data
});
export const setCreateOrderSucceed = (payload: Object): BaseAction => ({
  type: ORDER_ACTIONS.SET_CREATE_ORDER_SUCCEED,
  payload
});

export const setCreateOrderFailure = (payload: Object): BaseAction => ({
  type: ORDER_ACTIONS.SET_CREATE_ORDER_FAILURE,
  payload
});
export const resetCreateOrderState = (): BaseAction => ({
  type: ORDER_ACTIONS.RESET_CREATE_ORDER_STATE
});

//UPDATE Distribution
export const attemptToUpdateOrder = (data: Object): BaseAction => ({
  type: ORDER_ACTIONS.ATTEMPT_TO_UPDATE_ORDER,
  payload: data
});
export const setUpdateOrderSucceed = (payload: Object): BaseAction => ({
  type: ORDER_ACTIONS.SET_UPDATE_ORDER_SUCCEED,
  payload
});

export const setUpdateOrderFailure = (payload: Object): BaseAction => ({
  type: ORDER_ACTIONS.SET_UPDATE_ORDER_FAILURE,
  payload
});
export const resetUpdateOrderState = (): BaseAction => ({
  type: ORDER_ACTIONS.RESET_UPDATE_ORDER_STATE
});

//DELETE Distribution
export const attemptToDeleteOrder = (data: Object): BaseAction => ({
  type: ORDER_ACTIONS.ATTEMPT_TO_DELETE_ORDER,
  payload: data
});
export const setDeleteOrderSucceed = (payload: Object): BaseAction => ({
  type: ORDER_ACTIONS.SET_DELETE_ORDER_SUCCEED,
  payload
});

export const setDeleteOrderFailure = (payload: Object): BaseAction => ({
  type: ORDER_ACTIONS.SET_DELETE_ORDER_FAILURE,
  payload
});
export const resetDeleteOrderState = (): BaseAction => ({
  type: ORDER_ACTIONS.RESET_DELETE_ORDER_STATE
});
