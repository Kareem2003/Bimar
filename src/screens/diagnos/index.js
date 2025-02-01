import { styles } from "./style";
import React, { useState } from "react";
// import Icon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  TextInput,
  styleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import AppButton from "../../components/AppButton";
import AuthTitles from "../../components/AuthTitles";
import Logic from "./logic";

const Diagnos = ({ navigation }) => {
  const [activeIcon, setActiveIcon] = useState(null); // State to track active icon

  const handlePress = (iconName) => {
    setActiveIcon(iconName); // Update the active icon
  };

  const currentDiagnos = [
    {
      id: 1,
      name: "DR. Mona",
      specialization: "Consultation Eye",
      image: require("../../assets/images/woman-doctor-wearing-lab-coat-with-stethoscope-isolated.png"),
      attachment: 3,
      time: "8:00 BM",
      date: "24 jun 2024",
    },
  ];
  const attachments = [
    {
      id: 1,
      prescriptionName: "PDF",
      time: "10:00 BM",
      image: require("../../assets/images/pdf.png"),
    },
    {
      id: 2,
      prescriptionName: "Testing Result",
      time: "7:00 BM",
      image: require("../../assets/images/microscope.png"),
    },
    {
      id: 3,
      prescriptionName: "X-ray",
      time: "9:00 AM",
      image: require("../../assets/images/Xray.png"),
    },
    {
      id: 4,
      prescriptionName: "PDF",
      time: "10:00 AM",
      image: require("../../assets/images/pdf.png"),
    },
  ];

  const [value, onChangeText] = React.useState("Useless Multiline Placeholder");
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={{ fontWeight: "bold" }}>
            {currentDiagnos.map((doctor) => doctor.specialization)}
          </Text>
        </View>

        {/* Diagons Section */}
        <View style={styles.doctorSection}>
          <ScrollView vertical={true} style={styles.cardScroll}>
            {currentDiagnos.map((doctor) => (
              <TouchableOpacity key={doctor.id} style={styles.DiagnosCard}>
                <Image source={doctor.image} style={styles.doctorImage} />

                <View style={styles.doctorInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  ></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#777777", fontSize: 12 }}>
                      {doctor.time} - {doctor.date}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            <Text style={{ color: "#FD9B63", marginLeft: 25 }}>
              Doctor Notes
            </Text>

            <TextInput
              backgroundColor="white"
              multiline
              editable
              textAlignVertical="top"
              onChangeText={(text) => onChangeText(text)}
              value={value}
              style={{
                padding: 10,
                width: "90%",
                margin: "auto",
                height: 250,
                borderStyle: "dashed",
                borderColor: "#16423C",
                borderWidth: 2.5,
                borderRadius: 12,
              }}
            />
          </ScrollView>
        </View>

        {/*Attachments Section */}
        <View style={styles.doctorSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitle}>
              Attachments ({attachments.length})
            </Text>
          </View>
          <ScrollView vertical={true} style={styles.cardScroll}>
            {attachments.map((a) => (
              <TouchableOpacity key={a.id} style={styles.AttechmentCard}>
                <Image source={a.image} style={styles.attechmentImage} />
                <View style={styles.doctorInfo}>
                  <Text style={{ fontSize: 14, marginTop: 30 }}>
                    prescription
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#777777", fontSize: 12 }}>
                      {a.prescriptionName}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("#")}>
                      <Text style={{ fontSize: 20 }}> {">"} </Text>
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      color: "#777777",
                      fontSize: 12,
                      paddingBottom: 10,
                    }}
                  >
                    {a.time}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Diagnos;
