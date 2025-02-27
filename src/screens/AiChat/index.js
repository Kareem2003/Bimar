import { styles } from "./style";
import React, { useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import Logic from "./logic";
import LottieView from "lottie-react-native";

const AiChatScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi</Text>
        <Text style={styles.subGreeting}>How are you feeling today!</Text>
      </View>
    </View>
  );
};
export default AiChatScreen;
