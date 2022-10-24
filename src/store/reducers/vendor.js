import type { BaseAction } from '../types/Action';
import type { VendorState } from '../types';
import { VENDOR_ACTIONS } from '../actions/vendorAction';
import { ACTION_STATUSES } from '../../utils/constants';

const initialState = (): VendorState => ({

  vendorList: {
    data: {},
    status: null,
    error: null
  },
  vendorUpdate : {
    data: {},
    status: null,
    error: null

  },
  vendorCreate : {
    data: {},
    status: null,
    error: null

  },
  vendorDelete : {
    data: {},
    status: null, 
    error: null

  }
});


/*

 */
const ATTEMPT_TO_FETCH_VENDOR = (state: VendorState) => ({
  ...state,
  vendorList: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_FETCH_VENDOR_SUCCEED = (state: VendorState, action: BaseAction) => ({
  ...state,
  vendorList: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_FETCH_VENDOR_FAILURE = (state: VendorState) => ({
  ...state,
 vendorList: {
    ...state.medicaid,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_FETCH_VENDOR_STATE = (state: VendorState) => ({
  ...state,
  vendorList: initialState().vendorList
});


/*
Create
 */
const ATTEMPT_TO_CREATE_VENDOR = (state: VendorState) => ({
  ...state,
  vendorCreate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_CREATE_VENDOR_SUCCEED = (state: VendorState, action: BaseAction) => ({
  ...state,
  vendorCreate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_CREATE_VENDOR_FAILURE = (state: VendorState) => ({
  ...state,
 vendorCreate: {
    ...state.vendorCreate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_CREATE_VENDOR_STATE = (state: VendorState) => ({
  ...state,
  vendorCreate: initialState().vendorCreate
});


/*
Update
 */
const ATTEMPT_TO_UPDATE_VENDOR = (state: VendorState) => ({
  ...state,
  vendorUpdate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_UPDATE_VENDOR_SUCCEED = (state: VendorState, action: BaseAction) => ({
  ...state,
  vendorUpdate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_UPDATE_VENDOR_FAILURE = (state: VendorState) => ({
  ...state,
 vendorUpdate: {
    ...state.vendorUpdate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_UPDATE_VENDOR_STATE = (state: VendorState) => ({
  ...state,
  vendorUpdate: initialState().vendorUpdate
});

/*
Update
 */
const ATTEMPT_TO_DELETE_VENDOR = (state: VendorState) => ({
  ...state,
  vendorDelete: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_DELETE_VENDOR_SUCCEED = (state: VendorState, action: BaseAction) => ({
  ...state,
  vendorDelete: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_DELETE_VENDOR_FAILURE = (state: VendorState) => ({
  ...state,
 vendorDelete: {
    ...state.vendorDelete,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_DELETE_VENDOR_STATE = (state: VendorState) => ({
  ...state,
  vendorDelete: initialState().vendorDelete
});


const reducer = (state: VendorState = initialState(), action: BaseAction) => {
  switch (action.type) {
    case VENDOR_ACTIONS.ATTEMPT_TO_FETCH_VENDOR:
      return ATTEMPT_TO_FETCH_VENDOR(state);
    case VENDOR_ACTIONS.SET_FETCH_VENDOR_SUCCEED:
      return SET_FETCH_VENDOR_SUCCEED(state, action);
    case VENDOR_ACTIONS.SET_FETCH_VENDOR_FAILURE:
      return SET_FETCH_VENDOR_FAILURE(state);
    case VENDOR_ACTIONS.RESET_FETCH_VENDOR_STATE:
      return RESET_FETCH_VENDOR_STATE(state);

      case VENDOR_ACTIONS.ATTEMPT_TO_CREATE_VENDOR:
        return ATTEMPT_TO_CREATE_VENDOR(state);
      case VENDOR_ACTIONS.SET_CREATE_VENDOR_SUCCEED:
        return SET_CREATE_VENDOR_SUCCEED(state, action);
      case VENDOR_ACTIONS.SET_CREATE_VENDOR_FAILURE:
        return SET_CREATE_VENDOR_FAILURE(state);
      case VENDOR_ACTIONS.RESET_CREATE_VENDOR_STATE:
        return RESET_CREATE_VENDOR_STATE(state);

        case VENDOR_ACTIONS.ATTEMPT_TO_UPDATE_VENDOR:
        return ATTEMPT_TO_UPDATE_VENDOR(state);
      case VENDOR_ACTIONS.SET_UPDATE_VENDOR_SUCCEED:
        return SET_UPDATE_VENDOR_SUCCEED(state, action);
      case VENDOR_ACTIONS.SET_UPDATE_VENDOR_FAILURE:
        return SET_UPDATE_VENDOR_FAILURE(state);
      case VENDOR_ACTIONS.RESET_UPDATE_VENDOR_STATE:
        return RESET_UPDATE_VENDOR_STATE(state);

        case VENDOR_ACTIONS.ATTEMPT_TO_DELETE_VENDOR:
          return ATTEMPT_TO_DELETE_VENDOR(state);
        case VENDOR_ACTIONS.SET_DELETE_VENDOR_SUCCEED:
          return SET_DELETE_VENDOR_SUCCEED(state, action);
        case VENDOR_ACTIONS.SET_DELETE_VENDOR_FAILURE:
          return SET_DELETE_VENDOR_FAILURE(state);
        case VENDOR_ACTIONS.RESET_DELETE_VENDOR_STATE:
          return RESET_DELETE_VENDOR_STATE(state);
    default:
      return state;
  }
};

export default reducer;
