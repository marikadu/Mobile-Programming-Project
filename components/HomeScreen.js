import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, Image, StyleSheet, TouchableHighlight, } from 'react-native';
import PizzaList from './PizzaList'; // Import the reusable PizzaList component

import logo_full3 from '../assets/logos/logo_full3.png';

// Import the DATABASE
import { fetchAllPizza } from '../database/db';

// const PepperoniPalsView = ({route, navigation}) =>{
const HomeScreen = (props) =>{

    ////////////////IMPLEMENT THE DATABASE HERE ///////////////////
    const [newPizza, setPizza]=useState("");
    const [updateId, setUpdateId]=useState(0);
    // const [pizzaList, addPizza]=useState([
    //   {"id":1, "type":"Pepperoni", "price":"12.90", description: "Original dough, With sauce, Cheese, Pepperoni", image: require('../assets/pizza_pngs/menu/pepperoni.png') },
    //   {"id":3, "type":"Mushrooms", "price":"11.90", description: "Original dough, With sauce, Cheese, Mushrooms",image: require('../assets/pizza_pngs/menu/mushrooms.png') }]);
    

    const [pizzaList, setPizzaList]=useState([]);

    const selectItemToUpdate=(id)=>{
      setUpdateId(id);
      setPizza(pizzaList[id].type);
      props.navigation.navigate("Details", {pizza:pizzaList[id]});
    }
    // const renderPizza = (item) => {
    //   return (
    //     <TouchableOpacity activeOpacity={0.8} onPress={() => selectItemToUpdate(item.index)}>
    //       <View style={styles.listItemStyle}>
    //       <Text style={styles.itemText}>{item.item.type} {item.item.price}€</Text>
    //         <View style={styles.itemContainer}>
    //           <Image source={item.item.image} style={styles.pizzaImage} />
    //           <View style={styles.textContainer}>
    //             <Text style={styles.descriptionText}>{item.item.description}</Text>
    //           </View>
    //         </View>
    //       </View>
    //     </TouchableOpacity>
    //   );
    
    // }

    const readAllPizza = async () => {
      try {
        const dbResult = await fetchAllPizza();
        console.log('dbResult readAllPizza in App.js');
        console.log(dbResult);
        setPizzaList(dbResult);
      } catch (err) {
        console.log('Error: ' + err);
      } finally {
        console.log('All Pizzas are RENDERED in HOMESCREEN');
      }
    };

    useEffect(() => {
      readAllPizza();

      }, []);


    // RENDER PAST PIZZA LIST FROM DATABASE
    const renderPizza = ({navigation}) => {
      return (
        <PizzaList navigation={navigation} />
      );
    };

    /// ////////////////END OF THE IMPLEMENTATION HERE ///////////////////

    return (

      <View style={styles.screenContainer}>
        <Image source={logo_full3} style={styles.logoImage} />
        
        <View style={{ flex: 8, alignItems: 'center', justifyContent: 'center', }}>

        {/* button had to go because it cannot be customised everyone say bye bye button */}
        {/* <Button color="#F58C41"
          borderRadius='50'
          onPress={()=> props.navigation.navigate("Dough")} 
          title="Create your Pizza"/>  */}

        <TouchableHighlight
          style={styles.button}
          onPress={() => props.navigation.navigate("Dough")} 
          underlayColor='#EC863D' // colour when pressed the "button"
          >
          <Text style={[styles.buttonText]}>Create New Pizza</Text>
        </TouchableHighlight>

        {/* <Button onPress={()=> readAllPizza()} title="REFRESH FAVORITES"/>  */}

          {/* see menu button */}
        <TouchableHighlight
          style={styles.button}
          onPress={() => props.navigation.navigate("Menu")} 
          underlayColor='#EC863D'>
          <Text style={[styles.buttonText]}>See Menu</Text>
        </TouchableHighlight>

        {/* <TouchableHighlight
          style={styles.button}
          // onPress={() => props.navigation.navigate("db_DoughScreen")} 
          onPress={() => props.navigation.navigate("CreatePizza")} 
          underlayColor='#EC863D' // colour when pressed the "button"
          >
          <Text style={[styles.buttonText]}>Create Pizza sqlite</Text>
        </TouchableHighlight> */}
        
          {/* <View style={styles.imageContainer}>
          <Image source={require('../assets/pizza_pngs/everything_pizza.png')}
              style={styles.image} resizeMode='cover'/>
          </View>  */}

          <Text style={[styles.text]}>Past Orders: </Text>
          <PizzaList navigation={props.navigation} />
        </View>
      </View>
    );
  }

  const styles=StyleSheet.create({
    screenContainer:{
      flex:1,
      backgroundColor:"#fff", // covers the grey background
      padding: 10
    },
    logoImage:{
      height:80,
      width:300,
      alignSelf: 'center',
      // bottom: 30,
    },
    pizzaImage:{
      height:100,
      width:100,
      bottom: 100,
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
      borderWidth: 2,
      borderColor:"#CD6524",
      padding:5,
      backgroundColor:"#FFF9F2",
      borderRadius: 20,
      margin: 10,
      width:"100%",
      alignSelf:"center",
    },
    listStyle:{
      flex:8,
      alignItems:"center",
      width:260,
    },
    flatliststyle:{
      flex: 1,
      width:'100%',
      backgroundColor:'#FFFFFF',
    },
    itemContainer: {
      padding: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textContainer: {
      marginLeft: 20,
      flex: 1,
    },
    itemText: {
      color: "#8A4012",
      fontSize: 18,
      paddingLeft: 5,
      margin: 2,
    },
    descriptionText: {
      flex: 1,
      color: "#CD6524",
      fontSize: 16,
    },
    pizzaImage: {
      width: 80,
      height: 80,
      borderRadius: 25
    },
    button: {
      margin: 20,
      paddingTop: 10,
      width: 250,
      height: 56,
      backgroundColor: '#F58C41',
      borderRadius: 40,
    },
    buttonText: {
      flex:1,
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#CD6524',
      right: 100,
      paddingTop: 20,
      paddingBottom: 10,
      justifyContent: 'flex-end',
    },
  });

  export default HomeScreen;