import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image, TouchableHighlight } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
// importing images for the pizza creation
import originalDough from '../assets/pizza_pngs/dough_og.png';
import glutenFreeDough from '../assets/pizza_pngs/dough_gluten_free.png';
import wholeWheatDough from '../assets/pizza_pngs/dough_whole_wheat.png';
import sauceImg from '../assets/pizza_pngs/sauce.png';
import cheeseImg from '../assets/pizza_pngs/topping_cheese.png';
import tomatoImg from '../assets/pizza_pngs/topping_tomato.png';
import basilImg from '../assets/pizza_pngs/topping_basil.png';
import pepperoniImg from '../assets/pizza_pngs/topping_pepperoni.png';
import mushroomsImg from '../assets/pizza_pngs/topping_mushrooms.png';
import { fetchAllPizza } from '../database/db.js';
import PizzaList from './PizzaList'; // Import the reusable PizzaList component

export default function PastOrdersScreen({ navigation }) {
  return (
     <View style={{ flex: 1 }} backgroundColor="#fff">
      <PizzaList navigation={navigation} />

      <TouchableHighlight
        style={styles.button}
        onPress={() => navigation.navigate('Dough')}
        underlayColor="#EC863D"
      >
        <Text style={[styles.buttonText]}>Order a new Pizza</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  navbuttonstyle: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-around",
  },
  imageContainer: {
    height: 200,
    width: '50%',
    borderRadius: 200,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'red',
  },
  image: {
    height: '100%',
    width: '100%'
  },
  listItemStyle: {
    borderWidth: 2,
    borderColor: "#CD6524",
    padding: 5,
    backgroundColor: "#FFF9F2",
    borderRadius: 20,
    margin: 10,
    width: "80%",
    alignSelf: "center",
  },
  text: {
    // flex: 1,
    color: '#CD6524',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 20,
  },
  listStyle: {
    flex: 8,
    alignItems: "center",
    width: "100%",
  },
  itemText: {
    color: "#131313",
    fontSize: 16,
    margin: 2,
  },
  flatliststyle: {
    width: '80%',
    backgroundColor: '#FFFFFF',
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
    alignSelf: "center",
  },
  buttonText: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  pizzaContainer: {
    width: 100,
    height: 100,
    position: 'relative', // for the absolute position for the toppings
  },
  doughImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
},
sauceImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  toppingImage: {
      position: 'absolute', // absolute position to allow stacking of the toppings
      width: '100%',
      height: '100%',
  },
  listStyle: {
    flex: 9,
    alignItems: 'center',
    width: '100%',
  },
});
