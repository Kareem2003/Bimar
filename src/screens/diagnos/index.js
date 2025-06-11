import { styles } from "./style";
import React, { useState, useRef, useEffect } from "react";
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
  PanResponder,
  RefreshControl,
  Linking
} from "react-native";
import { Button } from "react-native-paper";
import AppButton from "../../components/AppButton";
import AuthTitles from "../../components/AuthTitles";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTHENTICATION_TOKEN, USERINFO } from "../../helpers/constants/staticKeys";
import axios from "axios";
import { BASE_URL } from "../../helpers/constants/config";

// Set up axios with your base URL
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const Diagnos = ({ navigation, route }) => {
  const diagnosis = route.params?.diagnosis;
  const diagnosisId = route.params?.diagnosisId;
  
  // Add state for modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedImageData, setSelectedImageData] = useState(null);
  const [scale, setScale] = useState(1);
  const [currentDiagnosis, setCurrentDiagnosis] = useState(diagnosis);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const lastScale = useRef(1);
  const lastDistance = useRef(0);

  // Separate function to fetch diagnosis data without hooks
  const fetchDiagnosisData = async () => {
    if (!diagnosisId) return null;
    
    try {
      const token = await AsyncStorage.getItem(AUTHENTICATION_TOKEN);
      const userInfo = await AsyncStorage.getItem(USERINFO);
      const user = userInfo ? JSON.parse(userInfo) : null;

      if (!token || !user) {
        navigation.navigate("Login");
        return null;
      }

      const userId = user.id || user._id;
      if (!userId) {
        throw new Error('User ID not found in stored user info');
      }

      const response = await api.get(`/Diagnosis/patient/${userId}/diagnosis/${diagnosisId}`);
      console.log("API Response:", response.data);

      if (!response.data || !response.data.data) {
        throw new Error('Invalid response format');
      }

      const diagnosisData = response.data.data;

      // Process attachments from X-rays and Lab Results
      const attachments = [];
      
      // Add X-rays as attachments
      if (diagnosisData.Xray && Array.isArray(diagnosisData.Xray)) {
        console.log("Processing X-rays:", diagnosisData.Xray);
        diagnosisData.Xray.forEach((xray, index) => {
          // Handle both object format and file path string format
          const isFilePath = typeof xray === 'string';
          const xrayData = isFilePath ? { filePath: xray } : xray;
          
          // Convert backslashes to forward slashes for URL construction
          const filePath = isFilePath ? xray.replace(/\\/g, '/') : null;
          const imageUri = isFilePath ? { uri: `${BASE_URL}/${filePath}` } : null;
          
          console.log(`X-ray ${index}:`, { isFilePath, filePath, imageUri });
          
          attachments.push({
            id: `xray-${xrayData.id || index}`,
            type: "X-ray",
            image: require("../../assets/images/Xray.png"),
            imageSource: xrayData.image ? { uri: xrayData.image } : (isFilePath ? { uri: `${BASE_URL}/${filePath}` } : null),
            prescriptionName: `X-ray ${index + 1}`,
            time: new Date(xrayData.date || diagnosisData.date).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            }),
            rawData: xrayData
          });
        });
      }

      // Add Lab Results as attachments
      if (diagnosisData.labResults && Array.isArray(diagnosisData.labResults)) {
        console.log("Processing Lab Results:", diagnosisData.labResults);
        diagnosisData.labResults.forEach((labResult, index) => {
          // Handle both object format and file path string format
          const isFilePath = typeof labResult === 'string';
          const labData = isFilePath ? { filePath: labResult } : labResult;
          
          // Convert backslashes to forward slashes for URL construction
          const filePath = isFilePath ? labResult.replace(/\\/g, '/') : null;
          const imageUri = isFilePath ? { uri: `${BASE_URL}/${filePath}` } : null;
          
          // Determine if the lab result is a PDF based on file extension or type
          const isPdf = filePath?.toLowerCase().endsWith('.pdf') || labData.type === 'application/pdf';
          
          console.log(`Lab Result ${index}:`, { isFilePath, filePath, imageUri, type: "Lab Results", isPdf });
          
          attachments.push({
            id: `lab-${labData.id || index}`,
            type: "Lab Results",
            image: require("../../assets/images/microscope.png"),
            imageSource: labData.image ? { uri: labData.image } : (isFilePath ? { uri: `${BASE_URL}/${filePath}` } : null),
            prescriptionName: `Lab Result ${index + 1}`,
            time: new Date(labData.date || diagnosisData.date).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            }),
            rawData: labData,
            isPdf: isPdf,
            fileUrl: isFilePath ? `${BASE_URL}/${filePath}` : null
          });
        });
      }

      // Add Prescription as attachment if it exists
      if (diagnosisData.prescription) {
        console.log("Processing Prescription:", diagnosisData.prescription);
        attachments.push({
          id: "prescription-1",
          type: "Prescription",
          image: require("../../assets/images/pdf.png"),
          prescriptionName: "Prescription",
          time: new Date(diagnosisData.date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }),
          rawData: diagnosisData.prescription,
          isPdf: true,
          fileUrl: diagnosisData.prescription?.url || null
        });
      }

      // Process the diagnosis details
      const processedDiagnosis = {
        id: diagnosisData.id || diagnosisData._id,
        doctorId: diagnosisData.doctorId,
        doctorName: diagnosisData.doctorName,
        specialization: diagnosisData.specialization,
        displayDate: diagnosisData.displayDate || new Date(diagnosisData.date).toLocaleDateString(),
        date: diagnosisData.date,
        time: new Date(diagnosisData.date).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        diagnosis: Array.isArray(diagnosisData.diagnosis) ? diagnosisData.diagnosis[0] : diagnosisData.diagnosis,
        treatmentPlan: diagnosisData.treatmentPlan || '',
        prescription: diagnosisData.prescription,
        prescriptions: diagnosisData.prescription ? [diagnosisData.prescription] : [],
        xrays: diagnosisData.Xray || [],
        labResults: diagnosisData.labResults || [],
        rawXrays: diagnosisData.Xray || [],
        rawLabResults: diagnosisData.labResults || [],
        notes: diagnosisData.notes || [],
        attachments: attachments,
        hasXray: diagnosisData.hasXray,
        hasLabResults: diagnosisData.hasLabResults,
        hasPrescription: diagnosisData.hasPrescription,
        image: diagnosisData.doctorImage || require("../../assets/images/portrait-hansome-young-male-doctor-man.png")
      };

      return processedDiagnosis;
    } catch (error) {
      console.error("Error fetching diagnosis:", error);
      return null;
    }
  };

  // Function to refresh diagnosis data
  const refreshDiagnosisData = async () => {
    if (!diagnosisId) return;
    
    setIsRefreshing(true);
    try {
      const updatedDiagnosis = await fetchDiagnosisData();
      if (updatedDiagnosis) {
        setCurrentDiagnosis(updatedDiagnosis);
      }
    } catch (error) {
      console.error('Error refreshing diagnosis:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Use focus effect to refresh data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      // Refresh data when screen comes into focus
      refreshDiagnosisData();
    }, [diagnosisId])
  );

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

  console.log("Current diagnosis data:", currentDiagnosis);
  console.log("Prescription data:", currentDiagnosis?.prescription);
  console.log("X-ray data:", currentDiagnosis?.rawXrays);
  console.log("Lab results data:", currentDiagnosis?.rawLabResults);
  console.log("Attachments:", currentDiagnosis?.attachments);
  
  // Check if there's valid prescription data
  const hasPrescription = !!(currentDiagnosis?.prescription && 
    typeof currentDiagnosis.prescription === 'object' && 
    Object.keys(currentDiagnosis.prescription).length > 0);
  
  console.log("Has valid prescription data:", hasPrescription);

  if (!currentDiagnosis) {
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
        id: currentDiagnosis.doctorId,
        name: currentDiagnosis.doctorName,
        specialization: currentDiagnosis.specialization,
        image: currentDiagnosis.image
      }
    });
  };

  const handleUpload = () => {
    // Navigate to upload screen with callback to refresh data
    navigation.navigate("UploadFiles", { 
      diagnosisId: currentDiagnosis.id,
      onFilesAdded: refreshDiagnosisData
    });
  };

  const handleChat = () => {
    // Navigate to chat with the doctor
    navigation.navigate("DoctorChat", {
      doctorId: currentDiagnosis.doctorId || currentDiagnosis.id,
      doctorName: currentDiagnosis.doctorName,
      doctorImage: currentDiagnosis.image
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
      
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={{paddingBottom: 120}}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshDiagnosisData}
            colors={['#16423C']}
            tintColor="#16423C"
          />
        }
      >
        {/* Header with back button */}
        <View style={[styles.header, { flexDirection: "row", alignItems: "center" }]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 10 }}
          >
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {currentDiagnosis.diagnosis || "Diagnosis Details"}
          </Text>
          {isRefreshing && (
            <ActivityIndicator size="small" color="#16423C" style={{ marginLeft: 10 }} />
          )}
        </View>

        {/* Doctor Card */}
        <View style={styles.doctorSection}>
          <TouchableOpacity 
            style={styles.DiagnosCard}
            onPress={handleBooking}
          >
            <Image 
              source={currentDiagnosis.image} 
              style={styles.doctorImage}
            />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{currentDiagnosis.doctorName}</Text>
              <Text style={styles.doctorSpecialization}>
                {currentDiagnosis.specialization}
              </Text>
              <Text style={styles.dateTime}>
                {currentDiagnosis.time} - {currentDiagnosis.displayDate}
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
              {currentDiagnosis.treatmentPlan || "No treatment plan available"}
            </Text>
          </ScrollView>
        </View>

        {/* Attachments */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Attachments ({currentDiagnosis.attachments?.length || 0})
          </Text>
          {currentDiagnosis.attachments?.map((attachment) => (
            <TouchableOpacity 
              key={attachment.id}
              style={styles.attachmentCard}
              onPress={() => {
                if (attachment.type === "X-ray") {
                  // Open X-ray in modal
                  openImageModal(attachment.imageSource || attachment.image, "X-ray Results", attachment.rawData);
                } else if (attachment.type === "Lab Results") {
                  if (attachment.isPdf && attachment.fileUrl) {
                    // Open PDF lab results externally
                    Linking.openURL(attachment.fileUrl).catch(err => 
                      Alert.alert("Error", "Could not open PDF. Please ensure you have a PDF viewer installed.")
                    );
                  } else {
                    // Open image lab results in modal
                    openImageModal(attachment.imageSource || attachment.image, "Laboratory Test Results", attachment.rawData);
                  }
                } else if (attachment.type === "Prescription") {
                  // For prescriptions, also check for PDF and open externally if fileUrl exists
                  if (attachment.isPdf && attachment.fileUrl) {
                    Linking.openURL(attachment.fileUrl).catch(err => 
                      Alert.alert("Error", "Could not open Prescription PDF. Please ensure you have a PDF viewer installed.")
                    );
                  } else if (hasPrescription) {
                    console.log("Navigating to prescription screen with:", currentDiagnosis.prescription);
                    navigation.navigate("PrescriptionScreen", {
                      prescription: currentDiagnosis.prescription
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
        
      </View>
    </View>
  );
};

export default Diagnos;