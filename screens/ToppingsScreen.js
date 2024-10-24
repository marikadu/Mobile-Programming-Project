import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';
// Importing images for the pizza creation
import cheeseImg from '../assets/pizza_pngs/topping_cheese.png';
import tomatoImg from '../assets/pizza_pngs/topping_tomato.png';
import basilImg from '../assets/pizza_pngs/topping_basil.png';
import pepperoniImg from '../assets/pizza_pngs/topping_pepperoni.png';
import mushroomsImg from '../assets/pizza_pngs/topping_mushrooms.png';

export default function Toppings({ route, navigation }) {
  // List of toppings and their images. Order means the image order (layers)
  const [toppingsList, setToppingsList] = useState([
    { id: 1, selected: false, title: 'Cheese', image: cheeseImg, order: 1 },
    { id: 2, selected: false, title: 'Tomato', image: tomatoImg, order: 3 },
    { id: 3, selected: false, title: 'Basil', image: basilImg, order: 5 },
    { id: 4, selected: false, title: 'Pepperoni', image: pepperoniImg, order: 2 },
    { id: 5, selected: false, title: 'Mushrooms', image: mushroomsImg, order: 4 },
  ]);
  
  const { selectedDough, selectedDoughImage, selectedSauce, selectedSauceImage } = route.params; // Passing previous parameters
  const [selectedToppings, setSelectedToppings] = useState([]);

  useEffect(() => {
    const orderData = {
        dough: selectedDough,
        sauce: selectedSauce,
        toppings: {
          cheese: toppingsList.find(t => t.title === 'Cheese').selected,
          tomato: toppingsList.find(t => t.title === 'Tomato').selected,
          basil: toppingsList.find(t => t.title === 'Basil').selected,
          pepperoni: toppingsList.find(t => t.title === 'Pepperoni').selected,
          mushrooms: toppingsList.find(t => t.title === 'Mushrooms').selected
        },
        size: null // This will be updated in SizeScreen
    };

    // / Collect selected toppings and their images, and through nav params get the information to next screens
    const selectedToppings = toppingsList.filter(t => t.selected);
    const selectedToppingTitles = selectedToppings.map(t => t.title);
    const selectedToppingImages = selectedToppings.map(t => t.image);
    navigation.setParams({ selectedToppings: selectedToppingTitles, selectedToppingImages: selectedToppingImages }); // Pass selected toppings to params

  }, [navigation, toppingsList]); // Run effect if toppingsList changes (includes selection changes)

  const renderTopping=({ item })=>{
    return (
      <View style={styles.toppingItem}>
          <CheckBox
              value={item.selected}
              onValueChange={() => setSelection(item.id)}
              tintColors={{ true: '#E04A2B', false: '#E04A2B' }} // Checkbox colors
          />
          <Text style={styles.itemText}>{item.title}</Text>
      </View>
    );
  };

  // Handles selection
  const setSelection = (id) => {
    setToppingsList(prevToppings =>
      prevToppings.map(t => {
        if (t.id === id) {
          const newSelectedState = !t.selected;
          return { ...t, selected: newSelectedState };
        }
        return t;
      })
    );
  };

  // Rendering the images based on the selection from the user in a layered order
  const renderSelectedImages = () => {
    return toppingsList
      .filter((topping) => topping.selected) // Only show selected toppings
      .sort((a, b) => a.order - b.order) // Sort based on order for layering
      .map((topping) => (
        <Image
          key={topping.id}
          source={topping.image}
          style={[styles.toppingImage, { zIndex: topping.order }]} // Ensure correct layering
        />
      ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toppings</Text>
      <View style={styles.listStyle}>
        <FlatList
          data={toppingsList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTopping}
        />
      </View>
          
      {/* render the images of selected toppings, toppings are layered in a specified order */}
      <View style={styles.pizzaContainer}>
        <Image source={selectedDoughImage} style={styles.doughImage} />
        <Image source={selectedSauceImage} style={styles.sauceImage} />
        {renderSelectedImages()}
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
      color: '#E04A2B',
      fontWeight: 'bold',
      marginTop: 20,
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
  doughImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 60,
  },
  sauceImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 60,
  },
  toppingImage: {
    position: 'absolute', // absolute position to allow stacking of the toppings
    width: '100%',
    height: '100%',
    bottom: 60,
  },
});

