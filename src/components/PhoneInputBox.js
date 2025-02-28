import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { CountryPicker } from "react-native-country-codes-picker";

const PhoneInputBox = ({ value = '', onChangeText }) => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+20'); // Egypt's dial code is +20

  const handlePickerButtonPress = (item) => {
    if (item.name !== 'Israel') {
      setCountryCode(item.dial_code);
      setShow(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Country Code Selector */}
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={styles.codeSelector}
      >
        <Text style={styles.codeText}>
          {countryCode}
        </Text>
      </TouchableOpacity>

      {/* Phone Number Input */}
      <TextInput
        style={styles.phoneInput}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={value}
        onChangeText={onChangeText}
      />

      {/* Country Picker */}
      <CountryPicker
        show={show}
        pickerButtonOnPress={handlePickerButtonPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeSelector: {
    width: '20%',
    height: 50,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 10,
  },
  codeText: {
    fontSize: 16,
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#F2F2F2',
  },
});

export default PhoneInputBox;
