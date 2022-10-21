import { createSelector } from 'reselect';

const getPatientReducer = (state) => state.patient;

export const patientListStateSelector = createSelector(
  getPatientReducer, data => data.patientList
);
export const patientCreateStateSelector = createSelector(
  getPatientReducer, data => data.patientCreate
);
export const patientUpdateStateSelector = createSelector(
  getPatientReducer, data => data.patientUpdate
);
export const patientDeleteStateSelector = createSelector(
  getPatientReducer, data => data.patientDelete
);