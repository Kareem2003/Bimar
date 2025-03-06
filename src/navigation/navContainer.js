import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./authNavigator";
import { navigationRef } from "./authNavigator";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const NavContainer = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <AuthNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default NavContainer;
