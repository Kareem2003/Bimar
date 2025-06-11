import React, { useContext, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import DropdownComponent from "../../components/DropdownComponent";
import Header from "../../components/Header";
import PhoneInputBox from "../../components/PhoneInputBox";
import ProfilePicture from "../../components/ProfilePicture";
import { ThemeContext } from "../../contexts/themeContext";
import ACTION_TYPES from "../../reducers/actionTypes";
import { primaryDark, primaryLight } from "../../styles/colors";
import { BLOOD_TYPE_OPTIONS, GENDER_OPTIONS } from "./constant";
import Logic from "./logic";
import { styles } from "./style";
import Icon from "react-native-vector-icons/Ionicons";

const Profile = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {
    state,
    updateState,
    handleNext,
    handleBack,
    handleSave,
    handleImageSelect,
  } = Logic(navigation);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      // Format date as YYYY-MM-DD
      const formattedDate = selectedDate.toISOString().split('T')[0];
      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: "formData.personalRecords.DateOfBirth",
          value: formattedDate,
        },
      ]);
    }
  };

  const getCurrentDateValue = () => {
    if (state.formData.personalRecords.DateOfBirth) {
      return new Date(state.formData.personalRecords.DateOfBirth);
    }
    return new Date();
  };

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: isDarkTheme ? primaryDark : primaryLight },
      ]}
    >
      <Header marginTop={50} header={"MyProfile"} onPress={handleBack} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View
          style={[
            styles.container,
            { backgroundColor: isDarkTheme ? primaryDark : primaryLight },
          ]}
        >
          <View>
            <View style={styles.profilePictureContainer}>
              <View style={styles.profilePictureWrapper}>
                <ProfilePicture
                  profileImage={state.profileImage || ""}
                  onImageChange={handleImageSelect}
                  layout="center"
                  clickable={true}
                />
              </View>
            </View>
            <View>
              <Text style={styles.label}>Name</Text>
              <AppInput
                term={state.formData.userName}
                onChangeText={(text) => {
                  updateState([
                    {
                      type: ACTION_TYPES.UPDATE_PROP,
                      prop: "formData.userName",
                      value: text,
                    },
                  ]);
                }}
                placeholder="Enter your name"
              />
              <Text style={styles.label}>Email</Text>
              <AppInput
                term={state.formData.userEmail}
                onChangeText={(text) => {
                  updateState([
                    {
                      type: ACTION_TYPES.UPDATE_PROP,
                      prop: "formData.userEmail",
                      value: text,
                    },
                  ]);
                }}
                placeholder="Enter your email"
              />
              <Text style={styles.label}>Weight</Text>
              <AppInput
                term={state.formData.personalRecords.userWeight}
                onChangeText={(text) => {
                  updateState([
                    {
                      type: ACTION_TYPES.UPDATE_PROP,
                      prop: "formData.personalRecords.userWeight",
                      value: text,
                    },
                  ]);
                }}
                placeholder="Enter your weight (kg)"
                keyboardType="numeric"
              />
              <Text style={styles.label}>Height</Text>
              <AppInput
                term={state.formData.personalRecords.userHeight}
                onChangeText={(text) => {
                  updateState([
                    {
                      type: ACTION_TYPES.UPDATE_PROP,
                      prop: "formData.personalRecords.userHeight",
                      value: text,
                    },
                  ]);
                }}
                placeholder="Enter your height (cm)"
                keyboardType="numeric"
              />
              <Text style={styles.label}>Phone</Text>
              <PhoneInputBox
                value={state.formData.userPhone}
                onChangeText={(text) => {
                  updateState([
                    {
                      type: ACTION_TYPES.UPDATE_PROP,
                      prop: "formData.userPhone",
                      value: text,
                    },
                  ]);
                }}
              />
              <View>
                <Text style={styles.label}>Date of Birth</Text>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                >
                <AppInput
                  keyboardType="default"
                  term={state.formData.personalRecords.DateOfBirth}
                  placeholder="YYYY-MM-DD"
                    editable={false}
                  />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={getCurrentDateValue()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
                )}
                <Text style={styles.label}>Gender</Text>
                <DropdownComponent
                  data={GENDER_OPTIONS}
                  value={state.formData.personalRecords.Gender}
                  onChange={(item) => {
                    updateState([
                      {
                        type: ACTION_TYPES.UPDATE_PROP,
                        prop: "formData.personalRecords.Gender",
                        value: item.value,
                      },
                    ]);
                  }}
                  placeholder="Select gender"
                />
                <Text style={styles.label}>City</Text>
                <AppInput
                  term={state.formData.personalRecords.City}
                  onChangeText={(text) => {
                    updateState([
                      {
                        type: ACTION_TYPES.UPDATE_PROP,
                        prop: "formData.personalRecords.City",
                        value: text,
                      },
                    ]);
                  }}
                  placeholder="Enter your city"
                />
                <Text style={styles.label}>Area</Text>
                <AppInput
                  term={state.formData.personalRecords.Area}
                  onChangeText={(text) => {
                    updateState([
                      {
                        type: ACTION_TYPES.UPDATE_PROP,
                        prop: "formData.personalRecords.Area",
                        value: text,
                      },
                    ]);
                  }}
                  placeholder="Enter your area"
                />
                <Text style={styles.label}>Blood Type</Text>
                <DropdownComponent
                  data={BLOOD_TYPE_OPTIONS}
                  value={state.formData.medicalRecord.bloodType}
                  onChange={(item) => {
                    updateState([
                      {
                        type: ACTION_TYPES.UPDATE_PROP,
                        prop: "formData.medicalRecord.bloodType",
                        value: item.value,
                      },
                    ]);
                  }}
                  placeholder="Select blood type"
                />

                <AppButton
                  title="Save"
                  onPress={handleSave}
                  buttonStyle={[
                    styles.saveButton,
                    { backgroundColor: primaryDark }
                  ]}
                  textStyle={styles.saveButtonText}
                />

                {/* Security Section */}
                <View style={styles.securitySection}>
                  <Text style={[styles.label, styles.securityHeader]}>
                    Account Security
                  </Text>
                  <View style={styles.securityDivider} />
                  
                  <TouchableOpacity
                    style={styles.changePasswordButton}
                    onPress={() => navigation.navigate("forgetPassword")}
                  >
                    <View style={styles.changePasswordContent}>
                      <Icon 
                        name="lock-closed" 
                        size={20} 
                        color="#16423C" 
                        style={styles.changePasswordIcon}
                      />
                      <Text style={styles.changePasswordText}>
                        Change Password
                      </Text>
                    </View>
                    <Icon 
                      name="chevron-forward" 
                      size={16} 
                      color="#999" 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
