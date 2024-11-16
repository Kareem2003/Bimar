import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/splash";
import Login from "../screens/login";
import { createNavigationContainerRef } from "@react-navigation/native";
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

      {/* <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name="LoginCompany"
                component={LoginCompany}
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name="ForgetPassword"
                component={ForgetPassword}
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name="VerifyEmail"
                component={VerifyEmail}
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name="Drawer"
                component={DrawerNavigator}
                options={{ headerShown: false }}
            ></Stack.Screen> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
