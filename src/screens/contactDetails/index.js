'use strict'

import React, {Component} from 'react';
import {View, Text, Image,ListView,TouchableOpacity, ScrollView,TextInput,StyleSheet} from 'react-native';

import {CALL_ICON, HEART_ICON, ENVELOPE_ICON} from 'src/common/constants';
import api from 'src/common/api';
import styles from 'src/common/styles';
import Header from '../Header';

export default class ContactDetails extends Component{
	constructor(props){
		super(props);
		let {id, first_name, last_name, profile_pic, url} = props.data;

		this.state = {
                id, 
                first_name, 
                last_name, 
                profile_pic, 
                url
        };
        this.getDetails = this.getDetails.bind(this);
        this.detailsSuccess = this.detailsSuccess.bind(this);
        this.detailsError = this.detailsError.bind(this);
	}
	/*componentWillMount(){
		
	}*/
	componentDidMount(){
		this.getDetails();
	}
	getDetails(){
		let params = {
                method:'contacts/'+this.state.id+'.json',
                type:"GET",
                onSuccess:this.detailsSuccess,
                onError:this.detailsError,
            } 
		api.request(params);
	}
	detailsSuccess(respone){
		if(respone){
			let {id, first_name, last_name, profile_pic, url, email,phone_number,favorite} = respone;
			this.setState({
				id, 
				first_name, 
				last_name, 
				profile_pic, 
				url, 
				email,
				phone_number,
				favorite
			});
		}
		console.log(respone);
	}
	detailsError(error){
		console.log(error);
	}
	renderRightIcon(){
		let state = this.state;
		return(
			<TouchableOpacity onPress={()=>api.navigator.push({Name:'addContact',data:{...state, title:"Edit Contact"}})}>
		      <Image
		        style={styles.headerIcon}
		        source={require('src/Images/more.png')}
		      />
		    </TouchableOpacity>
		);
	}
	render(){
		let {id, first_name, last_name, profile_pic, url, phone_number,email, favorite} = this.state;
		return(
			<View style={styles.container}>
				<Header title="Detail" isBackButton={true} renderRightIcon={this.renderRightIcon.bind(this)}/>
				<ScrollView style ={{padding:16}}>
					<View style={styles.centering}>
	                    {(profile_pic ==='/images/missing.png')?(
		                 	<Image
				              style={styles.profileImage}
				              source={require('src/Images/default-avatar.png')}/>
		              	):(
	                 		<Image
				              style={styles.profileImage}
				              source={{uri:profile_pic}}/>
                 		)}
					</View>
					<View style={localStyles.fieldContainer}>
						<TouchableOpacity
		                    onPress={()=>{}}>
		                    <Image
				              style={styles.headerIcon}
				              source={require('src/Images/heart.png')}/>
		                </TouchableOpacity>
			            <View style={[styles.centering, {marginLeft:10}]}>
	                       <Text style={localStyles.heavyText}>{first_name+" "+last_name}</Text>
	                 	</View>
					</View>
					{phone_number && 
						<View style={localStyles.fieldContainer}>
							<TouchableOpacity
		                    onPress={()=>{}}>
			                    <Image
					              style={styles.headerIcon}
					              source={require('src/Images/call.png')}/>
			                </TouchableOpacity>
				            <View style={[styles.centering, {marginLeft:10}]}>
		                       <Text style={localStyles.smallText}>{phone_number}</Text>
		                 	</View>
						</View>
					}
					{email && 
						<View style={localStyles.fieldContainer}>
							<TouchableOpacity
			                    onPress={()=>{}}>
			                    <Image
					              style={styles.headerIcon}
					              source={ENVELOPE_ICON}/>
			                </TouchableOpacity>
				            <View style={[styles.centering, {marginLeft:10}]}>
		                       <Text style={localStyles.smallText}>{email}</Text>
		                 	</View>
						</View>
					}
				</ScrollView>
			</View>
		);
	}
}
const localStyles=StyleSheet.create({
	fieldContainer:{
		flexDirection:'row', 
		justifyContent:'center',
		alignItems:'center', 
		marginTop:16
	},
	heavyText:{
		justifyContent:'center',
		alignItems:'center', 
		fontSize:20, 
		fontWeight:'bold', 
		color:'#292929'
	},
	smallText:{
		justifyContent:'center',
		alignItems:'center', 
		fontSize:16, 
		color:'#525252'
	}
});