import type { BaseAction } from '../types/Action';
import type { TemplateState } from '../types';
import { TEMPLATE_ACTIONS } from '../actions/templateAction';
import { ACTION_STATUSES } from '../../utils/constants';

const initialState = (): TemplateState => ({

  templateList: {
    data: {},
    status: null,
    error: null
  },
  templateUpdate : {
    data: {},
    status: null,
    error: null

  },
  templateCreate : {
    data: {},
    status: null,
    error: null

  },
  templateDelete : {
    data: {},
    status: null, 
    error: null

  }
});


/*

 */
const ATTEMPT_TO_FETCH_TEMPLATE = (state: TemplateState) => ({
  ...state,
  templateList: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_FETCH_TEMPLATE_SUCCEED = (state: TemplateState, action: BaseAction) => ({
  ...state,
  templateList: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_FETCH_TEMPLATE_FAILURE = (state: TemplateState) => ({
  ...state,
 templateList: {
    ...state.medicaid,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_FETCH_TEMPLATE_STATE = (state: TemplateState) => ({
  ...state,
  templateList: initialState().templateList
});


/*
Create
 */
const ATTEMPT_TO_CREATE_TEMPLATE = (state: TemplateState) => ({
  ...state,
  templateCreate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_CREATE_TEMPLATE_SUCCEED = (state: TemplateState, action: BaseAction) => ({
  ...state,
  templateCreate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_CREATE_TEMPLATE_FAILURE = (state: TemplateState) => ({
  ...state,
 templateCreate: {
    ...state.templateCreate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_CREATE_TEMPLATE_STATE = (state: TemplateState) => ({
  ...state,
  templateCreate: initialState().templateCreate
});


/*
Update
 */
const ATTEMPT_TO_UPDATE_TEMPLATE = (state: TemplateState) => ({
  ...state,
  templateUpdate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_UPDATE_TEMPLATE_SUCCEED = (state: TemplateState, action: BaseAction) => ({
  ...state,
  templateUpdate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_UPDATE_TEMPLATE_FAILURE = (state: TemplateState) => ({
  ...state,
 templateUpdate: {
    ...state.templateUpdate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_UPDATE_TEMPLATE_STATE = (state: TemplateState) => ({
  ...state,
  templateUpdate: initialState().templateUpdate
});

/*
Update
 */
const ATTEMPT_TO_DELETE_TEMPLATE = (state: TemplateState) => ({
  ...state,
  templateDelete: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_DELETE_TEMPLATE_SUCCEED = (state: TemplateState, action: BaseAction) => ({
  ...state,
  templateDelete: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_DELETE_TEMPLATE_FAILURE = (state: TemplateState) => ({
  ...state,
 templateDelete: {
    ...state.templateDelete,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_DELETE_TEMPLATE_STATE = (state: TemplateState) => ({
  ...state,
  templateDelete: initialState().templateDelete
});


const reducer = (state: TemplateState = initialState(), action: BaseAction) => {
  switch (action.type) {
    case TEMPLATE_ACTIONS.ATTEMPT_TO_FETCH_TEMPLATE:
      return ATTEMPT_TO_FETCH_TEMPLATE(state);
    case TEMPLATE_ACTIONS.SET_FETCH_TEMPLATE_SUCCEED:
      return SET_FETCH_TEMPLATE_SUCCEED(state, action);
    case TEMPLATE_ACTIONS.SET_FETCH_TEMPLATE_FAILURE:
      return SET_FETCH_TEMPLATE_FAILURE(state);
    case TEMPLATE_ACTIONS.RESET_FETCH_TEMPLATE_STATE:
      return RESET_FETCH_TEMPLATE_STATE(state);

      case TEMPLATE_ACTIONS.ATTEMPT_TO_CREATE_TEMPLATE:
        return ATTEMPT_TO_CREATE_TEMPLATE(state);
      case TEMPLATE_ACTIONS.SET_CREATE_TEMPLATE_SUCCEED:
        return SET_CREATE_TEMPLATE_SUCCEED(state, action);
      case TEMPLATE_ACTIONS.SET_CREATE_TEMPLATE_FAILURE:
        return SET_CREATE_TEMPLATE_FAILURE(state);
      case TEMPLATE_ACTIONS.RESET_CREATE_TEMPLATE_STATE:
        return RESET_CREATE_TEMPLATE_STATE(state);

        case TEMPLATE_ACTIONS.ATTEMPT_TO_UPDATE_TEMPLATE:
        return ATTEMPT_TO_UPDATE_TEMPLATE(state);
      case TEMPLATE_ACTIONS.SET_UPDATE_TEMPLATE_SUCCEED:
        return SET_UPDATE_TEMPLATE_SUCCEED(state, action);
      case TEMPLATE_ACTIONS.SET_UPDATE_TEMPLATE_FAILURE:
        return SET_UPDATE_TEMPLATE_FAILURE(state);
      case TEMPLATE_ACTIONS.RESET_UPDATE_TEMPLATE_STATE:
        return RESET_UPDATE_TEMPLATE_STATE(state);

        case TEMPLATE_ACTIONS.ATTEMPT_TO_DELETE_TEMPLATE:
          return ATTEMPT_TO_DELETE_TEMPLATE(state);
        case TEMPLATE_ACTIONS.SET_DELETE_TEMPLATE_SUCCEED:
          return SET_DELETE_TEMPLATE_SUCCEED(state, action);
        case TEMPLATE_ACTIONS.SET_DELETE_TEMPLATE_FAILURE:
          return SET_DELETE_TEMPLATE_FAILURE(state);
        case TEMPLATE_ACTIONS.RESET_DELETE_TEMPLATE_STATE:
          return RESET_DELETE_TEMPLATE_STATE(state);
    default:
      return state;
  }
};

export default reducer;
