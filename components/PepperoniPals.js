import React from 'react';
import { View, Image, StyleSheet, NavButtons } from 'react-native';

// Import the components
import NavButton from './NavButton.js';

const PepperoniPalsView=props=>{
    return (
      <View style={{flex:1}}>
        <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.imageContainer}>
          <Image source={require('../assets/pizza_pngs/everything_pizza.png')}
              style={styles.image} resizeMode='cover'/>
          </View> 
        </View>
        <NavButtons params={props}/>
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
      backgroundColor:"#eee",
      borderColor:"red",
      borderWidth:2,
      width:"100%",
    },
    flatliststyle:{
      width:'80%',
      backgroundColor:'blue',
    },
  });

  export default PepperoniPalsView;