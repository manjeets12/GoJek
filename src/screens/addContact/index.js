'use strict'

import React, {Component} from 'react';
import {View, Text, Image,ListView,TouchableOpacity, ScrollView,TextInput} from 'react-native';

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
				<ScrollView style ={{padding:16}}>
					<View style={styles.centering}>
						<TouchableOpacity
		                    onPress={()=>{}} 
		                    style={styles.profileImageContainer}
		                    >
		                    <Image
				              style={styles.profileImage}
				              source={require('src/Images/default-avatar.png')}/>
			            </TouchableOpacity>
					</View>
					<View style={{}}>
						<TextInput autoCapitalize ={'words'} placeholder ="First name"/>
						<TextInput autoCapitalize ={'words'} placeholder ="Last name"/>
						<TextInput keyboardType ={'phone-pad'} placeholder ="Mobile Number"/>
						<TextInput keyboardType ={'email-address'} placeholder ="Email Address"/>
					</View>
					<View style={{justifyContent:'flex-end', alignItems:'center'}}>
						<TouchableOpacity
		                    onPress={()=>{}} 
		                    style={styles.profileImageContainer}
		                    >
		                    <Text>SAVE</Text>
			            </TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}