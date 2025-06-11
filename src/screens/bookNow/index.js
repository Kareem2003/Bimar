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
import { BASE_URL } from "../../helpers/constants/config";
const BookNow = ({ navigation, route }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { state, updateState, handleBooking } = Logic(navigation, route);

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation?.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Receipt</Text>
      <View style={styles.backButton} />
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

      <View style={styles.doctorProfileCard}>
        <Image
          style={styles.profileAvatar}
          source={
            state.doctor?.doctorImage && state.doctor.doctorImage !== "null"
              ? { uri: `${BASE_URL}/${state.doctor.doctorImage}` }
              : require("../../assets/images/WhatsApp Image 2023-07-23 at 15.23.54.jpg")
          }
        />
        <View style={styles.doctorInfoContainer}>
          <Text style={styles.doctorName}>
            {state.doctor ? state.doctor.doctorName : "Doctor not available"}
          </Text>
          <Text style={styles.doctorPrice}>{state.price} LE</Text>
        </View>
      </View>

      <View style={styles.pricingSummaryContainer}>
        <Text style={styles.summaryTitle}>Pricing Summary</Text>

        <View style={styles.pricingRow}>
          <Text style={styles.pricingLabel}>Sub total</Text>
          <Text style={styles.pricingValue}>{state.price} LE</Text>
        </View>

        <View style={styles.pricingRow}>
          <Text style={styles.pricingLabel}>Tax</Text>
          <Text style={styles.pricingValue}>4.99 LE </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{state.price + 4.99} LE</Text>
        </View>
      </View>

      <View style={styles.bookButtonContainer}>
        <AppButton title="Book Now" onPress={handleBooking} />
      </View>
    </View>
  );
};

export default BookNow;
