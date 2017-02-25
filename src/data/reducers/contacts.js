'use strict';

import {FETCH_CONTACTS_REQUEST,FETCH_CONTACTS_SUCCESS,FETCH_CONTACTS_EROOR, GROUP_CONTACTS, ADD_CONTACT, UPDATE_CONTACT} from 'src/actions/types'
import api from 'src/common/api';

export type State = {
  isFetching:?boolean;
  isFailed:?boolean;
  error:?string;
  contacts: ?array;
  groups:?object;
};

const initialState = {
  isFetching:false,
  isFailed:false,
  error:'',
  contacts:[],
  groups:null
};

function contacts(state: State = initialState, action: Action): State {
  switch(action.type){
    case FETCH_CONTACTS_REQUEST:
        return {...state, isFetching:true};
    case FETCH_CONTACTS_SUCCESS:
        return {...state, contacts:action.response, isFetching:false};
    case FETCH_CONTACTS_EROOR:
        return {...state,isFailed:true,isFetching:false, error:action.error};
    case GROUP_CONTACTS:
        return {...state, groups:action.groups};
        //return {...state, groups:api.groupContacts(...state.contacts)};
    case ADD_CONTACT:
        return {...state, 
                contacts:[...state.contacts, {...action.user}]
            };
    case UPDATE_CONTACT:
        let user = action.user;
        let index = state.contacts.findIndex((a)=>a.id=== user.id);
        return {...state, 
                contacts:[...state.contacts.slice(0,index),{...state.contacts[index], ...user}, ...state.contacts.slice(index+1)]
            };
    default:
        return state;
  }
}

module.exports = contacts;
