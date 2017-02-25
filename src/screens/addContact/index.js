'use strict'

import React, {Component} from 'react';
import {View, Text, Image,ListView,TouchableOpacity, ScrollView,TextInput} from 'react-native';
var ImagePicker = require('react-native-image-picker');
import { connect, bindActionCreators } from 'react-redux'
import Share from 'react-native-share';

import {fetchContacts, addContact, updateContact} from 'src/actions'

import api from 'src/common/api';
import styles from 'src/common/styles';
import Header from '../Header';

const imageOptions = {
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
};
const isValidName =(name)=>{
	return (name && name.length);
};
const isValidPhoneNumber = (phone)=>{
	if(phone && phone.length < 10) return false;
	let regex = /^\+|[0-9]{1}[0-9]{3,14}$/;
	return (regex.test(phone));
	//^\+[1-9]{1}[0-9]{3,14}$
	
};

class AddContact extends Component{
	constructor(props){
		super(props);
		let {id, first_name, last_name, profile_pic, url, email,phone_number, title,favorite} = props.data ||{};
		this.state = {
            profile_pic:profile_pic || null, 
            first_name:first_name ||'',
            last_name:last_name||'',
            email:email||'',
            phone_number:phone_number||'',
            id:id || null,
            title:title|| "Add Contact",
            favorite, 
            url,
            uploadedImage:null,
        }
        this.updateInputState = this.updateInputState.bind(this);
        this.addContact = this.addContact.bind(this);
        this.addContactSuccess = this.addContactSuccess.bind(this);
        this.addContactError = this.addContactError.bind(this);
        
	}
	
	openImagePicker(){
		ImagePicker.showImagePicker(imageOptions, (response) => {
		  console.log('Response = ', response);

		  if (response.didCancel) {
		    console.log('User cancelled image picker');
		  }
		  else if (response.error) {
		    console.log('ImagePicker Error: ', response.error);
		  }
		  else {
		    this.setState({
		      profile_pic: response.uri,
		      uploadedImage:response.data,
		    });
		  }
		});
	}

	updateInputState(name, value){
		this.setState({[name]:value});
	}
	addContact(){
		if(!isValidName(this.state.first_name)){
			alert("First Name not valid");
			return;
		}
		if(!isValidPhoneNumber(this.state.phone_number)){
			alert("Mobile Phone Number not valid");
			return;
		}
		let {id, first_name, last_name, profile_pic, url, email,phone_number, title, favorite, uploadedImage} = this.state;
		
		let params = {
                method:(!id)?'contacts.json':'contacts/'+id+'.json',
                type:(title ==="Edit Contact")?"PUT":"POST",
                onSuccess:this.addContactSuccess,
                onError:this.addContactError,
                input:{
                	first_name:first_name, 
                	last_name:last_name,
                	phone_number:phone_number,
                	email:email,
                }
            } 
        if(uploadedImage){
        	params.input.profile_pic = uploadedImage
        }
		api.request(params);

	}
	addContactSuccess(response){
		if(response){
			(this.state.tite ==="Add Contact")?this.props.addContact({...response,updated:true}):this.props.updateContact(response,updated:true);
			api.navigator.pop(0);
		}
	}
	addContactError(error){
		console.log(error);
	}
	render(){
		let {id, first_name, last_name, profile_pic, url, email,phone_number, title} = this.state;
		return(
			<View style={styles.container}>
				<Header title={title} isBackButton={true}/>
				<ScrollView style ={{margin:16}} keyboardShouldPersistTaps='always'>
					<View style={styles.centering}>
						<TouchableOpacity
		                    onPress={this.openImagePicker.bind(this)} 
		                    style={styles.profileImageContainer}
		                    >
		                    {(profile_pic && profile_pic !=='/images/missing.png')?(
		                    	<Image
					              style={styles.profileImage}
					              source={{uri:profile_pic}}/>
		                    	):(
		                    	<Image
					              style={styles.profileImage}
					              source={require('src/Images/default-avatar.png')}/>
		                    )}
			            </TouchableOpacity>
					</View>
					<View style={{}}>
						<TextInput autoCapitalize ={'words'} placeholder ="First name"
						 onChangeText={(text) => this.updateInputState("first_name", text)}
						 value ={first_name}/>
						<TextInput autoCapitalize ={'words'} placeholder ="Last name"
						onChangeText={(text) => this.updateInputState("last_name", text)}
						value={last_name}/>
						<TextInput keyboardType ={'phone-pad'} placeholder ="Mobile Number" maxLength ={15}
						onChangeText={(text) => this.updateInputState("phone_number", text)}
						value={phone_number}/>
						<TextInput keyboardType ={'email-address'} placeholder ="Email Address"
						onChangeText={(text) => this.updateInputState("email", text)}
						value={email}/>
					</View>
					<View style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
						<TouchableOpacity
		                    onPress={this.addContact} 
		                    style={styles.saveButton}
		                    >
		                    <Text style={styles.saveButtonText}>{(title==="Add Contact")?"SAVE":"UPDATE"}</Text>
			            </TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchContacts: () => dispatch(fetchContacts()),
    addContact:(user) =>dispatch(addContact(user)),
    updateContact: (user) => dispatch(updateContact(user)),
  }
};

const mapStateToProps = (state) => {
	return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(AddContact);