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
    centeredRow:{
        flex:1, 
        flexDirection:'row', 
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
    headerIcon:{
        height:20,
        width:20,
        resizeMode:'contain'
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
    },
    profileImageContainer:{
    	height:140,
        width:140,
        borderRadius:70,
        backgroundColor:'#e0e0e0', 
        justifyContent:'center',
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{width: 0, height: 5},
        shadowOpacity:.4,
        shadowRadius: 4,
        elevation:10,
    },
    profileImage:{
    	height:140,
        width:140,
        borderRadius:70,
    	resizeMode:'cover', 
    },
    saveButton:{
        backgroundColor:'#009688', 
        width:80,
        height:30, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:2
    },
    saveButtonText:{
        color:'#fff', 
        fontWeight:'bold' 
    }
});

export default styles;