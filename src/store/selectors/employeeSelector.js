import { createSelector } from 'reselect';

const getEmployeeReducer = (state) => state.employee;

export const employeeListStateSelector = createSelector(
  getEmployeeReducer, data => data.employeeList
);
export const employeeCreateStateSelector = createSelector(
  getEmployeeReducer, data => data.employeeCreate
);
export const employeeUpdateStateSelector = createSelector(
  getEmployeeReducer, data => data.employeeUpdate
);
export const employeeDeleteStateSelector = createSelector(
  getEmployeeReducer, data => data.employeeDelete
);