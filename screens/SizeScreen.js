import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import RadioForm from 'react-native-simple-radio-button';

export default function SizeScreen({ route, navigation }) {
    // Options for sizes
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
        });

        return unsubscribe; // Cleanup the listener
    }, [navigation, selectedSize]); // Run effect if selectedSize changes

    setSelected = (value) => {
        setSelectedSize(value);
        console.log('Size selected:', value);
        navigation.setParams({ selectedSize: value }); // Update navigation params with selectedSize
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
        marginBottom: 10,
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
        top: 150,
    },
    sauceImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 150,
    },
    toppingImage: {
        position: 'absolute', // absolute position to allow stacking of the toppings
        width: '100%',
        height: '100%',
        top: 150,
    },
});

