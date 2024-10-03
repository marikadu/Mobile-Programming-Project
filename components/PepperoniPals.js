import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// Import the components
import NavButtons from './NavButtons.js';

const PepperoniPalsView = props =>{
    return (
      <View style={{flex:1}}>
        <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.imageContainer}>
          <Image source={require('../assets/pizza_pngs/everything_pizza.png')}
              style={styles.image} resizeMode='cover'/>
          </View> 
        </View>
        {/* <NavButtons params={props.params}/> */}
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
  });

  export default PepperoniPalsView;