import { createSelector } from 'reselect';

const getThresholdReducer = (state) => state.threshold;

export const thresholdListStateSelector = createSelector(
  getThresholdReducer, data => data.thresholdList
);
export const thresholdCreateStateSelector = createSelector(
  getThresholdReducer, data => data.thresholdCreate
);
export const thresholdUpdateStateSelector = createSelector(
  getThresholdReducer, data => data.thresholdUpdate
);
export const thresholdDeleteStateSelector = createSelector(
  getThresholdReducer, data => data.thresholdDelete
);