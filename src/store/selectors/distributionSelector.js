import { createSelector } from 'reselect';

const getDistributionReducer = (state) => state.distribution;

export const distributionListStateSelector = createSelector(
  getDistributionReducer, data => data.distributionList
);
export const distributionCreateStateSelector = createSelector(
  getDistributionReducer, data => data.distributionCreate
);
export const distributionUpdateStateSelector = createSelector(
  getDistributionReducer, data => data.distributionUpdate
);
export const distributionDeleteStateSelector = createSelector(
  getDistributionReducer, data => data.distributionDelete
);