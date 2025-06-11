import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import AuthTitles from "../../components/AuthTitles";
import { ThemeContext } from "../../contexts/themeContext";
import ACTION_TYPES from "../../reducers/actionTypes";
import { primaryDark, primaryLight } from "../../styles/colors";
import { styles } from "./style";
import Logic from "./logic";

const Login = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { state, updateState, handleLogin, togglePasswordVisibility } =
    Logic(navigation);

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
          onSubmitEditing={() => state.passwordInput.focus()}
          incomPressible={false}
          iconName="user"
          iconSize={20}
          placeholder="Email"
          backgroundStyle={{ marginTop: 20 }}
          validationText={state.emailError}
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
          iconName={state.isPasswordVisible ? "eye" : "eye-slash"} // Ensure consistent icon toggle
          iconSize={20}
          placeholder="Password"
          backgroundStyle={{ marginTop: 20 }}
          secureTextEntry={!state.isPasswordVisible} // Toggle visibility
          onIconPress={togglePasswordVisibility} // Function to toggle password visibility
          validationText={state.passwordError}
        />
      </View>

      <AppButton
        title="Login"
        onPress={handleLogin}
        buttonStyle={{ marginTop: 25 }}
      />
      <View style={[styles.linksContainer, { marginTop: 20 }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.guideText}>Need help?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("forgetPassword")}
          >
            <Text style={styles.forgotLink}> Forgot Password!</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 6,
          }}
        >
          <Text style={styles.guideText}>New here?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("register")}>
            <Text style={styles.forgotLink}> Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
