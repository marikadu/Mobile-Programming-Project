import React, {act, useState} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import DoughScreen_db from './DoughScreen_db.js';
import SauceScreen_db from './SauceScreen_db.js';

// IMPORT DB FUNCTIONS
import {
  init,
  addPizza,
  updatePizza,
  deletePizza,
  fetchAllPizzas,
} from '../../database/db.js';

// Initialize the database
init()
  .then(() => {
    console.log('Database Creation Succeeded!');
  })
  .catch(err => {
    console.log('Database Creation Failed! : ' + err);
  });

export const CreatePizzaScreen = (props) => {
// PASSING STUFF
// tracking the current dough visible, the starting index of 0 for the Original Dough
  // const [currentDoughIndex, setCurrentDoughIndex] = useState(0);
  // tracking the current dough visible, the starting index of 0 for the Original Dough
  // const [selectedDough, setSelectedDough] = useState(0);
  // const [selectedDoughImage, setSelectedDoughImage] = useState(doughOptions[0].image); // Used for saving the current image
  // const [doughIndex, setDoughIndex] = useState(0); // Store the index for navigation


  // const doughOptions = [
  //   { label: 'Original Dough', image: originalDough }, // fix the arrow placing - Marika
  //   { label: 'Gluten-Free Dough', image: glutenFreeDough },
  //   { label: 'Wholewheat Dough', image: wholeWheatDough },
  // ];
///


  const [activeScreen, setActiveScreen] = useState('DoughScreen_db');
  const [previousScreen, setPreviousScreen] = useState(null);
  const [pizza, setPizza] = useState({
    dough: 'Original',
    sauce: 'Tomato',
    toppings: ['Cheese', 'tomatoes'],
    size: 'Small',
  });


  const nextButtonHandler = () => {
    setPreviousScreen('DoughScreen_db');
    setActiveScreen('SauceScreen_db');
    console.log('NEXT');
    console.log(pizza)
    setPizza(prevState => ({...prevState, dough: "Muaaahahahahaha"}));
    console.log(pizza)
    // Navigate to the next screen and pass the updated pizza object
    props.navigation.navigate(activeScreen, {pizza} );
    // props.params = {...props,pizza: pizza};
  }

  // CONVERTED THE BUTTON INTO THE COMPONENT
  const ButtonComponent = ({navigation}) => {
    return (
      <View>
      <TouchableHighlight
        style={styles.button}
        underlayColor="#fff" // colour when pressed the "button"
        onPress={() => nextButtonHandler()}>
        <Text style={[styles.buttonText]}>NEXT</Text>
      </TouchableHighlight>
    </View>
  )};



  // const chooseActiveScreen = active => {
  //   setActiveScreen(active);
  // };

  // Render Dough or Sauce screens based on the activeScreen state
  let content = <DoughScreen_db pizza={pizza} setPizza={setPizza} />;
  if (activeScreen === 'SauceScreen_db') {
    content = <SauceScreen_db pizza={pizza} setPizza={setPizza} />;
  }
  return (
    <View>
      <View>
        {/* <Header title={'Create Your Pizza'} /> */}
        {content}
      </View>

      {/* {<ButtonComponent navigation={props.navigation}/>} */}
      {<ButtonComponent props={props}/>}

      {/* <TouchableHighlight
        style={styles.button}
        underlayColor="#fff" // colour when pressed the "button"
        // onPress={() => props.navigation.navigate("Dough")}
        onPress={() => nextButtonHandler(props)}>
        <Text style={[styles.buttonText]}>NEXT</Text>
      </TouchableHighlight> */}

      {/* BACK SCREEN BUTTON */}
      <TouchableHighlight
        style={styles.button}
        underlayColor="#fff" // colour when pressed the "button"
        // onPress={() => props.navigation.navigate("Dough")}
        // onPress={() => console.log('BACK')}>
        onPress={() => props.navigation.goBack()}>
        <Text style={[styles.buttonText]}>BACK</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  
  button: {
    backgroundColor: '#fff', // yes I know the white is ugly visible, I am working on it
    margin: 6,
    paddingTop: 12,
    width: 200,
    height: 50,
  },
  buttonText: {
    flex: 3,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F58C41',
    textAlign: 'center',
    alignItems: 'center',
  },
});
