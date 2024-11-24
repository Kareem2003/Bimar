import { Picker } from "@react-native-picker/picker";
import React, { useContext } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ThemeContext } from "../contexts/themeContext";
import {
  greyColorDark,
  greyColorLight,
  primaryDark,
  primaryLight,
} from "../styles/colors";

const ThemeToggleButton = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      width: Dimensions.get("window").width * 0.8,
      backgroundColor: isDarkTheme ? greyColorDark : greyColorLight,
      borderRadius: 12,
    },
    picker: {
      color: "#A09CAB",
    },
  });

  const handleValueChange = (itemValue) => {
    toggleTheme(itemValue);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={isDarkTheme ? "Dark" : "Light"}
        onValueChange={handleValueChange}
        style={styles.picker}
      >
        <Picker.Item label="Light Theme" value="Light" />
        <Picker.Item label="Dark Theme" value="Dark" />
      </Picker>
    </View>
  );
};

export default ThemeToggleButton;
