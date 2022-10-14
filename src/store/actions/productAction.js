export const PRODUCT_ACTIONS = {
ATTEMPT_TO_FETCH_PRODUCT: 'dashboard/@HOSPICE/ATTEMPT_TO_FETCH_PRODUCT',
SET_FETCH_PRODUCT_SUCCEED: 'dashboard/@HOSPICE/SET_FETCH_PRODUCT_SUCCEED',
SET_FETCH_PRODUCT_FAILURE: 'dashboard/@HOSPICE/SET_FETCH_PRODUCT_FAILURE',
RESET_FETCH_PRODUCT_STATE: 'dashboard/@HOSPICE/RESET_FETCH_PRODUCT_STATE',

ATTEMPT_TO_CREATE_PRODUCT: 'dashboard/@HOSPICE/ATTEMPT_TO_CREATE_PRODUCT',
SET_CREATE_PRODUCT_SUCCEED: 'dashboard/@HOSPICE/SET_CREATE_PRODUCT_SUCCEED',
SET_CREATE_PRODUCT_FAILURE: 'dashboard/@HOSPICE/SET_CREATE_PRODUCT_FAILURE',
RESET_CREATE_PRODUCT_STATE: 'dashboard/@HOSPICE/RESET_CREATE_PRODUCT_STATE',

ATTEMPT_TO_UPDATE_PRODUCT: 'dashboard/@HOSPICE/ATTEMPT_TO_UPDATE_PRODUCT',
SET_UPDATE_PRODUCT_SUCCEED: 'dashboard/@HOSPICE/SET_UPDATE_PRODUCT_SUCCEED',
SET_UPDATE_PRODUCT_FAILURE: 'dashboard/@HOSPICE/SET_UPDATE_PRODUCT_FAILURE',
RESET_UPDATE_PRODUCT_STATE: 'dashboard/@HOSPICE/RESET_UPDATE_PRODUCT_STATE',

ATTEMPT_TO_DELETE_PRODUCT: 'dashboard/@HOSPICE/ATTEMPT_TO_DELETE_PRODUCT',
SET_DELETE_PRODUCT_SUCCEED: 'dashboard/@HOSPICE/SET_DELETE_PRODUCT_SUCCEED',
SET_DELETE_PRODUCT_FAILURE: 'dashboard/@HOSPICE/SET_DELETE_PRODUCT_FAILURE',
RESET_DELETE_PRODUCT_STATE: 'dashboard/@HOSPICE/RESET_DELETE_PRODUCT_STATE'

}
//FETCH PRODUCT
export const attemptToFetchProduct =  (data: Object): BaseAction  => ({
    type: PRODUCT_ACTIONS.ATTEMPT_TO_FETCH_PRODUCT,
    payload: data
  });
  export const setFetchProductSucceed = (payload: Object): BaseAction => ({
    type: PRODUCT_ACTIONS.SET_FETCH_PRODUCT_SUCCEED,
    payload
  });
  
  export const setFetchProductFailure = (payload: Object): BaseAction => ({
    type: PRODUCT_ACTIONS.SET_FETCH_PRODUCT_FAILURE,
    payload
  });
  export const resetFetchProductState = (): BaseAction => ({
    type: PRODUCT_ACTIONS.RESET_FETCH_PRODUCT_STATE
  });

//CREATE Product
export const attemptToCreateProduct =  (data: Object): BaseAction  => ({
  type: PRODUCT_ACTIONS.ATTEMPT_TO_CREATE_PRODUCT,
  payload: data
});
export const setCreateProductSucceed = (payload: Object): BaseAction => ({
  type: PRODUCT_ACTIONS.SET_CREATE_PRODUCT_SUCCEED,
  payload
});

export const setCreateProductFailure = (payload: Object): BaseAction => ({
  type: PRODUCT_ACTIONS.SET_CREATE_PRODUCT_FAILURE,
  payload
});
export const resetCreateProductState = (): BaseAction => ({
  type: PRODUCT_ACTIONS.RESET_CREATE_PRODUCT_STATE
});

//UPDATE Product
export const attemptToUpdateProduct =  (data: Object): BaseAction  => ({
  type: PRODUCT_ACTIONS.ATTEMPT_TO_UPDATE_PRODUCT,
  payload: data
});
export const setUpdateProductSucceed = (payload: Object): BaseAction => ({
  type: PRODUCT_ACTIONS.SET_UPDATE_PRODUCT_SUCCEED,
  payload
});

export const setUpdateProductFailure = (payload: Object): BaseAction => ({
  type: PRODUCT_ACTIONS.SET_UPDATE_PRODUCT_FAILURE,
  payload
});
export const resetUpdateProductState = (): BaseAction => ({
  type: PRODUCT_ACTIONS.RESET_UPDATE_PRODUCT_STATE
});

//DELETE Product
export const attemptToDeleteProduct =  (data: Object): BaseAction  => ({
  type: PRODUCT_ACTIONS.ATTEMPT_TO_DELETE_PRODUCT,
  payload: data
});
export const setDeleteProductSucceed = (payload: Object): BaseAction => ({
  type: PRODUCT_ACTIONS.SET_DELETE_PRODUCT_SUCCEED,
  payload
});

export const setDeleteProductFailure = (payload: Object): BaseAction => ({
  type: PRODUCT_ACTIONS.SET_DELETE_PRODUCT_FAILURE,
  payload
});
export const resetDeleteProductState = (): BaseAction => ({
  type: PRODUCT_ACTIONS.RESET_DELETE_PRODUCT_STATE
});
