import React, { useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Logic from "./logic";
import { styles } from "./style";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import SomeComponent from "../../components/SomeComponent";
import { ThemeContext } from "../../contexts/themeContext";
import AppInput from "../../components/AppInput";
import ACTION_TYPES from "../../reducers/actionTypes";
import AppButton from "../../components/AppButton";
import AuthTitles from "../../components/AuthTitles";
import { primaryDark, primaryLight } from "../../styles/colors";

const Login = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const {
    state,
    updateState,
    handleLogin,
    isPasswordVisible,
    togglePasswordVisibility,
  } = Logic(navigation);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? primaryDark : primaryLight },
      ]}
    >
      <AuthTitles
        isDarkTheme={isDarkTheme}
        text="Welcome Back!"
        title={true}
        description={true}
        descriptionText="Login to Your Account"
      />
      <View>
        <AppInput
          term={state.email}
          onChangeText={(text) => {
            updateState([
              {
                type: ACTION_TYPES.UPDATE_PROP,
                prop: `email`,
                value: text,
              },
            ]);
          }}
          onSubmitEditing={() => state.form.passwordInput.focus()}
          incomPressible={false}
          iconName="user"
          iconSize={20}
          placeholder="Email"
          backgroundStyle={{ marginTop: 20 }}
        />
      </View>
      <View>
        <AppInput
          term={state.password}
          onChangeText={(text) =>
            updateState([
              {
                type: ACTION_TYPES.UPDATE_PROP,
                prop: `password`,
                value: text,
              },
            ])
          }
          onSubmitEditing={handleLogin}
          incomPressible={true}
          iconName={isPasswordVisible ? "eye-slash" : "eye"}
          iconSize={20}
          placeholder="Password"
          backgroundStyle={{ marginTop: 20 }}
          secureTextEntry={!isPasswordVisible}
          onIconPress={togglePasswordVisibility}
        />
      </View>
      <AppButton
        title="Login"
        onPress={handleLogin}
        buttonStyle={{ marginTop: 25 }}
      />
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("register")}>
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
