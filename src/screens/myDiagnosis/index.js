import { styles } from "./style";
import React, { useState } from "react";
// import Icon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
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
import AuthTitles from "../../components/AuthTitles";
import Logic from "./logic";
const MyDiagnosis = ({ navigation }) => {
  const [activeIcon, setActiveIcon] = useState(null); // State to track active icon

  const handlePress = (iconName) => {
    setActiveIcon(iconName); // Update the active icon
  };

  const LastHoures = [
    {
      id: 1,
      name: "DR. Mona",
      specialization: "Consultation Eye",
      image: require("../../assets/images/woman-doctor-wearing-lab-coat-with-stethoscope-isolated.png"),
      attachment: 3,
      time: "8:00 BM",
    },
    {
      id: 2,
      name: "DR. Ahmed",
      specialization: "Tes Swap Anti Gen",
      image: require("../../assets/images/portrait-hansome-young-male-doctor-man.png"),
      attachment: 6,
      time: "10:00 AM",
    },
  ];
  const LastMonth = [
    {
      id: 1,
      name: "DR. Mona",
      specialization: "Consultation Eye",
      image: require("../../assets/images/woman-doctor-wearing-lab-coat-with-stethoscope-isolated.png"),
      attachment: 3,
      date: "23 january 2022",
    },
    {
      id: 2,
      name: "DR. Ahmed",
      specialization: "Tes Swap Anti Gen",
      image: require("../../assets/images/portrait-hansome-young-male-doctor-man.png"),
      attachment: 6,
      date: "2 january 2022",
    },
    {
      id: 3,
      name: "DR. Sara",
      specialization: "Consultation Eye",
      image: require("../../assets/images/woman-doctor-wearing-lab-coat-with-stethoscope-isolated.png"),
      attachment: 4,
      date: "30 january 2022",
    },
    {
      id: 4,
      name: "DR. Amr",
      specialization: "Tes Swap Anti Gen",
      image: require("../../assets/images/portrait-hansome-young-male-doctor-man.png"),
      attachment: 7,
      date: "13 january 2022",
    },
    {
      id: 5,
      name: "DR. Aya",
      specialization: "Consultation Eye",
      image: require("../../assets/images/woman-doctor-wearing-lab-coat-with-stethoscope-isolated.png"),
      attachment: 2,
      date: "23 january 2022",
    },
    {
      id: 6,
      name: "DR. Ahmed",
      specialization: "Tes Swap Anti Gen",
      image: require("../../assets/images/portrait-hansome-young-male-doctor-man.png"),
      attachment: 6,
      date: "13 january 2022",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={{ fontWeight: "bold" }}>My Diagnosis</Text>
        </View>

        {/* Last 24 Hours Section */}
        <View style={styles.doctorSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitle}>Last 24 Hours</Text>
          </View>
          <ScrollView vertical={true} style={styles.cardScroll}>
            {LastHoures.map((doctor) => (
              <TouchableOpacity key={doctor.id} style={styles.LastHouresCard}>
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
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    <View
                      style={{ flexDirection: "row", gap: 6, marginRight: 20 }}
                    >
                      <Text style={{ color: "#16423C", fontSize: 12 }}>
                        {doctor.attachment}
                      </Text>
                      <Image
                        source={require("../../assets/images/attachments.png")}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#777777", fontSize: 12 }}>
                      {doctor.time}
                    </Text>
                    <Text style={{ fontSize: 9, color: "#777777" }}>
                      Attachments
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/*Past Booking Section */}
        <View style={styles.doctorSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitle}>Last Month</Text>
          </View>
          <ScrollView vertical={true} style={styles.cardScroll}>
            {LastMonth.map((doctor) => (
              <TouchableOpacity key={doctor.id} style={styles.LastHouresCard}>
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
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    <View
                      style={{ flexDirection: "row", gap: 5, marginRight: 20 }}
                    >
                      <Text style={{ color: "#16423C", fontSize: 12 }}>
                        {doctor.attachment}
                      </Text>
                      <Image
                        source={require("../../assets/images/attachments.png")}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#777777", fontSize: 12 }}>
                      {doctor.date}
                    </Text>
                    <Text style={{ fontSize: 9, color: "#777777" }}>
                      Attachments
                    </Text>
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

export default MyDiagnosis;
