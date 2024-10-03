import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';

// Import the components
import NavButtons from './NavButtons.js';

export const DetailsScreen=(props)=>{
    const [newFish, setFish]=useState(props.route.params==undefined ? "" : props.route.params.fish.breed);
    useEffect(()=>{
        setFish(props.route.params==undefined ? "" : props.route.params.fish.breed);
  
      },[props.route.params]
    );
    const fishInputHandler=(enteredText)=>{
      setFish(enteredText);
    }
  
    return (
      <View style={{flex:1}}>
        <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>
          <TextInput style={styles.inputStyle} placeholder="Pizza Type..." 
          onChangeText={fishInputHandler}
          value={newFish} />
        {props.route.params ? <Text>{props.route.params.fish.id}) {props.route.params.fish.breed} {props.route.params.fish.weight}</Text> : null}
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