import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './authNavigator';
import { navigationRef } from "./authNavigator";

 const NavContainer = ()=>{
     return(
         <NavigationContainer ref={navigationRef}>
             <AuthNavigator></AuthNavigator>
         </NavigationContainer>
     )
 }

export default NavContainer