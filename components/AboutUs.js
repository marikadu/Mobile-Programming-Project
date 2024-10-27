import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import logo_full3 from '../assets/logos/logo_full3.png'; // Imports the logo

const AboutUsScreen = () =>{
    return (
      <View style={styles.screenContainer}>
        {/* logo image */}
        <Image source={logo_full3} style={styles.logoImage} />
        
        {/* text for about us */}
        <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center', }}>
            <Text style={styles.text}>
                Pepperoni Pals dolor sit amet, consectetur adipiscing elit. Aenean pretium consectetur rutrum. Fusce ac orci ultrices, elementum nibh ut, egestas ipsum. Nam et auctor mauris. Cras a tortor hendrerit, mattis massa non, rhoncus metus. Nam quis rutrum nulla. Quisque ac velit egestas metus feugiat vestibulum. Nullam sed mauris et felis efficitur elementum. Integer leo neque, blandit et posuere vel, condimentum sed magna.
            </Text>
            <Text style={styles.text}>
                Ut euismod rutrum quam. Morbi vel sodales massa, lobortis fringilla est. Aliquam erat volutpat.
            </Text>
        </View>
      </View>
    );
  }

  const styles=StyleSheet.create({
    screenContainer:{
      flex:1,
      backgroundColor:"#fff", // covers the grey background
      padding: 10
    },
    logoImage:{
      height:80,
      width:300,
      alignSelf: 'center',
    },
    text: {
      color: '#CD6524',
      fontSize: 18,
      textAlign: 'center',
      justifyContent: 'flex-end',
      padding: 20,
      backgroundColor: '#FFE8D8',
      borderRadius: 10,
      margin: 20,
    },
  });

  export default AboutUsScreen;