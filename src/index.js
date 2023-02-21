import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import authReducer from './store/reducers/auth';
import { rootSaga } from './store/sagas/rootSaga';
import reportWebVitals from "./reportWebVitals";
import invoiceReducer from './store/reducers/invoice';
import productReducer from './store/reducers/product';
import stockReducer from './store/reducers/stock';
import transactionReducer from './store/reducers/transaction';
import distributionReducer from './store/reducers/distribution';
import employeeReducer from './store/reducers/employee';
import patientReducer from './store/reducers/patient';
import thresholdReducer from './store/reducers/threshold';
import vendorReducer from './store/reducers/vendor';
import templateReducer from './store/reducers/template';
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const rootReducer = combineReducers({
    auth: authReducer,

    invoice: invoiceReducer,
    product: productReducer,
    stock: stockReducer,
    transaction: transactionReducer,
    distribution: distributionReducer,
    employee: employeeReducer,
    patient: patientReducer,
    vendor: vendorReducer,
    template: templateReducer,
    threshold: thresholdReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(rootSaga);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <Provider store={store}>

        <BrowserRouter>
            <App />
        </BrowserRouter>

    </Provider>

);

reportWebVitals();