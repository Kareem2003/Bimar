import React, { useContext, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
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
import Icon from "react-native-vector-icons/MaterialIcons";

const BookNow = ({ navigation, route }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { state, updateState, handleNext, handleBack, maritalStatus } =
    Logic(navigation);

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation?.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>
        <Text>Payment Methods</Text>
      </Text>
      <View style={styles.backButton} /> {/* Empty view for spacing */}
    </View>
  );
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? primaryDark : primaryLight },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      {renderHeader()}

      <View alignItems="center">
        <View style={styles.profile}>
          <Image
            style={styles.profileAvatar}
            source={require("../../assets/images/WhatsApp Image 2023-07-23 at 15.23.54.jpg")}
          />
        </View>
      </View>
      <View style={{ margin: 30 }}>
        <Text style={{ fontSize: 15, color: "#16423C" }}>Dr. Bellamy N</Text>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 5 }}>
          £320.45
        </Text>
      </View>
      <View style={{ margin: 30 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 15, color: "slategray" }}>Sub total</Text>
          <Text style={{ fontSize: 15, color: "slategray" }}>£316.55</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 15, color: "slategray", marginTop: 5 }}>
            Tax
          </Text>
          <Text style={{ fontSize: 15, color: "slategray", marginTop: 5 }}>
            £3.45
          </Text>
        </View>
      </View>
      <View style={{ margin: 30 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 15, color: "slate", marginTop: 5 }}>
            Total
          </Text>
          <Text style={{ fontSize: 15, color: "slate", marginTop: 5 }}>
            £320.45
          </Text>
        </View>
      </View>
      <View style={{ margin: 'auto' }}>
        <AppButton 
          title="Book Now" 
          onPress={() => {
            navigation.navigate("BookDate");
          }} 
        />
      </View>
    </View>
  );
};

export default BookNow;
