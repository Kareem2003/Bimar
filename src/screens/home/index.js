import { styles } from "./style";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Logic from "./logic";

const Home = ({ navigation }) => {
  const [activeIcon, setActiveIcon] = useState(null);
  const { state, updateState, handlePress, navigateToDoctors } =
    Logic(navigation);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hi, Abdalla</Text>
          <Text style={styles.subGreeting}>How are you feeling today!</Text>
        </View>

        {/* Health Journey Banner */}
        <View style={styles.healthCard}>
          <View style={styles.banner}>
            <View style={styles.CircleBackground}></View>
            <Image
              source={require("../../assets/images/portrait-hansome-young-male-doctor-man.png")}
              style={styles.bannerImage}
            />
            <View style={styles.bannerAllText}>
              <Text style={styles.bannerText}>
                Begin Your Health Journey with Us
              </Text>
              <Text style={styles.bannerSubText}>
                Your Care, Our Commitment!
              </Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBarWrapper}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.filterIconWrapper}>
              <Icon name="filter" size={25} color="#FD9B63" />
            </TouchableOpacity>
          </View>
        </View>

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
            <TouchableOpacity onPress={() => navigation.replace("Doctors")}>
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
                  onPress={() => navigation.navigate("DoctorProfile")}
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
