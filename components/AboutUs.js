import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, Image, StyleSheet, TouchableHighlight, } from 'react-native';
import PizzaList from './PizzaList'; // Import the reusable PizzaList component

import logo_full3 from '../assets/logos/logo_full3.png';

// Import the DATABASE
import { fetchAllPizza } from '../database/db';

// const PepperoniPalsView = ({route, navigation}) =>{
const AboutUsScreen = (props) =>{
    return (

      <View style={styles.screenContainer}>
        <Image source={logo_full3} style={styles.logoImage} />
        
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
      // bottom: 30,
    },
    pizzaImage:{
      height:100,
      width:100,
      bottom: 100,
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
      borderWidth: 2,
      borderColor:"#CD6524",
      padding:5,
      backgroundColor:"#FFF9F2",
      borderRadius: 20,
      margin: 10,
      width:"100%",
      alignSelf:"center",
    },
    listStyle:{
      flex:8,
      alignItems:"center",
      width:260,
    },
    flatliststyle:{
      flex: 1,
      width:'100%',
      backgroundColor:'#FFFFFF',
    },
    itemContainer: {
      padding: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textContainer: {
      marginLeft: 20,
      flex: 1,
    },
    itemText: {
      color: "#8A4012",
      fontSize: 18,
      paddingLeft: 5,
      margin: 2,
    },
    descriptionText: {
      flex: 1,
      color: "#CD6524",
      fontSize: 16,
    },
    pizzaImage: {
      width: 80,
      height: 80,
      borderRadius: 25
    },
    button: {
      margin: 20,
      paddingTop: 10,
      width: 250,
      height: 56,
      backgroundColor: '#F58C41',
      borderRadius: 40,
    },
    buttonText: {
      flex:1,
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      alignItems: 'center',
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