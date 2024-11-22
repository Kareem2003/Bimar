import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

const SomeComponent = ({ isDarkTheme }) => {
  return (
    <View style={isDarkTheme ? styles.darkContainer : styles.lightContainer}>
      <Text style={isDarkTheme ? styles.darkText : styles.lightText}>Test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  darkContainer: {
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  lightContainer: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  darkText: {
    color: "#fff",
  },
  lightText: {
    color: "#000",
  },
});

export default SomeComponent;
