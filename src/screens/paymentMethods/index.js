import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { styles } from "./style";
import { Button } from "react-native-paper";
import AppButton from "../../components/AppButton";

const PaymentMethods = ({ navigation }) => {
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
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("AddPaymentMethod")}
      >
        <Icon name="add" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );

  const paymentMethods = [
    { id: 1, name: "Visa", icon: require("../../assets/images/visa.png") },
    {
      id: 2,
      name: "MasterCard",
      icon: require("../../assets/images/mastercard.png"),
    },
    { id: 3, name: "PayPal", icon: require("../../assets/images/paypal.png") },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      {renderHeader()}
      {paymentMethods.map((method) => (
        <TouchableOpacity
          style={{
            insetBlockStart: 30,
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 80,
            marginTop: 20,
            paddingHorizontal: 30,
            borderBottomWidth: 1,
            borderheight: 1,
            borderColor: "#ccc",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Image
              source={method.icon}
              style={{
                width: 40,
                height: 40,
                marginBottom: 10,
                resizeMode: "contain",
              }}
            />

            <Text style={{ marginTop: 5 }}>{method.name}</Text>
          </View>

          <Text style={{ marginTop: 5, color: "#ccc" }}> {">"} </Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default PaymentMethods;
