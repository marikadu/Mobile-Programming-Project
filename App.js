import React, { useState, createContext, useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Custom icon for header
import './gesture-handler';
import DoughScreen from './screens/DoughScreen';
import SauceScreen from './screens/SauceScreen';
import ToppingsScreen from './screens/ToppingsScreen';
import SizeScreen from './screens/SizeScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import TimerScreen from './screens/TimerScreen';
import HomeScreen from './components/HomeScreen';
// Address Screen is a part of the "Home" from tab navigation right now
import AddressScreen from './components/AddressScreen';
import PastOrdersScreen from './components/PastOrdersScreen';
import FeedbackScreen from './components/FeedbackScreen';
import AboutUsScreen from './components/AboutUs.js';
import { MenuScreen } from './components/MenuScreen.js';
import { SettingsScreen } from './components/SettingsScreen.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// IMPORT DATABASE FUNCTIONS
import {init, addPizza, updatePizza, deletePizza, fetchAllPizza} from './database/db.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Gets the default parameters of each object
const defaultParams = {
  Dough: { selectedDough: '0', selectedDoughImage: '0' },
  Sauce: { selectedSauce: 'With sauce', selectedSauceImage: '0' },
  Toppings: { selectedToppings: [] },
  Size: { selectedSize: 'Small' },
};

// General function for finding the route for each object
const getRouteParams = (navigation, routeName) => {
  const route = navigation.getState().routes.find(r => r.name === routeName);
  return route ? route.params || defaultParams[routeName] : defaultParams[routeName];
};

const HeaderRightButton = ({ navigation }) => {
  const currentRoute = navigation.getState().routes[navigation.getState().index].name;

  const selectedDough = getRouteParams(navigation, 'Dough', { selectedDough: '0', selectedDoughImage: '0' });
  const selectedSauce = getRouteParams(navigation, 'Sauce', { selectedSauce: 'With sauce', selectedSauceImage: '0' });
  const selectedToppings = getRouteParams(navigation, 'Toppings', { selectedToppings: [], selectedToppingImages: '0' });
  const selectedSize = getRouteParams(navigation, 'Size', { selectedSize: 'Small' });

  // Handles navigation for pizza creation
  const handleNavigation = () => {
    switch (currentRoute) {
      case "Dough":
        navigation.navigate('Sauce', selectedDough);
        break;
      case "Sauce":
        navigation.navigate('Toppings', { ...selectedDough, selectedSauce: selectedSauce.selectedSauce, selectedSauceImage: selectedSauce.selectedSauceImage });
        break;
      case "Toppings":
        navigation.navigate('Size', { ...selectedDough, selectedSauce: selectedSauce.selectedSauce, selectedSauceImage: selectedSauce.selectedSauceImage, selectedToppings: selectedToppings.selectedToppings, selectedToppingImages: selectedToppings.selectedToppingImages });
        break;
      case "Size":
        navigation.navigate('OrderDetails', { ...selectedDough, selectedSauce: selectedSauce.selectedSauce, selectedSauceImage: selectedSauce.selectedSauceImage, selectedToppings: selectedToppings.selectedToppings, selectedToppingImages: selectedToppings.selectedToppingImages, selectedSize: selectedSize.selectedSize });
        console.log('Order Summary:', { ...selectedDough, selectedSauce: selectedSauce.selectedSauce, selectedToppings: selectedToppings.selectedToppings, selectedSize: selectedSize.selectedSize });
        break;
      case "Order":
        console.log('Order Summary:', { ...selectedDough, selectedSauce: selectedSauce.selectedSauce, selectedToppings: selectedToppings.selectedToppings, selectedSize: selectedSize.selectedSize });
        // navigation.navigate('Timer', selectedDough);
        break;
      default:
        break;
    }
  };

  return (
    <TouchableOpacity onPress={handleNavigation} style={{ paddingRight: 15 }}>
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

const HomeStackScreen = () => {
  return (

    <Stack.Navigator
      initialRouteName="HomeScreen"

      // tab navigation with the arrows
      screenOptions={({ navigation}) => {
        
        return {
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
        };
      }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ route }) => ({
            title: route.params?.name ? route.params.name : "HomeScreen",
            headerShown: false, // header with arrows is not shown when on HomeScreen
          })}
        />
        <Stack.Screen name="Dough" component={DoughScreen} options={{ title: 'Creating a pizza' }}/>
        <Stack.Screen name="Sauce" component={SauceScreen} options={{ title: 'Creating a pizza' }}/>
        <Stack.Screen name="Toppings" component={ToppingsScreen} options={{ title: 'Creating a pizza' }}/>
        <Stack.Screen name="Size" component={SizeScreen} options={{ title: 'Creating a pizza' }}/>
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ title: 'Creating a pizza', headerRight: null }}/>
        <Stack.Screen name="Menu" component={MenuScreen} options={{ headerRight: null }} />
        <Stack.Screen name="Settings" component={SettingsScreen}  />
        <Stack.Screen name="Address" component={AddressScreen} options={{ headerRight: null }} />
        <Stack.Screen name="PastOrders" component={PastOrdersScreen}/>
        <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ title: 'About us', headerRight: null }}/>
      </Stack.Navigator>
  )
}

// literally the same logic as HomeStackScreens, so maybe we could implement something
// simillar for the Settings Tab Navigation
const OrderStackScreen = ({ navigation }) => {
  // when timer runs out -> goes to Feedback Screen
  const handleTimerEnd = () => {
    navigation.navigate('Feedback'); 
  };

  return (
    <Stack.Navigator
      // initially starting with TimerScreen, has to be changed to Previous Orders Screen later on
      // initialRouteName="Timer"
      initialRouteName="PastOrders"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: '#E04A2B',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          paddingLeft: 10,
        },
        headerTitleAlign: 'center',
      }}
    >
      {/* stack screens for the Order Pizza navigation */}
      <Stack.Screen name="PastOrders" component={PastOrdersScreen} options={{ title: 'Previous Orders' }} />
      {/* <Stack.Screen name="Order" component={OrderScreen} options={{ title: 'Creating a pizza' }} /> */}
      {/* this has to be devided */}
      <Stack.Screen name="Timer" options={{ title: 'Waiting for the delivery', headerLeft: null, headerBackVisible: false, }}>
        {props => <TimerScreen {...props} onTimerEnd={handleTimerEnd} />}
      </Stack.Screen>
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ title: 'Leave Feedback', headerLeft: null, headerBackVisible: false, }} />
    </Stack.Navigator>
  );
};


// dark mode, works only for the Settings Screen and Tab Navigation
export const DarkModeContext = createContext();

export default function App({ navigation }) {
  const [darkMode, setDarkMode] = useState(false); // as default the dark mode is turned off

  useEffect(() => {
  // Initialize the Pizza Database
 init().then(() => {
  console.log('Database Creation Succeeded!');
}).catch((err) => {
  console.log('Database Creation Failed!' + err);
})

// DOWNLOAD THE DATA FROM MONGODB HERE
// Fetch all the pizzas from the database
async function readAllPizza() {
  try {
    const dbResult = await fetchAllPizza();
    console.log('dbResult readAllPizza in App.js');
    console.log(dbResult);
    setPizzaList(dbResult);
  } catch (err) {
    console.log('Error: ' + err);
  } finally {
    console.log('All Pizzas are RENDERED');
  }
}

readAllPizza(); 
  }, []);

  const [pizzaList, setPizzaList] = useState([]); // List of pizzas
//  fetchAllPizza(); // Fetch all the pizzas from the database

pizzaList.forEach((pizza) => {console.log( pizza.dough)}); // DEBUGGING 
  console.log('PizzaList:', pizzaList); // DEBUGGING

  // tracking the end of the timer
  const [timerExpired, setTimerExpired] = useState(false);

  const handleTimerEnd = (navigation) => {
    setTimerExpired(true);
    // when timer runs out -> goes to the Feedback Screen but it's in the Home Tab navigation
    // make it so that it stays in the Order tab navigation
    navigation.navigate('Order', { screen: 'Feedback' });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <NavigationContainer>
        <Tab.Navigator
          // icons list
          // https://icons.expo.fyi/Index
          // filter by "Ionicons"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              } else if (route.name === 'Order') {
                iconName = focused ? 'pizza' : 'pizza-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: darkMode ? '#F58C41' : '#E04A2B', // change active color
            tabBarInactiveTintColor: darkMode ? '#b0b0b0' : 'gray', // change inactive color
            tabBarStyle: {
              backgroundColor: darkMode ? '#333' : '#fff', // tab bar background color
              borderTopColor: darkMode ? '#444' : '#ddd', // tab bar border color
            },
            tabBarBadge: route.name === 'Order' && timerExpired ? '' : undefined, // show badge if timer expired
            headerShown: false, // hide the hader
          })}
          initialRouteName='Home' // setting the initial route to Home, HomeScreen after the app is loaded
        >
          <Tab.Screen name="Settings" component={SettingsScreen} />
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Order" component={OrderStackScreen} />

        </Tab.Navigator>
      </NavigationContainer>
     </DarkModeContext.Provider>
  );
}

const styles = StyleSheet.create({
  navbuttonstyle: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#def",
    alignItems: "center",
    justifyContent: "space-around",
  },
  imageContainer: {
    height: 200,
    width: '50%',
    borderRadius: 200,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'red',
  },
  image: {
    height: '100%',
    width: '100%'
  },
  listItemStyle: {
    borderWidth: 1,
    borderColor: "blue",
    padding: 5,
    backgroundColor: "#abc",
    width: "80%",
    alignSelf: "center",
  },
  listStyle: {
    flex: 8,
    alignItems: "center",
    backgroundColor: "#eee",
    borderColor: "red",
    borderWidth: 2,
    width: "100%",
  },
  flatliststyle: {
    width: '80%',
    backgroundColor: 'blue',
  },
});