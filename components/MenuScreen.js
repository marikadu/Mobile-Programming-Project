import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';

// Import the component
import NavButtons from './NavButtons.js';

export const MenuScreen=(props)=>{
    const [newPizza, setPizza]=useState("");
    const [updateId, setUpdateId]=useState(0);
    const [pizzaList, addFish]=useState([
      {"id":1, "type":"Pepperoni", "price":100, image: require('../assets/misc.png') },
      {"id":2, "type":"Mozzarella", "price":40, image: require('../assets/pizza_pngs/everything_pizza.png') },
      {"id":3, "type":"Four Cheeses", "price":90, image: require('../assets/pizza_pngs/topping_pepperoni.png') }]);
    
    const selectItemToUpdate=(id)=>{
      setUpdateId(id);
      setPizza(pizzaList[id].type);
      props.navigation.navigate("Details", {pizza:pizzaList[id]});
    }
    const renderPizza=(item)=>{
      return(
        <TouchableOpacity activeOpacity={0.8} onPress={()=>selectItemToUpdate(item.index)}>
          <View style={styles.listItemStyle}>
            {/* Below is the Image for the menu  */}
            <Image source={item.item.image} style={styles.pizzaImage}/>
            <Text>{item.index}) {item.item.id} {item.item.type} {item.item.price}€</Text>
          </View>
        </TouchableOpacity>
      );
    
    }
    return (
      <View style={{flex:1}}>
          <View style={styles.listStyle}>
          <Text>Menu Screen</Text>
            <FlatList style={styles.flatliststyle}
              data={pizzaList}
              renderItem={renderPizza}
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
    pizzaImage: {
      width: 50,
      height: 50,
      marginRight: 10, // Space between image and text
      borderRadius: 25, // Rounded images
    },
  });