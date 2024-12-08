import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const OTPInput = ({ length = 5, onVerify }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputs.current[index + 1].focus(); // Move to the next input
    }

    if (index === length - 1 && value.length > 0) {
      onVerify(newOtp.join(""));
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.inputContainer}>
      {otp.map((_, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={otp[index]}
          keyboardType="numeric"
          maxLength={1}
          ref={(ref) => (inputs.current[index] = ref)}
          onChangeText={(value) => handleChange(value, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#f2f2f2",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default OTPInput;
