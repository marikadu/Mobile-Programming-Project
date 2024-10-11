import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image, TouchableHighlight } from 'react-native';
import React, { useState, useEffect } from 'react';
import { saveOrder } from '../database/db';

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

export default function OrderScreen(route, navigation) {
  // hardcoded pizza for now, passed new pizza should be here
  const pizzaList = [

    { id: 1, type: 'Pizza', price: 13, description: 'Original dough, With sauce, Cheese, Pepperoni', image: pepperoniImg },
  ];

  // hardcoded address and payment details
  const addressDetails = {
    address: 'Red Str. 89 1. floor',
    paymentMethod: 'Card ending in 1234',
  };

  // calculating the total price
  const totalPrice = pizzaList.reduce((total, pizza) => total + pizza.price, 0);

  // render pizza
  const renderPizza = (item) => {
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.listItemStyle}>
          <Text style={styles.itemText}>{item.item.type} {item.item.price}€</Text>
          <View style={styles.itemContainer}>
            <Image source={item.item.image} style={styles.pizzaImage} />
            <View style={styles.textContainer}>
              <Text style={styles.descriptionText}>{item.item.description}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Display the total cost of the order
  const renderCost = () => {
    return (
      <View style={styles.orderTotalContainerStyle}>
        <Text style={styles.orderTotalStyle}>Order Total:</Text>
        <Text style={styles.orderTotalStyle}>{totalPrice}€</Text>
      </View>
    );
  };

  // Display the Address and Payment method details
  const renderDetails = () => {
    return (
      <View>
        <Text style={styles.text}> Address Details:</Text>
        <TouchableHighlight style={styles.orderItemStyle} underlayColor='#EC863D'>
          {/* make it so that on press the address can be changed */}
          {/* onPress={() => props.navigation.navigate("Menu")}  */}
          <Text style={styles.itemText}>{addressDetails.address}</Text>
        </TouchableHighlight>
        <Text style={styles.text}> Payment Method:</Text>
        <View style={styles.orderItemStylePayment}>
          <Text style={styles.itemText}> {addressDetails.paymentMethod}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }} backgroundColor="#fff">
      <View style={styles.listStyle}>
        <FlatList
          style={styles.flatliststyle}
          data={pizzaList}
          renderItem={renderPizza}
          keyExtractor={(item) => item.id.toString()}
        />
        {renderCost()}
        {renderDetails()}
      </View>

      {/* place order button */}
      <TouchableHighlight
        style={styles.button}
        // after you press the "Place Order" button -> goes to the Timer Screen
        // onPress={() => props.navigation.navigate("Menu")} 
        underlayColor='#EC863D' // colour when pressed the "button"
      >
        <Text style={[styles.buttonText]}>Place order {totalPrice}€</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#fff",
  },
  listItemStyle: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#CD6524',
    padding: 5,
    backgroundColor: '#FFF9F2',
    borderRadius: 20,
    margin: 10,
    width: '80%',
    alignSelf: 'center',
  },
  orderTotalContainerStyle: {
    // flex: 1,
    padding: 5,
    justifyContent: 'space-around',
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderTotalStyle: {
    flex: 1,
    color: "#CD6524",
    fontSize: 20,
    padding: 6,
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 30,
    textAlign: 'center',
  },
  text: {
    // flex: 1,
    color: '#CD6524',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'flex-end',
  },
  orderItemStyle: {
    borderWidth: 2,
    borderColor: '#F58C41',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 10,
    paddingLeft: 40,
    paddingRight: 40,
    alignSelf: 'center',
  },
  orderItemStylePayment: {
    borderWidth: 2,
    borderColor: '#FFF9F2',
    padding: 10,
    backgroundColor: '#FFE8D8',
    borderRadius: 10,
    margin: 10,
    paddingLeft: 40,
    paddingRight: 40,
    alignSelf: 'center',
  },
  listStyle: {
    flex: 9,
    alignItems: 'center',
    width: '100%',
  },
  itemText: {
    color: '#CD6524',
    fontSize: 20,
    margin: 2,
  },
  flatliststyle: {
    width: '100%', // makes it the whole page and grey-ish lines from the sides disappear!
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
  descriptionText: {
    flex: 1,
    color: '#CD6524',
    fontSize: 16,
  },
  pizzaImage: {
    width: 80,
    height: 80,
    borderRadius: 25,
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
    alignItems: 'center',
  },
});