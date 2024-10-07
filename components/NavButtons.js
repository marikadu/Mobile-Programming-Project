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
      <NavButton params={params} name="Menu" active={params.route.name}/>
      {/* <NavButton params={params} name="Home" active={params.route.name}/> */}
      <NavButton params={params} name="Details" active={params.route.name}/>
      <NavButton params={params} name="Image" active={params.route.name}/>
    </View>
  );
}
// const NavButton = ({navigation, name, active}) =>{
//     if (name!=active){
//       const title = typeof name === 'string' ? name : 'Unnamed';
//       console.log("NavButton name: ", name);
//       console.log("NavButton Title: ", title);
//       // console.log("NavButton Active: ", active);

//       // return <Button onPress={()=>par.navigation.navigate(par.name, par.route)} title={par.name}/>;
//       // return <Button onPress={()=>navigation.navigate(name)} title={title}/>;
//       return <Button onPress={()=>navigation.navigate(name)} title={title}/>;
//     }
//     return null;
//   }
//   const NavButtons=({navigation, route})=>{
//     return(
//       <View style={styles.navbuttonstyle}>
//         {/* <NavButton params={params} name="PepperoniPals" active={params.route.name}/> */}
//         <NavButton navigation={navigation} name="PepperoniPals" />
//         <NavButton navigation={navigation} name="Menu" />
//         {/* <NavButton params={params} name="Home" active={params.route.name}/> */}
//         <NavButton navigation={navigation} name="Details" />
//         <NavButton navigation={navigation} name="Image" />
        
//       </View>
//     );
//   }


  const styles=StyleSheet.create({
    navbuttonstyle:{
      flex:2,
      flexDirection:"row",
      backgroundColor:"#def",
      alignItems:"center",
      justifyContent:"space-around",    
    },});

  export default NavButtons;