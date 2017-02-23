'use strict';
import {StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

const styles=StyleSheet.create({
	container: {
		flex: 1,
	},
	centering:{
		justifyContent:'center',
		alignItems:'center'
	},
	floatingButton:{
        position: 'absolute',
        bottom: 20,
        right: 30,
        height:50,
        width:50,
        borderRadius:25,
        backgroundColor:'#3f51b5', 
        justifyContent:'center',
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{width: 0, height: 5},
        shadowOpacity:.4,
        shadowRadius: 4,
        elevation:10,
    },
    fabText:{
    	fontSize:35, 
    	color:'white', 
    	textAlign:'center'
    },
    listAvatar:{
    	width:40, 
    	height:40, 
    	resizeMode:'cover', 
    	borderRadius:20
    }
});

export default styles;