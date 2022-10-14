import type { BaseAction } from '../types/Action';
import type { InvoiceState } from '../types';
import { INVOICE_ACTIONS } from '../actions/invoiceAction';
import { ACTION_STATUSES } from '../../utils/constants';

const initialState = (): InvoiceState => ({

  invoiceList: {
    data: {},
    status: null,
    error: null
  },
  invoiceUpdate : {
    data: {},
    status: null,
    error: null

  },
  invoiceCreate : {
    data: {},
    status: null,
    error: null

  },
  invoiceDelete : {
    data: {},
    status: null, 
    error: null

  }
});


/*
Medicaid
 */
const ATTEMPT_TO_FETCH_INVOICE = (state: InvoiceState) => ({
  ...state,
  invoiceList: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_FETCH_INVOICE_SUCCEED = (state: InvoiceState, action: BaseAction) => ({
  ...state,
  invoiceList: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_FETCH_INVOICE_FAILURE = (state: InvoiceState) => ({
  ...state,
 invoiceList: {
    ...state.medicaid,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_FETCH_INVOICE_STATE = (state: InvoiceState) => ({
  ...state,
  invoiceList: initialState().invoiceList
});


/*
Create
 */
const ATTEMPT_TO_CREATE_INVOICE = (state: InvoiceState) => ({
  ...state,
  invoiceCreate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_CREATE_INVOICE_SUCCEED = (state: InvoiceState, action: BaseAction) => ({
  ...state,
  invoiceCreate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_CREATE_INVOICE_FAILURE = (state: InvoiceState) => ({
  ...state,
 invoiceCreate: {
    ...state.invoiceCreate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_CREATE_INVOICE_STATE = (state: InvoiceState) => ({
  ...state,
  invoiceCreate: initialState().invoiceCreate
});


/*
Update
 */
const ATTEMPT_TO_UPDATE_INVOICE = (state: InvoiceState) => ({
  ...state,
  invoiceUpdate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_UPDATE_INVOICE_SUCCEED = (state: InvoiceState, action: BaseAction) => ({
  ...state,
  invoiceUpdate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_UPDATE_INVOICE_FAILURE = (state: InvoiceState) => ({
  ...state,
 invoiceUpdate: {
    ...state.invoiceUpdate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_UPDATE_INVOICE_STATE = (state: InvoiceState) => ({
  ...state,
  invoiceUpdate: initialState().invoiceUpdate
});

/*
Update
 */
const ATTEMPT_TO_DELETE_INVOICE = (state: InvoiceState) => ({
  ...state,
  invoiceDelete: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_DELETE_INVOICE_SUCCEED = (state: InvoiceState, action: BaseAction) => ({
  ...state,
  invoiceDelete: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_DELETE_INVOICE_FAILURE = (state: InvoiceState) => ({
  ...state,
 invoiceDelete: {
    ...state.invoiceDelete,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_DELETE_INVOICE_STATE = (state: InvoiceState) => ({
  ...state,
  invoiceDelete: initialState().invoiceDelete
});


const reducer = (state: InvoiceState = initialState(), action: BaseAction) => {
  switch (action.type) {
    case INVOICE_ACTIONS.ATTEMPT_TO_FETCH_INVOICE:
      return ATTEMPT_TO_FETCH_INVOICE(state);
    case INVOICE_ACTIONS.SET_FETCH_INVOICE_SUCCEED:
      return SET_FETCH_INVOICE_SUCCEED(state, action);
    case INVOICE_ACTIONS.SET_FETCH_INVOICE_FAILURE:
      return SET_FETCH_INVOICE_FAILURE(state);
    case INVOICE_ACTIONS.RESET_FETCH_INVOICE_STATE:
      return RESET_FETCH_INVOICE_STATE(state);

      case INVOICE_ACTIONS.ATTEMPT_TO_CREATE_INVOICE:
        return ATTEMPT_TO_CREATE_INVOICE(state);
      case INVOICE_ACTIONS.SET_CREATE_INVOICE_SUCCEED:
        return SET_CREATE_INVOICE_SUCCEED(state, action);
      case INVOICE_ACTIONS.SET_CREATE_INVOICE_FAILURE:
        return SET_CREATE_INVOICE_FAILURE(state);
      case INVOICE_ACTIONS.RESET_CREATE_INVOICE_STATE:
        return RESET_CREATE_INVOICE_STATE(state);

        case INVOICE_ACTIONS.ATTEMPT_TO_UPDATE_INVOICE:
        return ATTEMPT_TO_UPDATE_INVOICE(state);
      case INVOICE_ACTIONS.SET_UPDATE_INVOICE_SUCCEED:
        return SET_UPDATE_INVOICE_SUCCEED(state, action);
      case INVOICE_ACTIONS.SET_UPDATE_INVOICE_FAILURE:
        return SET_UPDATE_INVOICE_FAILURE(state);
      case INVOICE_ACTIONS.RESET_UPDATE_INVOICE_STATE:
        return RESET_UPDATE_INVOICE_STATE(state);

        case INVOICE_ACTIONS.ATTEMPT_TO_DELETE_INVOICE:
          return ATTEMPT_TO_DELETE_INVOICE(state);
        case INVOICE_ACTIONS.SET_DELETE_INVOICE_SUCCEED:
          return SET_DELETE_INVOICE_SUCCEED(state, action);
        case INVOICE_ACTIONS.SET_DELETE_INVOICE_FAILURE:
          return SET_DELETE_INVOICE_FAILURE(state);
        case INVOICE_ACTIONS.RESET_DELETE_INVOICE_STATE:
          return RESET_DELETE_INVOICE_STATE(state);
    default:
      return state;
  }
};

export default reducer;
