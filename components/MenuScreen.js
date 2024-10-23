import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';

// Import the component
import NavButtons from './NavButtons.js';

export const MenuScreen = (props) => {
  const [newPizza, setPizza] = useState("");
  const [updateId, setUpdateId] = useState(-1);
  const [isLoading, setLoading] = useState(true);
  // const [pizzaList, addPizza] = useState([
  //   {
  //   _id: "67180d81a0a571d9106d8b79",
  //   type: "Bianca",
  //   price: "10.90",
  //   description: "Original dough, No sauce, Cheese",
  //   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrMuL0UO0MhQV9CPDA-R15yfak1TqP0JkrWcFauigPPY0t88d5WXdmjdYAOli9yRYWiXI&usqp=CAU"
  //   },
  //   {
  //   _id: "67180d81a0a571d9106d8b7a",
  //   type: "Mushrooms",
  //   price: "11.90",
  //   description: "Original dough, With sauce, Cheese, Mushrooms",
  //   image: "https://www.shutterstock.com/image-photo/delicious-savory-porcini-mushroom-pizza-260nw-2484910843.jpg"
  //   },
  //   {
  //   _id: "67180d81a0a571d9106d8b78",
  //   type: "Pepperoni",
  //   price: "12.90",
  //   description: "Original dough, With sauce, Cheese, Pepperoni",
  //   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMDbvohJ2KYuQP5TT_h3XQhhnr7mPVx2e1AnI0l7EjWV9OnlcStMF2Ar2BksfV8tdRGBc&usqp=CAU"
  //   }
  //   ]);

  const [pizzaList, setPizzaList] = useState([]);

  // READING Pizza Menu Data from MongoDB
  const fetchAllPizza = async () => {
    
    try {
      let response = await fetch(
        'http://10.0.2.2:8080/readmenu', // FROM MONGODB OR GOOGLE CLOUD
      );
      let json = await response.json();
      setPizzaList(json);
      // console.log('Fetching all pizza data from MongoDB');
      // console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  // REFRESH Pizza Menu Data from MongoDB
  const refreshPizzaMenu = async () => {
    try{
      let response = await fetch(
        'http://10.0.2.2:8080/reset', // FROM MONGODB 

      ); 
      let json = await response.json();
      setPizzaList(json);
    } catch (error) {
      console.log(error);}
  }
  
  

  // Delete item function and Alert
  const deleteItem = removeId => {
    Alert.alert(
      'Deleting a Pizza with id ' + removeId, // Title
      'Are you sure?', // Message
      [
        // Buttons
        {
          text: 'Yes!',
          onPress: () => deletePizza(removeId),
          style: 'ok',
        },
        {
          text: 'No',
          onPress: console.log('You said No.'),
          style: 'cancel',
        },
      ],
    );
  };

  // Delete Pizza from MongoDB
  const deletePizza = async id => {
    console.log('Delete id: ' + id);
    // console.log(pizzaList[_id])
    try {
      let response = await fetch(
        'http://10.0.2.2:8080/deleteonepizza/' + id,
        {
          method: 'DELETE',
        },
      );
      let json = await response.json();
      setPizzaList(json);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (isLoading) {
      // deletePizza('67180d81a0a571d9106d8b78');  // Delete pizza data when the component is loaded
      fetchAllPizza();  // Fetch pizza data when the component is loaded
      setLoading(false);
    }
  }, [isLoading]);

  const selectItemToUpdate = (id) => {
    setUpdateId(id);
    setPizza(pizzaList[id].type);
    props.navigation.navigate("Details", { pizza: pizzaList[id] });
  }

  const renderPizza = (item) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onLongPress={() => deletePizza(item.item._id)} onPress={() => selectItemToUpdate(item.index)}>
        <View style={styles.listItemStyle}>
          <Text style={styles.itemText}>{item.item.type} {item.item.price}€</Text>
          <View style={styles.itemContainer}>
            {/* <Image source={item.item.image} style={styles.pizzaImage} /> */}
            <Image source={{uri: item.item.image}} style={styles.pizzaImage} />
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
      <Button
          style={styles.buttonStyle}
          title="Read Menu"
          onPress={()=> fetchAllPizza()}
        />
        <Button
          style={styles.buttonStyle}
          title="RESET Menu"
          onPress={()=> refreshPizzaMenu()}
        />
      <View style={styles.listStyle}>
        <FlatList style={styles.flatliststyle}
          data={pizzaList}
          renderItem={renderPizza}
          // keyExtractor={(item) => item.item._id}  // Use _id as the unique key
        />
      </View>
      {/* <NavButtons params={props} /> */}
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