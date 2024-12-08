import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import { styles } from "../screens/register/style";

const AppRadioButton = ({ valueOption1, valueOption2, onValueChange }) => {
  const [checked, setChecked] = React.useState(valueOption1);

  const handlePress = (value) => {
    setChecked(value);
    onValueChange(value);
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={[styles.radioContainer, { flexDirection: "row", alignItems: "center" }]}>
        <RadioButton
          value={valueOption1}
          status={checked === valueOption1 ? "checked" : "unchecked"}
          onPress={() => handlePress(valueOption1)}
          color="#FD9B63"
          backgroundColor="#16423C"
          size={18}
        />
        <Text style={[styles.label, { marginLeft: 8 }]}>{valueOption1}</Text>
      </View>
      <View style={[styles.radioContainer, { flexDirection: "row", alignItems: "center" }]}>
        <RadioButton
          value={valueOption2}
          status={checked === valueOption2 ? "checked" : "unchecked"}
          onPress={() => handlePress(valueOption2)}
          color="#FD9B63"
          backgroundColor="#16423C"
          size={18}
        />
        <Text style={[styles.label, { marginLeft: 8 }]}>{valueOption2}</Text>
      </View>
    </View>
  );
};

export default AppRadioButton;
