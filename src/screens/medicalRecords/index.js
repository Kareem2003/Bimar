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
import ViewScreen from "./viewScreen";

const MedicalRecords = ({ navigation }) => {
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
    {
      id: 2,
      name: "Allergic",
      info: "Peanuts &\nPenicillin",
      allgeric: ["Peanuts", "Penicillin"],
      icon: require("../../assets/images/allgeric-icon.png"),
    },
    {
      id: 3,
      name: "Chronic Medications",
      info: "Metformin &\nLisinopril",
      chronicMedications: ["Metformin", "Lisinopril"],
      icon: require("../../assets/images/chronicMedications.png"),
    },
    {
      id: 4,
      name: "Surgeries",
      info: "Appendectomy",
      surgeries: ["Appendectomy"],
      icon: require("../../assets/images/surgeries.png"),
    },
    {
      id: 5,
      name: "Chronic Diseases",
      info: "Diabetes &\nHypertension",
      chronicDiseases: ["Diabetes", "Hypertension"],
      icon: require("../../assets/images/Chronic-Diseases.png"),
    },
    {
      id: 6,
      name: "Vaccinations",
      info: "COVID-19 &\nHepatitis B",
      vaccinations: ["COVID-19", "Hepatitis B"],
      icon: require("../../assets/images/Vaccinations.png"),
    },

    // {
    //   id: 3,
    //   name: "DR. Amr",
    //   specialization: "Cardiologist",
    //   consultation: "Circulatory Problems",
    //   image: require("../../assets/images/portrait-hansome-young-male-doctor-man.png"),
    //   review: 55,
    //   rate: 4.5,
    //   time: "9:00 AM",
    //   date: "11 jun 2023",
    // },
    // {
    //   id: 4,
    //   name: "DR. Sara",
    //   specialization: "Dermatologist",
    //   consultation: "Skin Allergy",
    //   image: require("../../assets/images/woman-doctor-wearing-lab-coat-with-stethoscope-isolated.png"),
    //   review: 80,
    //   rate: 4.0,
    //   time: "11:00 AM",
    //   date: "8 jun 2022",
    // },
  ];

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("All Records");
  const [items, setItems] = useState([
    { label: "All Records", value: "All Records" },
    { label: "Latest", value: "Latest" },
    { label: "2024", value: "2024" },
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" },
    { label: "2021", value: "2021" },
    { label: "2020", value: "2020" },
  ]);

  useEffect(() => {
    filterRecords(value);
  }, [value]);

  const filterRecords = (selectedValue) => {
    let filtered = AllRecords;

    // Filter by year if a specific year is selected
    if (
      selectedValue &&
      selectedValue !== "All Records" &&
      selectedValue !== "Latest"
    ) {
      filtered = AllRecords.filter((record) =>
        record.date.includes(selectedValue)
      );
    }

    // Sort by date and time
    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`); // Combine date and time
      const dateB = new Date(`${b.date} ${b.time}`); // Combine date and time
      return dateB - dateA; // Sort in descending order (latest first)
    });

    setFilteredRecords(filtered);
  };

  return (
    <View style={styles.container}>
      <Header
        marginTop={50}
        header={"Medical Records"}
        onPress={() => navigation.navigate("Home")}
      />
      <ScrollView style={styles.container}>
        {/* Header */}

        {/* medical records Section */}
        <View style={styles.doctorSection}>
          {/* <View style={styles.sectionTitle}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={styles.dropdown}
            />
          </View> */}

          <ScrollView vertical={true} style={styles.cardScroll}>
            {filteredRecords.map((doctor) => (
              <TouchableOpacity key={doctor.id} style={styles.AllRecords}>
                
                <View style={styles.cardHeader}>
                  <Image
                    source={doctor.icon}
                    style={{ marginLeft: 10, width: 25, height: 25 }}
                  />
                  <Text style={{ fontSize: 14, marginLeft: 10, color: "#fff" }}>
                    {doctor.name}
                  </Text>
                </View>

                <View style={styles.doctorInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#000", fontSize: 12 }}>
                      {doctor.info}
                    </Text>
                    <Text style={styles.doctorName}>{"view"}</Text>
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

export default MedicalRecords;
