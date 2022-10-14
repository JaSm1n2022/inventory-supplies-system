import { createSelector } from 'reselect';

const getProductReducer = (state) => state.product;

export const productListStateSelector = createSelector(
  getProductReducer, data => data.productList
);
export const productCreateStateSelector = createSelector(
  getProductReducer, data => data.productCreate
);
export const productUpdateStateSelector = createSelector(
  getProductReducer, data => data.productUpdate
);
export const productDeleteStateSelector = createSelector(
  getProductReducer, data => data.productDelete
);