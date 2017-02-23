'use strict'

import React, {Component} from 'react';
import {View, Text, Image,ListView,TouchableOpacity, ScrollView} from 'react-native';

import api from 'src/common/api';
import styles from 'src/common/styles';
import Header from '../Header';

export default class AddContact extends Component{
	constructor(props){
		super(props);
		/*this.state = {
                
        };
        this.contactsSuccess = this.contactsSuccess.bind(this);
        this.contactsError = this.contactsError.bind(this);
        this.renderContacts = this.renderContacts.bind(this);*/
	}
	

	render(){
		return(
			<View style={styles.container}>
				<Header title="Add Contact" isBackButton={true}/>
			</View>
		);
	}
}