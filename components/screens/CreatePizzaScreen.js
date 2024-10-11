import React, {act, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';


import DoughScreen_db from './DoughScreen_db.js';
import SauceScreen_db from './SauceScreen_db.js';

// IMPORT DB FUNCTIONS
import {init, addPizza, updatePizza, deletePizza ,fetchAllPizzas } from '../../database/db.js';
init().then(() => {
  console.log('Database Creation Succeeded!');
}).catch((err) => {
  console.log('Database Creation Failed!' + err);
})

export const CreatePizzaScreen = (props) => {
  const [userNumber, setUserNumber] = useState(22);
//   const [shouldGameStop, setShouldGameStop] = useState(false);
  const [activeScreen, setActiveScreen] = useState('DoughScreen');
  const [pizza, setPizza] = useState({dough: 'Original', sauce: "Tomato", toppings: ['Cheese', "tomatoes"], size: "Small"},);

//   const startGame = selectedNumber => {
//     setUserNumber(selectedNumber);
//     setShouldGameStop(false);
//   };

const chooseActiveScreen = active => {
    setActiveScreen(active);
  };

  let content = <DoughScreen_db pizza={pizza} active = {() => chooseActiveScreen('SauceScreen')} />;
  if (activeScreen === 'SauceScreen_db') {
    content = <SauceScreen_db pizza={pizza} active={() =>chooseActiveScreen('DoughScreen')} />;
  }
  return (
    <View>
      {/* <Header title={'Create Your Pizza'} /> */}
      {content}
    </View>
  );
}
