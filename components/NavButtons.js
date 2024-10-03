import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const NavButton = (par) =>{
    if (par.name!=par.active){
      return <Button onPress={()=>par.params.navigation.navigate(par.name)} title={par.name}/>;
    }
    return null;
  }
  const NavButtons=({params})=>{
    return(
      <View style={styles.navbuttonstyle}>
        <NavButton params={params} name="PepperoniPals" active={params.route.name}/>
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
    },});

  export default NavButtons;