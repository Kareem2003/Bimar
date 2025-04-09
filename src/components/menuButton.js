import React, { useContext } from "react";
import { Pressable, View, TouchableOpacity } from "react-native";
import FontAwsome from "react-native-vector-icons/FontAwesome";
import { primaryDark, primaryLight } from "../styles/colors";
import { ThemeContext } from "../contexts/themeContext";

const MenuButton = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.openDrawer();
      }}
      style={{ padding: 8 }}
      activeOpacity={0.7}
    >
      <FontAwsome
        name="bars"
        size={20}
        style={{ color: isDarkTheme ? primaryLight : primaryDark }}
      />
    </TouchableOpacity>
  );
};

export default MenuButton;
