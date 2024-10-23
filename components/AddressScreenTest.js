import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image, TouchableHighlight, TextInput, Modal, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { addAddress, updateAddress, deleteAddress, fetchAllAddress } from '../database/db'; 

export default function AddressScreenTest( route, navigation ) {
  const [text, setText] = useState('');
  const [newAddressLine1, setAddressLine1] = useState('');
  const [newAddressLine2, setAddressLine2] = useState('');
  const [newCity, setCity] = useState('');
  const [newPostcode, setPostcode] = useState('');
  const [addressList, setAddressList] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);  // Store selected address for deletion
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);  // Control the modal visibility

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
        alert("Your address has been added to the database!");
        readAllAddresses();  // Refresh the list after adding a new address
        clearInputFields();  // Clear form after saving
    }).catch((error) => {
        console.error('Error saving order:', err);
        alert('Failed to save the address. Please try again.');
    });
  };

  // Function to update the address in DB
  const updateAddressInDb = () => {
    if (updateId) {
      updateAddress(updateId, newAddressLine1, newAddressLine2, newCity, newPostcode)
        .then(() => {
          alert('Address updated successfully!');
          readAllAddresses();  // Refresh the address list
          clearInputFields();  // Clear the form after updating
          setUpdateId(null);   // Reset update mode
        })
        .catch((error) => {
          console.error('Error updating address:', error);
          alert('Failed to update the address. Please try again.');
        });
    }
  };

  // Function to delete address from DB
  const confirmDeleteAddress = () => {
    if (selectedAddress) {
      deleteAddress(selectedAddress.id).then(() => {
        alert("Address deleted successfully.");
        readAllAddresses();  // Refresh the list after deleting
        setDeleteModalVisible(false);  // Hide the modal
        setSelectedAddress(null);  // Clear the selected address
      }).catch((error) => {
        console.error('Error deleting address:', error);
        alert('Failed to delete the address. Please try again.');
      });
    }
  };

  // Function to cancel deletion
  const cancelDelete = () => {
    setDeleteModalVisible(false);  // Hide the modal
    setSelectedAddress(null);  // Clear the selected address
  };

  async function readAllAddresses() {
    try {
      const dbResult = await fetchAllAddress();  // Wait for the result
      console.log("Fetched addresses:", dbResult);
      setAddressList(dbResult);  // Set the fetched addresses to state
    } catch (err) {
      console.error("Error fetching addresses: ", err);
    }
  }

  // Function to populate the form when an address is selected for editing
  const handleAddressPress = (address) => {
    setAddressLine1(address.addressLine1);
    setAddressLine2(address.addressLine2);
    setCity(address.city);
    setPostcode(address.postcode);
    setUpdateId(address.id);  // Set the ID for update mode
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

  // Display the Address details
  const renderAddress = () => {
    return (
      <View>
        <Text style={styles.text}> Address Details:</Text>
          <TextInput style={styles.orderItemStyle}
          placeholder="Address line 1"
          value={newAddressLine1}
          onChangeText={setAddressLine1}
          ></TextInput>
          <TextInput style={styles.orderItemStyle}
          placeholder="Address line 2"
          value={newAddressLine2}
          onChangeText={setAddressLine2}
          ></TextInput>
          <TextInput style={styles.orderItemStyle}
          placeholder="City"
          value={newCity}
          onChangeText={setCity}
          ></TextInput>
          <TextInput style={styles.orderItemStyle}
          placeholder="Postcode"
          value={newPostcode}
          onChangeText={setPostcode}
          ></TextInput>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }} backgroundColor="#fff">
      <View style={styles.listStyle}>
        {renderAddress()}

        {/* Save or Update Address button */}
        <TouchableHighlight
          style={styles.button}
          onPress={updateId ? updateAddressInDb : saveAddress}  // Change handler based on updateId
          underlayColor='#EC863D' // colour when pressed the "button"
        >
          <Text style={[styles.buttonText]}>
            {updateId ? 'Update Address' : 'Save Address'}  {/* Change button text */}
          </Text>
        </TouchableHighlight>
      </View>

      <View>
        <Text style={styles.fishlist}>Saved Addresses:</Text>

        {/* Address List */}
        <FlatList
          data={addressList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleAddressPress(item)} onLongPress={() => handleLongPress(item)}>
              <View>
                <Text>{item.id} {item.addressLine1} {item.addressLine2} {item.city} {item.postcode}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Delete Confirmation Modal */}
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

            {/* Confirmation Buttons */}
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
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  fishlist: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  }, // The rest is modal styling, change as needed
  modalBackground: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonDelete: {
    backgroundColor: '#d9534f',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonCancel: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});