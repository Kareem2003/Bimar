import { styles } from "./style";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import Logic from "./logic";
import { BASE_URL } from "../../helpers/constants/config";

const Doctors = ({ navigation }) => {
  const { state, filterDoctors, searchDoctors } = Logic(navigation);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showFieldModal, setShowFieldModal] = useState(false);

  const cities = [
    "All",
    ...new Set(
      state.doctors
        .map((doctor) => doctor.clinic?.[0]?.clinicArea)
        .filter(Boolean)
    ),
  ];
  const fields = [
    "All",
    ...new Set(state.doctors.map((doctor) => doctor.field).filter(Boolean)),
  ];

  const handleFilterSelect = (value, type) => {
    if (value === "All") {
      if (type === "city") {
        filterDoctors("", state.selectedField);
      } else {
        filterDoctors(state.selectedCity, "");
      }
    } else {
      if (type === "city") {
        filterDoctors(value, state.selectedField);
      } else {
        filterDoctors(state.selectedCity, value);
      }
    }
  };

  const handleSearch = (text) => {
    searchDoctors(text);
  };

  const renderFilterModal = (
    items,
    isVisible,
    onClose,
    onSelect,
    title,
    type
  ) => (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <ScrollView>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalItem}
                onPress={() => {
                  handleFilterSelect(item, type);
                  onClose();
                }}
              >
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View
        style={[styles.header, { flexDirection: "row", alignItems: "center" }]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{ padding: 10 }}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctors</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBarWrapper}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search doctors, specialties, locations..."
            placeholderTextColor="#999"
            onChangeText={handleSearch}
            value={state.searchQuery}
          />
          <Icon name="search" size={20} color="#FD9B63" />
        </View>
      </View>

      {/* Filter Options */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowCityModal(true)}
        >
          <Text style={styles.filterButtonText}>
            {state.selectedCity || "City"}
          </Text>
          <Icon name="chevron-down" size={20} color="#FD9B63" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFieldModal(true)}
        >
          <Text style={styles.filterButtonText}>
            {state.selectedField || "Field"}
          </Text>
          <Icon name="chevron-down" size={20} color="#FD9B63" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterIconButton}
          onPress={() => filterDoctors("", "")}
        >
          <Icon name="funnel" size={20} color="#FD9B63" />
        </TouchableOpacity>
      </View>

      {renderFilterModal(
        cities,
        showCityModal,
        () => setShowCityModal(false),
        (city) => filterDoctors(city, state.selectedField),
        "Select City",
        "city"
      )}

      {renderFilterModal(
        fields,
        showFieldModal,
        () => setShowFieldModal(false),
        (field) => filterDoctors(state.selectedCity, field),
        "Select Field",
        "field"
      )}

      {/* Doctors List */}
      <ScrollView style={styles.doctorsList}>
        {state.loading ? (
          <ActivityIndicator size="large" color="#FD9B63" />
        ) : state.error ? (
          <Text style={styles.errorText}>{state.error}</Text>
        ) : (
          (state.filteredDoctors.length > 0
            ? state.filteredDoctors
            : state.doctors
          ).map((doctor) => (
            <TouchableOpacity
              key={doctor._id || doctor.id}
              style={styles.doctorCard}
              onPress={() => navigation.navigate("DoctorProfile", { doctor })}
            >
              <Image
                source={
                  doctor.doctorImage && doctor.doctorImage !== "null"
                    ? { uri: `${BASE_URL}/${doctor.doctorImage}` }
                    : require("../../assets/images/portrait-hansome-young-male-doctor-man.png")
                }
                style={styles.doctorImage}
              />
              <View style={styles.doctorInfo}>
                <Text style={styles.serviceTitle}>
                  {doctor.doctorName || "Dr. Unknown"}
                </Text>
                <Text style={styles.specialization}>
                  {doctor.field || "General"}
                </Text>
                <Text style={styles.location}>
                  {doctor.clinic && doctor.clinic.length > 0
                    ? doctor.clinic[0].clinicArea
                    : "Clinic Area Not Available"}
                </Text>
                <Text style={styles.location}>
                  {doctor.yearsOfExprience || "General"} Years Of Experience
                </Text>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingScore}>
                  4.5 <Icon name="star" size={16} color="#FD9B63" />
                </Text>
                <Text style={styles.reviewCount}>100 Reviews</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Doctors;
