import React, { useContext } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableHighlight, Switch } from 'react-native';
import { DarkModeContext } from '../App'; // dark mode content

import logo_full from '../assets/logos/logo_full.png';
import logo_full_darkmode from '../assets/logos/logo_full2.png';

// Import the components
import NavButtons from './NavButtons.js';
// idk what was this for but this import \/ didn't allow the text to appear so I had to close it
// import { Text } from 'react-native-svg';

export const SettingsScreen=(props)=>{
  const { darkMode, setDarkMode } = useContext(DarkModeContext); // access dark mode state

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // toggle the dark mode state
  };

    return (
      <View style={[styles.screenContainer, { backgroundColor: darkMode ? '#1c1b1b' : '#fff' }]}>
        <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>

        <Image source={darkMode ? logo_full_darkmode : logo_full} style={styles.logoImage} />

        <TouchableHighlight
          style={styles.button}
          underlayColor='#fff' // colour when pressed the "button"
          // onPress={() => props.navigation.navigate("Dough")} 
          onPress={()=> props.navigation.navigate('Order', { screen: 'PastOrders'})} 
          >
          <Text style={[styles.buttonText, { color: darkMode ? '#ffc399' : '#F58C41' }]}>Past Orders</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          underlayColor='#fff'
          onPress={() => props.navigation.navigate('Home', { screen: 'Address' })}
          >
          <Text style={[styles.buttonText, { color: darkMode ? '#ffc399' : '#F58C41' }]}>Address Details</Text>
        </TouchableHighlight>

        {/* dark mode switch */}
        <View style={styles.settingRow}>
          <Text style={[styles.buttonText, { color: darkMode ? '#ffc399' : '#F58C41' }]}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#4a4848" }}
            thumbColor={darkMode ? "#adaaaa" : "#f2f0f2"}
            onValueChange={toggleDarkMode}
            value={darkMode}
          />
        </View>
        
        <TouchableHighlight
          style={styles.button}
          underlayColor='#fff'
          onPress={()=> console.log('About Us')}
          >
          <Text style={[styles.buttonText, { color: darkMode ? '#ffc399' : '#F58C41' }]}>About Us</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          underlayColor='#fff'
          onPress={()=> console.log('Log Out')}
          >
          <Text style={[styles.buttonText, { color: darkMode ? '#ffc399' : '#F58C41' }]}>Log Out</Text>
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
    logoImage:{
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
      fontSize: 24,
      fontWeight: 'bold',
      color: '#F58C41',
      textAlign: 'center',
      alignItems: 'center',
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'space-around',
      width: 200,
    },
  });