import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';

// importing images for the pizza creation
import cheeseImg from '../assets/pizza_pngs/topping_cheese.png';
import tomatoImg from '../assets/pizza_pngs/topping_tomato.png';
import basilImg from '../assets/pizza_pngs/topping_basil.png';
import pepperoniImg from '../assets/pizza_pngs/topping_pepperoni.png';
import mushroomsImg from '../assets/pizza_pngs/topping_mushrooms.png';

const DATA = [
  {
    id: '1',
    title: 'Cheese',
    image: cheeseImg, // image of the cheese,
    order: 1 // order of the layer for the image to appear
  },
  {
    id: '2',
    title: 'Tomato',
    image: tomatoImg,
    order: 3
  },
  {
    id: '3',
    title: 'Basil',
    image: basilImg,
    order: 5 
  },
  {
    id: '4',
    title: 'Pepperoni',
    image: pepperoniImg,
    order: 2
  },
  {
    id: '5',
    title: 'Mushrooms',
    image: mushroomsImg,
    order: 4 
  },
];
  
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

export default function Toppings({ route, navigation }) {
    const [isChecked, setChecked]= useState([]);

    function setSelection(topping) {
        setChecked((prevSelectedTopping) => {
          if (prevSelectedTopping.includes(topping)) {
            // Remove from selected if already selected
            return prevSelectedTopping.filter(id => id !== topping);
          } else {
            // Add to selected
            return [...prevSelectedTopping, topping];
          }
        });
      }

  // rendering the images based on the selection from the user in a layered order
  const renderSelectedImages = () => {
    return (
      DATA.filter((item) => isChecked.includes(item.title))
        .sort((a, b) => a.order - b.order) // Sort toppings based on the predefined order
        .map((item) => (
          <Image
            key={item.id}
            source={item.image}
            style={[styles.toppingImage, { zIndex: item.order }]} // Ensure proper layering
          />
        ))
    );
  };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Toppings</Text>
                <View style={styles.listStyle}>
                    <FlatList
                        data={DATA}
                        keyExtractor={item => item.id}
                        renderItem={({item})=> (
                            <View style={styles.toppingItem}>
                            <CheckBox
                                value={isChecked.includes(item.title)}
                                onValueChange={() => setSelection(item.title)}
                                // Color of the checkboxes
                                tintColors={{ true: '#E04A2B', false: '#E04A2B' }}
                            />
                            <Text style={styles.itemText}>{item.title}</Text>
                            </View>
                        )}
                    />
                </View>
                {/* render the images of selected toppings, toppings are layered in a specified order */}
                <View style={styles.pizzaContainer}>{renderSelectedImages()}</View>
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
        color: '#E04A2B',
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
        width: '100%',
        marginLeft: 40,
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
      width: 200,
      height: 200,
      position: 'relative', // for the absolute position for the toppings
    },
    toppingImage: {
      position: 'absolute', // absolute position to allow stacking of the toppings
      width: '100%',
      height: '100%',
    },
});
