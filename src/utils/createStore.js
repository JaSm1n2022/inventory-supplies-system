import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

/**
 * @param {Array} rootReducer - combined sagas
 * @param {Array} rootSaga - combined Reducers
 * @param {Array} middlewares - middlewares
 * @param {string} storeName - middlewares
 * @returns {Object} - store
 */
const dynamicallyCreateStore = (rootReducer, rootSaga, middlewares = [], storeName) => {
  if (window[storeName] != null) {
    return window[storeName];
  }
  const initialState = {};
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();

  /**
    * @returns {Array} - middleware
    */
  const switchMode = () => {
    if (process.env.NODE_ENV === 'development') {
      return [sagaMiddleware, createLogger, ...middlewares];
    }

    return [sagaMiddleware, ...middlewares];
  };

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...switchMode())
    )
  );

  sagaMiddleware.run(rootSaga);
  window[storeName] = store;

  return store;
};

export default dynamicallyCreateStore;
