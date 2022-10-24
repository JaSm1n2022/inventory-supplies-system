import { createSelector } from 'reselect';

const getVendorReducer = (state) => state.vendor;

export const vendorListStateSelector = createSelector(
  getVendorReducer, data => data.vendorList
);
export const vendorCreateStateSelector = createSelector(
  getVendorReducer, data => data.vendorCreate
);
export const vendorUpdateStateSelector = createSelector(
  getVendorReducer, data => data.vendorUpdate
);
export const vendorDeleteStateSelector = createSelector(
  getVendorReducer, data => data.vendorDelete
);