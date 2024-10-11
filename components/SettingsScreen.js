import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableHighlight } from 'react-native';

// Import the components
import NavButtons from './NavButtons.js';
// idk what was this for but this import \/ didn't allow the text to appear so I had to close it
// import { Text } from 'react-native-svg';

export const SettingsScreen=(props)=>{
    return (
        <View style={{flex:1}}>
        <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Text>Settings Screen</Text> */}


        <TouchableHighlight
          style={styles.button}
          underlayColor='#fff' // colour when pressed the "button"
          // onPress={() => props.navigation.navigate("Dough")} 
          onPress={()=> console.log('Past Orders')}
          >
          <Text style={[styles.buttonText]}>Past Orders</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          underlayColor='#fff'
          // onPress={()=> console.log('Address Details')}
          onPress={() => props.navigation.navigate("Address")} 
          >
          <Text style={[styles.buttonText]}>Address Details</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          underlayColor='#fff'
          onPress={()=> console.log('Settings')}
          >
          <Text style={[styles.buttonText]}>Settings</Text>
        </TouchableHighlight>
        
        <TouchableHighlight
          style={styles.button}
          underlayColor='#fff'
          onPress={()=> console.log('About Us')}
          >
          <Text style={[styles.buttonText]}>About Us</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          underlayColor='#fff'
          onPress={()=> console.log('Log Out')}
          >
          <Text style={[styles.buttonText]}>Log Out</Text>
        </TouchableHighlight>
         
        </View>
      </View>
    );
  }

  const styles=StyleSheet.create({
    navbuttonstyle:{
      flex:2,
      flexDirection:"row",
      backgroundColor:"#def",
      alignItems:"center",
      justifyContent:"space-around",    
    },
    imageContainer:{
      height:200,
      width:'50%',
      borderRadius:200,
      overflow:'hidden',
      borderWidth:3,
      borderColor:'red',
    },
    image:{
      height:'100%',
      width:'100%'
    },
    listItemStyle:{
      borderWidth:1,
      borderColor:"blue",
      padding:5,
      backgroundColor:"#abc",
      width:"80%",
      alignSelf:"center",
    },
    listStyle:{
      flex:8,
      alignItems:"center",
      backgroundColor:"#fff",
      borderColor:"red",
      borderWidth:2,
      width:"100%",
    },
    flatliststyle:{
      width:'80%',
      backgroundColor:'blue',
    },
    button: {
      backgroundColor:"#fff", // yes I know the white is ugly visible, I am working on it
      margin: 6,
      paddingTop: 12,
      width: 200,
      height: 50,
    },
    buttonText: {
      flex:3,
      fontSize: 20,
      fontWeight: 'bold',
      color: '#F58C41',
      textAlign: 'center',
      alignItems: 'center',
    },
  });