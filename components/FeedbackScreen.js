import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image, TouchableHighlight, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';
// if you press the input field, the buttons go up with the keyboard for some reason
// I'll try to fix this!
import NavButtons from './NavButtons.js';

export default function FeedbackScreen(route, navigation) {

  // hardcoded address
  const addressDetails = {
    address: 'Red Str. 89 1. floor',
  };

  const [text, setText] = useState('');

  // Display the Address and Payment method details
  const renderAddress = () => {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundBackgroundContainer}>
          <Text style={styles.backgroundContainer}>Enjoy your pizza!</Text>
        </View>

        <Text style={styles.text}> Leave Feedback:</Text>
        <TextInput style={styles.orderItemStyle}
          placeholder="Leave Feedback"
          onchangeText={newText => setText(newText)}
          defaultValue={text}
        ></TextInput>

        {/* --- if we have time, the Camera goes here --- */}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }} backgroundColor="#fff">
      <View style={styles.listStyle}>
        {renderAddress()}
      </View>

      {/* buttons */}

      {/* take picture button */}
      <TouchableHighlight
        style={styles.button}
        underlayColor='#EC863D' // colour when pressed the "button"
        >
        <Text style={[styles.buttonText]}>Take Picture</Text>
      </TouchableHighlight>

      {/* order details button */}
      <TouchableHighlight
        style={styles.button}
        underlayColor='#EC863D'
        >
        <Text style={[styles.buttonText]}>Order Details</Text>
      </TouchableHighlight>

      {/* send feedback button */}
      <TouchableHighlight
        style={styles.button}
        underlayColor='#EC863D'
        >
        <Text style={[styles.buttonText]}>Send Feedback</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backgroundBackgroundContainer: {
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE8D8',
    borderRadius: 20,
    width: 300,
    height: 70,
  },
  backgroundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CD6524',
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
    marginBottom: 20,
  },
  orderItemStyle: {
    borderWidth: 2,
    borderColor: '#F58C41',
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: 300,
    height: 100,
    margin: 10,
    padding: 20,
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
    flex: 1,
    margin: 10,
    paddingTop: 10,
    width: 250,
    height: 56,
    backgroundColor: '#F58C41',
    borderRadius: 40,
    alignSelf: "center",
    position: 'relative',
  },
  buttonText: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
  },
});