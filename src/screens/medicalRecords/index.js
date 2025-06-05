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
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import AppButton from "../../components/AppButton";
import Header from "../../components/Header";
import DropDownPicker from "react-native-dropdown-picker";
import ViewScreen from "./viewScreen";
import Logic from "./logic";
import EditRecordModal from "./editModal";

const MedicalRecords = ({ navigation }) => {
  const { state, actions } = Logic(navigation);
  const { loading, error, medicalRecords, updating, updateSuccess, updateError } = state;

  const [activeIcon, setActiveIcon] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = (iconName) => {
    setActiveIcon(iconName);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await actions.fetchMedicalRecords();
    setRefreshing(false);
  };

  const handleViewPress = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedRecord(null);
    actions.clearUpdateStatus();
  };

  const handleUpdateRecord = (payload) => {
    console.log("Updating record with payload:", payload);
    actions.updateMedicalRecords(payload);
  };

  // Handle update success
  useEffect(() => {
    if (updateSuccess) {
      Alert.alert("Success", "Medical record updated successfully!", [
        {
          text: "OK",
          onPress: () => {
            handleCloseModal();
          },
        },
      ]);
    }
  }, [updateSuccess]);

  // Handle update error
  useEffect(() => {
    if (updateError) {
      Alert.alert("Error", updateError);
    }
  }, [updateError]);

  // Filter records based on dropdown selection
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("All Records");
  const [items, setItems] = useState([
    { label: "All Records", value: "All Records" },
    { label: "Medical History", value: "Medical" },
    { label: "Personal Info", value: "Personal" },
  ]);

  useEffect(() => {
    filterRecords(value);
  }, [value, medicalRecords]);

  const filterRecords = (selectedValue) => {
    let filtered = medicalRecords;

    if (selectedValue === "Medical") {
      filtered = medicalRecords.filter((record) => 
        !record.name.includes("Personal Information")
      );
    } else if (selectedValue === "Personal") {
      filtered = medicalRecords.filter((record) => 
        record.name.includes("Personal Information")
      );
    }

    setFilteredRecords(filtered);
  };

  // Loading state
  if (loading && medicalRecords.length === 0) {
    return (
      <View style={styles.container}>
        <Header
          marginTop={50}
          header={"Medical Records"}
          onPress={() => navigation.navigate("Home")}
        />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#6A9C89" />
          <Text style={{ marginTop: 10, color: "#666" }}>Loading medical records...</Text>
        </View>
      </View>
    );
  }

  // Error state
  if (error && medicalRecords.length === 0) {
    return (
      <View style={styles.container}>
        <Header
          marginTop={50}
          header={"Medical Records"}
          onPress={() => navigation.navigate("Home")}
        />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Icon name="exclamation-triangle" size={50} color="#ff6b6b" />
          <Text style={{ marginTop: 10, color: "#ff6b6b", textAlign: "center", fontSize: 16 }}>
            {error}
          </Text>
          <TouchableOpacity 
            style={{
              marginTop: 20,
              backgroundColor: "#6A9C89",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 5,
            }}
            onPress={() => actions.fetchMedicalRecords()}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Empty state
  if (!loading && medicalRecords.length === 0) {
    return (
      <View style={styles.container}>
        <Header
          marginTop={50}
          header={"Medical Records"}
          onPress={() => navigation.navigate("Home")}
        />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <Icon name="file-text" size={50} color="#ccc" />
          <Text style={{ marginTop: 10, color: "#666", textAlign: "center", fontSize: 16 }}>
            No medical records found
          </Text>
          <Text style={{ marginTop: 5, color: "#999", textAlign: "center", fontSize: 14 }}>
            Your medical records will appear here once available
          </Text>
          <TouchableOpacity 
            style={{
              marginTop: 20,
              backgroundColor: "#6A9C89",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 5,
            }}
            onPress={() => actions.fetchMedicalRecords()}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        marginTop={50}
        header={"Medical Records"}
        onPress={() => navigation.navigate("Home")}
      />
      
      {/* Filter Dropdown - Outside ScrollView */}
      <View style={styles.doctorSection}>
        <View style={styles.sectionTitle}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.dropdown}
            placeholder="Filter records"
          />
        </View>
      </View>

      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* medical records Section */}
        <View style={styles.doctorSection}>
          <View style={styles.cardScroll}>
            {filteredRecords.map((record) => (
              <TouchableOpacity key={record.id} style={styles.AllRecords}>
                <View style={styles.cardHeader}>
                  <Image
                    source={record.icon}
                    style={{ marginLeft: 10, width: 25, height: 25 }}
                  />
                  <Text style={{ fontSize: 14, marginLeft: 10, color: "#fff" }}>
                    {record.name}
                  </Text>
                </View>

                <View style={styles.doctorInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#000", fontSize: 12, flex: 1 }}>
                      {record.info || "No information available"}
                    </Text>
                    <TouchableOpacity onPress={() => handleViewPress(record)}>
                      <Text style={[styles.doctorName, { color: "#6A9C89", fontWeight: "bold" }]}>
                        {"view"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Display error message if there's an error but some records are loaded */}
          {error && medicalRecords.length > 0 && (
            <View style={{ padding: 10, backgroundColor: "#ffe6e6", margin: 10, borderRadius: 5 }}>
              <Text style={{ color: "#cc0000", fontSize: 12 }}>{error}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Edit Record Modal */}
      <EditRecordModal
        visible={modalVisible}
        onClose={handleCloseModal}
        record={selectedRecord}
        onUpdate={handleUpdateRecord}
        loading={updating}
      />
    </View>
  );
};

export default MedicalRecords;
