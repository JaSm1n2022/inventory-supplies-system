import { createSelector } from 'reselect';

const getTransactionReducer = (state) => state.transaction;

export const transactionListStateSelector = createSelector(
  getTransactionReducer, data => data.transactionList
);
export const transactionCreateStateSelector = createSelector(
  getTransactionReducer, data => data.transactionCreate
);
export const transactionUpdateStateSelector = createSelector(
  getTransactionReducer, data => data.transactionUpdate
);
export const transactionDeleteStateSelector = createSelector(
  getTransactionReducer, data => data.transactionDelete
);