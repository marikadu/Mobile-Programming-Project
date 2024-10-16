// import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import RadioForm from 'react-native-simple-radio-button';
// import { saveOrder } from '../database/Old_db';
// import sauceImg from '../assets/pizza_pngs/sauce.png';

// export default function SauceScreen({ route, navigation }) {
//     const sauceOptions = [
//         {label: 'Add sauce', value: 'Add', image: sauceImg },
//         {label: 'No sauce', value: 'None' }
//       ];

//     const { selectedDough, selectedDoughImage } = route.params;
//     const [selectedSauce, setSelectedSauce] = useState('Add');
//     const [selectedSauceImage, setSelectedSauceImage] = useState(sauceOptions[0].value); // Used for saving the current image

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', () => {
//             const orderData = {
//                 dough: selectedDough,
//                 sauce: selectedSauce,
//                 toppings: null, // This will be updated in ToppingsScreen
//                 size: null // This will be updated in SizeScreen
//             };

//             saveOrder(orderData)
//                 .then(() => {
//                     console.log('Sauce saved:', orderData);
//                 })
//                 .catch((error) => {
//                     console.error('Error saving sauce:', error);
//                 });
//         });

//         return unsubscribe; // Cleanup the listener
//     }, [navigation, selectedSauce]); // Re-run effect if selectedSauce changes
    
//     setSelected = (value) => {
//         selectedOption = sauceOptions.find(options => options.value === value);
//         setSelectedSauce(value);
//         setSelectedSauceImage(selectedOption.image) // Update selected sauce image if available
//         console.log('Sauce selected:', value);
//         navigation.setParams({ selectedSauce: value, selectedSauceImage: selectedOption.image }); // Update navigation params with selectedSauce and image
//     }
    
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Choose the sauce</Text>
//                 <View style={styles.listStyle}>
//                     <RadioForm
//                         radio_props={sauceOptions.map(option => ({ label: option.label, value: option.value }))}
//                         initial={0}
//                         onPress={(value) => setSelected(value)}
//                         buttonColor={'#E04A2B'}
//                         labelColor={'#E04A2B'}
//                         selectedButtonColor={'#E04A2B'}
//                         buttonSize={15}
//                         labelStyle={styles.itemText}
//                     />
//                 </View>
//                 <View style={styles.pizzaContainer}>
//                     <Image source={selectedDoughImage} style={styles.doughImage} />
//                     {/* render the image when the sauce is selected */}
//                     {selectedSauce === "Add" && (
//                     <Image source={sauceImg} style={styles.sauceImage} />
//                 )}
//                 </View>
                
//     </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'white',
//     },
//     title: {
//         flex: 1,
//         fontSize: 24,
//         color: '#ba3d23',
//         fontWeight: 'bold',
//         marginTop: 20,
//     },
//     listItemStyle: {
//         borderWidth: 1,
//         borderColor: "blue",
//         padding: 5,
//         backgroundColor: "#abc",
//         width: "80%",
//         alignSelf: "center",
//     },
//     listStyle: {
//         flex: 10,
//         width: '80%',
//         alignSelf: 'center',
//     },
//     toppingItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 5,
//     },
//     itemText: {
//         fontSize: 18,
//         color: '#E04A2B',
//         marginLeft: 10,
//     },
//     pizzaContainer: {
//         width: 200,
//         height: 200,
//         position: 'relative', // for the absolute position for the toppings
//     },
//     doughImage: {
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//     },
//     sauceImage: {
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//     },
// });

