import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import invoiceSaga from './invoiceSaga';
import productSaga from './productSaga';
import stockSaga from './stockSaga';
export function* rootSaga() {
  yield all([
  authSaga(),
 
  invoiceSaga(),
  productSaga(),
  stockSaga()
]);
}
