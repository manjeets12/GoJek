import React from 'react';
import {
    StyleSheet, 
    View,
    Image, 
    Text, 
    TouchableHighlight, 
    TouchableOpacity, 
    Dimensions,
    Platform,
} from 'react-native';

import api from 'src/common/api';

const {height, width} = Dimensions.get('window');

const Header =(props)=>{
	let {title, isBackButton,rightIcon} =props;
    return (
         <View style={styles.headerContainer}>
             <View style={styles.sideContainer}>
             	{(isBackButton && 
             	<TouchableOpacity onPress={()=>api.navigator.pop()}>
			      <Image
			        style={styles.backButton}
			        source={require('src/Images/back-arrow.png')}
			      />
			    </TouchableOpacity>)}
             </View>
             <View style={styles.middleContainer}>
             	<Text style={[styles.boldText,{paddingLeft:20}]}>{title}</Text>
             </View>
             <View style={styles.sideContainer}>
             	 {(rightIcon && 
             	 	<Image
			        style={styles.backButton}
			        source={require('src/Images/user.png')}
			      />)}
             </View>
        </View>
    );
}
Header.propTypes={
    title:React.PropTypes.string.isRequired,
    rightIcon:React.PropTypes.string,
    isBackButton:React.PropTypes.bool,
};
Header.defaultProps = {
  title: '',
  isBackButton:true,
};

var styles =  StyleSheet.create({
	centering:{
		justifyContent:'center',
		alignItems:'center'
	},
	headerContainer:{
		flexDirection:'row', 
		backgroundColor:'#3f51b5', 
		height:50, 
		alignItems:'center', 
		paddingLeft:16,
		paddingRight:16,
		elevation:10,
		shadowOffset:{width: 0, height: 5},
        shadowOpacity:.4,
        shadowRadius: 4,
	},
	middleContainer:{
		flex:8,
		justifyContent:'center',
	},
	sideContainer:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	boldText:{
		fontWeight: 'bold', 
		fontSize:20,
		color:'#fbfbfd'
	},
	backButton:{
		height:20,
		width:20,
		resizeMode:'contain'
	},
});

module.exports = Header;