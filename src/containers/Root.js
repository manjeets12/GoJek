'use strict';

import React, {Component} from 'react';
var ReactNative = require('react-native');
var {
  View,
  Dimensions,
}=ReactNative
import {Provider} from 'react-redux';

var configureStore = require('src/data/store');
import AppNavigator from './AppNavigator';

const { width, height } = Dimensions.get('window');

class Root extends Component {
    constructor() {
      super();
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({isLoading: false})),
      };
    }
  
  render() {
      return (
        <Provider store={this.state.store}>
          <AppNavigator initialRoute={{Name :'contacts'}}/>
        </Provider>
      );
  }
}
module.exports = Root;