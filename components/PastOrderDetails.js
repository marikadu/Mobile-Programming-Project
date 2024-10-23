import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import originalDough from '../assets/pizza_pngs/dough_og.png';
import glutenFreeDough from '../assets/pizza_pngs/dough_gluten_free.png';
import wholeWheatDough from '../assets/pizza_pngs/dough_whole_wheat.png';
import sauceImg from '../assets/pizza_pngs/sauce.png';
import cheeseImg from '../assets/pizza_pngs/topping_cheese.png';
import tomatoImg from '../assets/pizza_pngs/topping_tomato.png';
import basilImg from '../assets/pizza_pngs/topping_basil.png';
import pepperoniImg from '../assets/pizza_pngs/topping_pepperoni.png';
import mushroomsImg from '../assets/pizza_pngs/topping_mushrooms.png';

// Import the components
import NavButtons from './NavButtons.js';
import { fetchAllPizza } from '../database/db.js';

export const PastOrderDetailsScreen=(props)=>{
    const [pastOrdersList, setPastOrdersList] = useState([]);

    // Fetch addresses
    useEffect(() => {
        readAllAddresses();
    }, []);  

    // const [newPizza, setPizza]=useState(props.route.params==undefined ? "" : props.route.params.pizza.type);
    // useEffect(()=>{
    //     setPizza(props.route.params==undefined ? "" : props.route.params.pizza.type);
  
    //   },[props.route.params]
    // );

    // const pizzaInputHandler=(enteredText)=>{
    //     setPizza(enteredText);
    // };

    // Mapping dough types to their corresponding images
    const doughImages = {
        original: originalDough,
        glutenFree: glutenFreeDough,
        wholeWheat: wholeWheatDough
    };
    
    // Mapping toppings to their corresponding images
    const toppingImages = {
        cheese: cheeseImg,
        tomato: tomatoImg,
        basil: basilImg,
        pepperoni: pepperoniImg,
        mushrooms: mushroomsImg
    };

    const getPizzaImage = (pizza) => {
        const doughImage = doughImages[pizza.dough];
        const toppingImagesArray = pizza.toppings.map(topping => toppingImages[topping]);
      
        // You can combine these images in the UI later, or return them as needed
        return {
          doughImage,
          toppingImagesArray
        };
    };

    async function readAllPizzas() {
        try {
          const dbResult = await fetchAllPizza();  // Wait for the result
          console.log("Fetched pizzas:", dbResult);
          setPastOrdersList(dbResult);  // Set the fetched addresses to state
        } catch (err) {
          console.error("Error fetching addresses: ", err);
        }
    };

    // render pizza
    const renderPizza = (item) => {
        const { doughImage, toppingImagesArray } = getPizzaImage(item.item);

        return (
        <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.listItemStyle}>
            <Text style={styles.itemText}>{item.item.type} {item.item.price}€</Text>
            <View style={styles.itemContainer}>
                {/* Render the dough image */}
                <Image source={doughImage} style={styles.pizzaImage} />

                 {/* Optionally, you could layer or display topping images */}
                {toppingImagesArray.map((toppingImg, index) => (
                    <Image key={index} source={toppingImg} style={styles.pizzaImage} />
                ))}

                <View style={styles.textContainer}>
                    <Text style={styles.descriptionText}>{item.item.description}</Text>
                </View>
            </View>
            </View>
        </TouchableOpacity>
        );
    };
    
    return (
        <View style={{ flex: 1 }} backgroundColor="#fff">
            <Text style={styles.text}> Past Orders:</Text>
            <View style={styles.listStyle}>
                <FlatList
                    style={styles.flatliststyle}
                    data={pizzaList}
                    renderItem={renderPizza}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    );
  }

const styles=StyleSheet.create({
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
});