import React, { useContext, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ThemeContext } from "../../contexts/themeContext";
import { styles } from "./style";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import OTPInput from "../../components/OTPInput";
import AuthTitles from "../../components/AuthTitles";
import { primaryDark, primaryLight } from "../../styles/colors";
import Logic from "./logic";
import ACTION_TYPES from "../../reducers/actionTypes";
import FontAwsome from "react-native-vector-icons/FontAwesome";
import { AsyncStorage } from "react-native";

const ForgetPassword = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const {
    state,
    updateState,
    handleNext,
    handleBack,
    isPasswordVisible,
    togglePasswordVisibility,
    handleEmailValidation,
    handleVerifyOTP,
    handleUpdatePassword,
    updateFormData,
    handleResendOTP,
  } = Logic(navigation);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? primaryDark : primaryLight },
      ]}
    >
      {state.currentStep === 1 && (
        <View style={{ marginBottom: 150 }}>
          <AuthTitles
            isDarkTheme={isDarkTheme}
            text="Forget password!"
            title={true}
            description={true}
            descriptionText="Please enter your email to reset the password"
          />
          <View style={{ marginTop: 80 }}>
            <AppInput
              term={state.formData.userEmail}
              onChangeText={(text) => updateFormData("userEmail", text)}
              placeholder="Enter Your Email"
              validationText={state.formData.userEmailValidationText}
              inputWrapperStyle={{
                width: Dimensions.get("window").width * 0.8,
              }}
            />

            <AppButton
              title="RESET PASSWORD"
              onPress={handleEmailValidation}
              buttonStyle={{ marginTop: 50, margin: "auto" }}
            />
          </View>
        </View>
      )}

      {state.currentStep === 2 && (
        <View style={{ marginBottom: 150 }}>
          <AuthTitles
            isDarkTheme={isDarkTheme}
            text="Check your email"
            title={true}
            description={true}
            descriptionText="We sent a reset link to username@gmail.com enter 5 digit code that mentioned in the email"
          />
          <Text>{state.otpAsync}</Text>
          <View style={{ marginTop: 80 }}>
            <OTPInput onVerify={handleVerifyOTP} />

            <AppButton
              title="VERIFY CODE"
              onPress={handleVerifyOTP}
              buttonStyle={{ marginTop: 40, margin: "auto" }}
            />
          </View>

          <View style={styles.linksContainer}>
            <View style={styles.linkRow}>
              <Text style={styles.linkText}>
                Haven't received an email yet?
              </Text>
              <TouchableOpacity onPress={handleResendOTP}>
                <Text style={styles.resendText}>RESEND</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {state.currentStep === 3 && (
        <View style={{ marginBottom: 150 }}>
          <AuthTitles
            isDarkTheme={isDarkTheme}
            text="Set a new password"
            title={true}
            description={true}
            descriptionText="Create a new password. Ensure it differs from previous ones for security."
          />
          <View style={{ marginTop: 80, margin: "auto" }}>
            <AppInput
              term={state.formData.userPassword}
              onChangeText={(text) => updateFormData("userPassword", text)}
              incomPressible={true}
              iconName={isPasswordVisible ? "eye" : "eye-slash"}
              iconSize={20}
              placeholder="Enter Your New Password"
              backgroundStyle={{ marginTop: 20 }}
              secureTextEntry={!isPasswordVisible}
              onIconPress={togglePasswordVisibility}
              inputWrapperStyle={{
                width: Dimensions.get("window").width * 0.8,
              }}
            />
            <AppInput
              term={state.reEnterYourPassword}
              onChangeText={(text) =>
                updateState([
                  {
                    type: ACTION_TYPES.UPDATE_PROP,
                    prop: `reEnterYourPassword`,
                    value: text,
                  },
                ])
              }
              incomPressible={true}
              iconName={isPasswordVisible ? "eye" : "eye-slash"}
              iconSize={20}
              placeholder="Re-Enter Your Password"
              backgroundStyle={{ marginTop: 20 }}
              secureTextEntry={!isPasswordVisible}
              onIconPress={togglePasswordVisibility}
              inputWrapperStyle={{
                width: Dimensions.get("window").width * 0.8,
              }}
            />

            <AppButton
              title="UPDATE PASSWORD"
              onPress={handleUpdatePassword}
              buttonStyle={{ marginTop: 50, margin: "auto" }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ForgetPassword;
