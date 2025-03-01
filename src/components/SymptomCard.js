import React, { useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";

const SymptomCard = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardHeader}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    height: 100,
    backgroundColor: "#16423C",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
  },
  cardHeader: {
    color: "#fff",
  },
});

export default SymptomCard;
