import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, Switch } from 'react-native';
import { DarkModeContext } from '../App'; // dark mode content
// dark mode works only for the Settings Screen and Tab navigation

// importing logo image
import logo_full from '../assets/logos/logo_full.png';
// dark mode image
import logo_full_darkmode from '../assets/logos/logo_full2.png';

export const SettingsScreen = (props) => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext); // access dark mode state

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // toggle the dark mode state
  };

  return (
    <View style={[styles.screenContainer, { backgroundColor: darkMode ? '#1c1b1b' : '#fff' }]}>
      <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>

        {/* logo changes depending on the dark mode toggle */}
        <Image source={darkMode ? logo_full_darkmode : logo_full} style={styles.logoImage} />

        <TouchableHighlight
          style={styles.button}
          // underlayColor='#fff' // colour when pressed the "button"
          underlayColor={darkMode ? '#1c1b1b' : '#fff'} // colour when pressed the "button", has different colour depending on the dark mode
          onPress={() => props.navigation.navigate('Order', { screen: 'PastOrders' })}
        >
          <Text style={[styles.buttonText, { color: darkMode ? '#ffc399' : '#F58C41' }]}>Past Orders</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          underlayColor={darkMode ? '#1c1b1b' : '#fff'}
          onPress={() => props.navigation.navigate('Home', { screen: 'Address' })}>
          <Text style={[styles.buttonText, { color: darkMode ? '#ffc399' : '#F58C41' }]}>Address Details</Text>
        </TouchableHighlight>

        {/* dark mode switch */}
        <View style={styles.settingRowDarkMode}>
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
          underlayColor={darkMode ? '#1c1b1b' : '#fff'}
          onPress={() => props.navigation.navigate('Home', { screen: 'AboutUs' })}>
          <Text style={[styles.buttonText, { color: darkMode ? '#ffc399' : '#F58C41' }]}>About Us</Text>
        </TouchableHighlight>

        {/* the button isn't working, that's why it's grey */}
        <TouchableHighlight
          style={styles.button}
          underlayColor={darkMode ? '#1c1b1b' : '#fff'}
          onPress={() => console.log('Log Out')}>
          <Text style={[styles.buttonText, { color: darkMode ? '#d4d2d2' : '#828181' }]}>Log Out</Text>
        </TouchableHighlight>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff", // covers the grey background
  },
  logoImage: {
    height: 210,
    width: 280,
    bottom: 30,
  },
  button: {
    margin: 6,
    paddingTop: 12,
    width: 200,
    height: 50,
  },
  buttonText: {
    flex: 3,
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
  settingRowDarkMode: { // toggle kind of messes up with the appearance, so I had to add heigh property specificly for this one
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    width: 200,
    height: 65,
  },
});