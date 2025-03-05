import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from "@expo/vector-icons";

const AppSelect = ({
  options = [],
  defaultValue = null,
  placeholder,
  label,
  labelStyle,
  requiredSign,
  containerStyle,
  required = false,
  errorMessage = "This field is required.",
  onChange,
  customArrowDown,
  customArrowUp,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Validate when closing the dropdown
  const validate = () => {
    if (required && !selectedValue) {
      setError(errorMessage);
    } else {
      setError(null);
    }
  };

  // Handle value change and validation
  const handleChange = (value) => {
    setSelectedValue(value);
    if (onChange) onChange(value);
  };

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          {requiredSign && <Text style={styles.required}>*</Text>}
        </View>
      )}

      <Dropdown
        style={[
          styles.dropdown,
          { borderColor: selectedValue ? "#A09CAB" : "transparent" },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={options}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedValue}
        onChange={(item) => {
          handleChange(item.value);
          validate();
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        renderRightIcon={() => (
          <MaterialIcons
            name={isOpen ? "arrow-drop-up" : "arrow-drop-down"}
            size={24}
            color="black"
          />
        )}
      />

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  required: {
    color: "red",
    marginLeft: 5,
  },
  dropdown: {
    width: Dimensions.get("window").width * 0.8,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: "#F2F2F2",
    marginVertical: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#A09CAB",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  errorText: {
    marginTop: 5,
    fontSize: 12,
    color: "red",
    opacity: 0.8,
    alignSelf: "flex-end",
  },
});

export default AppSelect;
