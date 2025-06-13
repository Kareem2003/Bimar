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
import Header from "../../components/Header";
import ToggleSwitch from "toggle-switch-react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import withUserDataUpdates from "../../helpers/withUserDataUpdates";

const Settingsscreen = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { state, updateState, handleNext, handleBack , handleLogout } =
    Logic(navigation);
  const [muteIsOn, setMute] = useState(false);
  const [darkIsOn, setDark] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleMuteToggle = () => {
    setMute(!muteIsOn);
  };
  const handleDarkToggle = () => {
    setDark(!darkIsOn);
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDarkTheme ? primaryDark : primaryLight }}>
      <Header
        marginTop={50}
        header={"Settings"}
        onPress={handleBack}
      />
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkTheme ? primaryDark : primaryLight },
        ]}
      >
        {state.currentStep === 1 && (
          <View style={{ marginBottom: 350 }}>
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
              <Image source={require("../../assets/images/language.png")} style={styles.img} />
              <Text>
                <Text>Language</Text>
              </Text>
              <Dropdown style={styles.Dropdown}
                data={[
                  { label: "English", value: "en" },
                  { label: "العربية", value: "ar" },
                ]}
                labelField="label"
                valueField="value"
                value={selectedLanguage}
                onChange={(item) => setSelectedLanguage(item.value)}
                renderRightIcon={() => (
                  <AntDesign name="down" size={20} color="black" />
                )}
                selectedTextStyle={{ display: "none" }} 
                placeholderStyle={{ display: "none" }} 
                containerStyle={{ width: 120 }} 
              />
            </View>
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
              onPress={() => navigation.navigate("RateApp")}
            >
              <Image source={require("../../assets/images/star.png")} />
              <Text>
                <Text>Rate App</Text>
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
              onPress={() => navigation.navigate("Terms")}
            >
              <Image source={require("../../assets/images/terms.png")} />
              <Text>
                <Text>Terms & Conditions</Text>
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
              onPress={() => handleLogout()}
            >
              <Image source={require("../../assets/images/logout.png")} />
              <Text>
                <Text>Log Out</Text>
              </Text>
              <Text> {">"} </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default withUserDataUpdates(Settingsscreen);
