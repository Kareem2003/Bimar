import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialIcons } from "@expo/vector-icons";

const AppSelect = ({
  options = [],
  defaultValue = null,
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
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [error, setError] = useState(null);

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

      <DropDownPicker
        open={open}
        value={selectedValue}
        items={options.map((option) => ({
          label: option.label,
          value: option.value,
        }))}
        setOpen={setOpen}
        setValue={handleChange}
        onClose={validate}
        placeholder="Select an option"
        zIndex={1000}
        style={[
          styles.dropdown,
          {
            borderColor: error ? "red" : "#b7b7b7",
            width: Dimensions.get("window").width * 0.75,
          },
        ]}
        dropDownContainerStyle={{
          borderColor: "#b7b7b7",
          width: Dimensions.get("window").width * 0.75,
        }}
        ArrowDownIconComponent={
          customArrowDown ||
          (() => (
            <MaterialIcons name="arrow-drop-down" size={24} color="black" />
          ))
        }
        ArrowUpIconComponent={
          customArrowUp ||
          (() => <MaterialIcons name="arrow-drop-up" size={24} color="black" />)
        }
      />

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
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
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  errorText: {
    marginTop: 5,
    fontSize: 12,
    color: "red",
  },
});

export default AppSelect;
