import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import RadioForm from 'react-native-simple-radio-button';
import { saveOrder } from '../database/Old_db';

export default function SizeScreen({ route, navigation }) {
    const options = [
        {label: 'Small (d~15)', value: 'Small' },
        {label: 'Medium (d~22)', value: 'Medium' },
        {label: 'Large (d~30)', value: 'Large' }
      ];

    // Receive the sauce, toppings, and dough data from previous screens
    const { selectedSauce, selectedToppings } = route.params; 
    const [selectedSize, setSelectedSize] = useState('Small');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const orderData = {
                sauce: selectedSauce,
                toppings: selectedToppings,
                size: selectedSize,
            };

            saveOrder(orderData)
                .then(() => {
                    console.log('Size saved:', orderData);
                })
                .catch((error) => {
                    console.error('Error saving size:', error);
                });
        });

        return unsubscribe; // Cleanup the listener
    }, [navigation, selectedSize]); // Run effect if selectedSize changes
    
    setSelected=(value)=>{
        console.log(value);
        setSelectedSize(value);
    }

    // Function to submit the final order
    const submitOrder = () => {
        // Construct the order object
        const orderData = {
            //dough: selectedDough,
            sauce: selectedSauce,
            toppings: selectedToppings,
            size: selectedSize,
        };

        // Log the order data to verify what's being sent
        console.log('Order Data:', orderData);
        console.log('Selected Toppings:', selectedToppings);

        // Save the order to SQLite
        saveOrder(orderData)
            .then(() => {
                console.log('Order saved:', orderData);
                alert('Your pizza order has been placed!');

                // After saving, navigate to the order summary or main menu
                navigation.navigate('Dough');
            })
            .catch((err) => {
                console.error('Error saving order:', err);
                alert('Failed to place the order. Please try again.');
            });
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

                     {/* Submit order button */}
                    <Button
                        title="Submit Order"
                        onPress={submitOrder} // Call submitOrder function on click
                        color="#E04A2B"
                    />
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
    }
});

