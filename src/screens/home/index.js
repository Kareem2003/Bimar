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
} from "react-native";

const Home = ({ navigation }) => {
  const [activeIcon, setActiveIcon] = useState(null); // State to track active icon

  const handlePress = (iconName) => {
    setActiveIcon(iconName); // Update the active icon
  };

  const doctors = [
    {
      id: 1,
      name: "DR/ Mona",
      specialization: "Surgery",
      location: "Hadayek-al-Ahram",
      image: require("../../assets/images/woman-doctor-wearing-lab-coat-with-stethoscope-isolated.png"),
    },
    {
      id: 2,
      name: "DR/ Ahmed",
      specialization: "Psychology",
      location: "Nasr City",
      image: require("../../assets/images/portrait-hansome-young-male-doctor-man.png"),
    },
    {
      id: 3,
      name: "DR/ Sarah",
      specialization: "Gastroenterology",
      location: "Dokki",
      image: require("../../assets/images/portrait-hansome-young-male-doctor-man.png"),
    },
  ];

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
            <TextInput style={styles.searchBar} placeholder="Search" />
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
            <TouchableOpacity>
              <Text style={styles.showMoreText}>Show More</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} style={styles.cardScroll}>
            {doctors.map((doctor) => (
              <TouchableOpacity key={doctor.id} style={styles.doctorCard}>
                <View style={styles.circleWrapper}>
                  <View style={styles.circleOne}></View>
                  <View style={styles.circleTwo}></View>
                </View>
                <Image source={doctor.image} style={styles.doctorImage} />
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={styles.doctorSpecialization}>
                    {doctor.specialization}
                  </Text>
                  <Text style={styles.doctorLocation}>{doctor.location}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {["gear", "envelope", "home", "clipboard", "user"].map((icon, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.navButton,
              activeIcon === icon && styles.activeButton,
            ]}
            onPress={() => handlePress(icon)}
          >
            <Icon
              name={icon}
              size={icon === "home" ? 40 : 27}
              color={icon === "home" ? "#FD9B63" : "#ffffff"}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Home;
