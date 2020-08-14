import { createStore, applyMiddleware, compose } from 'redux';
import modules, { rootSaga } from './modules';
import createSagaMiddleware from 'redux-saga';
// import penderMiddleware from 'redux-pender';

const isDevelopment = process.env.NODE_ENV === 'development';
const composeEnhancers = isDevelopment ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

const configureStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(modules, initialState, composeEnhancers(
    applyMiddleware(sagaMiddleware)
  ));
  sagaMiddleware.run(rootSaga);
  
  return store;
}

export default configureStore;