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
            let options ={
                  method: params.type,
                  dataType: 'json',
                  headers: {
                   'Accept': 'application/json',
                   'Content-Type': contentType,
                  },
            };
            if(params.input){
              options.body = JSON.stringify(params.input);
            }
            console.log(params);
            try{
                let response = await fetch(url, options);
                let body = await response.json();
                console.log(body);
                return params.onSuccess(body);
            }catch(error){
                return params.onError(error);
            }
        }
    },
    sortContacts(data){
      return data.sort((a, b)=>{
                let aName = ((a.first_name || "") + " " + (a.last_name || "")).toLowerCase();
                let bName = ((b.first_name || "") + " " + (b.last_name || "")).toLowerCase();
                if(aName < bName) return -1;
                if(aName > bName) return 1;
                return 0;
              });
    },
    groupContacts(data){
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
    showContactDetails(data){
      this.navigator.push({Name:'contactDetails', data:data});
    },

    openURL(user){
        try{
                Linking.canOpenURL(user).then(supported => {
                if (supported) {
                  Linking.openURL(user);
                } else {
                  console.log('Please try again letter');
                }
              });
            }
           catch(error){
            console.log(error);
           }
    },
   
}

module.exports = api;



