import { styles } from "./style";
import React, { useState, useEffect } from "react";
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
import DropDownPicker from "react-native-dropdown-picker";
import AppInput from "../../components/AppInput";

const ViewScreen = ({ props, navigation }) => {
  const [activeIcon, setActiveIcon] = useState(null); // State to track active icon
  const [filteredRecords, setFilteredRecords] = useState([]); // State to hold filtered records

  const handlePress = (iconName) => {
    setActiveIcon(iconName); // Update the active icon
  };

  const AllRecords = [
    {
      id: 1,
      name: "Family Hestory",
      info: "Genatics &\nGenatics Diseases",
      genatics: ["Heart Disease"],
      genaticsDiseases: ["Diabets"],
      icon: require("../../assets/images/family-history.png"),
    },
  ];

  return (
    <View style={{ flexDirection: "column", height: "100%", width: "100%" }}>
      {AllRecords.map((doctor) => (
        <ScrollView style={styles.container}>
          {/* Header */}
          <Header
            marginTop={50}
            header={doctor.name}
            onPress={() => navigation.navigate("Home")}
          />

          {/* View Section */}

          <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
            <ScrollView vertical={true} style={styles.cardScroll}>
              <TouchableOpacity key={doctor.id} style={{}}>
                <View style={{ flexDirection: "column" }}>
                  <View
                    style={{
                      backgroundColor: "#6A9C89",
                      padding: 10,
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        color: "#FD9B63",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      Genatics:
                    </Text>
                    <TextInput
                      style={{
                        color: "#000",
                        backgroundColor: "#fff",
                        width: "100%",
                        borderRadius: 12,
                        padding: 12,
                      }}
                    >
                      {doctor.genatics}
                    </TextInput>
                  </View>
                </View>
                <View style={{ flexDirection: "column", marginTop: 20 }}>
                  <View
                    style={{
                      backgroundColor: "#6A9C89",
                      padding: 10,
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        color: "#FD9B63",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      Genatics Diseases:
                    </Text>
                    <TextInput
                      style={{
                        color: "#000",
                        backgroundColor: "#fff",
                        width: "100%",
                        borderRadius: 12,
                        padding: 12,
                      }}
                    >
                      {doctor.genaticsDiseases}
                    </TextInput>
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
      ))}
    </View>
  );
};

export default ViewScreen;
