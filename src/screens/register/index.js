import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import AuthTitles from "../../components/AuthTitles";
import Logic from "./logic";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ACTION_TYPES from "../../reducers/actionTypes";
import AppSelect from "../../components/AppSelect";

const SignUpForm = ({ navigation }) => {
  const {
    state,
    updateState,
    handleChange,
    togglePasswordVisibility,
    handleDateOfBirthConfirm,
    handleRegister,
  } = Logic(navigation);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E9EFEC",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ marginVertical: 60, marginBottom: 30 }}>
        <AuthTitles
          text="Let's Get Started!"
          descriptionText="Tell us a bit about yourself"
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled" // Ensure keyboard works properly
      >
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
        <AppSelect
          options={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
          placeholder="Gender"
          onChange={(value) => handleChange("personalRecords.Gender", value)}
          term={state.formData.personalRecords.Gender}
          validationText={state.formData.personalRecords.GenderValidationText}
        />
        <AppSelect
          options={[
            { label: "A+", value: "A+" },
            { label: "A-", value: "A-" },
            { label: "B+", value: "B+" },
            { label: "B-", value: "B-" },
            { label: "AB+", value: "AB+" },
            { label: "AB-", value: "AB-" },
            { label: "O+", value: "O+" },
            { label: "O-", value: "O-" },
          ]}
          placeholder="Blood Type"
          onChange={(value) => handleChange("medicalRecord.bloodType", value)}
          term={state.formData.medicalRecord.bloodType}
          validationText={state.formData.medicalRecord.bloodTypeValidationText}
        />
        <AppInput
          inputWrapperStyle={{
            width: Dimensions.get("window").width * 0.8,
            marginVertical: 10,
          }}
          placeholder="City"
          onChangeText={(text) => handleChange("personalRecords.City", text)}
          term={state.formData.personalRecords.City}
          validationText={state.formData.personalRecords.CityValidationText}
        />
        <AppInput
          inputWrapperStyle={{
            width: Dimensions.get("window").width * 0.8,
            marginVertical: 10,
          }}
          placeholder="Area"
          onChangeText={(text) => handleChange("personalRecords.Area", text)}
          term={state.formData.personalRecords.Area}
          validationText={state.formData.personalRecords.AreaValidationText}
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
        <AppButton
          buttonStyle={{ marginTop: 20, marginBottom: 30 }}
          title="Register"
          onPress={handleRegister}
        />
      </ScrollView>

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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});

export default SignUpForm;
