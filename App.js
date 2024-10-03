import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import the components
import NavButtons from './components/NavButtons.js';
// import PepperoniPalsView from './components/PepperoniPals.js';

const Stack = createNativeStackNavigator(); 

const App=()=>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PepperoniPals">
        <Stack.Screen name="PepperoniPals" component={PepperoniPalsView} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Image" component={ImageScreen} />
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

const PepperoniPalsView=(props)=>{
  return (
    <View style={{flex:1}}>
      <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.imageContainer}>
        <Image source={require('./assets/pizza_pngs/everything_pizza.png')}
            style={styles.image} resizeMode='cover'/>
        </View> 
      </View>
      <NavButtons params={props}/>
    </View>
  );
}

// Moved to the NavButtons.js component file

// const NavButton=(par)=>{
//   if (par.name!=par.active){
//     return <Button onPress={()=>par.params.navigation.navigate(par.name)} title={par.name}/>;
//   }
//   return null;
// }
// const NavButtons=({params})=>{
//   return(
//     <View style={styles.navbuttonstyle}>
//       <NavButton params={params} name="PepperoniPals" active={params.route.name}/>
//       <NavButton params={params} name="Home" active={params.route.name}/>
//       <NavButton params={params} name="Details" active={params.route.name}/>
//       <NavButton params={params} name="Image" active={params.route.name}/>
//     </View>
//   );
// }

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