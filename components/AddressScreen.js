import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image, TouchableHighlight, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';

import NavButtons from './NavButtons.js';

export default function AddressScreen( route, navigation) {

  // hardcoded address
  const addressDetails = {
    address: 'Red Str. 89 1. floor',
  };

  const [text, setText] = useState('');

  // Display the Address and Payment method details
  const renderAddress = () => {
    return (
      <View>
        <Text style={styles.text}> Address Details:</Text>
          <TextInput style={styles.orderItemStyle}
          placeholder={addressDetails.address}
          onchangeText={newText => setText(newText)}
          defaultValue={text}
          ></TextInput>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }} backgroundColor="#fff">
      <View style={styles.listStyle}>
        {renderAddress()}
      </View>

      {/* place order button */}
      <TouchableHighlight
          style={styles.button}
          // after you press the "Place Order" button -> goes to the Timer Screen
          // onPress={() => props.navigation.navigate("Menu")} 
          underlayColor='#EC863D' // colour when pressed the "button"
          >
          <Text style={[styles.buttonText]}>Save Address</Text>
        </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  background:{
    backgroundColor: "#fff",
  },
  listItemStyle: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#CD6524',
    padding: 5,
    backgroundColor: '#FFF9F2',
    borderRadius: 20,
    margin: 10,
    width: '80%',
    alignSelf: 'center',
  },
  orderTotalContainerStyle: {
    // flex: 1,
    padding: 5,
    justifyContent: 'space-around',
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderTotalStyle: {
    flex: 1,
    color: "#CD6524",
    fontSize: 20,
    padding: 6,
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 30,
    textAlign: 'center',
  },
  text: {
    // flex: 1,
    color: '#CD6524',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'flex-end',
  },
  orderItemStyle: {
    borderWidth: 2,
    borderColor: '#F58C41',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 10,
    paddingLeft: 40,
    paddingRight: 40,
    alignSelf: 'center',
  },
  orderItemStylePayment: {
    borderWidth: 2,
    borderColor: '#FFF9F2',
    padding: 10,
    backgroundColor: '#FFE8D8',
    borderRadius: 10,
    margin: 10,
    paddingLeft: 40,
    paddingRight: 40,
    alignSelf: 'center',
  },
  listStyle: {
    flex: 9,
    alignItems: 'center',
    width: '100%',
  },
  itemText: {
    color: '#CD6524',
    fontSize: 20,
    margin: 2,
  },
  flatliststyle: {
    width: '100%', // makes it the whole page and grey-ish lines from the sides disappear!
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
  descriptionText: {
    flex: 1,
    color: '#CD6524',
    fontSize: 16,
  },
  pizzaImage: {
    width: 80,
    height: 80,
    borderRadius: 25,
  },
  button: {
    margin: 20,
    paddingTop: 10,
    width: 250,
    height: 56,
    backgroundColor: '#F58C41',
    borderRadius: 40,
    alignSelf: "center",
  },
  buttonText: {
    flex:1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
  },
});