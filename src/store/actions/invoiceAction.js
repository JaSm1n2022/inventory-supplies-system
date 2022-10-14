export const INVOICE_ACTIONS = {
ATTEMPT_TO_FETCH_INVOICE: 'dashboard/@HOSPICE/ATTEMPT_TO_FETCH_INVOICE',
SET_FETCH_INVOICE_SUCCEED: 'dashboard/@HOSPICE/SET_FETCH_INVOICE_SUCCEED',
SET_FETCH_INVOICE_FAILURE: 'dashboard/@HOSPICE/SET_FETCH_INVOICE_FAILURE',
RESET_FETCH_INVOICE_STATE: 'dashboard/@HOSPICE/RESET_FETCH_INVOICE_STATE',

ATTEMPT_TO_CREATE_INVOICE: 'dashboard/@HOSPICE/ATTEMPT_TO_CREATE_INVOICE',
SET_CREATE_INVOICE_SUCCEED: 'dashboard/@HOSPICE/SET_CREATE_INVOICE_SUCCEED',
SET_CREATE_INVOICE_FAILURE: 'dashboard/@HOSPICE/SET_CREATE_INVOICE_FAILURE',
RESET_CREATE_INVOICE_STATE: 'dashboard/@HOSPICE/RESET_CREATE_INVOICE_STATE',

ATTEMPT_TO_UPDATE_INVOICE: 'dashboard/@HOSPICE/ATTEMPT_TO_UPDATE_INVOICE',
SET_UPDATE_INVOICE_SUCCEED: 'dashboard/@HOSPICE/SET_UPDATE_INVOICE_SUCCEED',
SET_UPDATE_INVOICE_FAILURE: 'dashboard/@HOSPICE/SET_UPDATE_INVOICE_FAILURE',
RESET_UPDATE_INVOICE_STATE: 'dashboard/@HOSPICE/RESET_UPDATE_INVOICE_STATE',

ATTEMPT_TO_DELETE_INVOICE: 'dashboard/@HOSPICE/ATTEMPT_TO_DELETE_INVOICE',
SET_DELETE_INVOICE_SUCCEED: 'dashboard/@HOSPICE/SET_DELETE_INVOICE_SUCCEED',
SET_DELETE_INVOICE_FAILURE: 'dashboard/@HOSPICE/SET_DELETE_INVOICE_FAILURE',
RESET_DELETE_INVOICE_STATE: 'dashboard/@HOSPICE/RESET_DELETE_INVOICE_STATE'

}
//FETCH INVOICE
export const attemptToFetchInvoice =  (data: Object): BaseAction  => ({
    type: INVOICE_ACTIONS.ATTEMPT_TO_FETCH_INVOICE,
    payload: data
  });
  export const setFetchInvoiceSucceed = (payload: Object): BaseAction => ({
    type: INVOICE_ACTIONS.SET_FETCH_INVOICE_SUCCEED,
    payload
  });
  
  export const setFetchInvoiceFailure = (payload: Object): BaseAction => ({
    type: INVOICE_ACTIONS.SET_FETCH_INVOICE_FAILURE,
    payload
  });
  export const resetFetchInvoiceState = (): BaseAction => ({
    type: INVOICE_ACTIONS.RESET_FETCH_INVOICE_STATE
  });

//CREATE INVOICE
export const attemptToCreateInvoice =  (data: Object): BaseAction  => ({
  type: INVOICE_ACTIONS.ATTEMPT_TO_CREATE_INVOICE,
  payload: data
});
export const setCreateInvoiceSucceed = (payload: Object): BaseAction => ({
  type: INVOICE_ACTIONS.SET_CREATE_INVOICE_SUCCEED,
  payload
});

export const setCreateInvoiceFailure = (payload: Object): BaseAction => ({
  type: INVOICE_ACTIONS.SET_CREATE_INVOICE_FAILURE,
  payload
});
export const resetCreateInvoiceState = (): BaseAction => ({
  type: INVOICE_ACTIONS.RESET_CREATE_INVOICE_STATE
});

//UPDATE INVOICE
export const attemptToUpdateInvoice =  (data: Object): BaseAction  => ({
  type: INVOICE_ACTIONS.ATTEMPT_TO_UPDATE_INVOICE,
  payload: data
});
export const setUpdateInvoiceSucceed = (payload: Object): BaseAction => ({
  type: INVOICE_ACTIONS.SET_UPDATE_INVOICE_SUCCEED,
  payload
});

export const setUpdateInvoiceFailure = (payload: Object): BaseAction => ({
  type: INVOICE_ACTIONS.SET_UPDATE_INVOICE_FAILURE,
  payload
});
export const resetUpdateInvoiceState = (): BaseAction => ({
  type: INVOICE_ACTIONS.RESET_UPDATE_INVOICE_STATE
});

//DELETE INVOICE
export const attemptToDeleteInvoice =  (data: Object): BaseAction  => ({
  type: INVOICE_ACTIONS.ATTEMPT_TO_DELETE_INVOICE,
  payload: data
});
export const setDeleteInvoiceSucceed = (payload: Object): BaseAction => ({
  type: INVOICE_ACTIONS.SET_DELETE_INVOICE_SUCCEED,
  payload
});

export const setDeleteInvoiceFailure = (payload: Object): BaseAction => ({
  type: INVOICE_ACTIONS.SET_DELETE_INVOICE_FAILURE,
  payload
});
export const resetDeleteInvoiceState = (): BaseAction => ({
  type: INVOICE_ACTIONS.RESET_DELETE_INVOICE_STATE
});
