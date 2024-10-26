import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { fetchAllPizza } from '../database/db';
// Importing the images for all the options
import sauceImg from '../assets/pizza_pngs/sauce.png';
import originalDough from '../assets/pizza_pngs/dough_og.png';
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
  const isFocused = useIsFocused(); // Checks if the screen is focused

  useEffect(() => {
    if (isFocused) {
      readAllPizza(); // Fetches pizzas whenever the component is focused
    }
  }, [isFocused]);

  // Function for reading the pizza from the database
  async function readAllPizza() {
    try {
      const dbResult = await fetchAllPizza();
      setPizzaList(dbResult);
    } catch (err) {
      console.error('Error fetching pizzas:', err);
    }
  }

  // Map the images for the doughs
  const doughImages = {
    original: originalDough,
    glutenfree: glutenFreeDough,
    wholewheat: wholeWheatDough,
  };

  // Map the images for the toppings
  const toppingImages = {
    cheese: cheeseImg,
    tomato: tomatoImg,
    basil: basilImg,
    pepperoni: pepperoniImg,
    mushrooms: mushroomsImg,
  };

  // 
  const getPizzaImage = (pizza) => {
    const normalizedDough = pizza.dough.toLowerCase().replace(/[\s-]+/g, ''); // Removes the spaces and dashes, and changes the text to lowercase for dough
    const doughImage = doughImages[normalizedDough];                          // (since values of the dough has such things and needs to be normalized)
    const toppingImagesArray = pizza.toppings.map((topping) =>
      toppingImages[topping.toLowerCase()]
    );
    const sauceImage = pizza.sauce === 'With sauce' ? sauceImg : null; // If pizza has sauce, get the sauce image

    return {
      doughImage,
      sauceImage,
      toppingImagesArray,
    };
  };

  // Render all the images together and put the pizza's details together
  const renderPizza = ({ item }) => {
    const { doughImage, toppingImagesArray, sauceImage } = getPizzaImage(item);

    return (
        <View style={styles.listItemStyle}>
          <Text style={styles.itemText}>
            {item.size} {item.dough.toLowerCase()} pizza {item.sauce.toLowerCase()}. {/* pizza's details for size, dough, and sauce */}
          </Text>

          <View style={styles.itemContainer}>
            <View style={styles.pizzaContainer}>
              {/* render the dough image and sauce image (if exists) */}
              {doughImage && <Image source={doughImage} style={styles.doughImage} />}
              {sauceImage && <Image source={sauceImage} style={styles.sauceImage} />}

              {/* render each selected topping image */}
              {toppingImagesArray.map((toppingImg, index) => (
                toppingImg && <Image key={index} source={toppingImg} style={styles.toppingImage} />
              ))}
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.descriptionText}>
                Toppings: {item.toppings.join(', ').toLowerCase()} {/* pizza's details for selected toppings */}
              </Text>
            </View>
          </View>
        </View>
    );
  };

  // Return a pizza list, IF there are any pizzas in the list
  return pizzaList.length > 0 ? (
    <View style={{flex: 1, padding: 10, }} backgroundColor="#fff">
      <View style={styles.listStyle}>
        <FlatList
          style={styles.flatliststyle}
          data={pizzaList}
          renderItem={renderPizza}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  ) : ( // If there are no pizzas, display below text --- Conditional rendering
    <Text style={styles.textNoOrdersFound}>No past orders found. Would you like to order a pizza?</Text>
  );
};

const styles = StyleSheet.create({
  textNoOrdersFound: {
    color: '#CD6524',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: '#FFE8D8',
    borderRadius: 10,
    margin: 20,
  },
  flatliststyle: {
    width: '80%',
    height: 'auto',
    backgroundColor: '#FFFFFF',
  },
  listStyle: {
    flex: 8,
    alignItems: "center",
    width: "100%",
    height: 'auto',
  },
  listItemStyle: {
    flex: 0,
    borderWidth: 2,
    borderColor: '#CD6524',
    padding: 5,
    backgroundColor: '#FFF9F2',
    borderRadius: 20,
    margin: 10,
    width: '86%',
    height: 'auto',
    alignSelf: 'center',
  },
  pizzaContainer: {
    width: 100,
    height: 100,
    position: 'relative', // For the absolute position for the toppings
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
    position: 'absolute', // Absolute position to allow stacking of the toppings
    width: '100%',
    height: '100%',
  },
  listStyle: {
    flex: 9,
    alignItems: 'center',
    width: '100%',
  },
  itemText: {
    flex: 0,
    color: '#CD6524',
    fontSize: 20,
    margin: 2,
    height: 'auto',
    flexWrap: 'wrap',
  },
  flatliststyle: {
    width: '100%', // Makes it the whole page and grey-ish lines from the sides disappear
    backgroundColor: '#FFFFFF',
  },
  itemContainer: {
    flex: 0,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 'auto',
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  descriptionText: {
    flex: 0,
    color: '#CD6524',
    fontSize: 18,
    height: 'auto',
  },
});

export default PizzaList;
