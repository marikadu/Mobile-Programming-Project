import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import originalDough from '../assets/pizza_pngs/dough_og.png';
import glutenFreeDough from '../assets/pizza_pngs/dough_gluten_free.png';
import wholeWheatDough from '../assets/pizza_pngs/dough_whole_wheat.png';

// dough options array with the images
const doughOptions = [
  { label: 'Original Dough', image: originalDough }, // fix the arrow placing - Marika
  { label: 'Gluten-Free Dough', image: glutenFreeDough },
  { label: 'Wholewheat Dough', image: wholeWheatDough },
];

export default function DoughScreen({ route, navigation }) {
  // tracking the current dough visible, the starting index of 0 for the Original Dough
  const [currentDoughIndex, setCurrentDoughIndex] = useState(0);

//   function for the left arrow -> array goes backward 
//   (from Original to Wholewheat)
//   (from Wholewheat to Gluten-free)
//   (from Gluten-free to Original)
  const handleLeftPress = () => {
    setCurrentDoughIndex((prevIndex) =>
      prevIndex === 0 ? doughOptions.length - 1 : prevIndex - 1
    );
  };

  // function for the right arrow -> array goes forward
  // (from the Original to Gluten-free)
  // (from Gluten-free to Wholewheat)
  // (from Wholewheat to Original)
  const handleRightPress = () => {
    setCurrentDoughIndex((prevIndex) =>
      prevIndex === doughOptions.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Choose the Dough</Text>
        {/* container for the dough lable and the arrows */}
        <View style={styles.lableArrows}>
            {/* left arrow*/}
            <TouchableOpacity onPress={handleLeftPress}>
            <Text style={styles.arrow}>&lt;</Text>
            </TouchableOpacity>

            {/* dough label */}
            <Text style={styles.doughLabel}>
                {doughOptions[currentDoughIndex].label}
            </Text>

            {/* right arrow */}
            <TouchableOpacity onPress={handleRightPress}>
            <Text style={styles.arrow}>&gt;</Text>
            </TouchableOpacity>
        </View>

      <View style={styles.pizzaContainer}>
        {/* dough image */}
        <View style={styles.doughImage}>
          <Image
            source={doughOptions[currentDoughIndex].image}
            style={styles.doughImage}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    color: '#E04A2B',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  arrow: {
    fontSize: 40,
    color: '#E04A2B',
    paddingHorizontal: 20,
  },
  doughImage: {
    alignItems: 'center',
  },
  lableArrows: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  pizzaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doughImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  doughLabel: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
});
