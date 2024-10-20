import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image, TouchableHighlight, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import RadioForm from 'react-native-simple-radio-button';
import { saveOrder, printSomething } from '../database/Old_db';
import { addPizza, fetchAllPizza } from '../database/db';  


export default function SizeScreen({ route, navigation }) {
    const options = [
        { label: 'Small (d~15)', value: 'Small' },
        { label: 'Medium (d~22)', value: 'Medium' },
        { label: 'Large (d~30)', value: 'Large' }
    ];

    // Receive the sauce, toppings, and dough data from previous screens
    const { selectedDough, selectedDoughImage, selectedSauce, selectedSauceImage, selectedToppings, selectedToppingImages } = route.params;
    const [selectedSize, setSelectedSize] = useState('Small');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const orderData = {
                dough: selectedDough,
                sauce: selectedSauce,
                toppings: selectedToppings,
                size: selectedSize,
            };

            // const newPizza = {
            //     dough: selectedDough,
            //     sauce: selectedSauce,
            //     toppings: selectedToppings,
            //     size: selectedSize,
            // }

            // printSomething({newPizza});

            // saveOrder(orderData)
            //     .then(() => {
            //         console.log('Size saved:', orderData);
                    
            //     })
            //     .catch((error) => {
            //         console.error('Error saving size:', error);
            //     });
        });

        return unsubscribe; // Cleanup the listener
    }, [navigation, selectedSize]); // Run effect if selectedSize changes

    setSelected = (value) => {
        // console.log(value);
        setSelectedSize(value);
    }

    // Function to submit the final order
    const submitOrder = () => {
        // Construct the order object
        const orderData = {
            dough: selectedDough,
            sauce: selectedSauce,
            toppings: selectedToppings,
            size: selectedSize,
        };

        // Log the order data to verify what's being sent
        // console.log('Order Data:', orderData);
        // console.log('Selected Toppings:', selectedToppings);

        const newPizza = {
            dough: selectedDough,
            sauce: selectedSauce,
            toppings: selectedToppings,
            size: selectedSize,
        }

        // 

        // printSomething({newPizza});

        addPizza(newPizza).then(() => {
            alert("Your pizza has been added to the database!");
            // after sending the pizza, navigate to the timer screen
            navigation.navigate('Order', { screen: 'Timer' });
            // make it so that it first navigates to the Order details of this specific pizza (OrderDetailsScreen), 
            // and after that to Timer
        }).catch((error) => {
            console.error('Error saving order:', err);
            alert('Failed to place the order. Please try again.');
        });
        fetchAllPizza();



        // Save the order to SQLite
        // saveOrder(orderData)
        //     .then(() => {
        //         // console.log('Order saved:', orderData);
        //         console.log('Pizza saved:', newPizza);
        //         alert('Your pizza order has been placed!');

        //         // After saving, navigate to the order summary or main menu
        //         // navigation.navigate('Dough');

        //         // after sending the pizza, navigate to the timer screen
        //         navigation.navigate('Order', { screen: 'Timer' });
        //         // make it so that it first navigates to the Order details of this specific pizza (OrderDetailsScreen), 
        //         // and after that to Timer
        //     })
        //     .catch((err) => {
        //         console.error('Error saving order:', err);
        //         alert('Failed to place the order. Please try again.');
        //     });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose the size</Text>
            <View style={styles.listStyle}>

                <RadioForm
                    radio_props={options}
                    initial={0}
                    onPress={(value) => setSelected(value)}
                    buttonColor={'#E04A2B'}
                    labelColor={'#E04A2B'}
                    selectedButtonColor={'#E04A2B'}
                    buttonSize={15}
                    labelStyle={styles.itemText}
                />
                <View style={styles.pizzaContainer}>
                    <Image source={selectedDoughImage} style={styles.doughImage} />
                    <Image source={selectedSauceImage} style={styles.sauceImage} />
                    {/* Render each selected topping image */}
                    {selectedToppingImages.map((image, index) => (
                        <Image key={index} source={image} style={styles.toppingImage} />
                    ))}
                </View>
                {/* submit order button */}
                <TouchableHighlight
                    style={styles.button}
                    onPress={submitOrder}
                    underlayColor='#EC863D' // colour when pressed the "button"
                >
                    <Text style={[styles.buttonText]}>Submit Order</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    title: {
        flex: 1,
        fontSize: 24,
        color: '#ba3d23',
        fontWeight: 'bold',
        marginTop: 20,
    },
    listItemStyle: {
        borderWidth: 1,
        borderColor: "blue",
        padding: 5,
        backgroundColor: "#abc",
        width: "80%",
        alignSelf: "center",
    },
    listStyle: {
        flex: 10,
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    toppingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    itemText: {
        fontSize: 18,
        color: '#E04A2B',
        marginLeft: 10,
    },
    pizzaContainer: {
        marginTop: 40,
        width: 200,
        height: 200,
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
    button: {
        margin: 20,
        paddingTop: 10,
        width: 250,
        height: 56,
        backgroundColor: '#F58C41',
        borderRadius: 40,
        alignSelf: "center",
        top: 20,
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

