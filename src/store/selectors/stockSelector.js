import { createSelector } from 'reselect';

const getStockReducer = (state) => state.stock;

export const stockListStateSelector = createSelector(
  getStockReducer, data => data.stockList
);
export const stockCreateStateSelector = createSelector(
  getStockReducer, data => data.stockCreate
);
export const stockUpdateStateSelector = createSelector(
  getStockReducer, data => data.stockUpdate
);
export const stockDeleteStateSelector = createSelector(
  getStockReducer, data => data.stockDelete
);