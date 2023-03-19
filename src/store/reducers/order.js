import type { BaseAction } from '../types/Action';
import type { OrderState } from '../types';
import { ORDER_ACTIONS } from '../actions/orderAction';
import { ACTION_STATUSES } from '../../utils/constants';

const initialState = (): OrderState => ({

  orderList: {
    data: {},
    status: null,
    error: null
  },
  orderUpdate: {
    data: {},
    status: null,
    error: null

  },
  orderCreate: {
    data: {},
    status: null,
    error: null

  },
  orderDelete: {
    data: {},
    status: null,
    error: null

  }
});



const ATTEMPT_TO_FETCH_ORDER = (state: OrderState) => ({
  ...state,
  orderList: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_FETCH_ORDER_SUCCEED = (state: OrderState, action: BaseAction) => ({
  ...state,
  orderList: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_FETCH_ORDER_FAILURE = (state: OrderState) => ({
  ...state,
  orderList: {
    ...state.orderList,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_FETCH_ORDER_STATE = (state: OrderState) => ({
  ...state,
  orderList: initialState().orderList
});


/*
Create
 */
const ATTEMPT_TO_CREATE_ORDER = (state: OrderState) => ({
  ...state,
  orderCreate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_CREATE_ORDER_SUCCEED = (state: OrderState, action: BaseAction) => ({
  ...state,
  orderCreate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_CREATE_ORDER_FAILURE = (state: OrderState) => ({
  ...state,
  orderCreate: {
    ...state.orderCreate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_CREATE_ORDER_STATE = (state: OrderState) => ({
  ...state,
  orderCreate: initialState().orderCreate
});


/*
Update
 */
const ATTEMPT_TO_UPDATE_ORDER = (state: OrderState) => ({
  ...state,
  orderUpdate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_UPDATE_ORDER_SUCCEED = (state: OrderState, action: BaseAction) => ({
  ...state,
  orderUpdate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_UPDATE_ORDER_FAILURE = (state: OrderState) => ({
  ...state,
  orderUpdate: {
    ...state.orderUpdate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_UPDATE_ORDER_STATE = (state: OrderState) => ({
  ...state,
  orderUpdate: initialState().orderUpdate
});

/*
Update
 */
const ATTEMPT_TO_DELETE_ORDER = (state: OrderState) => ({
  ...state,
  orderDelete: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_DELETE_ORDER_SUCCEED = (state: OrderState, action: BaseAction) => ({
  ...state,
  orderDelete: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_DELETE_ORDER_FAILURE = (state: OrderState) => ({
  ...state,
  orderDelete: {
    ...state.orderDelete,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_DELETE_ORDER_STATE = (state: OrderState) => ({
  ...state,
  orderDelete: initialState().orderDelete
});


const reducer = (state: OrderState = initialState(), action: BaseAction) => {
  switch (action.type) {
    case ORDER_ACTIONS.ATTEMPT_TO_FETCH_ORDER:
      return ATTEMPT_TO_FETCH_ORDER(state);
    case ORDER_ACTIONS.SET_FETCH_ORDER_SUCCEED:
      return SET_FETCH_ORDER_SUCCEED(state, action);
    case ORDER_ACTIONS.SET_FETCH_ORDER_FAILURE:
      return SET_FETCH_ORDER_FAILURE(state);
    case ORDER_ACTIONS.RESET_FETCH_ORDER_STATE:
      return RESET_FETCH_ORDER_STATE(state);

    case ORDER_ACTIONS.ATTEMPT_TO_CREATE_ORDER:
      return ATTEMPT_TO_CREATE_ORDER(state);
    case ORDER_ACTIONS.SET_CREATE_ORDER_SUCCEED:
      return SET_CREATE_ORDER_SUCCEED(state, action);
    case ORDER_ACTIONS.SET_CREATE_ORDER_FAILURE:
      return SET_CREATE_ORDER_FAILURE(state);
    case ORDER_ACTIONS.RESET_CREATE_ORDER_STATE:
      return RESET_CREATE_ORDER_STATE(state);

    case ORDER_ACTIONS.ATTEMPT_TO_UPDATE_ORDER:
      return ATTEMPT_TO_UPDATE_ORDER(state);
    case ORDER_ACTIONS.SET_UPDATE_ORDER_SUCCEED:
      return SET_UPDATE_ORDER_SUCCEED(state, action);
    case ORDER_ACTIONS.SET_UPDATE_ORDER_FAILURE:
      return SET_UPDATE_ORDER_FAILURE(state);
    case ORDER_ACTIONS.RESET_UPDATE_ORDER_STATE:
      return RESET_UPDATE_ORDER_STATE(state);

    case ORDER_ACTIONS.ATTEMPT_TO_DELETE_ORDER:
      return ATTEMPT_TO_DELETE_ORDER(state);
    case ORDER_ACTIONS.SET_DELETE_ORDER_SUCCEED:
      return SET_DELETE_ORDER_SUCCEED(state, action);
    case ORDER_ACTIONS.SET_DELETE_ORDER_FAILURE:
      return SET_DELETE_ORDER_FAILURE(state);
    case ORDER_ACTIONS.RESET_DELETE_ORDER_STATE:
      return RESET_DELETE_ORDER_STATE(state);
    default:
      return state;
  }
};

export default reducer;
