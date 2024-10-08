import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import RadioForm from 'react-native-simple-radio-button';
import { saveOrder } from '../database/db';

export default function SauceScreen({ route, navigation }) {
    const options = [
        {label: 'Add sauce', value: 'Add' },
        {label: 'No sauce', value: 'None' }
      ];

    const [selectedSauce, setSelectedSauce] = useState('Add');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const orderData = {
                sauce: selectedSauce,
                toppings: null, // This will be updated in ToppingsScreen
                size: null // This will be updated in SizeScreen
            };

            saveOrder(orderData)
                .then(() => {
                    console.log('Sauce saved:', orderData);
                })
                .catch((error) => {
                    console.error('Error saving sauce:', error);
                });
        });

        return unsubscribe; // Cleanup the listener
    }, [navigation, selectedSauce]); // Re-run effect if selectedSauce changes
    
    setSelected= ( value ) => {
        setSelectedSauce(value);
        console.log('Sauce selected:', value);
        navigation.setParams({ selectedSauce: value }); // Update navigation params with selectedSauce
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose the sauce</Text>
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

