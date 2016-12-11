import {applyMiddleware, createStore, combineReducers, compose} from 'redux'
import {reactReduxFirebase, firebaseStateReducer} from 'react-redux-firebase'
import baseConfig from '../config.js';

const rootReducer = combineReducers({
  firebase: firebaseStateReducer
});

const fireConfig = baseConfig.firebase;
const config = {};


let middleware = [];

let createStoreWithMiddleware = compose(
  applyMiddleware.apply(null, middleware),
  reactReduxFirebase(fireConfig, config)
);

if (
  typeof window === 'object' &&
  typeof window.devToolsExtension !== 'undefined'
) {
  createStoreWithMiddleware = compose(createStoreWithMiddleware, window.devToolsExtension());
}

export default function create(initialState = {}) {
  const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);

  return store;
}
