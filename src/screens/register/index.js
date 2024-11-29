import React, { useContext, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "../../contexts/themeContext";
import { styles } from "./style";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import AuthTitles from "../../components/AuthTitles";
import { primaryDark, primaryLight } from "../../styles/colors";

const Register = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const [currentStep, setCurrentStep] = useState(1); // Step indicator: 1 or 2
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    city: "",
    area: "",
    gender: "",
    weight: "",
    hight: "",
    BloodType: "",
  });

  const handleNext = () => {
    const next = currentStep + 1;
    setCurrentStep(next); // Move to the next section
  };

  const handleBack = () => {
    const prev = currentStep - 1;
    setCurrentStep(prev); // Return to the first section
  };

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

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
        <View>
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
        <View>
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
            <Text style={styles.text}>Gender</Text>
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
        <View>
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
          <AppInput
            term={formData.weight}
            onChangeText={(text) => updateFormData("weight", text)}
            placeholder="Weight"
            backgroundStyle={{ marginTop: 20 }}
          />
          <AppInput
            term={formData.hight}
            onChangeText={(text) => updateFormData("hight ", text)}
            placeholder="Hight "
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

      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => console.log("Navigate to Login")}>
          <Text>
            Have an account? <Text style={styles.link}>LOGIN</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
