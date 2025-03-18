import { styles } from "./style";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import AppButton from "../../components/AppButton";
import AuthTitles from "../../components/AuthTitles";
import Logic from "./logic";

const Diagnos = ({ navigation, route }) => {
  const diagnosis = route.params?.diagnosis;

  if (!diagnosis) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>No diagnosis data found</Text>
      </View>
    );
  }

  const handleBooking = () => {
    // Navigate to doctor profile for booking
    navigation.navigate("DoctorProfile", { 
      doctor: {
        id: diagnosis.doctorId,
        name: diagnosis.doctorName,
        specialization: diagnosis.specialization,
        image: diagnosis.image
      }
    });
  };

  const handleUpload = () => {
    // Navigate to upload screen
    navigation.navigate("UploadFiles", { diagnosisId: diagnosis.id });
  };

  const handleChat = () => {
    // Navigate to chat with the doctor
    navigation.navigate("DoctorChat", {
      doctorId: diagnosis.doctorId || diagnosis.id,
      doctorName: diagnosis.doctorName,
      doctorImage: diagnosis.image
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{paddingBottom: 120}}>
        {/* Header with back button */}
        <View style={[styles.header, { flexDirection: "row", alignItems: "center" }]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 10 }}
          >
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {diagnosis.diagnosis || "Diagnosis Details"}
          </Text>
        </View>

        {/* Doctor Card */}
        <View style={styles.doctorSection}>
          <TouchableOpacity 
            style={styles.DiagnosCard}
            onPress={handleBooking}
          >
            <Image 
              source={diagnosis.image} 
              style={styles.doctorImage}
            />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{diagnosis.doctorName}</Text>
              <Text style={styles.doctorSpecialization}>
                {diagnosis.specialization}
              </Text>
              <Text style={styles.dateTime}>
                {diagnosis.time} - {diagnosis.displayDate}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Treatment Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Treatment Plan</Text>
          <ScrollView 
            style={styles.notesContainer}
            nestedScrollEnabled={true}
          >
            <Text style={styles.notesText}>
              {diagnosis.treatmentPlan || "No treatment plan available"}
            </Text>
          </ScrollView>
        </View>

        {/* Attachments */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Attachments ({diagnosis.attachments?.length || 0})
          </Text>
          {diagnosis.attachments?.map((attachment) => (
            <TouchableOpacity 
              key={attachment.id}
              style={styles.attachmentCard}
              onPress={() => navigation.navigate(
                attachment.type === "X-ray" ? "XrayScreen" : 
                attachment.type === "Lab Results" ? "TestingResultScreen" : 
                "PrescriptionScreen", 
                { 
                  title: attachment.type,
                  time: attachment.time,
                  attachmentId: attachment.id 
                }
              )}
            >
              <Image 
                source={attachment.image}
                style={styles.attachmentIcon}
              />
              <View style={styles.attachmentInfo}>
                <Text style={styles.attachmentType}>{attachment.type}</Text>
                <Text style={styles.attachmentName}>
                  {attachment.prescriptionName}
                </Text>
                <Text style={styles.attachmentTime}>{attachment.time}</Text>
              </View>
              <Icon name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Add extra padding at bottom for buttons */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Buttons - Side by side */}
      <View style={styles.bottomButtonsRow}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleUpload}
        >
          <Icon name="cloud-upload-outline" size={20} color="#FFF" />
          <Text style={styles.actionButtonText}>Upload Files</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.chatButton]}
          onPress={handleChat}
        >
          <Icon name="chatbox-outline" size={20} color="#FFF" />
          <Text style={styles.actionButtonText}>Go to Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Diagnos;