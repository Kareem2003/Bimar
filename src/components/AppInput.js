import React, { useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import FontAwsome from "react-native-vector-icons/FontAwesome";
import { ThemeContext } from "../contexts/themeContext";
import { greyColorDark, greyColorLight } from "../styles/colors";

const AppInput = ({
  term,
  onChangeText,
  onSubmitEditing,
  secureTextEntry = false,
  iconName,
  onIconPress,
  incomPressible,
  placeholder = "",
  inputWrapperStyle = {},
  backgroundStyle = {},
  inputStyle = {},
  iconStyle = {},
  validationText = "",
  iconSize = 20,
  keyboardType = "default",
  editable = true,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, backgroundStyle]}>
      <View
        style={[
          styles.inputWrapper,
          isDarkTheme ? styles.darkBackground : styles.lightBackground,
          inputWrapperStyle,
        ]}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={[
            styles.input,
            isDarkTheme ? styles.darkInput : styles.lightInput,
            inputStyle,
          ]}
          placeholder={placeholder}
          value={term}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          placeholderTextColor={"#A09CAB"}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          editable={editable}
        />
        {iconName && (
          <TouchableOpacity
            onPress={onIconPress}
            disabled={!incomPressible}
            style={styles.iconWrapper}
          >
            <FontAwsome
              name={iconName}
              size={iconSize}
              style={[
                styles.icon,
                isDarkTheme ? styles.darkIcon : styles.lightIcon,
                iconStyle,
              ]}
            />
          </TouchableOpacity>
        )}
      </View>
      {validationText ? (
        <Text style={styles.validationText}>{validationText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputWrapper: {
    width: Dimensions.get("window").width * 0.75,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lightBackground: {
    backgroundColor: "#F2F2F2",
  },
  darkBackground: {
    backgroundColor: "#333",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
  },
  lightInput: {
    color: "#333",
  },
  darkInput: {
    color: "#FFF",
  },
  iconWrapper: {
    marginLeft: 8,
  },
  icon: {
    alignSelf: "center",
  },
  lightIcon: {
    color: "#555",
  },
  darkIcon: {
    color: "#FFF",
  },
  validationText: {
    marginTop: 4,
    fontSize: 12,
    color: "red",
    opacity: 0.8,
    alignSelf: "flex-end",
  },
});

export default AppInput;
