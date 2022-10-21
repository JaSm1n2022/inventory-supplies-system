export const TRANSACTION_ACTIONS = {
ATTEMPT_TO_FETCH_TRANSACTION: 'dashboard/@HOSPICE/ATTEMPT_TO_FETCH_TRANSACTION',
SET_FETCH_TRANSACTION_SUCCEED: 'dashboard/@HOSPICE/SET_FETCH_TRANSACTION_SUCCEED',
SET_FETCH_TRANSACTION_FAILURE: 'dashboard/@HOSPICE/SET_FETCH_TRANSACTION_FAILURE',
RESET_FETCH_TRANSACTION_STATE: 'dashboard/@HOSPICE/RESET_FETCH_TRANSACTION_STATE',

ATTEMPT_TO_CREATE_TRANSACTION: 'dashboard/@HOSPICE/ATTEMPT_TO_CREATE_TRANSACTION',
SET_CREATE_TRANSACTION_SUCCEED: 'dashboard/@HOSPICE/SET_CREATE_TRANSACTION_SUCCEED',
SET_CREATE_TRANSACTION_FAILURE: 'dashboard/@HOSPICE/SET_CREATE_TRANSACTION_FAILURE',
RESET_CREATE_TRANSACTION_STATE: 'dashboard/@HOSPICE/RESET_CREATE_TRANSACTION_STATE',

ATTEMPT_TO_UPDATE_TRANSACTION: 'dashboard/@HOSPICE/ATTEMPT_TO_UPDATE_TRANSACTION',
SET_UPDATE_TRANSACTION_SUCCEED: 'dashboard/@HOSPICE/SET_UPDATE_TRANSACTION_SUCCEED',
SET_UPDATE_TRANSACTION_FAILURE: 'dashboard/@HOSPICE/SET_UPDATE_TRANSACTION_FAILURE',
RESET_UPDATE_TRANSACTION_STATE: 'dashboard/@HOSPICE/RESET_UPDATE_TRANSACTION_STATE',

ATTEMPT_TO_DELETE_TRANSACTION: 'dashboard/@HOSPICE/ATTEMPT_TO_DELETE_TRANSACTION',
SET_DELETE_TRANSACTION_SUCCEED: 'dashboard/@HOSPICE/SET_DELETE_TRANSACTION_SUCCEED',
SET_DELETE_TRANSACTION_FAILURE: 'dashboard/@HOSPICE/SET_DELETE_TRANSACTION_FAILURE',
RESET_DELETE_TRANSACTION_STATE: 'dashboard/@HOSPICE/RESET_DELETE_TRANSACTION_STATE'

}
//FETCH TRANSACTION
export const attemptToFetchTransaction =  (data: Object): BaseAction  => ({
    type: TRANSACTION_ACTIONS.ATTEMPT_TO_FETCH_TRANSACTION,
    payload: data
  });
  export const setFetchTransactionSucceed = (payload: Object): BaseAction => ({
    type: TRANSACTION_ACTIONS.SET_FETCH_TRANSACTION_SUCCEED,
    payload
  });
  
  export const setFetchTransactionFailure = (payload: Object): BaseAction => ({
    type: TRANSACTION_ACTIONS.SET_FETCH_TRANSACTION_FAILURE,
    payload
  });
  export const resetFetchTransactionState = (): BaseAction => ({
    type: TRANSACTION_ACTIONS.RESET_FETCH_TRANSACTION_STATE
  });

//CREATE TRANSACTION
export const attemptToCreateTransaction =  (data: Object): BaseAction  => ({
  type: TRANSACTION_ACTIONS.ATTEMPT_TO_CREATE_TRANSACTION,
  payload: data
});
export const setCreateTransactionSucceed = (payload: Object): BaseAction => ({
  type: TRANSACTION_ACTIONS.SET_CREATE_TRANSACTION_SUCCEED,
  payload
});

export const setCreateTransactionFailure = (payload: Object): BaseAction => ({
  type: TRANSACTION_ACTIONS.SET_CREATE_TRANSACTION_FAILURE,
  payload
});
export const resetCreateTransactionState = (): BaseAction => ({
  type: TRANSACTION_ACTIONS.RESET_CREATE_TRANSACTION_STATE
});

//UPDATE TRANSACTION
export const attemptToUpdateTransaction =  (data: Object): BaseAction  => ({
  type: TRANSACTION_ACTIONS.ATTEMPT_TO_UPDATE_TRANSACTION,
  payload: data
});
export const setUpdateTransactionSucceed = (payload: Object): BaseAction => ({
  type: TRANSACTION_ACTIONS.SET_UPDATE_TRANSACTION_SUCCEED,
  payload
});

export const setUpdateTransactionFailure = (payload: Object): BaseAction => ({
  type: TRANSACTION_ACTIONS.SET_UPDATE_TRANSACTION_FAILURE,
  payload
});
export const resetUpdateTransactionState = (): BaseAction => ({
  type: TRANSACTION_ACTIONS.RESET_UPDATE_TRANSACTION_STATE
});

//DELETE TRANSACTION
export const attemptToDeleteTransaction =  (data: Object): BaseAction  => ({
  type: TRANSACTION_ACTIONS.ATTEMPT_TO_DELETE_TRANSACTION,
  payload: data
});
export const setDeleteTransactionSucceed = (payload: Object): BaseAction => ({
  type: TRANSACTION_ACTIONS.SET_DELETE_TRANSACTION_SUCCEED,
  payload
});

export const setDeleteTransactionFailure = (payload: Object): BaseAction => ({
  type: TRANSACTION_ACTIONS.SET_DELETE_TRANSACTION_FAILURE,
  payload
});
export const resetDeleteTransactionState = (): BaseAction => ({
  type: TRANSACTION_ACTIONS.RESET_DELETE_TRANSACTION_STATE
});
