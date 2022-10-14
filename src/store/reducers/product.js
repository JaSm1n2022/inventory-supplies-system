import type { BaseAction } from '../types/Action';
import type { ProductState } from '../types';
import { PRODUCT_ACTIONS } from '../actions/productAction';
import { ACTION_STATUSES } from '../../utils/constants';

const initialState = (): ProductState => ({

  productList: {
    data: {},
    status: null,
    error: null
  },
  productUpdate : {
    data: {},
    status: null,
    error: null

  },
  productCreate : {
    data: {},
    status: null,
    error: null

  },
  productDelete : {
    data: {},
    status: null, 
    error: null

  }
});


/*
Medicaid
 */
const ATTEMPT_TO_FETCH_PRODUCT = (state: ProductState) => ({
  ...state,
  productList: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_FETCH_PRODUCT_SUCCEED = (state: ProductState, action: BaseAction) => ({
  ...state,
  productList: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_FETCH_PRODUCT_FAILURE = (state: ProductState) => ({
  ...state,
 productList: {
    ...state.medicaid,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_FETCH_PRODUCT_STATE = (state: ProductState) => ({
  ...state,
  productList: initialState().productList
});


/*
Create
 */
const ATTEMPT_TO_CREATE_PRODUCT = (state: ProductState) => ({
  ...state,
  productCreate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_CREATE_PRODUCT_SUCCEED = (state: ProductState, action: BaseAction) => ({
  ...state,
  productCreate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_CREATE_PRODUCT_FAILURE = (state: ProductState) => ({
  ...state,
 productCreate: {
    ...state.productCreate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_CREATE_PRODUCT_STATE = (state: ProductState) => ({
  ...state,
  productCreate: initialState().productCreate
});


/*
Update
 */
const ATTEMPT_TO_UPDATE_PRODUCT = (state: ProductState) => ({
  ...state,
  productUpdate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_UPDATE_PRODUCT_SUCCEED = (state: ProductState, action: BaseAction) => ({
  ...state,
  productUpdate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_UPDATE_PRODUCT_FAILURE = (state: ProductState) => ({
  ...state,
 productUpdate: {
    ...state.productUpdate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_UPDATE_PRODUCT_STATE = (state: ProductState) => ({
  ...state,
  productUpdate: initialState().productUpdate
});

/*
Update
 */
const ATTEMPT_TO_DELETE_PRODUCT = (state: ProductState) => ({
  ...state,
  productDelete: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_DELETE_PRODUCT_SUCCEED = (state: ProductState, action: BaseAction) => ({
  ...state,
  productDelete: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_DELETE_PRODUCT_FAILURE = (state: ProductState) => ({
  ...state,
 productDelete: {
    ...state.productDelete,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_DELETE_PRODUCT_STATE = (state: ProductState) => ({
  ...state,
  productDelete: initialState().productDelete
});


const reducer = (state: ProductState = initialState(), action: BaseAction) => {
  switch (action.type) {
    case PRODUCT_ACTIONS.ATTEMPT_TO_FETCH_PRODUCT:
      return ATTEMPT_TO_FETCH_PRODUCT(state);
    case PRODUCT_ACTIONS.SET_FETCH_PRODUCT_SUCCEED:
      return SET_FETCH_PRODUCT_SUCCEED(state, action);
    case PRODUCT_ACTIONS.SET_FETCH_PRODUCT_FAILURE:
      return SET_FETCH_PRODUCT_FAILURE(state);
    case PRODUCT_ACTIONS.RESET_FETCH_PRODUCT_STATE:
      return RESET_FETCH_PRODUCT_STATE(state);

      case PRODUCT_ACTIONS.ATTEMPT_TO_CREATE_PRODUCT:
        return ATTEMPT_TO_CREATE_PRODUCT(state);
      case PRODUCT_ACTIONS.SET_CREATE_PRODUCT_SUCCEED:
        return SET_CREATE_PRODUCT_SUCCEED(state, action);
      case PRODUCT_ACTIONS.SET_CREATE_PRODUCT_FAILURE:
        return SET_CREATE_PRODUCT_FAILURE(state);
      case PRODUCT_ACTIONS.RESET_CREATE_PRODUCT_STATE:
        return RESET_CREATE_PRODUCT_STATE(state);

        case PRODUCT_ACTIONS.ATTEMPT_TO_UPDATE_PRODUCT:
        return ATTEMPT_TO_UPDATE_PRODUCT(state);
      case PRODUCT_ACTIONS.SET_UPDATE_PRODUCT_SUCCEED:
        return SET_UPDATE_PRODUCT_SUCCEED(state, action);
      case PRODUCT_ACTIONS.SET_UPDATE_PRODUCT_FAILURE:
        return SET_UPDATE_PRODUCT_FAILURE(state);
      case PRODUCT_ACTIONS.RESET_UPDATE_PRODUCT_STATE:
        return RESET_UPDATE_PRODUCT_STATE(state);

        case PRODUCT_ACTIONS.ATTEMPT_TO_DELETE_PRODUCT:
          return ATTEMPT_TO_DELETE_PRODUCT(state);
        case PRODUCT_ACTIONS.SET_DELETE_PRODUCT_SUCCEED:
          return SET_DELETE_PRODUCT_SUCCEED(state, action);
        case PRODUCT_ACTIONS.SET_DELETE_PRODUCT_FAILURE:
          return SET_DELETE_PRODUCT_FAILURE(state);
        case PRODUCT_ACTIONS.RESET_DELETE_PRODUCT_STATE:
          return RESET_DELETE_PRODUCT_STATE(state);
    default:
      return state;
  }
};

export default reducer;
