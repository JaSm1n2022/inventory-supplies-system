export const VENDOR_ACTIONS = {
ATTEMPT_TO_FETCH_VENDOR: 'dashboard/@HOSPICE/ATTEMPT_TO_FETCH_VENDOR',
SET_FETCH_VENDOR_SUCCEED: 'dashboard/@HOSPICE/SET_FETCH_VENDOR_SUCCEED',
SET_FETCH_VENDOR_FAILURE: 'dashboard/@HOSPICE/SET_FETCH_VENDOR_FAILURE',
RESET_FETCH_VENDOR_STATE: 'dashboard/@HOSPICE/RESET_FETCH_VENDOR_STATE',

ATTEMPT_TO_CREATE_VENDOR: 'dashboard/@HOSPICE/ATTEMPT_TO_CREATE_VENDOR',
SET_CREATE_VENDOR_SUCCEED: 'dashboard/@HOSPICE/SET_CREATE_VENDOR_SUCCEED',
SET_CREATE_VENDOR_FAILURE: 'dashboard/@HOSPICE/SET_CREATE_VENDOR_FAILURE',
RESET_CREATE_VENDOR_STATE: 'dashboard/@HOSPICE/RESET_CREATE_VENDOR_STATE',

ATTEMPT_TO_UPDATE_VENDOR: 'dashboard/@HOSPICE/ATTEMPT_TO_UPDATE_VENDOR',
SET_UPDATE_VENDOR_SUCCEED: 'dashboard/@HOSPICE/SET_UPDATE_VENDOR_SUCCEED',
SET_UPDATE_VENDOR_FAILURE: 'dashboard/@HOSPICE/SET_UPDATE_VENDOR_FAILURE',
RESET_UPDATE_VENDOR_STATE: 'dashboard/@HOSPICE/RESET_UPDATE_VENDOR_STATE',

ATTEMPT_TO_DELETE_VENDOR: 'dashboard/@HOSPICE/ATTEMPT_TO_DELETE_VENDOR',
SET_DELETE_VENDOR_SUCCEED: 'dashboard/@HOSPICE/SET_DELETE_VENDOR_SUCCEED',
SET_DELETE_VENDOR_FAILURE: 'dashboard/@HOSPICE/SET_DELETE_VENDOR_FAILURE',
RESET_DELETE_VENDOR_STATE: 'dashboard/@HOSPICE/RESET_DELETE_VENDOR_STATE'

}
//FETCH EMPLOYEE
export const attemptToFetchVendor =  (data: Object): BaseAction  => ({
    type: VENDOR_ACTIONS.ATTEMPT_TO_FETCH_VENDOR,
    payload: data
  });
  export const setFetchVendorSucceed = (payload: Object): BaseAction => ({
    type: VENDOR_ACTIONS.SET_FETCH_VENDOR_SUCCEED,
    payload
  });
  
  export const setFetchVendorFailure = (payload: Object): BaseAction => ({
    type: VENDOR_ACTIONS.SET_FETCH_VENDOR_FAILURE,
    payload
  });
  export const resetFetchVendorState = (): BaseAction => ({
    type: VENDOR_ACTIONS.RESET_FETCH_VENDOR_STATE
  });

//CREATE EMPLOYEE
export const attemptToCreateVendor =  (data: Object): BaseAction  => ({
  type: VENDOR_ACTIONS.ATTEMPT_TO_CREATE_VENDOR,
  payload: data
});
export const setCreateVendorSucceed = (payload: Object): BaseAction => ({
  type: VENDOR_ACTIONS.SET_CREATE_VENDOR_SUCCEED,
  payload
});

export const setCreateVendorFailure = (payload: Object): BaseAction => ({
  type: VENDOR_ACTIONS.SET_CREATE_VENDOR_FAILURE,
  payload
});
export const resetCreateVendorState = (): BaseAction => ({
  type: VENDOR_ACTIONS.RESET_CREATE_VENDOR_STATE
});

//UPDATE EMPLOYEE
export const attemptToUpdateVendor =  (data: Object): BaseAction  => ({
  type: VENDOR_ACTIONS.ATTEMPT_TO_UPDATE_VENDOR,
  payload: data
});
export const setUpdateVendorSucceed = (payload: Object): BaseAction => ({
  type: VENDOR_ACTIONS.SET_UPDATE_VENDOR_SUCCEED,
  payload
});

export const setUpdateVendorFailure = (payload: Object): BaseAction => ({
  type: VENDOR_ACTIONS.SET_UPDATE_VENDOR_FAILURE,
  payload
});
export const resetUpdateVendorState = (): BaseAction => ({
  type: VENDOR_ACTIONS.RESET_UPDATE_VENDOR_STATE
});

//DELETE EMPLOYEE
export const attemptToDeleteVendor =  (data: Object): BaseAction  => ({
  type: VENDOR_ACTIONS.ATTEMPT_TO_DELETE_VENDOR,
  payload: data
});
export const setDeleteVendorSucceed = (payload: Object): BaseAction => ({
  type: VENDOR_ACTIONS.SET_DELETE_VENDOR_SUCCEED,
  payload
});

export const setDeleteVendorFailure = (payload: Object): BaseAction => ({
  type: VENDOR_ACTIONS.SET_DELETE_VENDOR_FAILURE,
  payload
});
export const resetDeleteVendorState = (): BaseAction => ({
  type: VENDOR_ACTIONS.RESET_DELETE_VENDOR_STATE
});
