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
import ProfilePicture from "../../components/ProfilePicture";
import { Colors } from "react-native/Libraries/NewAppScreen";
import DropdownComponent from "../../components/DropdownComponent";
import PhoneInputBox from "../../components/PhoneInputBox";

const Profile = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { state, updateState, handleNext, handleBack, maritalStatus } =
    Logic(navigation);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? primaryDark : primaryLight },
      ]}
    >
      {state.currentStep === 1 && (
        <View style={{ marginBottom: 120 }}>
          <View alignItems="center">
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 40,
                marginBlockStart: 30,
              }}
            >
              My Profile
            </Text>
            <ProfilePicture
              profileName="Roland Gilbert"
              profileHandle="rolandGilbert@gmail.com"
            />
          </View>

          <AppButton
            title="Show Profile"
            onPress={handleNext}
            buttonStyle={{
              backgroundColor: primaryDark,
              marginLeft: 80,
              width: 100,
              height: 35,
            }}
            textStyle={{ color: "#fff", fontSize: 10 }}
          />
          <View
            style={{
              insetBlockStart: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 80,
              marginTop: 20,
            }}
          >
            <Image source={require("../../assets/images/calendarIcon.png")} />
            <Text>
              <Text>Appointments</Text>
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text> {">"} </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              insetBlockStart: 30,
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 80,
              marginTop: 20,
            }}
          >
            <Image
              source={require("../../assets/images/MedicalRecordIcon.png")}
            />
            <Text>
              <Text>My Diagnosis</Text>
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text> {">"} </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 50 }}>
            <Image
              style={{ width: "100%", height: 1, marginTop: 20 }}
              source={require("../../assets/images/lineImage.png")}
            />
          </View>
          <View
            style={{
              insetBlockStart: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 80,
              marginTop: 20,
            }}
          >
            <Image source={require("../../assets/images/VirusIcon.png")} />
            <Text>
              <Text>Medical records</Text>
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text> {">"} </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              insetBlockStart: 30,
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 80,
              marginTop: 20,
            }}
          >
            <Image
              source={require("../../assets/images/StethoscopeIcon.png")}
            />
            <Text>
              <Text>My Doctors</Text>
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text> {">"} </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              insetBlockStart: 30,
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 80,
              marginTop: 20,
            }}
          >
            <Image source={require("../../assets/images/LocationIcon.png")} />
            <Text>
              <Text>Location</Text>
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text> {">"} </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 50 }}>
            <Image
              style={{ width: "100%", height: 1, marginTop: 20 }}
              source={require("../../assets/images/lineImage.png")}
            />
          </View>
          <View
            style={{
              insetBlockStart: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 80,
              marginTop: 20,
            }}
          >
            <Image source={require("../../assets/images/SettingsIcon.png")} />
            <Text>
              <Text>Settings</Text>
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text> {">"} </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 50, alignItems: "center" }}>
            <AppButton
              title="BACK"
              onPress={handleBack}
              buttonStyle={{ width: 120 }}
            />
          </View>
        </View>
      )}

      {state.currentStep === 2 && (
        <View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 30,
                marginBlockStart: 0,
              }}
            >
              My Profile
            </Text>
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
              term={state.userName}
              onChangeText={(text) => {}}
              onSubmitEditing={() => state.form.passwordInput.focus()}
              incomPressible={false}
              validationText={state.userNameError}
            />
            <Text style={styles.label}>Email</Text>
            <AppInput
              term={state.userEmail}
              onChangeText={(text) => {}}
              onSubmitEditing={() => state.form.passwordInput.focus()}
              incomPressible={false}
              validationText={state.userEmialError}
            />
            <Text style={styles.label}>Weight</Text>
            <AppInput keyboardType="numeric" />
            <Text style={styles.label}>Height</Text>
            <AppInput keyboardType="numeric" />
            <Text style={styles.label}>Phone</Text>
            <PhoneInputBox />

            <AppButton
              title="Next"
              onPress={handleNext}
              buttonStyle={{
                backgroundColor: primaryDark,
                width: "100%",
                height: 50,
                marginTop: 50,
                marginBottom: 100,
              }}
              textStyle={{ color: "#fff", fontSize: 16 }}
            />
          </View>
        </View>
      )}
      {state.currentStep === 3 && (
        <View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10,
                marginBlockStart: 0,
              }}
            >
              My Profile
            </Text>
            <View
              style={{
                alignItems: "center",
                marginBottom: 60,
                marginBlockStart: 20,
              }}
            >
              <ProfilePicture />
            </View>
          </View>
          <Text style={{ fontSize: 20, marginBottom: 20 }}>Edit Profile</Text>
          <View>
            <Text style={styles.label}>Marital status</Text>
            <DropdownComponent data={maritalStatus} />
            <Text style={styles.label}>Number of children</Text>
            <AppInput keyboardType="numeric" />
            <Text style={styles.label}>Date of first children</Text>
            <AppInput keyboardType="date" />
            <Text style={styles.label}>Number of wives</Text>
            <AppInput keyboardType="numeric" />

            <AppButton
              title="Save"
              onPress={() => navigation.navigate("Login")}
              buttonStyle={{
                backgroundColor: primaryDark,
                width: "100%",
                height: 50,
                marginTop: 50,
                marginBottom: 100,
              }}
              textStyle={{ color: "#fff", fontSize: 16 }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Profile;
