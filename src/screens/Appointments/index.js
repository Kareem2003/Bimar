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
import { Button } from "react-native-paper";
import AppButton from "../../components/AppButton";
import Header from "../../components/Header";
import withUserDataUpdates from "../../helpers/withUserDataUpdates";

const Appointments = ({ navigation }) => {
  const [activeIcon, setActiveIcon] = useState(null); // State to track active icon

  const handlePress = (iconName) => {
    setActiveIcon(iconName); // Update the active icon
  };

  const upcoming = [
    {
      id: 1,
      name: "DR. Mona",
      specialization: "Consultation Eye",

      image: require("../../assets/images/woman-doctor-wearing-lab-coat-with-stethoscope-isolated.png"),
      review: 70,
      rate: 3.5,
      time: "8:00 BM",
    },
    {
      id: 2,
      name: "DR. Ahmed",
      specialization: "Tes Swap Anti Gen",

      image: require("../../assets/images/portrait-hansome-young-male-doctor-man.png"),
      review: 55,
      rate: 4.5,
      time: "10:00 AM",
    },
  ];
  const pastBooking = [
    {
      id: 1,
      name: "DR. Mona",
      specialization: "Medichal Check Up",

      image: require("../../assets/images/woman-doctor-wearing-lab-coat-with-stethoscope-isolated.png"),
      review: 70,
      rate: 3.5,
      date: "14 March 2021",
    },
    {
      id: 2,
      name: "DR. Ahmed",
      specialization: "Diagnostic Heart",

      image: require("../../assets/images/portrait-hansome-young-male-doctor-man.png"),
      review: 55,
      rate: 4.5,
      date: "9 March 2021",
    },
    {
      id: 3,
      name: "DR. Amira",
      specialization: "Medichal Check Up",

      image: require("../../assets/images/woman-doctor-wearing-lab-coat-with-stethoscope-isolated.png"),
      review: 40,
      rate: 4.3,
      date: "6 March 2021",
    },
    {
      id: 5,
      name: "DR. Amr",
      specialization: "Diagnostic Heart",
      location: "Nasr City",
      image: require("../../assets/images/portrait-hansome-young-male-doctor-man.png"),
      review: 65,
      rate: 4.5,
      time: "10:00 AM",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <Header
          marginTop={50}
          header={"Appointments"}
          onPress={() => navigation.navigate("Home")}
        />

        {/* Search Bar */}
        {/* <View style={styles.searchContainer}>
          <View style={styles.searchBarWrapper}>
            <TextInput style={styles.searchBar} placeholder="Search" />
            <TouchableOpacity style={styles.filterIconWrapper}>
              <Icon name="filter" size={25} color="#FD9B63" />
            </TouchableOpacity>
          </View>
        </View> */}

        {/* Upcoming Section */}
        <View style={styles.doctorSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitle}>Upcoming</Text>
          </View>
          <ScrollView vertical={true} style={styles.cardScroll}>
            {upcoming.map((doctor) => (
              <TouchableOpacity key={doctor.id} style={styles.UpcomingCard}>
                <View style={styles.circleWrapper}>
                  <View style={styles.circleOne}></View>
                </View>
                <Image source={doctor.image} style={styles.doctorImage} />
                <View style={styles.doctorInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.doctorSpecialization}>
                      {doctor.specialization}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 5 }}>
                      <Text style={{ color: "#16423C" }}>{doctor.rate}</Text>
                      <Icon name="star" size={20} color="#16423C" />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    <Text style={styles.doctorName}>{doctor.review} Rev</Text>
                  </View>

                  <Text style={{ color: "#777777" }}>{doctor.time}</Text>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <AppButton
                      title="Cancel"
                      buttonStyle={{ width: 105, height: 40 }}
                      textStyle={{ fontSize: 11 }}
                    />
                    <AppButton
                      title="View"
                      buttonStyle={{
                        width: 105,
                        height: 40,
                        backgroundColor: "#16423C",
                      }}
                      textStyle={{ fontSize: 11, color: "#ffffff" }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/*Past Booking Section */}
        <View style={styles.doctorSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitle}>Past Booking</Text>
          </View>
          <ScrollView vertical={true} style={styles.cardScroll}>
            {pastBooking.map((doctor) => (
              <TouchableOpacity key={doctor.id} style={styles.PastBookingCard}>
                <View style={styles.circleWrapper}>
                  <View style={styles.circleOne}></View>
                </View>
                <Image source={doctor.image} style={styles.doctorImage} />
                <View style={styles.doctorInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.doctorSpecialization}>
                      {doctor.specialization}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 5 }}>
                      <Text style={{ color: "#16423C" }}>{doctor.rate}</Text>
                      <Icon name="star" size={20} color="#16423C" />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    <Text style={styles.doctorName}>{doctor.review} Rev</Text>
                  </View>

                  <Text style={styles.doctorName}>{doctor.date}</Text>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <AppButton
                      title="Write a Review"
                      buttonStyle={{ width: 105, height: 40 }}
                      textStyle={{ fontSize: 11 }}
                    />
                    <AppButton
                      title="Book Again"
                      buttonStyle={{
                        width: 105,
                        height: 40,
                        backgroundColor: "#16423C",
                      }}
                      textStyle={{ fontSize: 11, color: "#ffffff" }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default withUserDataUpdates(Appointments);
