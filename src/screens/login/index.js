import React from "react";
import { View, Image, Text } from "react-native";

import Logic from "./logic";
import { styles } from "./style";

const Login = ({ navigation }) => {
  const { state, updateState } = Logic(navigation);

  return (
    <View style={[styles.container]}>
      <Text>Login Screen</Text>
    </View>
  );
};

export default Login;
