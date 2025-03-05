import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { softPurpleColor } from "../styles/colors";
import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USERINFO } from "../helpers/constants/staticKeys";
import { Context } from "../contexts/appContext";
import Home from "../screens/home";
import Doctors from "../screens/doctors";
import DoctorProfile from "../screens/doctorProfile";
import MenuButton from "../components/menuButton";
import Profile from "../screens/profile";
import Settingsscreen from "../screens/Setting";
import Terms from "../screens/Setting/terms";
import RateApp from "../screens/rateApp";
import Appointments from "../screens/Appointments";
import AuthNavigator from "./authNavigator";
import AiChatScreen from "../screens/AiChat";
import Diagnos from "../screens/diagnos";
import BookDate from "../screens/bookDate";

const Stack = createNativeStackNavigator();
const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
      <Stack.Screen name="Settings" component={Settingsscreen}></Stack.Screen>
      <Stack.Screen name="Terms" component={Terms}></Stack.Screen>
      <Stack.Screen name="RateApp" component={RateApp}></Stack.Screen>
      <Stack.Screen name="Doctors" component={Doctors}></Stack.Screen>
      {/* <Stack.Screen name="Messages" component={DoctorProfile}></Stack.Screen> */}
      <Stack.Screen name="Appointments" component={Appointments}></Stack.Screen>
      <Stack.Screen name="Diagnos" component={Diagnos}></Stack.Screen>
      <Stack.Screen name="AiChatScreen" component={AiChatScreen}></Stack.Screen>
      <Stack.Screen name="BookDate" component={BookDate}></Stack.Screen>
      <Stack.Screen name="DoctorProfile" component={DoctorProfile}></Stack.Screen>
      <Stack.Screen name="login" component={AuthNavigator}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeNavigator;
