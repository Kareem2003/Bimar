import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import MenuButton from "../components/general/menuButton";
import { softPurpleColor } from "../styles/colors";
import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USERINFO } from "../helpers/constants/staticKeys";
import { Context } from "../contexts/appContext";

const Stack = createNativeStackNavigator();
const HomeNavigator = () => {
  const { state: ctx } = useContext(Context);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: softPurpleColor,
        },
        headerShadowVisible: false,
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => {
          return {
            headerLeft: () => {
              return <MenuButton navigation={navigation} />;
            },
            title: ctx.userData.companyName,
          };
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeNavigator;
