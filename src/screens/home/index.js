import { styles } from "./style";
import React, { useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import Logic from "./logic";
import LottieView from "lottie-react-native";
import MenuButton from "../../components/menuButton";

const Home = ({ navigation }) => {
  const [activeIcon, setActiveIcon] = useState(null);
  const { state, updateState, handlePress } = Logic(navigation);
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Up and down animation
    const upDownAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 10,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    // Left and right wiggle animation
    const wiggleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 5,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -5,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    // Start both animations
    upDownAnimation.start();
    wiggleAnimation.start();

    // Cleanup animations on unmount
    return () => {
      upDownAnimation.stop();
      wiggleAnimation.stop();
    };
  }, [translateY, translateX]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hi, {state.userName || "User"}</Text>
          <Text style={styles.subGreeting}>How are you feeling today!</Text>
        </View>

        {/* Health Journey Banner */}
        <TouchableOpacity
          style={styles.healthCard}
          onPress={() => {
            navigation.navigate("AiChatScreen");
          }}
        >
          <View style={styles.CircleBackground}></View>
          {/* Animated Image Container */}
          <Animated.View
            style={[
              styles.bannerImageContainer,
              {
                transform: [
                  { translateY }, // Up and down movement
                  { translateX }, // Left and right wiggle
                ],
              },
            ]}
          >
            <LottieView
              source={require("../../assets/images/robot_wave_hi.json")}
              style={styles.bannerImage}
              autoPlay
              loop
            />
          </Animated.View>

          {/* Text Container */}
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerText}>Don't know where to go?</Text>
            <Text style={styles.bannerSubText}>
              Bimar, your friend will help!
            </Text>
          </View>
        </TouchableOpacity>

        {/* Services Section */}
        <View style={styles.servicesSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitle}>Our Services</Text>
            <TouchableOpacity>
              <Text style={styles.showMoreText}>Show More</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.serviceCards}>
            <TouchableOpacity style={styles.serviceCard}>
              <Image
                source={require("../../assets/images/stethoscope (3).png")}
                style={styles.icon}
              />
              <Text style={styles.cardText}>Doctors</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceCard}>
              <Image
                source={require("../../assets/images/hospital (1).png")}
                style={styles.icon}
              />
              <Text style={styles.cardText}>Clinics</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Doctor Cards (Horizontal Scroll) */}
        <View style={styles.doctorSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitle}>Our Doctors</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Doctors")}>
              <Text style={styles.showMoreText}>Show More</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} style={styles.cardScroll}>
            {state.loading ? (
              <ActivityIndicator size="large" color="#FD9B63" />
            ) : state.error ? (
              <Text style={styles.errorText}>{state.error}</Text>
            ) : state.doctors && state.doctors.length > 0 ? (
              state.doctors.map((doctor) => (
                <TouchableOpacity
                  key={doctor._id || doctor.id}
                  style={styles.doctorCard}
                  onPress={() =>
                    navigation.navigate("DoctorProfile", { doctor })
                  }
                >
                  <View style={styles.circleWrapper}>
                    <View style={styles.circleOne}></View>
                    <View style={styles.circleTwo}></View>
                  </View>
                  <Image
                    source={
                      doctor.doctorImage && doctor.doctorImage !== "null"
                        ? { uri: doctor.doctorImage }
                        : require("../../assets/images/portrait-hansome-young-male-doctor-man.png")
                    }
                    style={styles.doctorImage}
                  />
                  <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>
                      {doctor.doctorName || "Dr. Unknown"}
                    </Text>
                    <Text style={styles.doctorSpecialization}>
                      {doctor.field || "General"}
                    </Text>
                    <Text style={styles.doctorSpecialization}>
                      {doctor.clinic && doctor.clinic.length > 0
                        ? doctor.clinic[0].clinicArea
                        : "Clinic Area Not Available"}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noDataText}>No doctors available</Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {["gear", "envelope", "home", "clipboard", "user"].map(
          (icon, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.navButton,
                state.activeIcon === icon && styles.activeButton,
              ]}
              onPress={() => handlePress(icon)}
            >
              <Icon
                name={icon}
                size={icon === "home" ? 40 : 27}
                color={icon === "home" ? "#FD9B63" : "#ffffff"}
              />
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

export default Home;
