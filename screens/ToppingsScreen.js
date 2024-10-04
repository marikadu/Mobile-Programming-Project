import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';

const originalToppings = [
  { id: '1', title: 'Cheese' },
  { id: '2', title: 'Tomato' },
  { id: '3', title: 'Basil' },
  { id: '4', title: 'Pepperoni' },
  { id: '5', title: 'Mushrooms' },
  { id: '6', title: 'Custom: ' }, // Custom option stays here
];

export default function Toppings() {
    const [isChecked, setChecked]=useState([]); // Tracks the selection
    const [toppingList, setToppingList]=useState(originalToppings); // Original topping list
    const [newTopping, setTopping]=useState(); // Custom topping

    const toppingInputHandler=(enteredText)=>{
      setTopping(enteredText);
    };

    const addCustomTopping = () => {
      if (newTopping) {
        setToppingList((currentToppingList) => [
          ...currentToppingList,
          { id: Math.random().toString(), title: newTopping},
        ]);
        setChecked((prev) => [...prev, newTopping]); // Pre-select custom topping
        setTopping('');
      }
    };

    const renderTopping=({item, index})=>{
      return (
        <View style={styles.toppingItem}>
            <CheckBox
                value={isChecked.includes(item.title)}
                onValueChange={() => setSelection(item.title)}
                tintColors={{ true: '#E04A2B', false: '#E04A2B' }} // Checkbox colors
            />
            <Text style={styles.itemText} key={index}>{item.title}</Text>
        </View>
      );
    };
  
    // Handles selection
    const setSelection = (topping) => {
      setChecked((prevSelectedTopping) => {
          if (prevSelectedTopping.includes(topping)) {
              // Remove from selected if already selected
              return prevSelectedTopping.filter((t) => t !== topping);
          } else {
              return [...prevSelectedTopping, topping];
          }
      });
    };

    // Function to handle final submission of selected toppings
    const submitToppings = () => {
      let selectedToppings = [...isChecked];

      // If custom topping is filled, add it to the selected toppings
      if (newTopping) {
          selectedToppings.push(newTopping);
      }

      console.log('Selected Toppings:', selectedToppings); // Log for now, but send to backend
      // Send to database using fetch or axios
  };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Toppings</Text>
            <View style={styles.listStyle}>
              <FlatList
                data={toppingList}
                keyExtractor={(item) => item.id}
                renderItem={renderTopping}
              />
            </View>
            
            <View style={styles.formView}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Enter custom topping..."
                    value={newTopping}
                    onChangeText={toppingInputHandler}
                />
            </View>

            <Button title="Finish" onPress={submitToppings} />
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
