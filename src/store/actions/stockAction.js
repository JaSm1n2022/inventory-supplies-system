export const STOCK_ACTIONS = {
ATTEMPT_TO_FETCH_STOCK: 'dashboard/@HOSPICE/ATTEMPT_TO_FETCH_STOCK',
SET_FETCH_STOCK_SUCCEED: 'dashboard/@HOSPICE/SET_FETCH_STOCK_SUCCEED',
SET_FETCH_STOCK_FAILURE: 'dashboard/@HOSPICE/SET_FETCH_STOCK_FAILURE',
RESET_FETCH_STOCK_STATE: 'dashboard/@HOSPICE/RESET_FETCH_STOCK_STATE',

ATTEMPT_TO_CREATE_STOCK: 'dashboard/@HOSPICE/ATTEMPT_TO_CREATE_STOCK',
SET_CREATE_STOCK_SUCCEED: 'dashboard/@HOSPICE/SET_CREATE_STOCK_SUCCEED',
SET_CREATE_STOCK_FAILURE: 'dashboard/@HOSPICE/SET_CREATE_STOCK_FAILURE',
RESET_CREATE_STOCK_STATE: 'dashboard/@HOSPICE/RESET_CREATE_STOCK_STATE',

ATTEMPT_TO_UPDATE_STOCK: 'dashboard/@HOSPICE/ATTEMPT_TO_UPDATE_STOCK',
SET_UPDATE_STOCK_SUCCEED: 'dashboard/@HOSPICE/SET_UPDATE_STOCK_SUCCEED',
SET_UPDATE_STOCK_FAILURE: 'dashboard/@HOSPICE/SET_UPDATE_STOCK_FAILURE',
RESET_UPDATE_STOCK_STATE: 'dashboard/@HOSPICE/RESET_UPDATE_STOCK_STATE',

ATTEMPT_TO_DELETE_STOCK: 'dashboard/@HOSPICE/ATTEMPT_TO_DELETE_STOCK',
SET_DELETE_STOCK_SUCCEED: 'dashboard/@HOSPICE/SET_DELETE_STOCK_SUCCEED',
SET_DELETE_STOCK_FAILURE: 'dashboard/@HOSPICE/SET_DELETE_STOCK_FAILURE',
RESET_DELETE_STOCK_STATE: 'dashboard/@HOSPICE/RESET_DELETE_STOCK_STATE'

}
//FETCH STOCK
export const attemptToFetchStock =  (data: Object): BaseAction  => ({
    type: STOCK_ACTIONS.ATTEMPT_TO_FETCH_STOCK,
    payload: data
  });
  export const setFetchStockSucceed = (payload: Object): BaseAction => ({
    type: STOCK_ACTIONS.SET_FETCH_STOCK_SUCCEED,
    payload
  });
  
  export const setFetchStockFailure = (payload: Object): BaseAction => ({
    type: STOCK_ACTIONS.SET_FETCH_STOCK_FAILURE,
    payload
  });
  export const resetFetchStockState = (): BaseAction => ({
    type: STOCK_ACTIONS.RESET_FETCH_STOCK_STATE
  });

//CREATE STOCK
export const attemptToCreateStock =  (data: Object): BaseAction  => ({
  type: STOCK_ACTIONS.ATTEMPT_TO_CREATE_STOCK,
  payload: data
});
export const setCreateStockSucceed = (payload: Object): BaseAction => ({
  type: STOCK_ACTIONS.SET_CREATE_STOCK_SUCCEED,
  payload
});

export const setCreateStockFailure = (payload: Object): BaseAction => ({
  type: STOCK_ACTIONS.SET_CREATE_STOCK_FAILURE,
  payload
});
export const resetCreateStockState = (): BaseAction => ({
  type: STOCK_ACTIONS.RESET_CREATE_STOCK_STATE
});

//UPDATE STOCK
export const attemptToUpdateStock =  (data: Object): BaseAction  => ({
  type: STOCK_ACTIONS.ATTEMPT_TO_UPDATE_STOCK,
  payload: data
});
export const setUpdateStockSucceed = (payload: Object): BaseAction => ({
  type: STOCK_ACTIONS.SET_UPDATE_STOCK_SUCCEED,
  payload
});

export const setUpdateStockFailure = (payload: Object): BaseAction => ({
  type: STOCK_ACTIONS.SET_UPDATE_STOCK_FAILURE,
  payload
});
export const resetUpdateStockState = (): BaseAction => ({
  type: STOCK_ACTIONS.RESET_UPDATE_STOCK_STATE
});

//DELETE STOCK
export const attemptToDeleteStock =  (data: Object): BaseAction  => ({
  type: STOCK_ACTIONS.ATTEMPT_TO_DELETE_STOCK,
  payload: data
});
export const setDeleteStockSucceed = (payload: Object): BaseAction => ({
  type: STOCK_ACTIONS.SET_DELETE_STOCK_SUCCEED,
  payload
});

export const setDeleteStockFailure = (payload: Object): BaseAction => ({
  type: STOCK_ACTIONS.SET_DELETE_STOCK_FAILURE,
  payload
});
export const resetDeleteStockState = (): BaseAction => ({
  type: STOCK_ACTIONS.RESET_DELETE_STOCK_STATE
});
