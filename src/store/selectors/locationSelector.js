import { createSelector } from "reselect";

const getLocationReducer = (state) => state.location;

export const locationListStateSelector = createSelector(
  getLocationReducer,
  (data) => data.locationList
);
export const locationCreateStateSelector = createSelector(
  getLocationReducer,
  (data) => data.locationCreate
);
export const locationUpdateStateSelector = createSelector(
  getLocationReducer,
  (data) => data.locationUpdate
);
export const locationDeleteStateSelector = createSelector(
  getLocationReducer,
  (data) => data.locationDelete
);
