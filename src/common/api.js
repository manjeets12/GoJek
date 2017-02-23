'use strict';

import React, {Component} from 'react';
import {Linking, Alert, NetInfo, Platform} from 'react-native';

export const BASE_URL ='http://gojek-contacts-app.herokuapp.com/'; 

var api = {
    navigator,
    isAndroid(){
        return (Platform.OS === 'android');
    },
    
    //common method to get/post data from/to the server
    request: async function(params) {
        if (params) {
            let contentType ="application/json; charset=utf-8";
            let url = BASE_URL + params.method;
            console.log(params);
             try {
                      var response = await fetch(url, {
                      method: params.type,
                      dataType: 'json',
                      headers: {
                       'Accept': 'application/json',
                       'Content-Type': contentType,
                      },
                    });
                }catch(error){
                  console.log(error);
                  return params.onError(error);
                }
                try{
                     let body = await response.json();
                     console.log(body);
                     return params.onSuccess(body);
                }catch(error){
                  console.log(error);
                  return params.onError(error);
              }
        }
    },
    sortAndGroup(data){
      let groups = {};
      for (let i = 0; i < data.length; i++) {
        let groupName = (data[i].favorite)?"Favorite":data[i].first_name.substring(0,1).toUpperCase();
        if (!groups[groupName]) {
          groups[groupName] = [];
        }
        groups[groupName].push(data[i]);
      }
      console.log(groups);
      return groups;
    },

    updateNavigator(_navigator){
      if(_navigator)
          this.navigator = _navigator;
    },

    openURL(user){
        try{
                 Linking.canOpenURL(user).then(supported => {
                if (supported) {
                  Linking.openURL(user);
                } else {
                  console.log('Don\'t know how to open URI: ' + user);
                }
              });
            }
           catch(error){
            console.log(error);
           }
    },
   
}

module.exports = api;



