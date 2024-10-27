import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';

const targetURL = "https://pepperonipals.lm.r.appspot.com";
// https://pepperonipals.lm.r.appspot.com/readmenu
// https://pepperonipals.lm.r.appspot.com/readalladdresses

// !!!!!!!!!!! kinda important: if you click/press the pizza without the long press,
// it gives an error "TypeError: Cannot read property 'toString' of undefined"
// idk why or how, maybe bacause we don't have the details screen of the
// specific pizza from the menu?
// doesn't really ruin much, but maybe the feature of clicking the pizza
// should be removed here, and only leave the feature of long-pressing

export const MenuScreen = (props) => {
  const [newPizza, setPizza] = useState("");
  const [updateId, setUpdateId] = useState(-1);
  const [isLoading, setLoading] = useState(true);

  const [pizzaList, setPizzaList] = useState([]);

  // READING Pizza Menu Data from MongoDB
  const fetchAllPizza = async () => {
    
    try {
      let response = await fetch(
        // 'http://10.0.2.2:8080/readmenu', // FROM MONGODB OR GOOGLE CLOUD
        targetURL + '/readmenu', // FROM GOOGLE CLOUD
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
        targetURL + '/reset', // FROM MONGODB 

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
        targetURL + '/deleteonepizza/' + id,
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
      fetchAllPizza();  // Fetch pizza data when the component is loaded
      setLoading(false);
    }
  }, [isLoading]);

  const renderPizza = (item) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onLongPress={() => deletePizza(item.item._id)}>
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
    <View style={styles.screenContainer}>

        {/* read menu from the MongoDB button */}
        <TouchableHighlight
          style={styles.button}
          onPress={()=> fetchAllPizza()}
          underlayColor="#558ce6">
          <Text style={styles.buttonText}>Read Menu</Text>
        </TouchableHighlight>

        {/* refresh the menu button */}
        <TouchableHighlight
          style={styles.button}
          onPress={()=> refreshPizzaMenu()}
          underlayColor="#558ce6">
          <Text style={styles.buttonText}>Refresh Menu</Text>
        </TouchableHighlight>


      <View style={styles.listStyle}>
        <FlatList style={styles.flatliststyle}
          data={pizzaList}
          renderItem={renderPizza}
          // keyExtractor={(item) => item.item._id}  // Use _id as the unique key
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex:1,
    backgroundColor: "#fff", // covers the grey background
  },
  button: {
    flex: 0.8, // height also depends on flex
    backgroundColor: '#5a97fa',
    margin: 10,
    width: 220,
    borderRadius: 40,
    alignSelf: "center",
    position: 'relative',
  },
  buttonText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
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