import { createSelector } from 'reselect';

const getOrderReducer = (state) => state.order;

export const orderListStateSelector = createSelector(
  getOrderReducer, data => data.orderList
);
export const orderCreateStateSelector = createSelector(
  getOrderReducer, data => data.orderCreate
);
export const orderUpdateStateSelector = createSelector(
  getOrderReducer, data => data.orderUpdate
);
export const orderDeleteStateSelector = createSelector(
  getOrderReducer, data => data.orderDelete
);