import { styles } from "./style";
import React, { useState, useRef } from "react";
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
  Alert,
  Modal,
  Dimensions,
  PanResponder
} from "react-native";
import { Button } from "react-native-paper";
import AppButton from "../../components/AppButton";
import AuthTitles from "../../components/AuthTitles";
import Logic from "./logic";

const Diagnos = ({ navigation, route }) => {
  const diagnosis = route.params?.diagnosis;
  
  // Add state for modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedImageData, setSelectedImageData] = useState(null);
  const [scale, setScale] = useState(1);
  const lastScale = useRef(1);
  const lastDistance = useRef(0);

  // Pan responder for zoom functionality
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        // Handle pinch-to-zoom
        if (event.nativeEvent.touches.length === 2) {
          const touch1 = event.nativeEvent.touches[0];
          const touch2 = event.nativeEvent.touches[1];
          
          if (touch1 && touch2) {
            const dx = touch1.pageX - touch2.pageX;
            const dy = touch1.pageY - touch2.pageY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (lastDistance.current === 0) {
              lastDistance.current = distance;
              return;
            }
            
            const newScale = lastScale.current * (distance / lastDistance.current);
            // Limit zoom range
            if (newScale >= 0.5 && newScale <= 3) {
              setScale(newScale);
            }
          }
        }
      },
      onPanResponderEnd: () => {
        lastScale.current = scale;
        lastDistance.current = 0;
      }
    })
  ).current;

  console.log("Diagnosis data:", diagnosis);
  console.log("Prescription data:", diagnosis?.prescription);
  console.log("X-ray data:", diagnosis?.rawXrays);
  console.log("Lab results data:", diagnosis?.rawLabResults);
  console.log("Attachments:", diagnosis?.attachments);
  
  // Check if there's valid prescription data
  const hasPrescription = !!(diagnosis?.prescription && 
    typeof diagnosis.prescription === 'object' && 
    Object.keys(diagnosis.prescription).length > 0);
  
  console.log("Has valid prescription data:", hasPrescription);

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
  
  // Handle opening image in modal
  const openImageModal = (image, title, rawData) => {
    console.log("Opening image modal with:", { image, title, rawData });
    setSelectedImage(image);
    setSelectedTitle(title);
    setSelectedImageData(rawData);
    setScale(1); // Reset scale when opening new image
    lastScale.current = 1;
    lastDistance.current = 0;
    setModalVisible(true);
  };

  // Reset zoom when closing the modal
  const closeModal = () => {
    setModalVisible(false);
    setScale(1);
    lastScale.current = 1;
    lastDistance.current = 0;
  };

  return (
    <View style={styles.container}>
      {/* Image View Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.imageModalContainer}>
            <View style={styles.imageModalHeader}>
              <Text style={styles.imageModalTitle}>{selectedTitle}</Text>
              <TouchableOpacity 
                onPress={closeModal}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            {/* Display additional details if available */}
            {selectedImageData && (
              <View style={styles.imageDetailsContainer}>
                {selectedImageData.description && (
                  <Text style={styles.imageDetailText}>
                    <Text style={styles.detailLabel}>Description: </Text>
                    {selectedImageData.description}
                  </Text>
                )}
                {selectedImageData.date && (
                  <Text style={styles.imageDetailText}>
                    <Text style={styles.detailLabel}>Date: </Text>
                    {new Date(selectedImageData.date).toLocaleDateString()}
                  </Text>
                )}
                {selectedImageData.doctor && (
                  <Text style={styles.imageDetailText}>
                    <Text style={styles.detailLabel}>Doctor: </Text>
                    {selectedImageData.doctor}
                  </Text>
                )}
              </View>
            )}
            
            <View style={styles.imageContainer} {...panResponder.panHandlers}>
              {selectedImage && (
                <Image 
                  source={selectedImage} 
                  style={[
                    styles.modalImage,
                    { transform: [{ scale: scale }] }
                  ]}
                  resizeMode="contain"
                  onError={(e) => {
                    console.log("Error loading image:", e.nativeEvent.error);
                    Alert.alert(
                      "Image Error",
                      "Could not load the image. The image URL might be invalid or the image might not exist anymore."
                    );
                  }}
                />
              )}
              <View style={styles.zoomInstructions}>
                <Text style={styles.zoomText}>
                  Pinch with two fingers to zoom in/out
                </Text>
              </View>
            </View>
            {/* Zoom controls */}
            <View style={styles.zoomControls}>
              <TouchableOpacity 
                style={styles.zoomButton}
                onPress={() => {
                  const newScale = Math.max(0.5, scale - 0.2);
                  setScale(newScale);
                  lastScale.current = newScale;
                }}
              >
                <Icon name="remove-outline" size={24} color="#16423C" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.zoomButton}
                onPress={() => {
                  const newScale = Math.min(3, scale + 0.2);
                  setScale(newScale);
                  lastScale.current = newScale;
                }}
              >
                <Icon name="add-outline" size={24} color="#16423C" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
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
              onPress={() => {
                if (attachment.type === "X-ray") {
                  // Open X-ray in modal instead of navigating
                  openImageModal(attachment.imageSource || attachment.image, "X-ray Results", attachment.rawData);
                } else if (attachment.type === "Lab Results") {
                  // Open lab results in modal instead of navigating
                  openImageModal(attachment.imageSource || attachment.image, "Laboratory Test Results", attachment.rawData);
                } else if (attachment.type === "Prescription") {
                  // Use our hasPrescription check to determine what to do
                  if (hasPrescription) {
                    console.log("Navigating to prescription screen with:", diagnosis.prescription);
                    navigation.navigate("PrescriptionScreen", {
                      prescription: diagnosis.prescription
                    });
                  } else {
                    // Alert user that no prescription data exists
                    Alert.alert(
                      "No Prescription Data",
                      "No prescription has been issued for this diagnosis yet.",
                      [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                      ]
                    );
                  }
                } else {
                  navigation.navigate("PrescriptionScreen", { 
                    title: attachment.type,
                    time: attachment.time,
                    attachmentId: attachment.id 
                  });
                }
              }}
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