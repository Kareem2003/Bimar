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
import AppRadioButton from "../../components/AppRadioButton";
import AuthTitles from "../../components/AuthTitles";
import { primaryDark, primaryLight } from "../../styles/colors";
import Logic from "./logic";
import ACTION_TYPES from "../../reducers/actionTypes";
import FontAwsome from "react-native-vector-icons/FontAwesome";

const Register = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const {
    state,
    updateState,
    updateFormData,
    handleNext,
    handleBack,
    handleRegister,
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
        text="New Here?"
        title={true}
        description={true}
        descriptionText="Register Now"
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <FontAwsome name="circle" size={24} />
        <View style={styles.lineActive} />
        <FontAwsome name="circle" size={24} />
        <View style={styles.lineActive} />
        <FontAwsome name="circle" size={24} />
      </View>

      {state.currentStep === 1 && (
        <View style={{ padding: 20 }}>
          <AppInput
            term={state.formData.userName}
            onChangeText={(text) => updateFormData("userName", text)}
            placeholder="Full Name"
            backgroundStyle={{ marginTop: 20 }}
            validationText={state.formData.userNameValidationText}
          />
          <AppInput
            term={state.formData.userEmail}
            onChangeText={(text) => updateFormData("userEmail", text)}
            placeholder="Email"
            backgroundStyle={{ marginTop: 20 }}
            validationText={state.formData.userEmailValidationText}
          />
          <AppInput
            term={state.formData.userPassword}
            onChangeText={(text) => updateFormData("userPassword", text)}
            placeholder="Enter Your Password"
            backgroundStyle={{ marginTop: 20 }}
            validationText={state.formData.userPasswordValidationText}
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
            placeholder="Re-Enter Your Password"
            backgroundStyle={{ marginTop: 20 }}
            validationText={state.reEnterYourPasswordValidationText}
          />
          {/* <AppInput
            term={state.formData.dateOfBirth}
            onChangeText={(text) => updateFormData("dateOfBirth", text)}
            placeholder="Date of Birth"
            backgroundStyle={{ marginTop: 20 }}
          /> */}
          <AppButton
            title="Next"
            onPress={handleNext}
            buttonStyle={{ marginTop: 25, margin: "auto", width: "120" }}
          />
        </View>
      )}

      {state.currentStep === 2 && (
        <View
          style={{
            padding: 20,
            backgroundColor: isDarkTheme ? primaryDark : primaryLight,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <AppInput
              term={state.formData.City}
              onChangeText={(text) => updateFormData("City", text)}
              placeholder="City"
              inputWrapperStyle={{
                width: Dimensions.get("window").width * 0.35,
              }}
              backgroundStyle={{ flex: 1 }}
              validationText={state.formData.CityValidationText}
            />
            <AppInput
              term={state.formData.Area}
              onChangeText={(text) => updateFormData("Area", text)}
              placeholder="Area"
              inputWrapperStyle={{
                width: Dimensions.get("window").width * 0.35,
              }}
              backgroundStyle={{ flex: 1 }}
              validationText={state.formData.AreaValidationText}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Text style={styles.label}>Gender</Text>
            <AppRadioButton />
          </View>

          <AppInput
            term={state.formData.DateofBirth}
            onChangeText={(text) => updateFormData("DateofBirth", text)}
            placeholder="Date of Birth"
            backgroundStyle={{ marginTop: 20 }}
            validationText={state.formData.DateofBirthValidationText}
          />
          <AppInput
            term={state.formData.userPhone}
            onChangeText={(text) => updateFormData("userPhone", text)}
            placeholder="Enter your Phone"
            backgroundStyle={{ marginTop: 20 }}
            validationText={state.formData.userPhoneValidationText}
          />

          <View style={{ flexDirection: "row", margin: "auto", gap: 10 }}>
            <AppButton
              title="Back"
              onPress={handleBack}
              buttonStyle={{ marginTop: 25, width: 120 }}
            />
            <AppButton
              title="Next"
              onPress={handleNext}
              buttonStyle={{ marginTop: 25, width: 120 }}
            />
          </View>
        </View>
      )}
      {state.currentStep === 3 && (
        <View style={{ padding: 20 }}>
          <AppInput
            term={state.formData.userWeight}
            onChangeText={(text) => updateFormData("userWeight", text)}
            placeholder="Weight"
            backgroundStyle={{ marginTop: 20 }}
            validationText={state.formData.userWeightValidationText}
          />
          <AppInput
            term={state.formData.userHeight}
            onChangeText={(text) => updateFormData("userHeight", text)}
            placeholder="Height"
            backgroundStyle={{ marginTop: 20 }}
            validationText={state.formData.userHeightValidationText}
          />

          <AppInput
            term={state.formData.BooldType}
            onChangeText={(text) => updateFormData("BooldType", text)}
            placeholder="Blood Type"
            backgroundStyle={{ marginTop: 20 }}
            validationText={state.formData.BooldTypeValidationText}
          />

          {/* <AppInput
            term={state.formData.allergy}
            onChangeText={(text) => updateFormData("allergy", text)}
            placeholder="Allergy"
            backgroundStyle={{ marginTop: 20 }}
          /> */}

          <View style={{ flexDirection: "row", margin: "auto", gap: 10 }}>
            <AppButton
              title="BACK"
              onPress={handleBack}
              buttonStyle={{ marginTop: 25, width: 120 }}
            />
            <AppButton
              title="Register"
              onPress={() => navigation.navigate("Login")} // onPress={handleRegister}
              buttonStyle={{ marginTop: 25, width: 120 }}
            />
          </View>
        </View>
      )}

      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>
            Have an account? <Text style={styles.link}>LOGIN</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
