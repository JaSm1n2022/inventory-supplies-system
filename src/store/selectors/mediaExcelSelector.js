import { createSelector } from 'reselect';

/**
 * get Auth State
 * @param {Object} state - state
 * @param {Object} props - required props from state
 * @returns {Object} props
 */
const getExcelReducer = (state) => state.excel;

export const excelStateSelector = createSelector(
  getExcelReducer, data => data.excel
);
