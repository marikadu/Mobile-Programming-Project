import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import React from 'react';
import PizzaList from './PizzaList'; // Import the reusable PizzaList component

export default function PastOrdersScreen({ navigation }) {
  return (
     <View style={{ flex: 1 }} backgroundColor="#fff">
       {/* renders the pizza list using the pizzalist component */}
      <PizzaList navigation={navigation} />

      {/* button for ordering a new pizza */}
      <TouchableHighlight
        style={styles.button}
        onPress={() => navigation.navigate('Dough')}
        underlayColor="#EC863D">
          
        <Text style={[styles.buttonText]}>Order a new Pizza</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
});
