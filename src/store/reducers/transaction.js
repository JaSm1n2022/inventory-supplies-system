import type { BaseAction } from '../types/Action';
import type { TransactionState } from '../types';
import { TRANSACTION_ACTIONS } from '../actions/transactionAction';
import { ACTION_STATUSES } from '../../utils/constants';

const initialState = (): TransactionState => ({

  transactionList: {
    data: {},
    status: null,
    error: null
  },
  transactionUpdate: {
    data: {},
    status: null,
    error: null

  },
  transactionCreate: {
    data: {},
    status: null,
    error: null

  },
  transactionDelete: {
    data: {},
    status: null,
    error: null

  }
});



const ATTEMPT_TO_FETCH_TRANSACTION = (state: TransactionState) => ({
  ...state,
  transactionList: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_FETCH_TRANSACTION_SUCCEED = (state: TransactionState, action: BaseAction) => ({
  ...state,
  transactionList: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_FETCH_TRANSACTION_FAILURE = (state: TransactionState) => ({
  ...state,
  transactionList: {
    ...state.transactionList,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_FETCH_TRANSACTION_STATE = (state: TransactionState) => ({
  ...state,
  transactionList: initialState().transactionList
});


/*
Create
 */
const ATTEMPT_TO_CREATE_TRANSACTION = (state: TransactionState) => ({
  ...state,
  transactionCreate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_CREATE_TRANSACTION_SUCCEED = (state: TransactionState, action: BaseAction) => ({
  ...state,
  transactionCreate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_CREATE_TRANSACTION_FAILURE = (state: TransactionState) => ({
  ...state,
  transactionCreate: {
    ...state.transactionCreate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_CREATE_TRANSACTION_STATE = (state: TransactionState) => ({
  ...state,
  transactionCreate: initialState().transactionCreate
});


/*
Update
 */
const ATTEMPT_TO_UPDATE_TRANSACTION = (state: TransactionState) => ({
  ...state,
  transactionUpdate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_UPDATE_TRANSACTION_SUCCEED = (state: TransactionState, action: BaseAction) => ({
  ...state,
  transactionUpdate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_UPDATE_TRANSACTION_FAILURE = (state: TransactionState) => ({
  ...state,
  transactionUpdate: {
    ...state.transactionUpdate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_UPDATE_TRANSACTION_STATE = (state: TransactionState) => ({
  ...state,
  transactionUpdate: initialState().transactionUpdate
});

/*
Update
 */
const ATTEMPT_TO_DELETE_TRANSACTION = (state: TransactionState) => ({
  ...state,
  transactionDelete: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_DELETE_TRANSACTION_SUCCEED = (state: TransactionState, action: BaseAction) => ({
  ...state,
  transactionDelete: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_DELETE_TRANSACTION_FAILURE = (state: TransactionState) => ({
  ...state,
  transactionDelete: {
    ...state.transactionDelete,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_DELETE_TRANSACTION_STATE = (state: TransactionState) => ({
  ...state,
  transactionDelete: initialState().transactionDelete
});


const reducer = (state: TransactionState = initialState(), action: BaseAction) => {
  switch (action.type) {
    case TRANSACTION_ACTIONS.ATTEMPT_TO_FETCH_TRANSACTION:
      return ATTEMPT_TO_FETCH_TRANSACTION(state);
    case TRANSACTION_ACTIONS.SET_FETCH_TRANSACTION_SUCCEED:
      return SET_FETCH_TRANSACTION_SUCCEED(state, action);
    case TRANSACTION_ACTIONS.SET_FETCH_TRANSACTION_FAILURE:
      return SET_FETCH_TRANSACTION_FAILURE(state);
    case TRANSACTION_ACTIONS.RESET_FETCH_TRANSACTION_STATE:
      return RESET_FETCH_TRANSACTION_STATE(state);

    case TRANSACTION_ACTIONS.ATTEMPT_TO_CREATE_TRANSACTION:
      return ATTEMPT_TO_CREATE_TRANSACTION(state);
    case TRANSACTION_ACTIONS.SET_CREATE_TRANSACTION_SUCCEED:
      return SET_CREATE_TRANSACTION_SUCCEED(state, action);
    case TRANSACTION_ACTIONS.SET_CREATE_TRANSACTION_FAILURE:
      return SET_CREATE_TRANSACTION_FAILURE(state);
    case TRANSACTION_ACTIONS.RESET_CREATE_TRANSACTION_STATE:
      return RESET_CREATE_TRANSACTION_STATE(state);

    case TRANSACTION_ACTIONS.ATTEMPT_TO_UPDATE_TRANSACTION:
      return ATTEMPT_TO_UPDATE_TRANSACTION(state);
    case TRANSACTION_ACTIONS.SET_UPDATE_TRANSACTION_SUCCEED:
      return SET_UPDATE_TRANSACTION_SUCCEED(state, action);
    case TRANSACTION_ACTIONS.SET_UPDATE_TRANSACTION_FAILURE:
      return SET_UPDATE_TRANSACTION_FAILURE(state);
    case TRANSACTION_ACTIONS.RESET_UPDATE_TRANSACTION_STATE:
      return RESET_UPDATE_TRANSACTION_STATE(state);

    case TRANSACTION_ACTIONS.ATTEMPT_TO_DELETE_TRANSACTION:
      return ATTEMPT_TO_DELETE_TRANSACTION(state);
    case TRANSACTION_ACTIONS.SET_DELETE_TRANSACTION_SUCCEED:
      return SET_DELETE_TRANSACTION_SUCCEED(state, action);
    case TRANSACTION_ACTIONS.SET_DELETE_TRANSACTION_FAILURE:
      return SET_DELETE_TRANSACTION_FAILURE(state);
    case TRANSACTION_ACTIONS.RESET_DELETE_TRANSACTION_STATE:
      return RESET_DELETE_TRANSACTION_STATE(state);
    default:
      return state;
  }
};

export default reducer;
