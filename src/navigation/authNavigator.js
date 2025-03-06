import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/splash";
import Login from "../screens/login";
import { createNavigationContainerRef } from "@react-navigation/native";
import DrawerNavigator from "./drawerNavigator";
import Register from "../screens/register";
import ForgetPassword from "../screens/forgetPassword";


const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="forgetPassword"
        component={ForgetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainApp"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
