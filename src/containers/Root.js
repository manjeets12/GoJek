'use strict';

import React, {Component} from 'react';
var ReactNative = require('react-native');
var {
  View,
  Dimensions,
}=ReactNative

import AppNavigator from './AppNavigator';

const { width, height } = Dimensions.get('window');

class Root extends Component {
    constructor() {
      super();
    }
  
  render() {
      return (
        <View style={{flex:1}}>
          <AppNavigator initialRoute={{Name :'contacts'}}/>
        </View>
      );
  }
}
module.exports = Root;