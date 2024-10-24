import { View, Text, Alert, ScrollView, StyleSheet, TouchableHighlight, TextInput, KeyboardAvoidingView, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function FeedbackScreen({ route, navigation }) {

  // creating a custom Modal that mimics Alert window's behaviour
  // because the Alert cannot be directly customisible, according to our research
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertButtonCallback, setAlertButtonCallback] = useState(() => { }); // for the onPress function

  // custom alert proterties
  const showAlert = (title, message, onPress = () => { }) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertButtonCallback(() => () => { // double arrow function for stability, without it the fake alert window doesn't apper
      setAlertVisible(false);
      onPress();
    });
    setAlertVisible(true);
  };

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
          onChangeText={newText => setText(newText)}
          value={text}
        ></TextInput>

        {/* --- 'Camera' feature should be here --- */}
      </View>
    );
  };

  const handleSendFeedback = () => {
    setText(''); // Clear text input field

    // custom alert with navigation logic
    showAlert("Feedback Sent", "Thank you for your feedback!", () => {
      navigation.reset({
        index: 0,
        // closed with code just in case the new code stops working \/
        // routes: [{ name: 'Order', params: { screen: 'PastOrders' } }],
        // apparently the navigation to the Home screen should be here
        routes: [{ name: 'Home', params: { screen: 'Home' } }],
      });
      // go back to the home screen
      // navigation.navigate('Home', { screen: 'Home' });
    }
    );
  };


  return (
    <KeyboardAvoidingView // KeyboardAvoidingView makes the elements stay on their place when keyboard opens
      style={styles.screenContainer}
      behavior="padding"
      keyboardVerticalOffset={80} // elements slightly go up
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.listStyle}>
          {renderAddress()}
        </View>

        {/* take picture button */}
        <TouchableHighlight
          style={styles.buttonNotFunctional}>
          <Text style={styles.buttonText}>Take Picture</Text>
        </TouchableHighlight>

        {/* order details button */}
        <TouchableHighlight
          style={styles.buttonNotFunctional}>
          <Text style={styles.buttonText}>Order Details</Text>
        </TouchableHighlight>

        {/* send feedback button */}
        <TouchableHighlight
          style={styles.button}
          onPress={handleSendFeedback}
          underlayColor="#EC863D">
          <Text style={styles.buttonText}>Send Feedback</Text>
        </TouchableHighlight>

      </ScrollView>

      {/* fake alert window */}
      <Modal
        visible={isAlertVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.customAlertBackground}>
          <View style={styles.customAlertContainer}>
            <Text style={styles.customAlertTitle}>{alertTitle}</Text>
            <Text style={styles.customAlertMessage}>{alertMessage}</Text>
            <TouchableHighlight
              style={styles.customAlertButton}
              onPress={alertButtonCallback}
              underlayColor="#EC863D">
              <Text style={styles.customAlertButtonText}>OK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#fff",
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff", // covers the grey background
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
  buttonNotFunctional: {
    flex: 1,
    margin: 10,
    paddingTop: 10,
    width: 250,
    height: 56,
    backgroundColor: '#828181',
    borderRadius: 40,
    alignSelf: "center",
    position: 'relative',
  },
  buttonTextNotFunctional: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
  },
  // custom alert window styling
  customAlertBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // half transparent background
  },
  customAlertContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10, // shadow behind the window
  },
  customAlertTitle: {
    color: '#CD6524',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  customAlertMessage: {
    color: '#CD6524',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  customAlertButton: {
    backgroundColor: '#F58C41',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  customAlertButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});