import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import invoiceSaga from "./invoiceSaga";
import productSaga from "./productSaga";
import stockSaga from "./stockSaga";
import transactionSaga from "./transactionSaga";
import distributionSaga from "./distributionSaga";
import employeeSaga from "./employeeSaga";
import patientSaga from "./patientSaga";
import vendorSaga from "./vendorSaga";
import templateSaga from "./templateSaga";
import thresholdSaga from "./thresholdSaga";
import orderSaga from "./orderSaga";
import locationSaga from "./locationSaga";
export function* rootSaga() {
  yield all([
    authSaga(),
    invoiceSaga(),
    productSaga(),
    stockSaga(),
    transactionSaga(),
    distributionSaga(),
    employeeSaga(),
    patientSaga(),
    vendorSaga(),
    locationSaga(),
    templateSaga(),
    thresholdSaga(),
    orderSaga(),
  ]);
}
