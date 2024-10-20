import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Custom icon for header
import './gesture-handler';
// import HomeScreen from './screens/HomeScreen';
import DoughScreen from './screens/DoughScreen';
import DoughScreen_db from './components/screens/DoughScreen_db.js';
// import CreatePizzaScreen from './components/screens/CreatePizzaScreen.js';
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
import { DetailsScreen } from './components/DetailsScreen.js';
import { ImageScreen } from './components/ImageScreen.js';
import { LogoTitle } from './components/LogoTitle.js';
import { MenuScreen } from './components/MenuScreen.js';
import { SettingsScreen } from './components/SettingsScreen.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getDBConnection, createTables, saveOrder, fetchOrders } from './database/Old_db.js';
import {CreatePizzaScreen} from './components/screens/CreatePizzaScreen.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Gets the default parameters of each object
const defaultParams = {
  Dough: { selectedDough: '0', selectedDoughImage: '0' },
  Sauce: { selectedSauce: 'Add', selectedSauceImage: '0' },
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
  const selectedSauce = getRouteParams(navigation, 'Sauce', { selectedSauce: 'Add', selectedSauceImage: '0' });
  const selectedToppings = getRouteParams(navigation, 'Toppings', { selectedToppings: [], selectedToppingImages: '0' });
  const selectedSize = getRouteParams(navigation, 'Size', { selectedSize: 'Small' });

  // Handles navigation
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
        console.log('Order Summary:', { ...selectedDough, selectedSauce: selectedSauce.selectedSauce, selectedToppings: selectedToppings.selectedToppings, selectedSize: selectedSize.selectedSize });
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
      initialRouteName="Home"
      // initialRouteName="Dough"
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
        {/* <Stack.Screen name="PepperoniPals" component={PepperoniPalsView} options={({route}) => ({title: route.params?.name ? route.params.name : "Pepperoni_PAPIiii"})} /> */}
        <Stack.Screen name="Home" component={HomeScreen} options={({route}) => ({title: route.params?.name ? route.params.name : "Home"})} />
        <Stack.Screen name="Dough" component={DoughScreen} options={{ title: 'Creating a pizza' }}/>
        <Stack.Screen name = "db_DoughScreen" component={DoughScreen_db} options={{ title: 'Pick your DOUGH' }}/>
        <Stack.Screen name = "CreatePizza" component={CreatePizzaScreen} options={{ title: 'Create Your Pizza' }}/>
        <Stack.Screen name="Sauce" component={SauceScreen} options={{ title: 'Creating a pizza' }}/>
        <Stack.Screen name="Toppings" component={ToppingsScreen} options={{ title: 'Creating a pizza' }}/>
        <Stack.Screen name="Size" component={SizeScreen} options={{ title: 'Creating a pizza' }}/>
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ title: 'Creating a pizza' }}/>
        {/* <Stack.Screen name="Timer" component={TimerScreen} options={{ title: 'Creating a pizza' }}/>   */}
        <Stack.Screen name="Details" component={DetailsScreen}  />
        {/* Notice how the IMAGE PAGE has the logo of the elephant from ./assets/misc.png */}
        <Stack.Screen name="Image" component={ImageScreen} options={{headerTitle: (props) => <LogoTitle {...props} />}} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen}  />
        <Stack.Screen name="Address" component={AddressScreen}/>
      </Stack.Navigator>
    // <Stack.Navigator>
    //   {/* <Stack.Screen name="Home" component={PepperoniPalsView} /> */}
    // </Stack.Navigator>
  )
}

// Marika is trying to do something with the Order Tab Navigation •ᴗ• sorry if this is bad lmao
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
      <Stack.Screen name="Timer" options={{ title: 'Waiting for the delivery' }}>
        {props => <TimerScreen {...props} onTimerEnd={handleTimerEnd} />}
      </Stack.Screen>
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ title: 'Leave Feedback' }} />
    </Stack.Navigator>
  );
};

export default function App({ navigation }) {
  useEffect(() => {
    // Initialize database and create tables
    getDBConnection()
      .then(() => createTables()) // Wait for the tables to be created
      .then(() => console.log('Tables created successfully'))
      .catch((error) => console.error('Error creating tables:', error));
  }, []);

  // tracking the end of the timer
  const [timerExpired, setTimerExpired] = useState(false);

  const handleTimerEnd = (navigation) => {
    setTimerExpired(true);
    // when timer runs out -> goes to the Feedback Screen but it's in the Home Tab navigation
    // make it so that it stays in the Order tab navigation
    navigation.navigate('Order', { screen: 'Feedback' });
  };



  return (
    <NavigationContainer>
      <Tab.Navigator
        // shortcut for the documentation, I'll delete it later - Marika
        // https://reactnavigation.org/docs/tab-based-navigation/

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
          tabBarActiveTintColor: '#E04A2B',
          tabBarInactiveTintColor: 'gray',
          tabBarBadge: route.name === 'Order' && timerExpired ? '' : undefined, // Show badge if timer has expired
        })}
      >
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Order" component={OrderStackScreen} />


      </Tab.Navigator>
    </NavigationContainer>

    // <NavigationContainer>
    //   <Stack.Navigator
    //   initialRouteName="PepperoniPals"
    //   // initialRouteName="Dough"
    //   screenOptions={({ navigation }) => ({
    //     headerStyle: {
    //       backgroundColor: 'white',
    //     },
    //     headerTintColor: '#E04A2B', // Left arrow and text color
    //     headerTitleStyle: {
    //       fontWeight: 'bold',
    //     },
    //     headerBackTitleVisible: false,
    //     headerLeftContainerStyle: {
    //       paddingLeft: 10,
    //     },
    //     headerTitleAlign: 'center',
    //     headerRight: () => <HeaderRightButton navigation={navigation} />, // Right arrow component
    //     headerLeft: () => <HeaderLeftButton navigation={navigation} />, // Left arrow component
    //   })}>
    //     <Stack.Screen name="PepperoniPals" component={PepperoniPalsView} options={({route}) => ({title: route.params?.name ? route.params.name : "Pepperoni_PAPIiii"})} />
    //     <Stack.Screen name="Dough" component={DoughScreen} options={{ title: 'Creating a pizza' }}/>
    //     <Stack.Screen name="Sauce" component={SauceScreen} options={{ title: 'Creating a pizza' }}/>
    //     <Stack.Screen name="Toppings" component={ToppingsScreen} options={{ title: 'Creating a pizza' }}/>  
    //     <Stack.Screen name="Timer" component={TimerScreen} options={{ title: 'Creating a pizza' }}/>  
    //     <Stack.Screen name="Details" component={DetailsScreen}  />
    //     {/* Notice how the IMAGE PAGE has the logo of the elephant from ./assets/misc.png */}
    //     <Stack.Screen name="Image" component={ImageScreen} options={{headerTitle: (props) => <LogoTitle {...props} />}} />
    //     <Stack.Screen name="Menu" component={MenuScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
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