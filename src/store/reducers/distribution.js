import type { BaseAction } from '../types/Action';
import type { DistributionState } from '../types';
import { DISTRIBUTION_ACTIONS } from '../actions/distributionAction';
import { ACTION_STATUSES } from '../../utils/constants';

const initialState = (): DistributionState => ({

  distributionList: {
    data: {},
    status: null,
    error: null
  },
  distributionUpdate : {
    data: {},
    status: null,
    error: null

  },
  distributionCreate : {
    data: {},
    status: null,
    error: null

  },
  distributionDelete : {
    data: {},
    status: null, 
    error: null

  }
});


/*
Medicaid
 */
const ATTEMPT_TO_FETCH_DISTRIBUTION = (state: DistributionState) => ({
  ...state,
  distributionList: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_FETCH_DISTRIBUTION_SUCCEED = (state: DistributionState, action: BaseAction) => ({
  ...state,
  distributionList: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_FETCH_DISTRIBUTION_FAILURE = (state: DistributionState) => ({
  ...state,
 distributionList: {
    ...state.medicaid,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_FETCH_DISTRIBUTION_STATE = (state: DistributionState) => ({
  ...state,
  distributionList: initialState().distributionList
});


/*
Create
 */
const ATTEMPT_TO_CREATE_DISTRIBUTION = (state: DistributionState) => ({
  ...state,
  distributionCreate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_CREATE_DISTRIBUTION_SUCCEED = (state: DistributionState, action: BaseAction) => ({
  ...state,
  distributionCreate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_CREATE_DISTRIBUTION_FAILURE = (state: DistributionState) => ({
  ...state,
 distributionCreate: {
    ...state.distributionCreate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_CREATE_DISTRIBUTION_STATE = (state: DistributionState) => ({
  ...state,
  distributionCreate: initialState().distributionCreate
});


/*
Update
 */
const ATTEMPT_TO_UPDATE_DISTRIBUTION = (state: DistributionState) => ({
  ...state,
  distributionUpdate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_UPDATE_DISTRIBUTION_SUCCEED = (state: DistributionState, action: BaseAction) => ({
  ...state,
  distributionUpdate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_UPDATE_DISTRIBUTION_FAILURE = (state: DistributionState) => ({
  ...state,
 distributionUpdate: {
    ...state.distributionUpdate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_UPDATE_DISTRIBUTION_STATE = (state: DistributionState) => ({
  ...state,
  distributionUpdate: initialState().distributionUpdate
});

/*
Update
 */
const ATTEMPT_TO_DELETE_DISTRIBUTION = (state: DistributionState) => ({
  ...state,
  distributionDelete: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_DELETE_DISTRIBUTION_SUCCEED = (state: DistributionState, action: BaseAction) => ({
  ...state,
  distributionDelete: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_DELETE_DISTRIBUTION_FAILURE = (state: DistributionState) => ({
  ...state,
 distributionDelete: {
    ...state.distributionDelete,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_DELETE_DISTRIBUTION_STATE = (state: DistributionState) => ({
  ...state,
  distributionDelete: initialState().distributionDelete
});


const reducer = (state: DistributionState = initialState(), action: BaseAction) => {
  switch (action.type) {
    case DISTRIBUTION_ACTIONS.ATTEMPT_TO_FETCH_DISTRIBUTION:
      return ATTEMPT_TO_FETCH_DISTRIBUTION(state);
    case DISTRIBUTION_ACTIONS.SET_FETCH_DISTRIBUTION_SUCCEED:
      return SET_FETCH_DISTRIBUTION_SUCCEED(state, action);
    case DISTRIBUTION_ACTIONS.SET_FETCH_DISTRIBUTION_FAILURE:
      return SET_FETCH_DISTRIBUTION_FAILURE(state);
    case DISTRIBUTION_ACTIONS.RESET_FETCH_DISTRIBUTION_STATE:
      return RESET_FETCH_DISTRIBUTION_STATE(state);

      case DISTRIBUTION_ACTIONS.ATTEMPT_TO_CREATE_DISTRIBUTION:
        return ATTEMPT_TO_CREATE_DISTRIBUTION(state);
      case DISTRIBUTION_ACTIONS.SET_CREATE_DISTRIBUTION_SUCCEED:
        return SET_CREATE_DISTRIBUTION_SUCCEED(state, action);
      case DISTRIBUTION_ACTIONS.SET_CREATE_DISTRIBUTION_FAILURE:
        return SET_CREATE_DISTRIBUTION_FAILURE(state);
      case DISTRIBUTION_ACTIONS.RESET_CREATE_DISTRIBUTION_STATE:
        return RESET_CREATE_DISTRIBUTION_STATE(state);

        case DISTRIBUTION_ACTIONS.ATTEMPT_TO_UPDATE_DISTRIBUTION:
        return ATTEMPT_TO_UPDATE_DISTRIBUTION(state);
      case DISTRIBUTION_ACTIONS.SET_UPDATE_DISTRIBUTION_SUCCEED:
        return SET_UPDATE_DISTRIBUTION_SUCCEED(state, action);
      case DISTRIBUTION_ACTIONS.SET_UPDATE_DISTRIBUTION_FAILURE:
        return SET_UPDATE_DISTRIBUTION_FAILURE(state);
      case DISTRIBUTION_ACTIONS.RESET_UPDATE_DISTRIBUTION_STATE:
        return RESET_UPDATE_DISTRIBUTION_STATE(state);

        case DISTRIBUTION_ACTIONS.ATTEMPT_TO_DELETE_DISTRIBUTION:
          return ATTEMPT_TO_DELETE_DISTRIBUTION(state);
        case DISTRIBUTION_ACTIONS.SET_DELETE_DISTRIBUTION_SUCCEED:
          return SET_DELETE_DISTRIBUTION_SUCCEED(state, action);
        case DISTRIBUTION_ACTIONS.SET_DELETE_DISTRIBUTION_FAILURE:
          return SET_DELETE_DISTRIBUTION_FAILURE(state);
        case DISTRIBUTION_ACTIONS.RESET_DELETE_DISTRIBUTION_STATE:
          return RESET_DELETE_DISTRIBUTION_STATE(state);
    default:
      return state;
  }
};

export default reducer;
