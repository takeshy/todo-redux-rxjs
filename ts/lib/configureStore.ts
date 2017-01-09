/// <reference path="../typings/index.d.ts" />
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, Store } from 'redux';
import reducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(reducer, initialState, compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}
