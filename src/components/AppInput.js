import React, { useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import FontAwsome from "react-native-vector-icons/FontAwesome";
import { ThemeContext } from "../contexts/themeContext";
import { greyColorDark, greyColorLight } from "../styles/colors";

const AppInput = ({
  term,
  onChangeText,
  onSubmitEditing,
  secureTextEntry,
  iconName,
  iconSize,
  onIconPress,
  incomPressible,
  placeholder = "",
  backgroundStyle = {},
  inputStyle = {},
  iconStyle = {},
}) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <View
      style={[
        isDarkTheme ? styles.darkBackgroundStyle : styles.lightBackgroundStyle,
        backgroundStyle,
      ]}
    >
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={[
          isDarkTheme ? styles.darkInputStyle : styles.lightInputStyle,
          inputStyle,
        ]}
        placeholder={placeholder}
        value={term}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholderTextColor={"#A09CAB"}
        secureTextEntry={secureTextEntry}
      />

      {incomPressible ? (
        <TouchableOpacity onPress={onIconPress}>
          <FontAwsome
            name={iconName}
            size={iconSize}
            style={[
              isDarkTheme ? styles.darkIconStyle : styles.lightIconStyle,
              iconStyle,
            ]}
          />
        </TouchableOpacity>
      ) : (
        <FontAwsome
          name={iconName}
          size={iconSize}
          style={[
            isDarkTheme ? styles.darkIconStyle : styles.lightIconStyle,
            iconStyle,
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  darkBackgroundStyle: {
    width: Dimensions.get("window").width * 0.8,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    backgroundColor: greyColorLight,
  },
  lightBackgroundStyle: {
    width: Dimensions.get("window").width * 0.8,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingVertical: 5,
    backgroundColor: greyColorDark,
  },
  darkInputStyle: {
    flex: 1,
    fontSize: 15,
    color: "#000",
  },
  lightInputStyle: {
    flex: 1,
    fontSize: 15,
    color: "#000000",
  },
  darkIconStyle: {
    fontSize: 15,
    alignSelf: "center",
    padding: 15,
    color: "#000",
  },
  lightIconStyle: {
    fontSize: 15,
    alignSelf: "center",
    padding: 15,
    color: "#000",
  },
});

export default AppInput;
