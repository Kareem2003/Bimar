import React, { useContext, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
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
import ProfilePicture from "../../components/ProfilePicture";
import { Colors } from "react-native/Libraries/NewAppScreen";
import DropdownComponent from "../../components/DropdownComponent";
import PhoneInputBox from "../../components/PhoneInputBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USERINFO } from "../../helpers/constants/staticKeys";
import Header from "../../components/Header";
import { GENDER_OPTIONS, BLOOD_TYPE_OPTIONS } from "./constant";

const Profile = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { state, updateState, handleNext, handleBack , handleSave } =
    Logic(navigation);

  return (
    <View style={{ flex: 1, backgroundColor: isDarkTheme ? primaryDark : primaryLight }}>
      <Header
        marginTop={50}
        header={state.currentStep === 2 ? "MyProfile" : "Profile"}
        onPress={handleBack}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
        <View
          style={[
            styles.container,
            { backgroundColor: isDarkTheme ? primaryDark : primaryLight },
          ]}
        >
          {state.currentStep === 1 && (
            <View>
              <View>
                <ProfilePicture
                  profileName={state.userName || ""}
                  profileHandle={state.userEmail || ""}
                />
              </View>

              <AppButton
                title="Edit Profile"
                onPress={handleNext}
                buttonStyle={{
                  backgroundColor: primaryDark,
                  marginLeft: 80,
                  width: 100,
                  height: 35,
                }}
                textStyle={{ color: "#fff", fontSize: 10 }}
              />
              <TouchableOpacity
                style={{
                  insetBlockStart: 30,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 80,
                  marginTop: 20,
                }}
                onPress={() => navigation.navigate("Appointments")}
              >
                <Image source={require("../../assets/images/calendarIcon.png")} />
                <Text>
                  <Text>Appointments</Text>
                </Text>

                <Text> {">"} </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  insetBlockStart: 30,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 80,
                  marginTop: 20,
                }}
                onPress={() => navigation.navigate("Diagnos")}
              >
                <Image
                  source={require("../../assets/images/MedicalRecordIcon.png")}
                />
                <Text>
                  <Text>My Diagnosis</Text>
                </Text>

                <Text> {">"} </Text>
              </TouchableOpacity>

              <View style={{ marginTop: 50 }}>
                <Image
                  style={{ width: "100%", height: 1, marginTop: 20 }}
                  source={require("../../assets/images/lineImage.png")}
                />
              </View>
              <TouchableOpacity
                style={{
                  insetBlockStart: 30,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 80,
                  marginTop: 20,
                }}
                onPress={() => console.log("Medical records")}
              >
                <Image source={require("../../assets/images/VirusIcon.png")} />
                <Text>
                  <Text>Medical records</Text>
                </Text>

                <Text> {">"} </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  insetBlockStart: 30,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 80,
                  marginTop: 20,
                }}
                onPress={() => console.log("My Doctors")}
              >
                <Image
                  source={require("../../assets/images/StethoscopeIcon.png")}
                />
                <Text>
                  <Text>My Doctors</Text>
                </Text>

                <Text> {">"} </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  insetBlockStart: 30,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 80,
                  marginTop: 20,
                }}
                onPress={() => console.log("Location")}
              >
                <Image source={require("../../assets/images/LocationIcon.png")} />
                <Text>
                  <Text>Location</Text>
                </Text>
                <Text> {">"} </Text>
              </TouchableOpacity>

              <View style={{ marginTop: 50 }}>
                <Image
                  style={{ width: "100%", height: 1, marginTop: 20 }}
                  source={require("../../assets/images/lineImage.png")}
                />
              </View>
              <TouchableOpacity
                style={{
                  insetBlockStart: 30,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 80,
                  marginTop: 20,
                }}
                onPress={() => navigation.navigate("Settings")}
              >
                <Image source={require("../../assets/images/SettingsIcon.png")} />
                <Text>
                  <Text>Settings</Text>
                </Text>
                <Text> {">"} </Text>
              </TouchableOpacity>
            </View>
          )}

          {state.currentStep === 2 && (
            <View>
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    alignItems: "center",
                    marginBottom: 30,
                    marginBlockStart: 0,
                  }}
                >
                  <ProfilePicture />
                </View>
              </View>
              <Text style={{ fontSize: 20, marginBottom: 20 }}>Edit Profile</Text>
              <View>
                <Text style={styles.label}>Name</Text>
                <AppInput
                  term={state.formData.userName}
                  onChangeText={(text) => {
                    updateState([
                      {
                        type: ACTION_TYPES.UPDATE_PROP,
                        prop: 'formData.userName',
                        value: text
                      }
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
                        prop: 'formData.userEmail',
                        value: text
                      }
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
                        prop: 'formData.personalRecords.userWeight',
                        value: text
                      }
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
                        prop: 'formData.personalRecords.userHeight',
                        value: text
                      }
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
                        prop: 'formData.userPhone',
                        value: text
                      }
                    ]);
                  }}
                />
              <View>
                <Text style={styles.label}>Date of Birth</Text>
                <AppInput 
                  keyboardType="default"
                  term={state.formData.personalRecords.DateOfBirth}
                  onChangeText={(text) => {
                    updateState([
                      {
                        type: ACTION_TYPES.UPDATE_PROP,
                        prop: 'formData.personalRecords.DateOfBirth',
                        value: text
                      }
                    ]);
                  }}
                  placeholder="YYYY-MM-DD"
                />
                <Text style={styles.label}>Gender</Text>
                <DropdownComponent
                  data={GENDER_OPTIONS}
                  value={state.formData.personalRecords.Gender}
                  onChange={(item) => {
                    updateState([
                      {
                        type: ACTION_TYPES.UPDATE_PROP,
                        prop: 'formData.personalRecords.Gender',
                        value: item.value
                      }
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
                        prop: 'formData.personalRecords.City',
                        value: text
                      }
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
                        prop: 'formData.personalRecords.Area',
                        value: text
                      }
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
                        prop: 'formData.medicalRecord.bloodType',
                        value: item.value
                      }
                    ]);
                  }}
                  placeholder="Select blood type"
                />

                <AppButton
                  title="Save"
                  onPress={handleSave}
                  buttonStyle={{
                    backgroundColor: primaryDark,
                    width: "100%",
                    height: 50,
                    marginTop: 30,
                    marginBottom: 100,
                  }}
                  textStyle={{ color: "#fff", fontSize: 16 }}
                />
              </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
