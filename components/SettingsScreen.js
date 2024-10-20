import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableHighlight } from 'react-native';

import logo2 from '../assets/logos/logo_full.png';

// Import the components
import NavButtons from './NavButtons.js';
// idk what was this for but this import \/ didn't allow the text to appear so I had to close it
// import { Text } from 'react-native-svg';

export const SettingsScreen=(props)=>{
    return (
        <View style={styles.screenContainer}>
        <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>

        <Image source={logo2} style={styles.pizzaImage} />

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
    screenContainer:{
      flex:1,
      backgroundColor:"#fff", // covers the grey background
    },
    pizzaImage:{
      height:210,
      width:280,
      bottom: 30,
    },
    button: {
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