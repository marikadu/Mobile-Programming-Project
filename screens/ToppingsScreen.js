import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { saveOrder } from '../database/db';

export default function Toppings({ route, navigation }) {
    const [toppingsList, setToppingsList] = useState([
      { id: 1, selected: false, title: 'Cheese' },
      { id: 2, selected: false, title: 'Tomato' },
      { id: 3, selected: false, title: 'Basil' },
      { id: 4, selected: false, title: 'Pepperoni' },
      { id: 5, selected: false, title: 'Mushrooms' },
    ]);
    
    const { selectedSauce } = route.params; 
    const [selectedToppings, setSelectedToppings] = useState([]);
    // const [newTopping, setTopping] = useState(); // Custom topping

    useEffect(() => {
      const orderData = {
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
  
      // Pass the updated selected toppings to navigation params so it's accessible in the next screen
      const selectedToppings = toppingsList.filter(t => t.selected).map(t => t.title);
      navigation.setParams({ selectedToppings }); // Pass selected toppings to params

      // Save the orderData object to the database whenever selectedToppings changes
      if (selectedToppings.length > 0) {
        saveOrder(orderData)
          .then(() => console.log('Order saved with sauce and toppings:', orderData))
          .catch((error) => console.error('Error saving order:', error));
      }
    }, [navigation, toppingsList]); // Run effect if toppingsList changes (includes selection changes)

    // const toppingInputHandler = (enteredText) => {
    //   setTopping(enteredText);
    // };

    // const addCustomTopping = () => {
    //   if (newTopping) {
    //     setToppingList((currentToppingList) => [
    //       ...currentToppingList,
    //       { id: Math.random().toString(), title: newTopping},
    //     ]);
    //     setSelectedToppings((prev) => [...prev, newTopping]); // Pre-select custom topping
    //     setTopping('');
    //   }
    // };

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
            
            {/* <View style={styles.formView}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter custom topping..."
                    value={newTopping}
                    onChangeText={toppingInputHandler}
                />
            </View> */}
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
    inputStyle:{
      borderColor: "#E04A2B",
      borderWidth: 3,
      borderRadius: 6,
      margin: 2,
      padding: 5,
      width: "50%",
    },
    formView:{
      flex:1,
      flexDirection:"column",
      backgroundColor:"white",
      alignItems:"center",
      justifyContent:"space-around",
      marginTop:20,
      width:"100%",
    },
});
