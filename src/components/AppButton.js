import React, { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { ThemeContext } from "../contexts/themeContext";
import {
  ButtonDark,
  ButtonLight,
  greyColorDark,
  greyColorLight,
  primaryDark,
  primaryLight,
} from "../styles/colors";

const AppButton = ({ title, onPress, buttonStyle = {}, textStyle = {} }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[
        isDarkTheme ? styles.darkButtonStyle : styles.lightButtonStyle,
        buttonStyle,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          isDarkTheme ? styles.darkTextStyle : styles.lightTextStyle,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  darkButtonStyle: {
    width: Dimensions.get("window").width * 0.5,
    borderRadius: 12,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ButtonDark,
  },
  lightButtonStyle: {
    width: Dimensions.get("window").width * 0.5,
    borderRadius: 12,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ButtonLight,
  },
  darkTextStyle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontStyle: "italic",
  },
  lightTextStyle: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
});

export default AppButton;
