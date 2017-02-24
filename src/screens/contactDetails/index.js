'use strict'

import React, {Component} from 'react';
import {View, Text, Image,ListView,TouchableOpacity, ScrollView,TextInput,StyleSheet} from 'react-native';

import Share from 'react-native-share';

import {CALL_ICON, HEART_ICON, HEART_ICON_RED, ENVELOPE_ICON} from 'src/common/constants';
import api from 'src/common/api';
import styles from 'src/common/styles';
import Header from '../Header';

const ContentLines =({value, iconSource, textStyle, performAction})=>{

	return (
		<View style={localStyles.fieldContainer}>
			<TouchableOpacity
                onPress={performAction}>
                <Image
	              style={styles.headerIcon}
	              source={iconSource}/>
            </TouchableOpacity>
            <View style={[styles.centering, {marginLeft:10}]}>
               <Text style={textStyle}>{value}</Text>
         	</View>
		</View>
	);
};
ContentLines.propTypes={
    value:React.PropTypes.string,
    iconSource:React.PropTypes.number,
    textStyle:Text.propTypes.style,
    performAction:React.PropTypes.func
};
ContentLines.defaultProps = {
  value: '',
  iconSource:0,
  textStyle:{},
  performAction:()=>{}
};

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
        this.toggleFavorite = this.toggleFavorite.bind(this);
        this.toggleFavoriteSuccess = this.toggleFavoriteSuccess.bind(this);
        this.toggleFavoriteError = this.toggleFavoriteError.bind(this);
        this.shareContact = this.shareContact.bind(this);
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
	toggleFavorite(){
		let {id,favorite} = this.state;
		let params = {
                method:'contacts/'+id+'.json',
                type:"PUT",
                onSuccess:this.toggleFavoriteSuccess,
                onError:this.toggleFavoriteError,
                input:{favorite : !favorite}
        } 
		api.request(params);
	}
	toggleFavoriteSuccess(respone){
		if(respone){
			this.setState({favorite:respone.favorite});
		   console.log(respone);
		}
	}
	toggleFavoriteError(error){
		console.log(error);
	}
	shareContact(){
		let {first_name, last_name, profile_pic, url, email,phone_number} = this.state;
		let fullName = first_name + " " +last_name ;
		let shareOptions = {
                title: "React Native",
      message: "Hola mundo",
      url: REACT_ICON,
      subject: "Share Link"
                //url:url 
        };
        Share.open(shareOptions).catch((err) => { err && console.log(err); });
	}
	renderRightIcon(){
		let state = this.state;
		return(
			<View style={styles.centeredRow}>
				<TouchableOpacity onPress={()=>api.navigator.push({Name:'addContact',data:{...state, title:"Edit Contact"}})}>
			      <Image
			        style={styles.headerIcon}
			        source={require('src/Images/more.png')}
			      />
			    </TouchableOpacity>
			    <TouchableOpacity onPress={this.shareContact}>
			      <Image
			        style={styles.headerIcon}
			        source={require('src/Images/share.png')}
			      />
			    </TouchableOpacity>
			</View>
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
					<ContentLines 
						value = {first_name+" "+last_name} 
						iconSource ={(!favorite)?HEART_ICON:HEART_ICON_RED} 
						textStyle={localStyles.heavyText}
						performAction={this.toggleFavorite}/>
					{phone_number && 
						<ContentLines 
							value = {phone_number} 
							iconSource ={CALL_ICON} 
							textStyle={localStyles.smallText}
							performAction={()=>{api.openURL('tel:'+phone_number)}}/>
					}
					{email && 
						<ContentLines 
							value ={email} 
							iconSource ={ENVELOPE_ICON} 
							textStyle ={localStyles.smallText}
							performAction={()=>{api.openURL('mailto:'+email)}}/>
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