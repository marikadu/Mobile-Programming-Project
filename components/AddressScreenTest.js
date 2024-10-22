import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image, TouchableHighlight, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { init, addAddress, updateFish, deleteFish, fetchAllFish } from '../database/addressDB';

init()
.then(()=>{
    console.log('Database creation succeeded!');
}).catch((err)=>{
  console.log('Database IS NOT initialized! '+err);
});

export default function AddressScreenTest( route, navigation) {
  // hardcoded address
  const addressDetails = {
    address: 'Red Str. 89 1. floor',
  };

  const [text, setText] = useState('');
  const [isInserted, setIsInserted]=useState(false);
  const [fishList, setFishList]=useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [newBreed, setBreed] = useState('');
  const [newWeight, setWeight] = useState('');
  const [newFirstName, setnewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [selectedFishId, setSelectedFishId] = useState(null);

  async function saveAddress(){
    try{
      const dbResult = await addAddress(newAddress, newFirstName, newLastName);
      console.log("dbResult: "+dbResult);
      readAllFish();
    }
    catch(err){
      console.log(err);
    }
    finally{
      //No need to do anything
    }
  }

  async function deleteFishFromDb(){
    try{
      const dbResult = await deleteFish(selectedFishId);
      console.log("Fish deleted: " + selectedFishId);
      readAllFish();
      clearInputFields();
    }
    catch(err){
      console.log(err);
    }
    finally{
      //No need to do anything
    }
  }

  async function updateFishInDb(){
    if (selectedFishId !== null) {
      try{
        const dbResult = await updateFish(selectedFishId, newBreed, newWeight);
        console.log("Fish updated: " + selectedFishId);
        readAllFish();
        clearInputFields();
      }
      catch(err){
        console.log(err);
      }
      finally{
        //No need to do anything
      }
    }
  }

  async function readAllFish(){
    try{
      const dbResult = await fetchAllFish();
      console.log("dbResult readAllFish in App.js");
      console.log(dbResult);
      setFishList(dbResult);
    }
    catch(err){
      console.log("Error: "+err);
    }
    finally{
      console.log("All fish are read");
    }
  }

  function selectFish(fish) {
    setNewAddress(fish.address);
    setnewFirstName(fish.firstName);
    setNewLastName(fish.lastName);
    setSelectedFishId(fish.id);
    console.log("Selected fish: ", fish);
  }

  function clearInputFields() {
    setBreed('');
    setWeight('');
    setSelectedFishId(null);
  }

  // Display the Address and Payment method details
  const renderAddress = () => {
    return (
      <View>
        <Text style={styles.text}> Address Details:</Text>
          <TextInput style={styles.orderItemStyle}
          placeholder="Street name and number"
          value={newAddress}
          onchangeText={(text) => setNewAddress(text)}
          ></TextInput>
          <TextInput style={styles.orderItemStyle}
          placeholder="First name"
          value={newFirstName}
          onChangeText={(text) => setnewFirstName(text)}
          ></TextInput>
          <TextInput style={styles.orderItemStyle}
          placeholder="Last name"
          value={newLastName}
          onChangeText={(text) => setNewLastName(text)}
          ></TextInput>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }} backgroundColor="#fff">
      <View style={styles.listStyle}>
        {renderAddress()}
      </View>

      <View>
          <Text style={styles.fishlist}>The fishlist:</Text>

           {/* Fishlist */}
          <FlatList
          data={fishList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item})=> (
            <TouchableOpacity onPress={() => selectFish(item)}>
              <View>
                <Text>{item.id} {item.address} {item.firstName} {item.lastName}</Text>
              </View>
            </TouchableOpacity>
          )}
         />
        </View>

      {/* place order button */}
      {/* <TouchableHighlight
          style={styles.button}
          // after you press the "Place Order" button -> goes to the Timer Screen
          // onPress={() => props.navigation.navigate("Menu")} 
          underlayColor='#EC863D' // colour when pressed the "button"
          >
          <Text style={[styles.buttonText]}>Save Address</Text>
        </TouchableHighlight> */}
        <Button color="#F58C41" title="Save" onPress={()=>saveAddress()} />
        <Button color="#F58C41" title="Delete" onPress={()=>deleteFishFromDb()} disabled={!selectedFishId}/>
        <Button color="#F58C41" title="Update" onPress={()=>updateFishInDb()} disabled={!selectedFishId}/>
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
  }
});