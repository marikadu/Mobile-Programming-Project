import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image, TouchableHighlight } from 'react-native';
import React, { useState, useEffect } from 'react';
// import { saveOrder } from '../database/db';
import { addPizza, fetchAllPizza, deletePizza } from '../database/db';

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

export default function OrderDetailsScreen({ route, navigation }) {
  // Receive the sauce, toppings, and dough data from previous screens
  const { selectedDough, selectedDoughImage, selectedSauce, selectedSauceImage, selectedToppings, selectedToppingImages, selectedSize } = route.params;
  // const [selectedSize, setSelectedSize] = useState('Small');
  const [initialTime, setInitialTime] = useState(30 * 60); // 30 minutes in seconds, resets the Timer for every new pizza ordered

  // price depending on the size of the pizza
  // const pizzaPrice = selectedSize === 'Small' ? 10 : selectedSize === 'Medium' ? 15 : 20;

  // if we were to add drinks, snacks, the calculation would be here
  // but since there is only pizza, the total price is the pizza price
  // const totalPrice = pizzaPrice;


  // join toppings together to add into the description
  const joinToppings = (toppings) => {
    // if no toppings, says no toppings
    if (!toppings || toppings.length === 0) return 'No toppings'; 
    return toppings.join(', ');
  };

  // hardcoded pizza for now, passed new pizza should be here
  const pizzaList = [
    {
      id: 1,
      type: 'Custom Pizza',
      // price: pizzaPrice,
      price: 13,
      description: `${selectedDough || 'Original'}, ${selectedSauce || 'With Sauce'}, ${joinToppings(selectedToppings)}, ${selectedSize || 'Small'}`,
      // image: selectedToppingImages[0] || pepperoniImg,  // Set a default image if no topping image is provided
    },
  ];  

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const orderData = {
        dough: selectedDough,
        sauce: selectedSauce,
        toppings: selectedToppings,
        size: selectedSize,
      };
      console.log('Order Data:', orderData);
    });

    return unsubscribe; // Cleanup the listener
  }, [navigation, selectedSize, selectedDough, selectedSauce, selectedToppings]); // Run effect if selectedSize changes

  const handleSizeSelection = (value) => {
    setSelectedSize(value);
  };

  setSelected = (value) => {
    // console.log(value);
    setSelectedSize(value);
  }

  // Function to submit the final order
  const submitOrder = () => {
    const newPizza = {
      dough: selectedDough,
      sauce: selectedSauce,
      toppings: selectedToppings,
      size: selectedSize,
    };

    // printSomething({newPizza});

    addPizza(newPizza).then(() => {
      alert("Your pizza has been added to the database!");
      // after sending the pizza, navigate to the timer screen with the default time of 30 minutes
      navigation.navigate('Order', { screen: 'Timer', params: { initialTime } });
      // make it so that it first navigates to the Order details of this specific pizza (OrderDetailsScreen), 
      // and after that to Timer
    }).catch((error) => {
      console.error('Error saving order:', error);
      alert('Failed to place the order. Please try again.');
    }
    )
  };


  // hardcoded address and payment details
  const addressDetails = {
    address: 'Red Str. 89 1. floor',
    paymentMethod: 'Card ending in 1234',
  };

  // calculating the total price
  // const totalPrice = pizzaList.reduce((total, pizza) => total + pizza.price, 0);

  // render pizza
  const renderPizza = (item) => {
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.listItemStyle}>
          <Text style={styles.itemText}>{item.item.type} {item.item.price}€</Text>
          <View style={styles.itemContainer}>
            {/* <Image source={item.item.image} style={styles.pizzaImage} /> */}

            <View style={styles.pizzaContainer}>
              <Image source={selectedDoughImage} style={styles.doughImage} />
              {/* sauce and toppings don't render for some reason */}
              <Image source={selectedSauceImage} style={styles.sauceImage} />

              {/* render each selected topping image */}
              {(selectedToppingImages || []).map((image, index) => (
                <Image key={index} source={image} style={styles.toppingImage} />
              ))}

            </View>
            <View style={styles.textContainer}>
              <Text style={styles.descriptionText}>{item.item.description}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // display order total cost
  const renderCost = () => {
    return (
      <View style={styles.orderTotalContainerStyle}>
        <Text style={styles.orderTotalStyle}>Order Total:</Text>
        {/* <Text style={styles.orderTotalStyle}>{totalPrice}€</Text> */}
        <Text style={styles.orderTotalStyle}>13€</Text>
      </View>
    );
  };

  // display the Address and Payment method details
  const renderDetails = () => {
    return (
      <View>
        <Text style={styles.text}> Address Details:</Text>
        <TouchableHighlight style={styles.orderItemStyle} underlayColor='#EC863D'>
          {/* make it so that on press the address can be changed */}
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
        onPress={submitOrder}
        underlayColor='#EC863D' // colour when pressed the "button"
      >
        {/* <Text style={styles.buttonText}> Submit Order {totalPrice}€</Text> */}
        <Text style={styles.buttonText}> Submit Order 13€</Text>
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