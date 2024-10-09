import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';

// Import the component
import NavButtons from './NavButtons.js';

export const MenuScreen = (props) => {
  const [newPizza, setPizza] = useState("");
  const [updateId, setUpdateId] = useState(0);
  const [pizzaList, addPizza] = useState([
    { "id": 1, "type": "Pepperoni", "price": "12.90", description: "Original dough, With sauce, Cheese, Pepperoni", image: require('../assets/pizza_pngs/menu/pepperoni.png') },
    { "id": 2, "type": "Bianca", "price": "10.90", description: "Original dough, No sauce, Cheese", image: require('../assets/pizza_pngs/menu/bianca.png') },
    { "id": 3, "type": "Mushrooms", "price": "11.90", description: "Original dough, With sauce, Cheese, Mushrooms", image: require('../assets/pizza_pngs/menu/mushrooms.png') }]);

  const selectItemToUpdate = (id) => {
    setUpdateId(id);
    setPizza(pizzaList[id].type);
    props.navigation.navigate("Details", { pizza: pizzaList[id] });
  }

  const renderPizza = (item) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => selectItemToUpdate(item.index)}>
        <View style={styles.listItemStyle}>
          <Text style={styles.itemText}>{item.item.type} {item.item.price}€</Text>
          <View style={styles.itemContainer}>
            <Image source={item.item.image} style={styles.pizzaImage} />
            <View style={styles.textContainer}>
              <Text style={styles.descriptionText}>{item.item.description}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );

  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.listStyle}>
        <FlatList style={styles.flatliststyle}
          data={pizzaList}
          renderItem={renderPizza}
        />
      </View>
      <NavButtons params={props} />
    </View>
  );
}

const styles = StyleSheet.create({
  navbuttonstyle: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-around",
  },
  imageContainer: {
    height: 200,
    width: '50%',
    borderRadius: 200,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'red',
  },
  image: {
    height: '100%',
    width: '100%'
  },
  listItemStyle: {
    borderWidth: 2,
    borderColor: "#CD6524",
    padding: 5,
    backgroundColor: "#FFF9F2",
    borderRadius: 20,
    margin: 10,
    width: "80%",
    alignSelf: "center",
  },
  listStyle: {
    flex: 8,
    alignItems: "center",
    width: "100%",
  },
  itemText: {
    color: "#131313",
    fontSize: 16,
    margin: 2,
  },
  flatliststyle: {
    width: '80%',
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
  itemText: {
    color: "#8A4012",
    fontSize: 18,
    paddingLeft: 5,
    margin: 2,
  },
  descriptionText: {
    flex: 1,
    color: "#CD6524",
    fontSize: 16,
  },
  pizzaImage: {
    width: 80,
    height: 80,
    borderRadius: 25
  },
});