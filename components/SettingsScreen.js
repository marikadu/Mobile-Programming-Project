import React from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';

// Import the components
import NavButtons from './NavButtons.js';
import { Text } from 'react-native-svg';

export const SettingsScreen=(props)=>{
    return (
        <View style={{flex:1}}>
        <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings Screen</Text>
         
        <Button onPress={()=> console.log('Past Orders')} title="Past Orders"/>
        <Button onPress={()=> console.log('Address Details')} title="Address Details"/> 
        <Button onPress={()=> console.log('Settings')} title="Settings"/>
        <Button onPress={()=> console.log('About Us')} title="About Us"/>
        <Button onPress={()=> console.log('Log Out')} title="Log Out"/>
        </View>
      </View>
    );
  }

  // const styles=StyleSheet.create({
  //   navbuttonstyle:{
  //     flex:2,
  //     flexDirection:"row",
  //     backgroundColor:"#def",
  //     alignItems:"center",
  //     justifyContent:"space-around",    
  //   },
  //   imageContainer:{
  //     height:200,
  //     width:'50%',
  //     borderRadius:200,
  //     overflow:'hidden',
  //     borderWidth:3,
  //     borderColor:'red',
  //   },
  //   image:{
  //     height:'100%',
  //     width:'100%'
  //   },
  //   listItemStyle:{
  //     borderWidth:1,
  //     borderColor:"blue",
  //     padding:5,
  //     backgroundColor:"#abc",
  //     width:"80%",
  //     alignSelf:"center",
  //   },
  //   listStyle:{
  //     flex:8,
  //     alignItems:"center",
  //     backgroundColor:"#eee",
  //     borderColor:"red",
  //     borderWidth:2,
  //     width:"100%",
  //   },
  //   flatliststyle:{
  //     width:'80%',
  //     backgroundColor:'blue',
  //   },
  // });