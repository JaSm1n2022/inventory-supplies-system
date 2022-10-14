import { createSelector } from 'reselect';

const getInvoiceReducer = (state) => state.invoice;

export const invoiceListStateSelector = createSelector(
  getInvoiceReducer, data => data.invoiceList
);
export const invoiceCreateStateSelector = createSelector(
  getInvoiceReducer, data => data.invoiceCreate
);
export const invoiceUpdateStateSelector = createSelector(
  getInvoiceReducer, data => data.invoiceUpdate
);
export const invoiceDeleteStateSelector = createSelector(
  getInvoiceReducer, data => data.invoiceDelete
);