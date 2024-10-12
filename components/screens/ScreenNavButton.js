import React from 'react';
import { View, Button, StyleSheet } from 'react-native';


// const NavButton = (par) =>{
//   if (par.name!=par.active){
//     return <Button onPress={()=>par.params.navigation.navigate(par.name)} title={par.name}/>;
//   }
//   return null;
// }

const NavButtons = (params) =>{
  // if (par.name!=par.active){
    return <Button onPress={()=>params.navigation.navigate(params.name)} title={params.name}/>;
  // }
  // return null;
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