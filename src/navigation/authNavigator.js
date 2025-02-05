import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/splash";
import Login from "../screens/login";
import { createNavigationContainerRef } from "@react-navigation/native";
import HomeNavigator from "./homeNavigator";
import Register from "../screens/register";
import ForgetPassword from "../screens/forgetPassword";
import Profile from "../screens/profile";
import Diagnos from "../screens/diagnos";

// import { createNavigationContainerRef } from '@react-navigation/native';

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
        name="profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="diagnos"
        component={Diagnos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeNav"
        component={HomeNavigator}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
