import type { BaseAction } from '../types/Action';
import type { ThresholdState } from '../types';
import { THRESHOLD_ACTIONS } from '../actions/thresholdAction';
import { ACTION_STATUSES } from '../../utils/constants';

const initialState = (): ThresholdState => ({

  thresholdList: {
    data: {},
    status: null,
    error: null
  },
  thresholdUpdate: {
    data: {},
    status: null,
    error: null

  },
  thresholdCreate: {
    data: {},
    status: null,
    error: null

  },
  thresholdDelete: {
    data: {},
    status: null,
    error: null

  }
});



const ATTEMPT_TO_FETCH_THRESHOLD = (state: ThresholdState) => ({
  ...state,
  thresholdList: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_FETCH_THRESHOLD_SUCCEED = (state: ThresholdState, action: BaseAction) => ({
  ...state,
  thresholdList: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_FETCH_THRESHOLD_FAILURE = (state: ThresholdState) => ({
  ...state,
  thresholdList: {
    ...state.thresholdList,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_FETCH_THRESHOLD_STATE = (state: ThresholdState) => ({
  ...state,
  thresholdList: initialState().thresholdList
});


/*
Create
 */
const ATTEMPT_TO_CREATE_THRESHOLD = (state: ThresholdState) => ({
  ...state,
  thresholdCreate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_CREATE_THRESHOLD_SUCCEED = (state: ThresholdState, action: BaseAction) => ({
  ...state,
  thresholdCreate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_CREATE_THRESHOLD_FAILURE = (state: ThresholdState) => ({
  ...state,
  thresholdCreate: {
    ...state.thresholdCreate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_CREATE_THRESHOLD_STATE = (state: ThresholdState) => ({
  ...state,
  thresholdCreate: initialState().thresholdCreate
});


/*
Update
 */
const ATTEMPT_TO_UPDATE_THRESHOLD = (state: ThresholdState) => ({
  ...state,
  thresholdUpdate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_UPDATE_THRESHOLD_SUCCEED = (state: ThresholdState, action: BaseAction) => ({
  ...state,
  thresholdUpdate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_UPDATE_THRESHOLD_FAILURE = (state: ThresholdState) => ({
  ...state,
  thresholdUpdate: {
    ...state.thresholdUpdate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_UPDATE_THRESHOLD_STATE = (state: ThresholdState) => ({
  ...state,
  thresholdUpdate: initialState().thresholdUpdate
});

/*
Update
 */
const ATTEMPT_TO_DELETE_THRESHOLD = (state: ThresholdState) => ({
  ...state,
  thresholdDelete: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_DELETE_THRESHOLD_SUCCEED = (state: ThresholdState, action: BaseAction) => ({
  ...state,
  thresholdDelete: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_DELETE_THRESHOLD_FAILURE = (state: ThresholdState) => ({
  ...state,
  thresholdDelete: {
    ...state.thresholdDelete,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_DELETE_THRESHOLD_STATE = (state: ThresholdState) => ({
  ...state,
  thresholdDelete: initialState().thresholdDelete
});


const reducer = (state: ThresholdState = initialState(), action: BaseAction) => {
  switch (action.type) {
    case THRESHOLD_ACTIONS.ATTEMPT_TO_FETCH_THRESHOLD:
      return ATTEMPT_TO_FETCH_THRESHOLD(state);
    case THRESHOLD_ACTIONS.SET_FETCH_THRESHOLD_SUCCEED:
      return SET_FETCH_THRESHOLD_SUCCEED(state, action);
    case THRESHOLD_ACTIONS.SET_FETCH_THRESHOLD_FAILURE:
      return SET_FETCH_THRESHOLD_FAILURE(state);
    case THRESHOLD_ACTIONS.RESET_FETCH_THRESHOLD_STATE:
      return RESET_FETCH_THRESHOLD_STATE(state);

    case THRESHOLD_ACTIONS.ATTEMPT_TO_CREATE_THRESHOLD:
      return ATTEMPT_TO_CREATE_THRESHOLD(state);
    case THRESHOLD_ACTIONS.SET_CREATE_THRESHOLD_SUCCEED:
      return SET_CREATE_THRESHOLD_SUCCEED(state, action);
    case THRESHOLD_ACTIONS.SET_CREATE_THRESHOLD_FAILURE:
      return SET_CREATE_THRESHOLD_FAILURE(state);
    case THRESHOLD_ACTIONS.RESET_CREATE_THRESHOLD_STATE:
      return RESET_CREATE_THRESHOLD_STATE(state);

    case THRESHOLD_ACTIONS.ATTEMPT_TO_UPDATE_THRESHOLD:
      return ATTEMPT_TO_UPDATE_THRESHOLD(state);
    case THRESHOLD_ACTIONS.SET_UPDATE_THRESHOLD_SUCCEED:
      return SET_UPDATE_THRESHOLD_SUCCEED(state, action);
    case THRESHOLD_ACTIONS.SET_UPDATE_THRESHOLD_FAILURE:
      return SET_UPDATE_THRESHOLD_FAILURE(state);
    case THRESHOLD_ACTIONS.RESET_UPDATE_THRESHOLD_STATE:
      return RESET_UPDATE_THRESHOLD_STATE(state);

    case THRESHOLD_ACTIONS.ATTEMPT_TO_DELETE_THRESHOLD:
      return ATTEMPT_TO_DELETE_THRESHOLD(state);
    case THRESHOLD_ACTIONS.SET_DELETE_THRESHOLD_SUCCEED:
      return SET_DELETE_THRESHOLD_SUCCEED(state, action);
    case THRESHOLD_ACTIONS.SET_DELETE_THRESHOLD_FAILURE:
      return SET_DELETE_THRESHOLD_FAILURE(state);
    case THRESHOLD_ACTIONS.RESET_DELETE_THRESHOLD_STATE:
      return RESET_DELETE_THRESHOLD_STATE(state);
    default:
      return state;
  }
};

export default reducer;
