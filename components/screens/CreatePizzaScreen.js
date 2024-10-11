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
  const [userNumber, setUserNumber] = useState(22);
  const [nextPage, setNextPage] = useState('SauceScreen_db');
  const [activeScreen, setActiveScreen] = useState('DoughScreen');
  const [pizza, setPizza] = useState({
    dough: 'Original',
    sauce: 'Tomato',
    toppings: ['Cheese', 'tomatoes'],
    size: 'Small',
  });


  const nextButtonHandler = (props) => {
    setActiveScreen('SauceScreen_db');
    console.log('NEXT');
    console.log(pizza)
    setPizza(prevState => ({...prevState, dough: "Muaaahahahahaha"}));
    console.log(pizza)
    props.navigation.navigate(activeScreen);
  }


  // const chooseActiveScreen = active => {
  //   setActiveScreen(active);
  // };

  let content = (
    <DoughScreen_db
      pizza={pizza}
      // active={() => chooseActiveScreen('SauceScreen')}
    />
  );
  if (activeScreen === 'SauceScreen_db') {
    content = (
      <SauceScreen_db
        pizza={pizza}
        // active={() => chooseActiveScreen('DoughScreen')}
      />
    );
  }
  return (
    <View>
      <View>
        {/* <Header title={'Create Your Pizza'} /> */}
        {content}
      </View>
      <TouchableHighlight
        style={styles.button}
        underlayColor="#fff" // colour when pressed the "button"
        // onPress={() => props.navigation.navigate("Dough")}
        onPress={() => nextButtonHandler(props)}>
        <Text style={[styles.buttonText]}>NEXT</Text>
      </TouchableHighlight>

      {/* BACK SCREEN BUTTON */}
      <TouchableHighlight
        style={styles.button}
        underlayColor="#fff" // colour when pressed the "button"
        // onPress={() => props.navigation.navigate("Dough")}
        onPress={() => console.log('BACK')}>
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
