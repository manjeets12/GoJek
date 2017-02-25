'use strict';

import {FETCH_CONTACTS_REQUEST, FETCH_CONTACTS_SUCCESS, FETCH_CONTACTS_EROOR,GROUP_CONTACTS, ADD_CONTACT, UPDATE_CONTACT} from 'src/actions/types';
import api from 'src/common/api';

export const updateContact = function(user){
  return{
    type:UPDATE_CONTACT,
    user
  }
}
export const addContact = function(user){
  return{
    type:ADD_CONTACT,
    user
  }
}

export const fetchContactsRequest= function(){
   return{
   	type:FETCH_CONTACTS_REQUEST,
   }
}

export const fetchContactsSuccess= function(response){
   return{
   	type:FETCH_CONTACTS_SUCCESS,
   	response
   }
}
export const fetchContactsError= function(error){
   return{
   	type:FETCH_CONTACTS_EROOR,
   	error
   }
}

export const groupContacts = function(contacts){
  return{
    type:GROUP_CONTACTS,
    groups:api.groupContacts(contacts)
  }
} 

export const fetchContacts = function(params) {
 //able to use dispatch directly due to redux -thunk;
  return dispatch => {

    dispatch(fetchContactsRequest());

    return fetch('http://gojek-contacts-app.herokuapp.com/contacts.json',{
    			    method: "GET",
          		dataType: 'json',
          		headers: {
           			'Accept': 'application/json',
           			'Content-Type': "application/json; charset=utf-8",
          	  }
      })
      .then(response => response.json())
      .then(json => api.sortContacts(json))
      .then(sorted => {
        dispatch(fetchContactsSuccess(sorted));
        dispatch(groupContacts(sorted));
      })
      .catch((error) => {
        dispatch(fetchContactsError(error))
      });
  }
}
