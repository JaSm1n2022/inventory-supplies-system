import type { BaseAction } from "../types/Action";
import type { LocationState } from "../types";
import { LOCATION_ACTIONS } from "../actions/locationAction";
import { ACTION_STATUSES } from "../../utils/constants";

const initialState = (): LocationState => ({
  locationList: {
    data: {},
    status: null,
    error: null,
  },
  locationUpdate: {
    data: {},
    status: null,
    error: null,
  },
  locationCreate: {
    data: {},
    status: null,
    error: null,
  },
  locationDelete: {
    data: {},
    status: null,
    error: null,
  },
});

/*

 */
const ATTEMPT_TO_FETCH_LOCATION = (state: LocationState) => ({
  ...state,
  locationList: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null,
  },
});

const SET_FETCH_LOCATION_SUCCEED = (
  state: LocationState,
  action: BaseAction
) => ({
  ...state,
  locationList: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null,
  },
});

const SET_FETCH_LOCATION_FAILURE = (state: LocationState) => ({
  ...state,
  locationList: {
    ...state.locationList,
    status: ACTION_STATUSES.FAILED,
  },
});
const RESET_FETCH_LOCATION_STATE = (state: LocationState) => ({
  ...state,
  locationList: initialState().locationList,
});

/*
Create
 */
const ATTEMPT_TO_CREATE_LOCATION = (state: LocationState) => ({
  ...state,
  locationCreate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null,
  },
});

const SET_CREATE_LOCATION_SUCCEED = (
  state: LocationState,
  action: BaseAction
) => ({
  ...state,
  locationCreate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null,
  },
});

const SET_CREATE_LOCATION_FAILURE = (state: LocationState) => ({
  ...state,
  locationCreate: {
    ...state.locationCreate,
    status: ACTION_STATUSES.FAILED,
  },
});
const RESET_CREATE_LOCATION_STATE = (state: LocationState) => ({
  ...state,
  locationCreate: initialState().locationCreate,
});

/*
Update
 */
const ATTEMPT_TO_UPDATE_LOCATION = (state: LocationState) => ({
  ...state,
  locationUpdate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null,
  },
});

const SET_UPDATE_LOCATION_SUCCEED = (
  state: LocationState,
  action: BaseAction
) => ({
  ...state,
  locationUpdate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null,
  },
});

const SET_UPDATE_LOCATION_FAILURE = (state: LocationState) => ({
  ...state,
  locationUpdate: {
    ...state.locationUpdate,
    status: ACTION_STATUSES.FAILED,
  },
});
const RESET_UPDATE_LOCATION_STATE = (state: LocationState) => ({
  ...state,
  locationUpdate: initialState().locationUpdate,
});

/*
Update
 */
const ATTEMPT_TO_DELETE_LOCATION = (state: LocationState) => ({
  ...state,
  locationDelete: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null,
  },
});

const SET_DELETE_LOCATION_SUCCEED = (
  state: LocationState,
  action: BaseAction
) => ({
  ...state,
  locationDelete: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null,
  },
});

const SET_DELETE_LOCATION_FAILURE = (state: LocationState) => ({
  ...state,
  locationDelete: {
    ...state.locationDelete,
    status: ACTION_STATUSES.FAILED,
  },
});
const RESET_DELETE_LOCATION_STATE = (state: LocationState) => ({
  ...state,
  locationDelete: initialState().locationDelete,
});

const reducer = (state: LocationState = initialState(), action: BaseAction) => {
  switch (action.type) {
    case LOCATION_ACTIONS.ATTEMPT_TO_FETCH_LOCATION:
      return ATTEMPT_TO_FETCH_LOCATION(state);
    case LOCATION_ACTIONS.SET_FETCH_LOCATION_SUCCEED:
      return SET_FETCH_LOCATION_SUCCEED(state, action);
    case LOCATION_ACTIONS.SET_FETCH_LOCATION_FAILURE:
      return SET_FETCH_LOCATION_FAILURE(state);
    case LOCATION_ACTIONS.RESET_FETCH_LOCATION_STATE:
      return RESET_FETCH_LOCATION_STATE(state);

    case LOCATION_ACTIONS.ATTEMPT_TO_CREATE_LOCATION:
      return ATTEMPT_TO_CREATE_LOCATION(state);
    case LOCATION_ACTIONS.SET_CREATE_LOCATION_SUCCEED:
      return SET_CREATE_LOCATION_SUCCEED(state, action);
    case LOCATION_ACTIONS.SET_CREATE_LOCATION_FAILURE:
      return SET_CREATE_LOCATION_FAILURE(state);
    case LOCATION_ACTIONS.RESET_CREATE_LOCATION_STATE:
      return RESET_CREATE_LOCATION_STATE(state);

    case LOCATION_ACTIONS.ATTEMPT_TO_UPDATE_LOCATION:
      return ATTEMPT_TO_UPDATE_LOCATION(state);
    case LOCATION_ACTIONS.SET_UPDATE_LOCATION_SUCCEED:
      return SET_UPDATE_LOCATION_SUCCEED(state, action);
    case LOCATION_ACTIONS.SET_UPDATE_LOCATION_FAILURE:
      return SET_UPDATE_LOCATION_FAILURE(state);
    case LOCATION_ACTIONS.RESET_UPDATE_LOCATION_STATE:
      return RESET_UPDATE_LOCATION_STATE(state);

    case LOCATION_ACTIONS.ATTEMPT_TO_DELETE_LOCATION:
      return ATTEMPT_TO_DELETE_LOCATION(state);
    case LOCATION_ACTIONS.SET_DELETE_LOCATION_SUCCEED:
      return SET_DELETE_LOCATION_SUCCEED(state, action);
    case LOCATION_ACTIONS.SET_DELETE_LOCATION_FAILURE:
      return SET_DELETE_LOCATION_FAILURE(state);
    case LOCATION_ACTIONS.RESET_DELETE_LOCATION_STATE:
      return RESET_DELETE_LOCATION_STATE(state);
    default:
      return state;
  }
};

export default reducer;
