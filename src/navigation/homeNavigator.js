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
import BookNow from "../screens/bookNow";
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();
const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        gestureResponseDistance: 100,
        fullScreenGestureEnabled: true,
        presentation: 'card',
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settingsscreen} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="RateApp" component={RateApp} />
      <Stack.Screen name="Doctors" component={Doctors} />
      <Stack.Screen name="Appointments" component={Appointments} />
      <Stack.Screen name="Diagnos" component={Diagnos} />
      <Stack.Screen name="AiChatScreen" component={AiChatScreen} />
      <Stack.Screen name="BookDate" component={BookDate} />
      <Stack.Screen name="BookNow" component={BookNow} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
      <Stack.Screen name="login" component={AuthNavigator} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
