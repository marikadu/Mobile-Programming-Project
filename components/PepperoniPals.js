import React from 'react';
import {Button, View, Image, StyleSheet } from 'react-native';

// Import the components
import NavButtons from './NavButtons.js';

// const PepperoniPalsView = ({route, navigation}) =>{
  const PepperoniPalsView = (props) =>{
    return (
      <View style={{flex:1}}>
        <Button onPress={()=> props.navigation.navigate("Dough")} title="Create your Pizza"/> 
        <Button onPress={()=> props.navigation.navigate("Menu")} title="See Menu"/> 
        <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.imageContainer}>
          <Image source={require('../assets/pizza_pngs/everything_pizza.png')}
              style={styles.image} resizeMode='cover'/>
          </View> 
        </View>
        {/* <NavButtons params={props.params}/> */}
        {/* <NavButtons navigation={navigation} route = {route}/> */}
        <NavButtons params={props}/>
      </View>
    );
  }

  const styles=StyleSheet.create({
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
    navbuttonstyle:{
      flex:2,
      flexDirection:"row",
      backgroundColor:"#def",
      alignItems:"center",
      justifyContent:"space-around",    
    },
  });

  export default PepperoniPalsView;