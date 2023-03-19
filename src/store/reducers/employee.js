import type { BaseAction } from '../types/Action';
import type { EmployeeState } from '../types';
import { EMPLOYEE_ACTIONS } from '../actions/employeeAction';
import { ACTION_STATUSES } from '../../utils/constants';

const initialState = (): EmployeeState => ({

  employeeList: {
    data: {},
    status: null,
    error: null
  },
  employeeUpdate: {
    data: {},
    status: null,
    error: null

  },
  employeeCreate: {
    data: {},
    status: null,
    error: null

  },
  employeeDelete: {
    data: {},
    status: null,
    error: null

  }
});



const ATTEMPT_TO_FETCH_EMPLOYEE = (state: EmployeeState) => ({
  ...state,
  employeeList: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_FETCH_EMPLOYEE_SUCCEED = (state: EmployeeState, action: BaseAction) => ({
  ...state,
  employeeList: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_FETCH_EMPLOYEE_FAILURE = (state: EmployeeState) => ({
  ...state,
  employeeList: {
    ...state.employeeList,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_FETCH_EMPLOYEE_STATE = (state: EmployeeState) => ({
  ...state,
  employeeList: initialState().employeeList
});


/*
Create
 */
const ATTEMPT_TO_CREATE_EMPLOYEE = (state: EmployeeState) => ({
  ...state,
  employeeCreate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_CREATE_EMPLOYEE_SUCCEED = (state: EmployeeState, action: BaseAction) => ({
  ...state,
  employeeCreate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_CREATE_EMPLOYEE_FAILURE = (state: EmployeeState) => ({
  ...state,
  employeeCreate: {
    ...state.employeeCreate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_CREATE_EMPLOYEE_STATE = (state: EmployeeState) => ({
  ...state,
  employeeCreate: initialState().employeeCreate
});


/*
Update
 */
const ATTEMPT_TO_UPDATE_EMPLOYEE = (state: EmployeeState) => ({
  ...state,
  employeeUpdate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_UPDATE_EMPLOYEE_SUCCEED = (state: EmployeeState, action: BaseAction) => ({
  ...state,
  employeeUpdate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_UPDATE_EMPLOYEE_FAILURE = (state: EmployeeState) => ({
  ...state,
  employeeUpdate: {
    ...state.employeeUpdate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_UPDATE_EMPLOYEE_STATE = (state: EmployeeState) => ({
  ...state,
  employeeUpdate: initialState().employeeUpdate
});

/*
Update
 */
const ATTEMPT_TO_DELETE_EMPLOYEE = (state: EmployeeState) => ({
  ...state,
  employeeDelete: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_DELETE_EMPLOYEE_SUCCEED = (state: EmployeeState, action: BaseAction) => ({
  ...state,
  employeeDelete: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_DELETE_EMPLOYEE_FAILURE = (state: EmployeeState) => ({
  ...state,
  employeeDelete: {
    ...state.employeeDelete,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_DELETE_EMPLOYEE_STATE = (state: EmployeeState) => ({
  ...state,
  employeeDelete: initialState().employeeDelete
});


const reducer = (state: EmployeeState = initialState(), action: BaseAction) => {
  switch (action.type) {
    case EMPLOYEE_ACTIONS.ATTEMPT_TO_FETCH_EMPLOYEE:
      return ATTEMPT_TO_FETCH_EMPLOYEE(state);
    case EMPLOYEE_ACTIONS.SET_FETCH_EMPLOYEE_SUCCEED:
      return SET_FETCH_EMPLOYEE_SUCCEED(state, action);
    case EMPLOYEE_ACTIONS.SET_FETCH_EMPLOYEE_FAILURE:
      return SET_FETCH_EMPLOYEE_FAILURE(state);
    case EMPLOYEE_ACTIONS.RESET_FETCH_EMPLOYEE_STATE:
      return RESET_FETCH_EMPLOYEE_STATE(state);

    case EMPLOYEE_ACTIONS.ATTEMPT_TO_CREATE_EMPLOYEE:
      return ATTEMPT_TO_CREATE_EMPLOYEE(state);
    case EMPLOYEE_ACTIONS.SET_CREATE_EMPLOYEE_SUCCEED:
      return SET_CREATE_EMPLOYEE_SUCCEED(state, action);
    case EMPLOYEE_ACTIONS.SET_CREATE_EMPLOYEE_FAILURE:
      return SET_CREATE_EMPLOYEE_FAILURE(state);
    case EMPLOYEE_ACTIONS.RESET_CREATE_EMPLOYEE_STATE:
      return RESET_CREATE_EMPLOYEE_STATE(state);

    case EMPLOYEE_ACTIONS.ATTEMPT_TO_UPDATE_EMPLOYEE:
      return ATTEMPT_TO_UPDATE_EMPLOYEE(state);
    case EMPLOYEE_ACTIONS.SET_UPDATE_EMPLOYEE_SUCCEED:
      return SET_UPDATE_EMPLOYEE_SUCCEED(state, action);
    case EMPLOYEE_ACTIONS.SET_UPDATE_EMPLOYEE_FAILURE:
      return SET_UPDATE_EMPLOYEE_FAILURE(state);
    case EMPLOYEE_ACTIONS.RESET_UPDATE_EMPLOYEE_STATE:
      return RESET_UPDATE_EMPLOYEE_STATE(state);

    case EMPLOYEE_ACTIONS.ATTEMPT_TO_DELETE_EMPLOYEE:
      return ATTEMPT_TO_DELETE_EMPLOYEE(state);
    case EMPLOYEE_ACTIONS.SET_DELETE_EMPLOYEE_SUCCEED:
      return SET_DELETE_EMPLOYEE_SUCCEED(state, action);
    case EMPLOYEE_ACTIONS.SET_DELETE_EMPLOYEE_FAILURE:
      return SET_DELETE_EMPLOYEE_FAILURE(state);
    case EMPLOYEE_ACTIONS.RESET_DELETE_EMPLOYEE_STATE:
      return RESET_DELETE_EMPLOYEE_STATE(state);
    default:
      return state;
  }
};

export default reducer;
