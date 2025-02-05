import React, { useContext } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import DropdownComponent from "../../components/DropdownComponent";
import PhoneInputBox from "../../components/PhoneInputBox";
import ProfilePicture from "../../components/ProfilePicture";
import { ThemeContext } from "../../contexts/themeContext";
import { primaryDark, primaryLight } from "../../styles/colors";
import Logic from "./logic";
import { styles } from "./style";
import Header from "../../components/Header";

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
      <Header
        marginTop={state.currentStep === 2 ? 40 : 0}
        header={"My Profile"}
        onPress={
          state.currentStep === 2
            ? handleBack
            : () => navigation.navigate("Home")
        }
      />

      {state.currentStep === 1 && (
        <>
          {/* <Header onPress={() => navigation.navigate("Home")} /> */}
          <View style={{ marginBottom: 120 }}>
            <ProfilePicture
              profileName="Roland Gilbert"
              profileHandle="rolandGilbert@gmail.com"
            />
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
              <TouchableOpacity
                onPress={() => navigation.navigate("Appointments")}
              >
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
              <TouchableOpacity onPress={() => navigation.navigate("Doctors")}>
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
              <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <Text> {">"} </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      {state.currentStep === 2 && (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* <Header onPress={handleBack} /> */}
          <View style={styles.profileContainer}>
            <ProfilePicture />
          </View>
          <Text style={styles.editTitle}>Edit Profile</Text>
          <View style={styles.formContainer}>
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
              buttonStyle={styles.buttonStyle}
              textStyle={styles.buttonTextStyle}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Profile;
