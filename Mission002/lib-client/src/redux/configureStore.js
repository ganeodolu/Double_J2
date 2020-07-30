import { createStore, applyMiddleware, compose } from 'redux';
import modules from './modules';
import penderMiddleware from 'redux-pender';

const isDevelopment = process.env.NODE_ENV === 'development';
const composeEnhancers = isDevelopment ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

const configureStore = (initialState) => {
  const store = createStore(modules, initialState, composeEnhancers(
    applyMiddleware(penderMiddleware())
  ));
  
  return store;
}

export default configureStore;