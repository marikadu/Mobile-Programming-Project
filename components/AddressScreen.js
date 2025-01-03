import { View, Text, FlatList, StyleSheet, TouchableHighlight, TextInput, Modal, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';

const targetURL = "https://pepperonipals.lm.r.appspot.com";
// const targetURL = 'http://10.0.2.2:8080'

export default function AddressScreen() {
  const [newAddressLine1, setAddressLine1] = useState('');
  const [newAddressLine2, setAddressLine2] = useState('');
  const [newCity, setCity] = useState('');
  const [newPostcode, setPostcode] = useState('');
  const [addressList, setAddressList] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);  // Store selected address for deletion
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);  // Control the modal visibility

  // Creating a custom Modal that mimics Alert window's behaviour
  // Because the Alert cannot be directly customisible, according to our research
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  // Fetch addresses when the component mounts
  useEffect(() => {
    readAllAddresses();
    clearInputFields();  // Clear form after saving
  }, []);

  // Function to save the address
  const saveAddress = () => {
    const newAddress = {
      addressLine1: newAddressLine1,
      addressLine2: newAddressLine2,
      city: newCity,
      postcode: newPostcode,
    };

    addAddress(newAddress).then(() => {
      // Alert.alert("Address Saved", "Your address has been added!"); // "Alert.alert()"" instead of "alert" to also change the title of the alert window
      // Custom alert window, above is the old and original one ^
      showAlert("Address Saved", "Your address has been added!");

      readAllAddresses();  // Refresh the list after adding a new address
      clearInputFields();  // Clear form after saving
    }).catch((error) => {
      console.error('Error saving order:', error);
      showAlert("Error", "Failed to save the address. Please try again!");
    });
  };

  // Add an address to MongoDB
  async function addAddress(newAddress) {
    const response = await fetch(
      targetURL + '/addoneaddress',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddress),
      },
    );

    const responseData = await response.json();
    console.log(responseData);
    setAddressList(addressList => [...addressList, responseData]);
  }

  // Update address in MongoDB
  const updateAddressInDb = async () => {
    console.log('Update id: ' + updateId);
    if (!updateId) return; // If no item is selected to update, return
    setAddressList(addressList => addressList.filter(address => address._id != updateId));
    try {
      let response = await fetch(
        targetURL + '/updateoneaddress',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _id: updateId, // address._id,
            addressLine1: newAddressLine1, addressLine2: newAddressLine2, city: newCity, postcode: newPostcode,
          }),
        },
      );
      setUpdateId(null); // Reset the update ID after updating
      setAddressLine1(''); // Reset the input fields
      setAddressLine2('');
      setCity('');
      setPostcode('');

      // Reload the list
      let json = await response.json();
      setAddressList(json);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to confirm the deletion of an address
  const confirmDeleteAddress = () => {
    if (selectedAddress) {
      deleteOneAddress(selectedAddress._id).then(() => {
        showAlert("Address deleted", "Address deleted successfully."); // New alert using modal
        readAllAddresses();  // Refresh the list after deleting
        setDeleteModalVisible(false);  // Hide the modal
        setSelectedAddress(null);  // Clear the selected address
      }).catch((error) => {
        console.error('Error deleting address:', error);
        showAlert("Error", "Failed to delete the address. Please try again.");
      });
    }
  };

  // Delete an address from MongoDB
  const deleteOneAddress = async id => {
    console.log('Delete id: ' + id);
    try {
      let response = await fetch(
        targetURL + '/deleteoneaddress/' + id,
        {
          method: 'DELETE',
        },
      );
      let json = await response.json();
      setAddressList(json);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to cancel deletion
  const cancelDelete = () => {
    setDeleteModalVisible(false);  // Hide the modal
    setSelectedAddress(null);  // Clear the selected address
  };

  // Reading the address data from MongoDB
  const readAllAddresses = async () => {
    try {
      let response = await fetch(
        // 'http://10.0.2.2:8080/readmenu', // FROM MONGODB OR GOOGLE CLOUD
        targetURL + '/readalladdresses', // FROM GOOGLE CLOUD
      );
      let json = await response.json();
      setAddressList(json);
      console.log('Fetching all address data from MongoDB');
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to populate the form when an address is selected for editing
  const handleAddressPress = (address) => {
    setAddressLine1(address.addressLine1);
    setAddressLine2(address.addressLine2);
    setCity(address.city);
    setPostcode(address.postcode);
    setUpdateId(address._id);  // Set the ID for update mode
  };

  // Function to handle long press and show delete confirmation
  const handleLongPress = (address) => {
    setSelectedAddress(address);  // Store the selected address
    setDeleteModalVisible(true);  // Show the confirmation modal
  };

  // Function to clear the form
  const clearInputFields = () => {
    setAddressLine1('');
    setAddressLine2('');
    setCity('');
    setPostcode('');
    setUpdateId(null);  // Exit update mode
  };

  // Custom alert proterties
  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  // Display the address details
  const renderAddress = () => {
    return (
      <View>
        <Text style={styles.text}> Address Details:</Text>
        <TextInput style={styles.addressItemStyle}
          placeholder="Address line 1"
          value={newAddressLine1}
          onChangeText={setAddressLine1}
        ></TextInput>
        <TextInput style={styles.addressItemStyle}
          placeholder="Address line 2"
          value={newAddressLine2}
          onChangeText={setAddressLine2}
        ></TextInput>
        <TextInput style={styles.addressItemStyle}
          placeholder="City"
          value={newCity}
          onChangeText={setCity}
        ></TextInput>
        <TextInput style={styles.addressItemStyle}
          placeholder="Postcode"
          value={newPostcode}
          onChangeText={setPostcode}
        ></TextInput>
      </View>
    );
  };

  return (
    <View style={styles.screenContainer} backgroundColor="#fff">
      <View style={styles.listStyle}>
        {/* render the address list */}
        {renderAddress()}

        {/* save or update address button */}
        <TouchableHighlight
          style={styles.button}
          onPress={updateId ? updateAddressInDb : saveAddress}  // Change handler based on updateId
          underlayColor='#EC863D' // Colour when the "button" is pressed
        >
          <Text style={[styles.buttonText]}>
            {updateId ? 'Update Address' : 'Save Address'}  {/* change button text whether its time to save or update */}
          </Text>
        </TouchableHighlight>
      </View>

      <KeyboardAvoidingView // KeyboardAvoidingView makes the elements stay on their place when keyboard opens
        style={styles.screenContainer}
        behavior="padding"
      >
        <Text style={styles.text}>Saved Addresses:</Text>
        {/* Address List */}
        <FlatList
          data={addressList}
          keyExtractor={(item) => (item._id ? item._id.toString() : Math.random().toString())}
          renderItem={({ item }) => (
            <TouchableHighlight underlayColor='#fff' onPress={() => handleAddressPress(item)} onLongPress={() => handleLongPress(item)}>
              <View>
                <Text style={styles.listItems}>{item.addressLine1} {item.addressLine2} {item.city} {item.postcode}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </KeyboardAvoidingView>

      {/* delete confirmation Modal */}
      <Modal
        visible={isDeleteModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Delete Address</Text>
            <Text style={styles.modalMessage}>Are you sure you want to delete this address?</Text>

            {/* confirmation buttons */}
            <View style={styles.modalButtons}>
              <TouchableHighlight
                style={styles.modalButtonDelete}
                onPress={confirmDeleteAddress}
                underlayColor="#d9534f"
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.modalButtonCancel}
                onPress={cancelDelete}
                underlayColor="#f0f0f0"
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      {/* custom alert window */}
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
              onPress={() => setAlertVisible(false)}
              underlayColor="#cc7333"
            >
              <Text style={styles.customAlertButtonText}>OK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex:1,
    backgroundColor: "#fff", // covers the grey background
  },
  text: {
    color: '#CD6524',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'flex-end',
  },
  addressItemStyle: {
    borderWidth: 2,
    borderColor: '#F58C41',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 10,
    fontSize: 18,
    paddingLeft: 40,
    paddingRight: 40,
    alignSelf: 'center',
    width: 220,
  },
  listStyle: {
    alignItems: 'center',
    width: '100%',
  },
  listItems: {
    margin: 5,
    padding: 4,
    color: '#CD6524',
    fontSize: 20,
    backgroundColor: '#FFE8D8',
    width: '80%',
    borderRadius: 10,
    textAlign: 'center',
    alignSelf: 'center',
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
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
  },
  // Modal styling
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // half transparent background
  },
  modalContainer: {
    width: 320,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 10, // shadow behind the window
  },
  modalTitle: {
    color: '#CD6524',
    fontSize: 20,
    fontWeight: 'bold',
    bottom: 8,
    marginBottom: 10,
  },
  modalMessage: {
    color: '#CD6524',
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonDelete: {
    backgroundColor: '#db5b44',
    padding: 12,
    borderRadius: 5,
  },
  modalButtonCancel: {
    backgroundColor: '#dedcdc',
    padding: 12,
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Custom alert window styling
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