import React, { useContext } from "react";
import { View, Image, Text } from "react-native";
import Logic from "./logic";
import { styles } from "./style";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import SomeComponent from "../../components/SomeComponent";
import { ThemeContext } from "../../contexts/themeContext";

const Login = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { state, updateState } = Logic(navigation);

  return (
    <View style={[styles.container]}>
      <Text>Hi</Text>
      <ThemeToggleButton />
      <SomeComponent isDarkTheme={isDarkTheme} />
    </View>
  );
};

export default Login;
