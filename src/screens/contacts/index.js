'use strict'

import React, {Component} from 'react';
import {View, Text, Image,ListView,TouchableOpacity, ScrollView} from 'react-native';

import api from 'src/common/api';
import styles from 'src/common/styles';
import Header from '../Header';

let ds = new ListView.DataSource(
         {rowHasChanged: (r1, r2) => r1!== r2});
export default class Contacts extends Component{
	constructor(props){
		super(props);
		this.state = {
                dataSource: ds,
                contacts:null,
                options:false,
        };
        this.contactsSuccess = this.contactsSuccess.bind(this);
        this.contactsError = this.contactsError.bind(this);
        this.renderContacts = this.renderContacts.bind(this);
	}
	componentDidMount(){
		let params = {
                method:'contacts.json',
                type:"GET",
                onSuccess:this.contactsSuccess,
                onError:this.contactsError,
            } 
		api.request(params);
	}
	shouldComponentUpdate(nextProps, nextState){
     	return nextState.options;
 	}
	contactsSuccess(response){
		if(response && response.length){
			let contacts = api.sortAndGroup(response);
			this.setState({contacts:contacts});
			console.log(contacts);
			let options = {};
			Object.keys(contacts).forEach((key, index)=>{
				options[key] = ds.cloneWithRows(contacts[key]);
			});
			this.setState(options);
			this.setState({options:true});
			
		}
	}
	contactsError(error){
		console.log(error);
	}
	renderRightIcon(){
		return(
			<Image
		        style={styles.headerIcon}
		        source={require('src/Images/user.png')}/>
		);
	}
	renderContacts(){
		let _this =this;
		return(
			<View style ={{flex:1}}>
				{this.state.contacts && Object.keys(this.state.contacts).map((key) => {
                    return (
	                    <View style ={{flex:1, flexDirection:'row'}} key={key}>
	                    	<View style ={{flex:2,}}>
	                    		{(key ==='Favorite')?(
	                    			<Image
								        style={{height:20,width:20, Mode:'contain'}}
								        source={require('src/Images/star.png')}
								      />
	                    			):(
	                    			<Text style ={{fontSize:20, color:'#fd3a7d', fontWeight:'bold', lineHeight:45}}>{key}</Text>
	                    		)}
		                    </View>
		                    <View style ={{flex:8,borderRightWidth:2, borderRightColor:'#e0e0e0'}}>
		                    	<ListView
							      dataSource={_this.state[key]}
							      renderRow={_this.renderRow.bind(_this)}
							    />
		                    </View>
	                    </View>
					 )
                	})
				}
			</View>
		);
	}
	renderRow(rowData, sectionID, rowID){
	  let {id, first_name, last_name, profile_pic, url} =rowData
	  return( 
	  	<TouchableOpacity
	         underlayColor="#E0E0E0"
	         onPress ={()=>{api.showContactDetails(rowData)}}
	         style={{flex:1, }}
	          >
	           <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', paddingLeft:10, paddingRight:10, paddingTop:10, paddingBottom:10}}>              
	                <View style={{flex:2}}>
	                 	{(profile_pic ==='/images/missing.png')?(
		                 	<Image
				              style={styles.listAvatar}
				              source={require('src/Images/default-avatar.png')}/>
			              ):(
	                 		<Image
				              style={styles.listAvatar}
				              source={{uri:profile_pic}}/>
	                 	)}
	                </View>
	                 <View style={{flex:8}}>
	                       <Text style={{justifyContent:'center',alignItems:'center', fontSize:16}}>{first_name+" "+last_name}</Text>
	                 </View>
	                
	           </View>
	     </TouchableOpacity>
	     );
	}
	render(){
		return(
			<View style={styles.container}>
				<Header title="Contact Book" isBackButton={false} renderRightIcon ={this.renderRightIcon.bind(this)}/>
				<ScrollView style={{marginLeft:16, marginRight:16,}}>
					{this.renderContacts()}
				</ScrollView>
				<TouchableOpacity
	                    onPress={()=>{api.navigator.push({Name :'addContact'})}} 
	                    style={styles.floatingButton}
	                    >
	                    <Text style={styles.fabText}>+</Text>
	            </TouchableOpacity>
			</View>
		);
	}
}