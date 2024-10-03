import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';

// Import the components¨
import NavButtons from './NavButtons.js';

export const HomeScreen=(props)=>{
    const [newFish, setFish]=useState("");
    const [updateId, setUpdateId]=useState(0);
    const [fishList, addFish]=useState([{"id":1, "breed":"Bream", "weight":100}, {"id":2, "breed":"Burbot", "weight":400}, {"id":3, "breed":"Tench", "weight":800}]);
    
    const selectItemToUpdate=(id)=>{
      setUpdateId(id);
      setFish(fishList[id].breed);
      props.navigation.navigate("Details", {fish:fishList[id]});
    }
    const renderFish=(item)=>{
      return(
        <TouchableOpacity activeOpacity={0.8} onPress={()=>selectItemToUpdate(item.index)}>
          <View style={styles.listItemStyle}>
            <Text>{item.index} {item.item.id} {item.item.breed} {item.item.weight}</Text>
          </View>
        </TouchableOpacity>
      );
    
    }
    return (
      <View style={{flex:1}}>
          <View style={styles.listStyle}>
          <Text>Home Screen</Text>
            <FlatList style={styles.flatliststyle}
              data={fishList}
              renderItem={renderFish}
            />
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