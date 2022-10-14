import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import authReducer from './store/reducers/auth';
import { rootSaga } from './store/sagas/rootSaga';

import invoiceReducer from './store/reducers/invoice';
import productReducer from './store/reducers/product';
import stockReducer from './store/reducers/stock';
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const rootReducer = combineReducers({
    auth: authReducer,
    
    invoice : invoiceReducer,
    product : productReducer,
    stock : stockReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(rootSaga);




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <Provider store={store}>
        
        <BrowserRouter>
            <App />
        </BrowserRouter>
     
    </Provider>
  </React.StrictMode>
);

reportWebVitals();