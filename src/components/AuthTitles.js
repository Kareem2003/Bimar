import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  primaryDark,
  primaryLight,
  TextDark,
  TextLight,
} from "../styles/colors";

const AuthTitles = ({ isDarkTheme, text, description, descriptionText }) => {
  return (
    <View>
      <Text style={isDarkTheme ? styles.titleDark : styles.titleLight}>
        {text}
      </Text>
      {descriptionText && (
        <Text
          style={isDarkTheme ? styles.descriptionDark : styles.descriptionLight}
        >
          {descriptionText}
        </Text>
      )}
    </View>
  );
};

export default AuthTitles;

const styles = StyleSheet.create({
  titleLight: {
    color: TextLight,
    fontSize: 33,
    fontWeight: "bold",
    paddingHorizontal: 20,
    textAlign: "center",
  },
  titleDark: {
    color: TextDark,
    fontSize: 33,
    fontWeight: "bold",
    paddingHorizontal: 20,
    textAlign: "center",
  },
  descriptionLight: {
    color: TextLight,
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: "center",
    marginTop: 20,
  },
  descriptionDark: {
    color: TextDark,
    fontSize: 20,
    paddingHorizontal: 20,
    textAlign: "center",
    marginTop: 10,
  },
});
