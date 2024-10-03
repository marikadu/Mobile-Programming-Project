import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Custom icon for header
import HomeScreen from './screens/HomeScreen';
import DoughScreen from './screens/DoughScreen';
import SauceScreen from './screens/SauceScreen';
import ToppingsScreen from './screens/ToppingsScreen';
import PepperoniPalsView from './components/PepperoniPals.js';
import { HomeScreen } from './components/HomeSreen.js';
import { DetailsScreen } from './components/DetailsScreen.js';
import { ImageScreen } from './components/ImageScreen.js';
import { LogoTitle } from './components/LogoTitle.js';
import { MenuScreen } from './components/MenuScreen.js';
const Stack = createNativeStackNavigator();

const HeaderRightButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        // Navigate to the next screen based on the current screen
        if (navigation.getState().routes[navigation.getState().index].name === "Dough") {
          navigation.navigate('Sauce');
        } else if (navigation.getState().routes[navigation.getState().index].name === "Sauce") {
          navigation.navigate('Toppings');
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

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="PepperoniPals"
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
        <Stack.Screen name="Home" component={HomeScreen} options={{title: "Home_Page", }} />  
        <Stack.Screen name="Details" component={DetailsScreen}  />
        {/* Notice how the IMAGE PAGE has the logo of the elephant from ./assets/misc.png */}
        <Stack.Screen name="Image" component={ImageScreen} options={{headerTitle: (props) => <LogoTitle {...props} />}} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen=(props)=>{
  const [newFish, setFish]=useState("");
  const [updateId, setUpdateId]=useState(0);
  const [fishList, addFish]=useState([{"id":1, "breed":"Bream", "weight":100}, {"id":2, "breed":"Burbot", "weight":400}, {"id":3, "breed":"Tench", "weight":800}]);
  
  const selectItemToUpdate=(id)=>{
    setUpdateId(id);
    setFish(fishList[id].breed);
    props.navigation.navigate("Details", {fish:fishList[id]});
  }
  const renderFish=(item)=>{
    return(
      <TouchableOpacity activeOpacity={0.8} onPress={()=>selectItemToUpdate(item.index)}>
        <View style={styles.listItemStyle}>
          <Text>{item.index} {item.item.id} {item.item.breed} {item.item.weight}</Text>
        </View>
      </TouchableOpacity>
    );
  
  }
  return (
    <View style={{flex:1}}>
        <View style={styles.listStyle}>
        <Text>Home Screen</Text>
          <FlatList style={styles.flatliststyle}
            data={fishList}
            renderItem={renderFish}
          />
        </View>
      <NavButtons params={props}/>
    </View>
  );
}
const DetailsScreen=(props)=>{
  const [newFish, setFish]=useState(props.route.params==undefined ? "" : props.route.params.fish.breed);
  useEffect(()=>{
      setFish(props.route.params==undefined ? "" : props.route.params.fish.breed);

    },[props.route.params]
  );
  const fishInputHandler=(enteredText)=>{
    setFish(enteredText);
  }

  return (
    <View style={{flex:1}}>
      <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput style={styles.inputStyle} placeholder="Fish breed..." 
        onChangeText={fishInputHandler}
        value={newFish} />
      {props.route.params ? <Text>{props.route.params.fish.id}) {props.route.params.fish.breed} {props.route.params.fish.weight}</Text> : null}
      </View>
      <NavButtons params={props}/>
    </View>
  );
}
const ImageScreen=(props)=>{
  return (
    <View style={{flex:1}}>
      <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.imageContainer}>
        <Image source={require('./assets/misc.png')}
            style={styles.image} resizeMode='cover'/>
        </View> 
      </View>
      <NavButtons params={props}/>
    </View>
  );
}

const NavButton=(par)=>{
  if (par.name!=par.active){
    return <Button onPress={()=>par.params.navigation.navigate(par.name)} title={par.name}/>;
  }
  return null;
}
const NavButtons=({params})=>{
  return(
    <View style={styles.navbuttonstyle}>
      <NavButton params={params} name="Home" active={params.route.name}/>
      <NavButton params={params} name="Details" active={params.route.name}/>
      <NavButton params={params} name="Image" active={params.route.name}/>
    </View>
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
export default App;