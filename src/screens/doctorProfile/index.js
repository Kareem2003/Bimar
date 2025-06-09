import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { styles } from "./style";
import Logic from "./logic";
import AppButton from "../../components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USERINFO } from "../../helpers/constants/staticKeys";
import ACTION_TYPES from "../../reducers/actionTypes";
import { BASE_URL } from "../../helpers/constants/config";

const DoctorProfile = ({ navigation, route }) => {
  const { state, updateState, bookDoctorAppointment } = Logic(
    navigation,
    route
  ); // Get function from Logic
  const handleDateSelection = (date) => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "selectedDate",
        value: date,
      },
    ]);
  };

  // const fetchUserInfo = async () => {
  //   try {
  //     const userData = await AsyncStorage.getItem(USERINFO);
  //     if (userData) {
  //       const parsedData = JSON.parse(userData);
  //       setUserInfo(parsedData); // Store user info
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user info:", error);
  //   }
  // };
  // // Fetch user info from AsyncStorage
  // useEffect(() => {
  //   fetchUserInfo();
  // }, []);

  //   console.log("user:", userInfo.id);

  return (
    <ScrollView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Doctor Profile</Text>
        </View>
      </View>
      {/* Doctor Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={
            state.doctor?.doctorImage && state.doctor.doctorImage !== "null"
              ? { uri: `${BASE_URL}/${state.doctor.doctorImage}` }
              : require("../../assets/images/WhatsApp Image 2023-07-23 at 15.23.54.jpg")
          }
          style={styles.profileImage}
        />
        <Text style={styles.doctorName}>
          {state.doctor?.doctorName || "Dr. Unknown"}
        </Text>
        <Text style={styles.specialization}>
          {state.doctor?.field || "General"}
        </Text>
        {state.doctor ? (
          <View style={styles.ratingBadge}>
            <Icon name="star" size={16} color="#FD9B63" />
            <Text style={styles.ratingText}>
              {state.doctor.averageRating ? state.doctor.averageRating.toFixed(1) : "N/A"}
            </Text>
            <Text style={styles.reviewCount}>
              {state.doctor.totalRatings ? `${state.doctor.totalRatings} Reviews` : "No Reviews"}
            </Text>
          </View>
        ) : (
          <Text>Loading doctor information...</Text>
        )}
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Doctor</Text>
        <Text style={styles.aboutText}>
          {state.doctor
            ? `Dr. ${state.doctor.doctorName} is a top specialist at ${
                state.doctor.clinic?.[0]?.clinicName || "London Bridge Hospital"
              }. He has achieved several awards and recognition`
            : "Loading about information..."}
        </Text>
      </View>

      {/* Working Time Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Working Time</Text>
        {state.doctor?.clinic?.map((clinic, clinicIndex) => (
          <View key={clinicIndex}>
            <Text style={styles.clinicName}>{clinic.clinicAddress}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {clinic.clinicWorkDays?.map((workDay, index) => {
                const today = new Date();
                const daysOfWeek = [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ];
                const workDayIndex = daysOfWeek.indexOf(workDay.day);

                // Find the next occurrence of the selected workday
                let actualDate = new Date(today);
                actualDate.setDate(
                  today.getDate() + ((workDayIndex - today.getDay() + 7) % 7)
                );

                // Convert to "YYYY-MM-DD" format
                const formattedDate = actualDate.toISOString().split("T")[0];

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleDateSelection(formattedDate)}
                    style={[
                      styles.workDayCard,
                      state.selectedDate === formattedDate &&
                        styles.activeWorkDayCard,
                    ]}
                  >
                    <Text style={styles.workDayText}>{workDay.day}</Text>
                    <Text style={styles.workHoursText}>
                      {workDay.workingHours}
                    </Text>
                    <Text style={styles.dateText}>{formattedDate}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        ))}
      </View>

      {/* Book Now Button */}
      <AppButton
        title="BOOK NOW"
        buttonStyle={styles.bookButton}
        textStyle={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}
        onPress={() => {
          if (!state.selectedDate) {
            alert("Please select a date first!");
            return;
          }
          bookDoctorAppointment();
        }}
      />
    </ScrollView>
  );
};

export default DoctorProfile;
