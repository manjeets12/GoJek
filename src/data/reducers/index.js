'use strict'

var{ combineReducers } = require('redux');

import contacts from './contacts';

const rootReducer = combineReducers({
  contacts,
});

export default rootReducer