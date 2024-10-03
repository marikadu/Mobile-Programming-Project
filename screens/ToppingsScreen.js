import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';

const DATA = [
    {
      id: '1',
      title: 'Cheese',
    },
    {
      id: '2',
      title: 'Tomato',
    },
    {
      id: '3',
      title: 'Basil',
    },
    {
      id: '4',
      title: 'Pepperoni',
    },
    {
      id: '5',
      title: 'Mushrooms',
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
    }
});