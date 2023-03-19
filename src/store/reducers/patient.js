import type { BaseAction } from '../types/Action';
import type { PatientState } from '../types';
import { PATIENT_ACTIONS } from '../actions/patientAction';
import { ACTION_STATUSES } from '../../utils/constants';

const initialState = (): PatientState => ({

  patientList: {
    data: {},
    status: null,
    error: null
  },
  patientUpdate: {
    data: {},
    status: null,
    error: null

  },
  patientCreate: {
    data: {},
    status: null,
    error: null

  },
  patientDelete: {
    data: {},
    status: null,
    error: null

  }
});



const ATTEMPT_TO_FETCH_PATIENT = (state: PatientState) => ({
  ...state,
  patientList: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_FETCH_PATIENT_SUCCEED = (state: PatientState, action: BaseAction) => ({
  ...state,
  patientList: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_FETCH_PATIENT_FAILURE = (state: PatientState) => ({
  ...state,
  patientList: {
    ...state.patientList,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_FETCH_PATIENT_STATE = (state: PatientState) => ({
  ...state,
  patientList: initialState().patientList
});


/*
Create
 */
const ATTEMPT_TO_CREATE_PATIENT = (state: PatientState) => ({
  ...state,
  patientCreate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_CREATE_PATIENT_SUCCEED = (state: PatientState, action: BaseAction) => ({
  ...state,
  patientCreate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_CREATE_PATIENT_FAILURE = (state: PatientState) => ({
  ...state,
  patientCreate: {
    ...state.patientCreate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_CREATE_PATIENT_STATE = (state: PatientState) => ({
  ...state,
  patientCreate: initialState().patientCreate
});


/*
Update
 */
const ATTEMPT_TO_UPDATE_PATIENT = (state: PatientState) => ({
  ...state,
  patientUpdate: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_UPDATE_PATIENT_SUCCEED = (state: PatientState, action: BaseAction) => ({
  ...state,
  patientUpdate: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_UPDATE_PATIENT_FAILURE = (state: PatientState) => ({
  ...state,
  patientUpdate: {
    ...state.patientUpdate,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_UPDATE_PATIENT_STATE = (state: PatientState) => ({
  ...state,
  patientUpdate: initialState().patientUpdate
});

/*
Update
 */
const ATTEMPT_TO_DELETE_PATIENT = (state: PatientState) => ({
  ...state,
  patientDelete: {
    status: ACTION_STATUSES.PENDING,
    data: {},
    error: null
  }
});

const SET_DELETE_PATIENT_SUCCEED = (state: PatientState, action: BaseAction) => ({
  ...state,
  patientDelete: {
    data: action.payload,
    status: ACTION_STATUSES.SUCCEED,
    error: null
  }
});

const SET_DELETE_PATIENT_FAILURE = (state: PatientState) => ({
  ...state,
  patientDelete: {
    ...state.patientDelete,
    status: ACTION_STATUSES.FAILED
  }
});
const RESET_DELETE_PATIENT_STATE = (state: PatientState) => ({
  ...state,
  patientDelete: initialState().patientDelete
});


const reducer = (state: PatientState = initialState(), action: BaseAction) => {
  switch (action.type) {
    case PATIENT_ACTIONS.ATTEMPT_TO_FETCH_PATIENT:
      return ATTEMPT_TO_FETCH_PATIENT(state);
    case PATIENT_ACTIONS.SET_FETCH_PATIENT_SUCCEED:
      return SET_FETCH_PATIENT_SUCCEED(state, action);
    case PATIENT_ACTIONS.SET_FETCH_PATIENT_FAILURE:
      return SET_FETCH_PATIENT_FAILURE(state);
    case PATIENT_ACTIONS.RESET_FETCH_PATIENT_STATE:
      return RESET_FETCH_PATIENT_STATE(state);

    case PATIENT_ACTIONS.ATTEMPT_TO_CREATE_PATIENT:
      return ATTEMPT_TO_CREATE_PATIENT(state);
    case PATIENT_ACTIONS.SET_CREATE_PATIENT_SUCCEED:
      return SET_CREATE_PATIENT_SUCCEED(state, action);
    case PATIENT_ACTIONS.SET_CREATE_PATIENT_FAILURE:
      return SET_CREATE_PATIENT_FAILURE(state);
    case PATIENT_ACTIONS.RESET_CREATE_PATIENT_STATE:
      return RESET_CREATE_PATIENT_STATE(state);

    case PATIENT_ACTIONS.ATTEMPT_TO_UPDATE_PATIENT:
      return ATTEMPT_TO_UPDATE_PATIENT(state);
    case PATIENT_ACTIONS.SET_UPDATE_PATIENT_SUCCEED:
      return SET_UPDATE_PATIENT_SUCCEED(state, action);
    case PATIENT_ACTIONS.SET_UPDATE_PATIENT_FAILURE:
      return SET_UPDATE_PATIENT_FAILURE(state);
    case PATIENT_ACTIONS.RESET_UPDATE_PATIENT_STATE:
      return RESET_UPDATE_PATIENT_STATE(state);

    case PATIENT_ACTIONS.ATTEMPT_TO_DELETE_PATIENT:
      return ATTEMPT_TO_DELETE_PATIENT(state);
    case PATIENT_ACTIONS.SET_DELETE_PATIENT_SUCCEED:
      return SET_DELETE_PATIENT_SUCCEED(state, action);
    case PATIENT_ACTIONS.SET_DELETE_PATIENT_FAILURE:
      return SET_DELETE_PATIENT_FAILURE(state);
    case PATIENT_ACTIONS.RESET_DELETE_PATIENT_STATE:
      return RESET_DELETE_PATIENT_STATE(state);
    default:
      return state;
  }
};

export default reducer;
