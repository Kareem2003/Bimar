import React from "react";
import { View, Image } from "react-native";

import Logic from "./logic";
import { styles } from "./style";

const Splash = ({ navigation }) => {
  const { state, updateState } = Logic(navigation);

  return (
    <View style={[styles.container]}>
      <Image
        style={[styles.logo]}
        source={require("../../assets/images/logo.png")}
      />
    </View>
  );
};

export default Splash;
