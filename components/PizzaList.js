// PizzaList.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { fetchAllPizza } from '../database/db';
import sauceImg from '../assets/pizza_pngs/sauce.png';  // Import sauce image here
import originalDough from '../assets/pizza_pngs/dough_og.png'; // Add dough imports here
import glutenFreeDough from '../assets/pizza_pngs/dough_gluten_free.png'; 
import wholeWheatDough from '../assets/pizza_pngs/dough_whole_wheat.png'; 
import cheeseImg from '../assets/pizza_pngs/topping_cheese.png'; 
import tomatoImg from '../assets/pizza_pngs/topping_tomato.png'; 
import basilImg from '../assets/pizza_pngs/topping_basil.png'; 
import pepperoniImg from '../assets/pizza_pngs/topping_pepperoni.png'; 
import mushroomsImg from '../assets/pizza_pngs/topping_mushrooms.png'; 

// PizzaList component
const PizzaList = ({ navigation }) => {
  const [pizzaList, setPizzaList] = useState([]);
  const isFocused = useIsFocused(); // Check if the screen is focused

  useEffect(() => {
    if (isFocused) {
      readAllPizza(); // Fetch pizzas whenever the component is focused
    }
  }, [isFocused]);

  async function readAllPizza() {
    try {
      const dbResult = await fetchAllPizza();
      setPizzaList(dbResult);
    } catch (err) {
      console.error('Error fetching pizzas:', err);
    }
  }

  const doughImages = {
    original: originalDough,
    glutenfree: glutenFreeDough,
    wholewheat: wholeWheatDough,
  };

  const toppingImages = {
    cheese: cheeseImg,
    tomato: tomatoImg,
    basil: basilImg,
    pepperoni: pepperoniImg,
    mushrooms: mushroomsImg,
  };

  const getPizzaImage = (pizza) => {
    const normalizedDough = pizza.dough.toLowerCase().replace(/[\s-]+/g, '');
    const doughImage = doughImages[normalizedDough];
    const toppingImagesArray = pizza.toppings.map((topping) =>
      toppingImages[topping.toLowerCase()]
    );
    const sauceImage = pizza.sauce === 'With sauce' ? sauceImg : null;
    
    return {
      doughImage,
      sauceImage,
      toppingImagesArray,
    };
  };

  const renderPizza = ({ item }) => {
    const { doughImage, toppingImagesArray, sauceImage } = getPizzaImage(item);
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Details', { pizza: item })}>
        <View style={styles.listItemStyle}>
          <Text style={styles.itemText}>
            {item.size} {item.dough.toLowerCase()} pizza {item.sauce.toLowerCase()}.
          </Text>
          <Text style={styles.itemText}>
            Toppings: {item.toppings.join(', ').toLowerCase()}
          </Text>
          <View style={styles.pizzaContainer}>
            {doughImage && <Image source={doughImage} style={styles.doughImage} />}
            {sauceImage && <Image source={sauceImage} style={styles.sauceImage} />}
            {toppingImagesArray.map((toppingImg, index) => (
              toppingImg && <Image key={index} source={toppingImg} style={styles.toppingImage} />
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return pizzaList.length > 0 ? (
    <View style={{ flex: 1 }} backgroundColor="#fff">
    <View style={styles.listStyle}>
      <FlatList
        style={styles.flatliststyle}
        data={pizzaList}
        renderItem={renderPizza}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
    </View>
  ) : (
    <Text style={styles.text}>No past orders found.</Text>
  );
};

const styles = StyleSheet.create({
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
  flatliststyle: {
    width: '80%',
    backgroundColor: '#FFFFFF',
  },
  listStyle: {
    flex: 8,
    alignItems: "center",
    width: "100%",
  },
  listItemStyle: {
    borderWidth: 2,
    borderColor: '#CD6524',
    padding: 5,
    backgroundColor: '#FFF9F2',
    borderRadius: 20,
    margin: 10,
    width: '80%',
    alignSelf: 'center',
  },
  pizzaContainer: {
    width: 100,
    height: 100,
    position: 'relative',
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
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  itemText: {
    color: '#131313',
    fontSize: 16,
    margin: 2,
  },
});

export default PizzaList;
