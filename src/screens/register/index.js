import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  BackHandler,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import { ButtonDark, ButtonLight, primaryLight } from "../../styles/colors";
import AuthTitles from "../../components/AuthTitles";
import { ToastManager } from "../../helpers/ToastManager";
import Logic from "./logic";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ACTION_TYPES from "../../reducers/actionTypes";

const SignUpForm = ({ navigation }) => {
  const {
    state,
    updateState,
    handleNext,
    handleBack,
    handleChange,
    togglePasswordVisibility,
    handleDateOfBirthConfirm,
    handleDateOfFirstChildConfirm,
    progressBarWidth,
    slideAnim,
    handleRegister,
  } = Logic(navigation);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressBarWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
        {state.step !== 1 ? (
          <View
            style={{
              flex: 1,
              position: "absolute",
              top: 80,
              left: 25,
              zIndex: 1,
            }}
          >
            <TouchableOpacity onPress={handleBack}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="leftcircle" size={40} color={"#16423C"} />
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
        <Animated.View
          style={[
            styles.formContainer,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={{ marginTop: 100 }}>
              <AuthTitles
                text={
                  state.step === 1
                    ? "Let's Get Started!"
                    : state.step === 2
                    ? "Personal Details"
                    : state.step === 3
                    ? "Emergency and Work Details"
                    : state.step === 4
                    ? "Family and Lifestyle"
                    : "Almost Done!"
                }
                descriptionText={
                  state.step === 1
                    ? "Tell us a bit about yourself"
                    : state.step === 2
                    ? "We need some more information to personalize your experience"
                    : state.step === 3
                    ? "Just a few more things"
                    : state.step === 4
                    ? "Tell us about your family and lifestyle"
                    : "Final touches"
                }
              />
            </View>
            <View style={styles.formContainer}>
              {state.step === 1 && (
                <View style={styles.inputContainer}>
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    placeholder="Full Name"
                    onChangeText={(text) => handleChange("userName", text)}
                    term={state.formData.userName}
                    validationText={state.formData.userNameValidationText}
                  />
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    onChangeText={(text) => handleChange("userPhone", text)}
                    term={state.formData.userPhone}
                    validationText={state.formData.userPhoneValidationText}
                  />
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(text) => handleChange("userEmail", text)}
                    term={state.formData.userEmail}
                    validationText={state.formData.userEmailValidationText}
                  />
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    incomPressible={true}
                    iconName={state.isPasswordVisible ? "eye" : "eye-slash"}
                    placeholder="Password"
                    secureTextEntry={!state.isPasswordVisible}
                    onIconPress={togglePasswordVisibility}
                    onChangeText={(text) => handleChange("userPassword", text)}
                    term={state.formData.userPassword}
                    validationText={state.formData.userPasswordValidationText}
                  />
                  <AppButton
                    buttonStyle={{ marginTop: 40 }}
                    title="Next"
                    onPress={handleNext}
                  />
                </View>
              )}
              {state.step === 2 && (
                <View style={styles.inputContainer}>
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    placeholder="City"
                    onChangeText={(text) =>
                      handleChange("personalRecords.City", text)
                    }
                    term={state.formData.personalRecords.City}
                    validationText={
                      state.formData.personalRecords.CityValidationText
                    }
                  />
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    placeholder="Area"
                    onChangeText={(text) =>
                      handleChange("personalRecords.Area", text)
                    }
                    term={state.formData.personalRecords.Area}
                    validationText={
                      state.formData.personalRecords.AreaValidationText
                    }
                  />
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    placeholder="Weight"
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      handleChange("personalRecords.userWeight", text)
                    }
                    term={state.formData.personalRecords.userWeight}
                    validationText={
                      state.formData.personalRecords.userWeightValidationText
                    }
                  />
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    placeholder="Height"
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      handleChange("personalRecords.userHeight", text)
                    }
                    term={state.formData.personalRecords.userHeight}
                    validationText={
                      state.formData.personalRecords.userHeightValidationText
                    }
                  />
                  <TouchableOpacity
                    onPress={() =>
                      updateState([
                        {
                          type: ACTION_TYPES.UPDATE_PROP,
                          prop: "isDatePickerVisible",
                          value: true,
                        },
                      ])
                    }
                  >
                    <AppInput
                      inputWrapperStyle={{
                        width: Dimensions.get("window").width * 0.8,
                        marginVertical: 10,
                      }}
                      placeholder="Date of Birth"
                      onChangeText={(text) =>
                        handleChange("personalRecords.DateOfBirth", text)
                      }
                      term={state.formData.personalRecords.DateOfBirth}
                      validationText={
                        state.formData.personalRecords.DateOfBirthValidationText
                      }
                      editable={false}
                    />
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={state.isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateOfBirthConfirm}
                    onCancel={() =>
                      updateState([
                        {
                          type: ACTION_TYPES.UPDATE_PROP,
                          prop: "isDatePickerVisible",
                          value: false,
                        },
                      ])
                    }
                  />
                  <AppButton
                    buttonStyle={{ marginTop: 40 }}
                    title="Next"
                    onPress={handleNext}
                  />
                </View>
              )}
              {state.step === 3 && (
                <View style={styles.inputContainer}>
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    placeholder="Emergency Contact"
                    keyboardType="phone-pad"
                    onChangeText={(text) =>
                      handleChange("personalRecords.emergencyContact", text)
                    }
                    term={state.formData.personalRecords.emergencyContact}
                    validationText={
                      state.formData.personalRecords
                        .emergencyContactValidationText
                    }
                  />
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    placeholder="Work Name"
                    onChangeText={(text) =>
                      handleChange("personalRecords.workName", text)
                    }
                    term={state.formData.personalRecords.workName}
                    validationText={
                      state.formData.personalRecords.workNameValidationText
                    }
                  />
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    placeholder="Work Place"
                    onChangeText={(text) =>
                      handleChange("personalRecords.workPlace", text)
                    }
                    term={state.formData.personalRecords.workPlace}
                    validationText={
                      state.formData.personalRecords.workPlaceValidationText
                    }
                  />
                  <AppButton
                    buttonStyle={{ marginTop: 40 }}
                    title="Next"
                    onPress={handleNext}
                  />
                </View>
              )}
              {state.step === 4 && (
                <View style={styles.inputContainer}>
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    placeholder="Number of Children"
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      handleChange("personalRecords.childrenNumber", text)
                    }
                    term={state.formData.personalRecords.childrenNumber}
                    validationText={
                      state.formData.personalRecords
                        .childrenNumberValidationText
                    }
                  />
                  <TouchableOpacity
                    onPress={() =>
                      updateState([
                        {
                          type: ACTION_TYPES.UPDATE_PROP,
                          prop: "isDateOfChildPickerVisible",
                          value: true,
                        },
                      ])
                    }
                  >
                    <AppInput
                      inputWrapperStyle={{
                        width: Dimensions.get("window").width * 0.8,
                        marginVertical: 10,
                      }}
                      placeholder="Birth Date of First Child"
                      onChangeText={(text) =>
                        handleChange(
                          "personalRecords.birthDateOfFirstChild",
                          text
                        )
                      }
                      term={
                        state.formData.personalRecords.birthDateOfFirstChild
                      }
                      validationText={
                        state.formData.personalRecords
                          .birthDateOfFirstChildValidationText
                      }
                      editable={false}
                    />
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={state.isDateOfChildPickerVisible}
                    mode="date"
                    onConfirm={handleDateOfFirstChildConfirm}
                    onCancel={() =>
                      updateState([
                        {
                          type: ACTION_TYPES.UPDATE_PROP,
                          prop: "isDateOfChildPickerVisible",
                          value: false,
                        },
                      ])
                    }
                  />
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    placeholder="Smoking Habits"
                    onChangeText={(text) =>
                      handleChange("personalRecords.smoking", text)
                    }
                    term={state.formData.personalRecords.smoking}
                    validationText={
                      state.formData.personalRecords.smokingValidationText
                    }
                  />
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    placeholder="Alcohol Consumption"
                    onChangeText={(text) =>
                      handleChange("personalRecords.alcohol", text)
                    }
                    term={state.formData.personalRecords.alcohol}
                    validationText={
                      state.formData.personalRecords.alcoholValidationText
                    }
                  />
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    placeholder="Number of Spouses"
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      handleChange("personalRecords.wifesNumber", text)
                    }
                    term={state.formData.personalRecords.wifesNumber}
                    validationText={
                      state.formData.personalRecords.wifesNumberValidationText
                    }
                  />
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    placeholder="Types of Pets"
                    onChangeText={(text) =>
                      handleChange("personalRecords.petsTypes", text)
                    }
                    term={state.formData.personalRecords.petsTypes}
                    validationText={
                      state.formData.personalRecords.petsTypesValidationText
                    }
                  />
                  <AppButton
                    buttonStyle={{ marginTop: 40 }}
                    title="Next"
                    onPress={handleNext}
                  />
                </View>
              )}
              {state.step === 5 && (
                <View style={styles.inputContainer}>
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    placeholder="Family Status"
                    onChangeText={(text) =>
                      handleChange("personalRecords.familyStatus", text)
                    }
                    term={state.formData.personalRecords.familyStatus}
                    validationText={
                      state.formData.personalRecords.familyStatusValidationText
                    }
                  />
                  <AppInput
                    inputWrapperStyle={{
                      width: Dimensions.get("window").width * 0.8,
                      marginVertical: 10,
                    }}
                    placeholder="Gender"
                    onChangeText={(text) =>
                      handleChange("personalRecords.Gender", text)
                    }
                    term={state.formData.personalRecords.Gender}
                    validationText={
                      state.formData.personalRecords.GenderValidationText
                    }
                  />
                  <AppButton
                    buttonStyle={{ marginTop: 40 }}
                    title="Submit"
                    onPress={handleRegister}
                  />
                </View>
              )}
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarContainer: {
    height: 10,
    width: "100%",
    backgroundColor: "#e0e0df",
    overflow: "hidden",
    marginTop: 40,
  },
  progressBar: {
    height: "100%",
    backgroundColor: ButtonDark,
  },
  backButtonContainer: {
    marginTop: 15,
    marginLeft: 10,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    padding: 20,
  },
});

export default SignUpForm;
