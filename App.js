import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Custom icon for header
import HomeScreen from './screens/HomeScreen';
import DoughScreen from './screens/DoughScreen';
import SauceScreen from './screens/SauceScreen';
import ToppingsScreen from './screens/ToppingsScreen';
import SizeScreen from './screens/SizeScreen';
import PepperoniPalsView from './components/PepperoniPals.js';
import { DetailsScreen } from './components/DetailsScreen.js';
import { ImageScreen } from './components/ImageScreen.js';
import { LogoTitle } from './components/LogoTitle.js';
import { MenuScreen } from './components/MenuScreen.js';
import { getDBConnection, createTables, saveOrder, fetchOrders } from './database/db';

const Stack = createNativeStackNavigator();

const HeaderRightButton = ({ navigation }) => {
  const currentRoute = navigation.getState().routes[navigation.getState().index].name;

  // Fetching the current selected options for the pizza
  const getCurrentSauce = () => {
    const sauceRoute = navigation.getState().routes.find(route => route.name === 'Sauce');
    return sauceRoute ? sauceRoute.params?.selectedSauce : 'Add'; // Default sauce if not found
  };
  const getCurrentToppings = () => {
    const toppingsRoute = navigation.getState().routes.find(route => route.name === 'Toppings');
    return toppingsRoute ? toppingsRoute.params?.selectedToppings : [];
  };
  const getCurrentSize = () => {
    const sizeRoute = navigation.getState().routes.find(route => route.name === 'Size');
    return sizeRoute ? sizeRoute.params?.selectedSize : 'Small';
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (currentRoute === "Dough") {
          navigation.navigate('Sauce');
        } else if (currentRoute === "Sauce") {
          const selectedSauce = getCurrentSauce(); // Get current selected sauce
          navigation.navigate('Toppings', { selectedSauce: selectedSauce }); // Pass selectedSauce
        } else if (currentRoute === "Toppings") {
          const selectedSauce = getCurrentSauce();
          const selectedToppings = getCurrentToppings();
          console.log('Selected Toppings:', selectedToppings);
          navigation.navigate('Size', { selectedSauce: selectedSauce, selectedToppings: selectedToppings }); // Pass selected sauce and toppings
        } else if (currentRoute === "Size") {
          const selectedSauce = getCurrentSauce();
          const selectedToppings = getCurrentToppings();
          const selectedSize = getCurrentSize();
          
          console.log('Order Summary:', { selectedSauce, selectedToppings, selectedSize });
        }
        // Add more screens here as needed
      }}
      style={{ paddingRight: 15 }}
    >
      <Ionicons name="chevron-forward" size={24} color="#E04A2B" />
    </TouchableOpacity>
  );
};

const HeaderLeftButton = ({ navigation }) => {
  if (!navigation.canGoBack()) return null; // Return null if there's no previous screen

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 15 }}>
      <Ionicons name="chevron-back" size={24} color="#E04A2B" />
    </TouchableOpacity>
  );
};

export default function App() {
  useEffect(() => {
    // Initialize database and create tables
    getDBConnection()
      .then(() => createTables()) // Wait for the tables to be created
      .then(() => console.log('Tables created successfully'))
      .catch((error) => console.error('Error creating tables:', error));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Dough"
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: '#E04A2B', // Left arrow and text color
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          paddingLeft: 10,
        },
        headerTitleAlign: 'center',
        headerRight: () => <HeaderRightButton navigation={navigation} />, // Right arrow component
        headerLeft: () => <HeaderLeftButton navigation={navigation} />, // Left arrow component
      })}>
        <Stack.Screen name="PepperoniPals" component={PepperoniPalsView} options={({route}) => ({title: route.params?.name ? route.params.name : "Pepperoni_PAPIiii"})} />
        <Stack.Screen name="Dough" component={DoughScreen} options={{ title: 'Creating a pizza' }}/>
        <Stack.Screen name="Sauce" component={SauceScreen} options={{ title: 'Creating a pizza' }}/>
        <Stack.Screen name="Toppings" component={ToppingsScreen} options={{ title: 'Creating a pizza' }}/>
        <Stack.Screen name="Size" component={SizeScreen} options={{ title: 'Creating a pizza' }}/>
        <Stack.Screen name="Details" component={DetailsScreen}  />
        {/* Notice how the IMAGE PAGE has the logo of the elephant from ./assets/misc.png */}
        <Stack.Screen name="Image" component={ImageScreen} options={{headerTitle: (props) => <LogoTitle {...props} />}} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles=StyleSheet.create({
  navbuttonstyle:{
    flex:2,
    flexDirection:"row",
    backgroundColor:"#def",
    alignItems:"center",
    justifyContent:"space-around",    
  },
  imageContainer:{
    height:200,
    width:'50%',
    borderRadius:200,
    overflow:'hidden',
    borderWidth:3,
    borderColor:'red',
  },
  image:{
    height:'100%',
    width:'100%'
  },
  listItemStyle:{
    borderWidth:1,
    borderColor:"blue",
    padding:5,
    backgroundColor:"#abc",
    width:"80%",
    alignSelf:"center",
  },
  listStyle:{
    flex:8,
    alignItems:"center",
    backgroundColor:"#eee",
    borderColor:"red",
    borderWidth:2,
    width:"100%",
  },
  flatliststyle:{
    width:'80%',
    backgroundColor:'blue',
  },
});