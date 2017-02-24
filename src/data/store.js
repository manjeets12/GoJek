'use strict';
var {applyMiddleware, createStore} = require('redux');
var {persistStore, autoRehydrate} = require('redux-persist');
var {AsyncStorage} = require('react-native');
import ReduxThunk from 'redux-thunk'

import rootReducer from './reducers';

var createContactStore = applyMiddleware(ReduxThunk)(createStore);

function configureStore(onComplete: ?() => void) {
  const store = autoRehydrate()(createContactStore)(rootReducer);
  persistStore(store, {storage: AsyncStorage}, onComplete);
  return store;
}
module.exports = configureStore;
