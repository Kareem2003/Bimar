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

  const TAX_PERCENTAGE = 0.15;
  const price = Number(state.price) || 0;
  const taxAmount = +(price * TAX_PERCENTAGE).toFixed(2);
  const totalAmount = +(price + taxAmount).toFixed(2);

  const renderReceipt = () => {
    return (
      <View style={styles.receiptContainer}>
        <View style={styles.receiptSection}>
          <Text style={styles.sectionTitle}>Doctor Information</Text>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Name</Text>
            <Text style={styles.receiptValue}>
              {state.doctor?.doctorName || "Not Available"}
            </Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Specialization</Text>
            <Text style={styles.receiptValue}>
              {state.doctor?.field || "Not Available"}
            </Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Clinic Name</Text>
            <Text style={styles.receiptValue}>
              {state.selectedClinic?.clinicName || "Not Available"}
            </Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Address</Text>
            <Text style={styles.receiptValue}>
              {state.selectedClinic?.clinicAddress || "Not Available"}
            </Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Date</Text>
            <Text style={styles.receiptValue}>
              {state.selectedDate || "Not Available"}
            </Text>
          </View>
        </View>
        <View style={styles.receiptSection}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.paymentRow}>
            <Text style={styles.receiptLabel}>Base Price</Text>
            <Text style={styles.receiptValue}>{state.price} LE</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.receiptLabel}>Tax Amount (17%)</Text>
            <Text style={styles.receiptValue}>{taxAmount} LE</Text>
          </View>
          <View style={[styles.paymentRow, { borderBottomWidth: 0 }]}>
            <Text
              style={[
                styles.receiptLabel,
                { fontWeight: "600", color: "#334155" },
              ]}
            >
              Total Amount
            </Text>
            <Text
              style={[styles.receiptValue, { color: "#16423C", fontSize: 18 }]}
            >
              {totalAmount} LE
            </Text>
          </View>
          <View style={{ alignItems: "flex-end", marginTop: 10 }}>
            <View
              style={{
                backgroundColor: "#E8F5E9",
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "#2E7D32", fontSize: 14 }}>
                Paid via {state.receipt?.paymentMethod || "Cash"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? primaryDark : primaryLight },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      {renderHeader()}
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {renderReceipt()}
        <View style={styles.bookButtonContainer}>
          <AppButton title="Book Now" onPress={handleBooking} />
        </View>
      </ScrollView>
    </View>
  );
};

export default BookNow;
