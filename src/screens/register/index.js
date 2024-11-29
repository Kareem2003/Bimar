import React, { useContext, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "../../contexts/themeContext";
import { styles } from "./style";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import AppRadioButton from "../../components/AppRadioButton";
import AuthTitles from "../../components/AuthTitles";
import { primaryDark, primaryLight } from "../../styles/colors";
import Logic from "./logic";

const Register = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const {
    updateFormData,
    handleNext,
    handleBack,
    handleRegister,
    currentStep,
    formData,
  } = Logic(navigation);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? primaryDark : primaryLight },
      ]}
    >
      <AuthTitles
        isDarkTheme={isDarkTheme}
        text="New Here?"
        title={true}
        description={true}
        descriptionText="Register Now"
      />

      {currentStep === 1 && (
        <View style={{ padding: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Image
              style={styles.img}
              source={require("./../../assets/images/step1ActiveImage.png")}
            />
            <Image
              style={styles.line}
              source={require("./../../assets/images/lineImage.png")}
            />
            <Image
              style={styles.img}
              source={require("./../../assets/images/step2Image.png")}
            />
            <Image
              style={styles.line}
              source={require("./../../assets/images/lineImage.png")}
            />
            <Image
              style={styles.img}
              source={require("./../../assets/images/step3Image.png")}
            />
          </View>
          <AppInput
            term={formData.fullname}
            onChangeText={(text) => updateFormData("fullname", text)}
            placeholder="Full Name"
            backgroundStyle={{ marginTop: 20 }}
          />
          <AppInput
            term={formData.phone}
            onChangeText={(text) => updateFormData("phone", text)}
            placeholder="Phone"
            backgroundStyle={{ marginTop: 20 }}
          />
          <AppInput
            term={formData.email}
            onChangeText={(text) => updateFormData("email", text)}
            placeholder="Email"
            backgroundStyle={{ marginTop: 20 }}
          />
          <AppInput
            term={formData.DateOfBerth}
            onChangeText={(text) => updateFormData("DateOfBerth ", text)}
            placeholder="Date of berth "
            backgroundStyle={{ marginTop: 20 }}
          />
          <AppButton
            title="Next"
            onPress={handleNext}
            buttonStyle={{ marginTop: 25, margin: "auto" }}
          />
        </View>
      )}

      {currentStep === 2 && (
        <View style={{ padding: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Image
              style={styles.imgActive}
              source={require("./../../assets/images/step1ActiveImage.png")}
            />
            <View style={styles.lineActive} />
            <Image
              style={styles.circle}
              source={require("./../../assets/images/step2Image.png")}
            />
            <View style={styles.line} />
            <Image
              style={styles.img}
              source={require("./../../assets/images/step3Image.png")}
            />
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <AppInput
              term={formData.city}
              onChangeText={(text) => updateFormData("city", text)}
              placeholder="City"
              backgroundStyle={{ marginTop: 20, width: 150 }}
            />
            <AppInput
              term={formData.area}
              onChangeText={(text) => updateFormData("area", text)}
              placeholder="Area"
              backgroundStyle={{ marginTop: 20, width: 150 }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Text style={styles.label}>Gender</Text>
            <AppRadioButton />
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <AppInput
              term={formData.weight}
              onChangeText={(text) => updateFormData("weight", text)}
              placeholder="Weight"
              backgroundStyle={{ marginTop: 20, width: 150 }}
            />
            <AppInput
              term={formData.hight}
              onChangeText={(text) => updateFormData("hight", text)}
              placeholder="Hight"
              backgroundStyle={{ marginTop: 20, width: 150 }}
            />
          </View>

          <AppInput
            term={formData.BloodType}
            onChangeText={(text) => updateFormData("BloodType", text)}
            placeholder="Blood Type"
            backgroundStyle={{ marginTop: 20 }}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <AppButton
              title="Back"
              onPress={handleBack}
              buttonStyle={{ marginTop: 25, margin: "auto", width: 150 }}
            />
            <AppButton
              title="Next"
              onPress={handleNext}
              buttonStyle={{ marginTop: 25, margin: "auto", width: 150 }}
            />
          </View>
        </View>
      )}
      {currentStep === 3 && (
        <View style={{ padding: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Image
              style={styles.imgActive}
              source={require("./../../assets/images/step1ActiveImage.png")}
            />
            <View style={styles.lineActive} />
            <Image
              style={styles.imgActive}
              source={require("./../../assets/images/step2Image.png")}
            />
            <View style={styles.lineActive} />
            <Image
              style={styles.circle}
              source={require("./../../assets/images/step3Image.png")}
            />
          </View>

          <AppInput
            term={formData.BloodType}
            onChangeText={(text) => updateFormData("BloodType", text)}
            placeholder="Blood Type"
            backgroundStyle={{ marginTop: 20 }}
          />
          <AppInput
            term={formData.allergy}
            onChangeText={(text) => updateFormData("allergy", text)}
            placeholder="Allergy"
            backgroundStyle={{ marginTop: 20 }}
          />
          <AppInput
            term={formData.ReEnterYourPassword}
            onChangeText={(text) =>
              updateFormData("ReEnterYourPassword ", text)
            }
            placeholder="Re-Enter Your Password "
            backgroundStyle={{ marginTop: 20 }}
          />
          <AppInput
            term={formData.EnteryourPhone}
            onChangeText={(text) => updateFormData("EnteryourPhone ", text)}
            placeholder="Enter your Phone "
            backgroundStyle={{ marginTop: 20 }}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <AppButton
              title="BACK"
              onPress={handleBack}
              buttonStyle={{ marginTop: 25, margin: "auto", width: 150 }}
            />
            <AppButton
              title="Register"
              onPress={handleRegister}
              buttonStyle={{ marginTop: 25, margin: "auto", width: 150 }}
            />
          </View>
        </View>
      )}

      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>
            Have an account? <Text style={styles.link}>LOGIN</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
