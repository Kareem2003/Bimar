import React, { useContext } from "react";
import { Pressable, View } from "react-native";
import FontAwsome from "react-native-vector-icons/FontAwesome";
import { primaryDark, primaryLight } from "../styles/colors";
import { ThemeContext } from "../contexts/themeContext";

const MenuButton = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <Pressable
      onPress={() => {
        navigation.toggleDrawer();
      }}
    >
      <FontAwsome
        name="bars"
        size={20}
        style={{ color: isDarkTheme ? primaryLight : primaryDark }}
      />
    </Pressable>
  );
};

export default MenuButton;
