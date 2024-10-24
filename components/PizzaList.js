import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, } from 'react-native';
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
        <View style={styles.listItemStyle}>
          <Text style={styles.itemText}>
            {item.size} {item.dough.toLowerCase()} pizza {item.sauce.toLowerCase()}.
          </Text>

          <View style={styles.itemContainer}>
            <View style={styles.pizzaContainer}>
              {doughImage && <Image source={doughImage} style={styles.doughImage} />}
              {sauceImage && <Image source={sauceImage} style={styles.sauceImage} />}

              {/* render each selected topping image */}
              {toppingImagesArray.map((toppingImg, index) => (
                toppingImg && <Image key={index} source={toppingImg} style={styles.toppingImage} />
              ))}
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.descriptionText}>
                Toppings: {item.toppings.join(', ').toLowerCase()}
              </Text>
            </View>
          </View>
        </View>
    );
  };


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
  ) : (
    <Text style={styles.textNoOrdersFound}>No past orders found. Would you like to order a pizza?</Text>
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
  textNoOrdersFound: {
    // flex: 1,
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
    height: 'auto',
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
  itemText: {
    flex: 0,
    color: '#CD6524',
    fontSize: 20,
    margin: 2,
    height: 'auto',
    flexWrap: 'wrap',
  },
  flatliststyle: {
    width: '100%', // makes it the whole page and grey-ish lines from the sides disappear!
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
  button: {
    flex: 1,
    margin: 20,
    paddingTop: 10,
    width: 250,
    height: 56,
    backgroundColor: '#F58C41',
    borderRadius: 40,
    alignSelf: "center",
  },
  buttonText: {
    top: 8,
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default PizzaList;
