import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./style";
import Logic from "./logic";
import AppButton from "../../components/AppButton";

const DoctorProfile = ({ navigation, route }) => {
  const doctor = route.params.doctor;
  const { state, sendSelectedDateToDB } = Logic(navigation); // Get function from Logic
  const [selectedDate, setSelectedDate] = useState(null); // Fix useState

  const handleDateSelection = (date) => {
    setSelectedDate(date); // Store the formatted date in YYYY-MM-DD format
    console.log("Selected Date: ", date);
  };


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
        <Text style={styles.headerTitle}>Doctor Profile</Text>
      </View>

      {/* Doctor Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={
            doctor.doctorImage && doctor.doctorImage !== "null"
              ? { uri: doctor.doctorImage }
              : require("../../assets/images/WhatsApp Image 2023-07-23 at 15.23.54.jpg")
          }
          style={styles.profileImage}
        />
        <Text style={styles.doctorName}>
          {doctor.doctorName || "Dr. Unknown"}
        </Text>
        <Text style={styles.specialization}>{doctor.field || "General"}</Text>

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Icon name="star" size={16} color="#FD9B63" />
          <Text style={styles.ratingText}>4.5</Text>
          <Text style={styles.reviewCount}>100 Reviews</Text>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Doctor</Text>
        <Text style={styles.aboutText}>
          {doctor.doctorName ? `Dr. ${doctor.doctorName}` : "The doctor"} is a
          top specialist at{" "}
          {doctor.clinic?.[0]?.clinicName || "London Bridge Hospital"}. He has
          achieved several awards and recognition
        </Text>
      </View>

      {/* Working Time Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Working Time</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {doctor.clinic?.[0]?.clinicWorkDays?.map((workDay, index) => {
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
                  selectedDate === formattedDate && styles.activeWorkDayCard,
                ]}
              >
                <Text style={styles.workDayText}>{workDay.day}</Text>
                <Text style={styles.workHoursText}>{workDay.workingHours}</Text>
                <Text style={styles.dateText}>{formattedDate}</Text>
                {/* Display actual date */}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Book Now Button */}
      <AppButton
        title="BOOK NOW"
        buttonStyle={styles.bookButton}
        textStyle={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}
        onPress={() => {
          if (!selectedDate) {
            alert("Please select a date first!");
            return;
          }
          sendSelectedDateToDB(doctor._id, doctor.clinic[0]._id, selectedDate);

          navigation.navigate("BookDate", { doctor, selectedDate });
        }}
      />
    </ScrollView>
  );
};

export default DoctorProfile;
