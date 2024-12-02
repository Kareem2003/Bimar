import React, { useContext } from "react";
import { Button, Dimensions, Text, TouchableOpacity, View } from "react-native";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import AppRadioButton from "../../components/AppRadioButton";
import AuthTitles from "../../components/AuthTitles";
import { ThemeContext } from "../../contexts/themeContext";
import ACTION_TYPES from "../../reducers/actionTypes";
import { primaryDark, primaryLight } from "../../styles/colors";
import Logic from "./logic";
import { styles } from "./style";
// import FontAwsome from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ToastManager } from "../../helpers/ToastManager";

const Register = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const {
    state,
    updateState,
    updateFormData,
    handleNext,
    handleBack,
    handleRegister,
    handleDateConfirm,
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
      <View
        style={{
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
          width: Dimensions.get("window").width * 0.9,
          height: Dimensions.get("window").height * 0.4,
        }}
      >
        {state.currentStep === 1 && (
          <View style={styles.subContainer}>
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
              keyboardType="email-address"
            />
            <AppInput
              term={state.formData.userPassword}
              onChangeText={(text) => updateFormData("userPassword", text)}
              placeholder="Enter Your Password"
              backgroundStyle={{ marginTop: 20 }}
              validationText={state.formData.userPasswordValidationText}
              secureTextEntry={true}
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
          </View>
        )}

        {state.currentStep === 2 && (
          <View style={styles.subContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <AppInput
                term={state.formData.City}
                onChangeText={(text) => updateFormData("City", text)}
                placeholder="City"
                inputWrapperStyle={{
                  width: Dimensions.get("window").width * 0.35,
                  marginLeft: 10,
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
              <AppRadioButton
                valueOption1="Male"
                valueOption2="Female"
                onValueChange={(value) => updateFormData("Gender", value)}
              />
            </View>

            <AppInput
              term={state.formData.userPhone}
              onChangeText={(text) => updateFormData("userPhone", text)}
              placeholder="Enter your Phone"
              backgroundStyle={{ marginTop: 20 }}
              validationText={state.formData.userPhoneValidationText}
              keyboardType="phone-pad"
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
                term={state.formData.DateofBirth}
                placeholder="Date of Birth"
                backgroundStyle={{ marginTop: 20 }}
                validationText={state.formData.DateofBirthValidationText}
                editable={false}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={state.isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
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
          </View>
        )}
        {state.currentStep === 3 && (
          <View style={styles.subContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <AppInput
                term={state.formData.userWeight}
                onChangeText={(text) => updateFormData("userWeight", text)}
                placeholder="Weight"
                backgroundStyle={{ marginTop: 20, flex: 1, marginRight: 10 }}
                inputWrapperStyle={{
                  width: Dimensions.get("window").width * 0.35,
                  marginLeft: 10,
                }}
                validationText={state.formData.userWeightValidationText}
                keyboardType="numeric"
              />
              <AppInput
                term={state.formData.userHeight}
                onChangeText={(text) => updateFormData("userHeight", text)}
                placeholder="Height"
                backgroundStyle={{ marginTop: 20, flex: 1 }}
                inputWrapperStyle={{
                  width: Dimensions.get("window").width * 0.35,
                }}
                validationText={state.formData.userHeightValidationText}
                keyboardType="numeric"
              />
            </View>

            <View
              style={[
                styles.inputWrapper,
                isDarkTheme ? styles.darkBackground : styles.lightBackground,
                { width: Dimensions.get("window").width * 0.75, marginTop: 20 },
              ]}
            >
              <Picker
                selectedValue={state.formData.BooldType}
                onValueChange={(itemValue) =>
                  updateFormData("BooldType", itemValue)
                }
                style={{ flex: 1, color: isDarkTheme ? "#FFF" : "#333" }}
              >
                <Picker.Item label="Select Blood Type" value="" />
                <Picker.Item label="A+" value="A+" />
                <Picker.Item label="A-" value="A-" />
                <Picker.Item label="B+" value="B+" />
                <Picker.Item label="B-" value="B-" />
                <Picker.Item label="AB+" value="AB+" />
                <Picker.Item label="AB-" value="AB-" />
                <Picker.Item label="O+" value="O+" />
                <Picker.Item label="O-" value="O-" />
              </Picker>
            </View>

            {/* <AppInput
            term={state.formData.allergy}
            onChangeText={(text) => updateFormData("allergy", text)}
            placeholder="Allergy"
            backgroundStyle={{ marginTop: 20 }}
          /> */}
          </View>
        )}
      </View>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        {state.currentStep > 1 && (
          <AppButton
            title="Back"
            onPress={handleBack}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
          />
        )}
        {state.currentStep < 3 ? (
          <AppButton
            title="Next"
            onPress={handleNext}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
          />
        ) : (
          <AppButton
            title="Register"
            onPress={handleRegister}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
          />
        )}
      </View>

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
