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
import ToggleSwitch from "toggle-switch-react-native";

const Settingsscreen = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { state, updateState, handleNext, handleBack, maritalStatus } =
    Logic(navigation);
  const [muteIsOn, setMute] = useState(false);
  const [darkIsOn, setDark] = useState(false);

  const handleMuteToggle = () => {
    setMute(!muteIsOn);
  };
  const handleDarkToggle = () => {
    setDark(!darkIsOn);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? primaryDark : primaryLight },
      ]}
    >
      {state.currentStep === 1 && (
        <View style={{ marginBottom: 120 }}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Settings</Text>
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
            <Image source={require("../../assets/images/dark.png")} />
            <Text>
              <Text>Dark Mode</Text>
            </Text>
            {/* <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text> {">"} </Text>
            </TouchableOpacity> */}

            <ToggleSwitch
              isOn={darkIsOn}
              onColor="#16423C"
              offColor="#C4DAD2"
              onToggle={handleDarkToggle}
              size="small"
            />
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
            <Image source={require("../../assets/images/notifications.png")} />
            <Text>
              <Text>Mute Notification</Text>
            </Text>
            <ToggleSwitch
              isOn={muteIsOn}
              onColor="#16423C"
              offColor="#C4DAD2"
              onToggle={handleMuteToggle}
              size="small"
            />
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
            <Image source={require("../../assets/images/password.png")} />
            <Text>
              <Text>Change Password</Text>
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("forgetPassword")}
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
            <Image source={require("../../assets/images/star.png")} />
            <Text>
              <Text>Rate App</Text>
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("rate")}>
              <Text> {">"} </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              insetBlockStart: 30,
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 80,
              marginTop: 30,
            }}
          >
            <Image source={require("../../assets/images/share.png")} />
            <Text>
              <Text>Share App</Text>
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("share")}>
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
            <Image source={require("../../assets/images/terms.png")} />
            <Text>
              <Text>Terms & Conditions</Text>
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("terms&conditions")}
            >
              <Text> {">"} </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              insetBlockStart: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 80,
              marginTop: 30,
            }}
          >
            <Image source={require("../../assets/images/privacy.png")} />
            <Text>
              <Text>Privacy & Policy</Text>
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("privacy&policy")}
            >
              <Text> {">"} </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              insetBlockStart: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 80,
              marginTop: 30,
            }}
          >
            <Image source={require("../../assets/images/logout.png")} />
            <Text>
              <Text>Log Out</Text>
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("logout")}>
              <Text> {">"} </Text>
            </TouchableOpacity>
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

export default Settingsscreen;
