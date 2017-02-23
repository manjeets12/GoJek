'use strict';
import React, { Component } from 'react';
var ReactNative = require('react-native');

var api=require('src/common/api');                 //for setting navigator
import styles from 'src/common/styles';

/*Containers*/
import Contacts from 'src/screens/contacts';
import AddContact from 'src/screens/addContact';
import ContactDetails from 'src/screens/contactDetails';


let { 
  Navigator,
  View,
  BackAndroid,
  StatusBar
}=ReactNative

let Routes ={
  contacts:Contacts,
  addContact:AddContact,
  contactDetails:ContactDetails
}

class AppNavigator extends Component{
  constructor(props) {
    super(props);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.renderScene = this.renderScene.bind(this);
    }
  
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }


  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  //added to handle back button functionality on android
  handleBackButton() {
    const {navigator} = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }
    return false;
  }
  
  renderScene(route, navigator) {
      const Component = Routes[route.Name]
      api.updateNavigator(navigator); //will allow us to access navigator anywhere within the app
      return <Component route={route} navigator={navigator} data={route.data}/>
  }

  render() {
    return (
    <View style={styles.container}>
         {(api.isAndroid()) &&
          <StatusBar
              backgroundColor="#303f9f"
              barStyle="light-content"
          />
        }
        <Navigator
          ref="navigator"
          style={styles.container}
          configureScene={(route) => {
             return Navigator.SceneConfigs.FadeAndroid;
          }}
          initialRoute={this.props.initialRoute}
          renderScene={this.renderScene}
        />
    </View>
    );
  }
};

module.exports = AppNavigator;
