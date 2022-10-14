import type { BaseAction } from '../types/Action';
import type { StockState } from '../types';
import { STOCK_ACTIONS } from '../actions/stockAction';
import { ACTION_STATUSES } from '../../utils/constants';

const initialState = (): StockState => ({

  stockList: {
    data: {},
    status: null,
    error: null
  },
  stockUpdate : {
    data: {},
    status: null,
    error: null

  },
  stockCreate : {
    data: {},
    status: null,
    error: null

  },
  stockDelete : {
    data: {},
    status: null, 
    error: null

  }
});


/*
Medicaid
 */
const ATTEMPT_TO_FETCH_STOCK = (state: StockState) => ({
  ...state,
  stockList: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_FETCH_STOCK_SUCCEED = (state: StockState, action: BaseAction) => ({
  ...state,
  stockList: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_FETCH_STOCK_FAILURE = (state: StockState) => ({
  ...state,
 stockList: {
    ...state.medicaid,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_FETCH_STOCK_STATE = (state: StockState) => ({
  ...state,
  stockList: initialState().stockList
});


/*
Create
 */
const ATTEMPT_TO_CREATE_STOCK = (state: StockState) => ({
  ...state,
  stockCreate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_CREATE_STOCK_SUCCEED = (state: StockState, action: BaseAction) => ({
  ...state,
  stockCreate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_CREATE_STOCK_FAILURE = (state: StockState) => ({
  ...state,
 stockCreate: {
    ...state.stockCreate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_CREATE_STOCK_STATE = (state: StockState) => ({
  ...state,
  stockCreate: initialState().stockCreate
});


/*
Update
 */
const ATTEMPT_TO_UPDATE_STOCK = (state: StockState) => ({
  ...state,
  stockUpdate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_UPDATE_STOCK_SUCCEED = (state: StockState, action: BaseAction) => ({
  ...state,
  stockUpdate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_UPDATE_STOCK_FAILURE = (state: StockState) => ({
  ...state,
 stockUpdate: {
    ...state.stockUpdate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_UPDATE_STOCK_STATE = (state: StockState) => ({
  ...state,
  stockUpdate: initialState().stockUpdate
});

/*
Update
 */
const ATTEMPT_TO_DELETE_STOCK = (state: StockState) => ({
  ...state,
  stockDelete: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_DELETE_STOCK_SUCCEED = (state: StockState, action: BaseAction) => ({
  ...state,
  stockDelete: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_DELETE_STOCK_FAILURE = (state: StockState) => ({
  ...state,
 stockDelete: {
    ...state.stockDelete,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_DELETE_STOCK_STATE = (state: StockState) => ({
  ...state,
  stockDelete: initialState().stockDelete
});


const reducer = (state: StockState = initialState(), action: BaseAction) => {
  switch (action.type) {
    case STOCK_ACTIONS.ATTEMPT_TO_FETCH_STOCK:
      return ATTEMPT_TO_FETCH_STOCK(state);
    case STOCK_ACTIONS.SET_FETCH_STOCK_SUCCEED:
      return SET_FETCH_STOCK_SUCCEED(state, action);
    case STOCK_ACTIONS.SET_FETCH_STOCK_FAILURE:
      return SET_FETCH_STOCK_FAILURE(state);
    case STOCK_ACTIONS.RESET_FETCH_STOCK_STATE:
      return RESET_FETCH_STOCK_STATE(state);

      case STOCK_ACTIONS.ATTEMPT_TO_CREATE_STOCK:
        return ATTEMPT_TO_CREATE_STOCK(state);
      case STOCK_ACTIONS.SET_CREATE_STOCK_SUCCEED:
        return SET_CREATE_STOCK_SUCCEED(state, action);
      case STOCK_ACTIONS.SET_CREATE_STOCK_FAILURE:
        return SET_CREATE_STOCK_FAILURE(state);
      case STOCK_ACTIONS.RESET_CREATE_STOCK_STATE:
        return RESET_CREATE_STOCK_STATE(state);

        case STOCK_ACTIONS.ATTEMPT_TO_UPDATE_STOCK:
        return ATTEMPT_TO_UPDATE_STOCK(state);
      case STOCK_ACTIONS.SET_UPDATE_STOCK_SUCCEED:
        return SET_UPDATE_STOCK_SUCCEED(state, action);
      case STOCK_ACTIONS.SET_UPDATE_STOCK_FAILURE:
        return SET_UPDATE_STOCK_FAILURE(state);
      case STOCK_ACTIONS.RESET_UPDATE_STOCK_STATE:
        return RESET_UPDATE_STOCK_STATE(state);

        case STOCK_ACTIONS.ATTEMPT_TO_DELETE_STOCK:
          return ATTEMPT_TO_DELETE_STOCK(state);
        case STOCK_ACTIONS.SET_DELETE_STOCK_SUCCEED:
          return SET_DELETE_STOCK_SUCCEED(state, action);
        case STOCK_ACTIONS.SET_DELETE_STOCK_FAILURE:
          return SET_DELETE_STOCK_FAILURE(state);
        case STOCK_ACTIONS.RESET_DELETE_STOCK_STATE:
          return RESET_DELETE_STOCK_STATE(state);
    default:
      return state;
  }
};

export default reducer;
