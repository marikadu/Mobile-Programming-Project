import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet, Image, TouchableHighlight } from 'react-native';
import React, { useState, useEffect } from 'react';
// import { saveOrder } from '../database/db';
import { addPizza, fetchAllPizza, deletePizza } from '../database/db';


export default function OrderDetailsScreen({ route, navigation }) {
  // Receive the sauce, toppings, and dough data from previous screens
  const { selectedDough, selectedDoughImage, selectedSauce, selectedSauceImage, selectedToppings, selectedToppingImages, selectedSize } = route.params;
  // const [selectedSize, setSelectedSize] = useState('Small');
  const [initialTime, setInitialTime] = useState(30 * 60); // 30 minutes in seconds, resets the Timer for every new pizza ordered

  // creating a custom Modal that mimics Alert window's behaviour
  // because the Alert cannot be directly customisible, according to our research
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [pendingNavigation, setPendingNavigation] = useState(null); // for the navigation to the Timer Screen

  // price depending on the size of the pizza
  // const pizzaPrice = selectedSize === 'Small' ? 10 : selectedSize === 'Medium' ? 15 : 20;

  // if we were to add drinks, snacks, the calculation would be here

  // join toppings together to add into the description
  const joinToppings = (toppings) => {
    // if no toppings, says no toppings
    if (!toppings || toppings.length === 0) return 'No toppings';
    return toppings.join(', ');
  };

  // passed new pizza combination
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

  // custom alert properties
  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
    setPendingNavigation(() => handleAlertConfirm); // for the navigation to the TimerScreen after the ok button is pressed
  };

  // handle navigation after alert confirmation
  const navigateTo = () => {
    navigation.navigate('Order', { screen: 'Timer', params: { initialTime } });
  };

  const handleAlertConfirm = () => { // when ok button is pressed
    setAlertVisible(false); // hide the alert
    if (pendingNavigation) {
      pendingNavigation(); // call the function for the navigation
      navigateTo(); // call navigateTo to handle the actual navigation
      setPendingNavigation(null); // clear the function
    }
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
      // alert("Your order has been submitted!"); // OLD alert
      showAlert("Order submitted", "Your order has been submitted!"); // new alert
      // after sending the pizza, navigate to the timer screen with the default time of 30 minutes
      // navigation.navigate('Order', { screen: 'Timer', params: { initialTime } });
      // make it so that it first navigates to the Order details of this specific pizza (OrderDetailsScreen), 
      // and after that to Timer
    }).catch((error) => {
      console.error('Error saving order:', error);
      // this alert is normal, because the "new" alert will redirect to the Timer Screen
      // so to prevent the user navigating to the Timer Screen if there is an error, the old alert is used!
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

            <View style={styles.pizzaContainer}>
              <Image source={selectedDoughImage} style={styles.doughImage} />
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

      {/* fake alert window */}
      <Modal
        visible={isAlertVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.customAlertBackground}>
          <View style={styles.customAlertContainer}>
            <Text style={styles.customAlertTitle}>{alertTitle}</Text>
            <Text style={styles.customAlertMessage}>{alertMessage}</Text>
            <TouchableHighlight
              style={styles.customAlertButton}
              onPress={handleAlertConfirm}
              underlayColor="#cc7333"
            >
              <Text style={styles.customAlertButtonText}>OK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

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
    fontSize: 18,
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
  // fake alert window styling
  customAlertBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // half transparent background
  },
  customAlertContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10, // shadow behind the window
  },
  customAlertTitle: {
    color: '#CD6524',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  customAlertMessage: {
    color: '#CD6524',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  customAlertButton: {
    backgroundColor: '#F58C41',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  customAlertButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});