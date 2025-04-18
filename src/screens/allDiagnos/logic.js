import { useEffect, useReducer } from "react";
import { reducer } from "../../reducers/reducer";
import ACTION_TYPES from "../../reducers/actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { INITIAL_STATE } from "./constant";
import { NetInfo } from "react-native";
import {
  AUTHENTICATION_TOKEN,
  USERINFO,
} from "../../helpers/constants/staticKeys";
import { ToastManager } from "../../helpers/ToastManager";
import { BASE_URL } from "../../helpers/constants/config";
import { $securedAxios } from "../../service/axios";

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const navigateToDiagnosis = async (diagnosis) => {
    try {
      // Get the userId from AsyncStorage
      const userInfo = await AsyncStorage.getItem(USERINFO);
      const user = userInfo ? JSON.parse(userInfo) : null;
      const userId = user?.id || user?._id;
      
      if (!userId) {
        console.error("No user ID found, cannot fetch prescription data");
        // Fall back to basic navigation without prescription data
        navigateWithBasicData(diagnosis);
        return;
      }

      // Get the auth token
      const token = await AsyncStorage.getItem(AUTHENTICATION_TOKEN);
      if (!token) {
        console.error("No auth token found, cannot fetch prescription data");
        navigateWithBasicData(diagnosis);
        return;
      }

      console.log("Fetching diagnosis details...");

     
      
      // Give a short delay to ensure token is applied
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Use the app's axios instance to fetch the data
      const response = await $securedAxios.get(`/Diagnosis/patient/${userId}/diagnosis/${diagnosis.id}`);
      const fullDiagnosisData = response.data.data || response.data;

      // Create attachments array with actual image URLs from database
      const attachments = [];
      
      // Add X-ray attachments if they exist
      if (Array.isArray(fullDiagnosisData.Xray) && fullDiagnosisData.Xray.length > 0) {
        fullDiagnosisData.Xray.forEach((xray, index) => {
          console.log("Processing X-ray:", xray);
          
          // Extract image path for the actual image data
          let imageData = xray;
          
          if (typeof xray === 'string') {
            imageData = xray;
          } else if (xray.image || xray.path || xray.url || xray.src) {
            imageData = xray.image || xray.path || xray.url || xray.src;
          }
          
          attachments.push({
            id: `xray-${index}`,
            type: 'X-ray',
            prescriptionName: 'X-ray Results',
            time: new Date(fullDiagnosisData.date).toLocaleTimeString(),
            // Use static icon for attachment list
            image: require("../../assets/images/Xray.png"),
            // Store the actual image source for viewing in modal
            imageSource: getImageSource(imageData),
            // Store the actual data for displaying in modal
            rawData: xray
          });
        });
      }
      
      // Add lab results attachments if they exist
      if (Array.isArray(fullDiagnosisData.labResults) && fullDiagnosisData.labResults.length > 0) {
        fullDiagnosisData.labResults.forEach((labResult, index) => {
          console.log("Processing Lab Result:", labResult);
          
          // Extract image path for the actual image data
          let imageData = labResult;
          
          if (typeof labResult === 'string') {
            imageData = labResult;
          } else if (labResult.image || labResult.path || labResult.url || labResult.src) {
            imageData = labResult.image || labResult.path || labResult.url || labResult.src;
          }
          
          attachments.push({
            id: `lab-${index}`,
            type: 'Lab Results',
            prescriptionName: 'Laboratory Test Results',
            time: new Date(fullDiagnosisData.date).toLocaleTimeString(),
            // Use static icon for attachment list
            image: require("../../assets/images/microscope.png"),
            // Store the actual image source for viewing in modal
            imageSource: getImageSource(imageData),
            // Store the actual data for displaying in modal
            rawData: labResult
          });
        });
      }
      
      // Add prescription attachment if it exists
      if (fullDiagnosisData.prescription && Object.keys(fullDiagnosisData.prescription).length > 0) {
        attachments.push({
          id: 'prescription-1',
          type: 'Prescription',
          prescriptionName: 'Medical Prescription',
          time: new Date(fullDiagnosisData.date).toLocaleTimeString(),
          image: require("../../assets/images/pdf.png")
        });
      }

      // Navigate with all the data
      navigation.navigate("Diagnos", {
        diagnosisId: diagnosis.id,
        diagnosis: {
          ...diagnosis,
          prescription: fullDiagnosisData.prescription || {},
          specialization: diagnosis.specialization || 'General Practice',
          image: `${BASE_URL}/${diagnosis.doctorImage}` || require("../../assets/images/portrait-hansome-young-male-doctor-man.png"),
          time: new Date(diagnosis.date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }),
          attachments: attachments,
          // Include the raw X-ray and labResults data
          rawXrays: fullDiagnosisData.Xray || [],
          rawLabResults: fullDiagnosisData.labResults || []
        }
      });
    } catch (error) {
      console.error("Error fetching full diagnosis:", error);
      // Fallback to basic navigation without prescription data
      navigateWithBasicData(diagnosis);
    }
  };

  // Helper function for basic navigation without prescription data
  const navigateWithBasicData = (diagnosis) => {
    console.log("Using basic navigation with diagnosis:", diagnosis);
    // Create basic attachments with placeholders
    const attachments = [];
    
    // Add X-ray if diagnosis says it has it
    if (diagnosis.hasXray) {
      // Try to extract X-ray data if it exists
      const xrayData = diagnosis.Xray || [];
      console.log("X-ray data:", xrayData);
      
      if (Array.isArray(xrayData) && xrayData.length > 0) {
        // Use actual X-ray data if available
        xrayData.forEach((xray, index) => {
          // Extract image path using the same approach
          let imageData = xray;
          
          if (typeof xray === 'string') {
            imageData = xray;
          } else if (xray.image || xray.path || xray.url || xray.src) {
            imageData = xray.image || xray.path || xray.url || xray.src;
          }
          
          attachments.push({
            id: `xray-${index}`,
            type: 'X-ray',
            prescriptionName: 'X-ray Results',
            time: new Date(diagnosis.date).toLocaleTimeString(),
            // Use static icon for attachment list
            image: require("../../assets/images/Xray.png"),
            // Store the actual image source for the modal
            imageSource: getImageSource(imageData),
            rawData: xray
          });
        });
      } else {
        // Fallback to placeholder
        attachments.push({
          id: 'xray-placeholder',
          type: 'X-ray',
          prescriptionName: 'X-ray Results',
          time: new Date(diagnosis.date).toLocaleTimeString(),
          image: require("../../assets/images/Xray.png"),
          rawData: {
            description: "X-ray image (placeholder)",
            date: diagnosis.date
          }
        });
      }
    }
    
    // Add lab results if diagnosis says it has them
    if (diagnosis.hasLabResults) {
      // Try to extract lab result data if it exists
      const labData = diagnosis.labResults || [];
      console.log("Lab result data:", labData);
      
      if (Array.isArray(labData) && labData.length > 0) {
        // Use actual lab data if available
        labData.forEach((lab, index) => {
          // Extract image path using the same approach
          let imageData = lab;
          
          if (typeof lab === 'string') {
            imageData = lab;
          } else if (lab.image || lab.path || lab.url || lab.src) {
            imageData = lab.image || lab.path || lab.url || lab.src;
          }
          
          attachments.push({
            id: `lab-${index}`,
            type: 'Lab Results',
            prescriptionName: 'Laboratory Test Results',
            time: new Date(diagnosis.date).toLocaleTimeString(),
            // Use static icon for attachment list
            image: require("../../assets/images/microscope.png"),
            // Store the actual image source for the modal
            imageSource: getImageSource(imageData),
            rawData: lab
          });
        });
      } else {
        // Fallback to placeholder
        attachments.push({
          id: 'lab-placeholder',
          type: 'Lab Results',
          prescriptionName: 'Laboratory Test Results',
          time: new Date(diagnosis.date).toLocaleTimeString(),
          image: require("../../assets/images/microscope.png"),
          rawData: {
            description: "Laboratory test results (placeholder)",
            date: diagnosis.date
          }
        });
      }
    }
    
    // Add prescription if diagnosis says it has it
    if (diagnosis.hasPrescription) {
      attachments.push({
        id: 'prescription-placeholder',
        type: 'Prescription',
        prescriptionName: 'Medical Prescription',
        time: new Date(diagnosis.date).toLocaleTimeString(),
        image: require("../../assets/images/pdf.png")
      });
    }
    
    navigation.navigate("Diagnos", {
      diagnosisId: diagnosis.id,
      diagnosis: {
        ...diagnosis,
        specialization: diagnosis.specialization || 'General Practice',
        image: `${BASE_URL}/${diagnosis.doctorImage}` || require("../../assets/images/portrait-hansome-young-male-doctor-man.png"),
        time: new Date(diagnosis.date).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        attachments: attachments,
        // Include raw data if available
        rawXrays: diagnosis.Xray || [],
        rawLabResults: diagnosis.labResults || []
      }
    });
  };

  const navigateToChat = (diagnosis) => {
    navigation.navigate("DoctorChat", {
      doctorId: diagnosis.doctorId,
      doctorName: diagnosis.doctorName,
      doctorImage: diagnosis.doctorImage,
    });
  };

  const checkNetwork = async () => {
    const isConnected = await NetInfo.fetch();
    if (!isConnected) {
      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: "error",
          value: "No internet connection",
        },
      ]);
    }
  };

  useEffect(() => {
    checkNetwork();
  }, []);




  const fetchAllDiagnoses = async () => {
    try {
      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: "loading",
          value: true,
        },
      ]);

      // Fetch the data
      const response = await $securedAxios.get('/Diagnosis');
      if (!response.data) {
        throw new Error('No data received from server');
      }

      const diagnosesArray = response.data.Diagnosis || response.data || [];
      console.log("Diagnoses array:", diagnosesArray);

      const allDiagnoses = diagnosesArray.map((diagnosis) => ({
        id: diagnosis._id || diagnosis.id,
        doctorName: diagnosis.doctorName?.trim() || 'Unknown Doctor',
        date: diagnosis.date,
        displayDate: new Date(diagnosis.date).toLocaleDateString(),
        diagnosis: diagnosis.diagnosis?.[0] || 'General Consultation',
        hasXray: Array.isArray(diagnosis.Xray) && diagnosis.Xray.length > 0,
        hasLabResults: Array.isArray(diagnosis.labResults) && diagnosis.labResults.length > 0,
        hasPrescription: !!diagnosis.prescription,
        treatmentPlan: diagnosis.treatmentPlan || ''
      }));

      console.log("Processed diagnoses:", allDiagnoses);

      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
      
      console.log("Current date:", now);
      console.log("Thirty days ago:", thirtyDaysAgo);

      const recentDiagnoses = allDiagnoses.filter((diagnosis) => {
        const diagnosisDate = new Date(diagnosis.date);
        return diagnosisDate >= thirtyDaysAgo && diagnosisDate <= now;
      });

      const pastDiagnoses = allDiagnoses.filter((diagnosis) => {
        const diagnosisDate = new Date(diagnosis.date);
        return diagnosisDate < thirtyDaysAgo;
      });

      console.log("Recent diagnoses count:", recentDiagnoses.length);
      console.log("Past diagnoses count:", pastDiagnoses.length);

      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: "upcomingAppointments",
          value: recentDiagnoses,
        },
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: "pastAppointments",
          value: pastDiagnoses,
        },
      ]);
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        stack: error.stack
      });

      // For network errors, try a basic setup of empty data
      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: "error",
          value: "Could not load diagnoses. Please try again.",
        },
      ]);
    } finally {
      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: "loading",
          value: false,
        },
      ]);
    }
  };

  // Helper function to extract image source from different possible formats in database
  const getImageSource = (item) => {
    console.log("Checking image source for item:", item);
    
    // Handle the case where the item itself is the image path string
    if (typeof item === 'string') {
      console.log("Item is a string path, using with BASE_URL");
      return { uri: `${BASE_URL}/${item}` };
    }
    
    // Check if the item has the image path stored directly
    if (item.image && typeof item.image === 'string') {
      console.log("Using image property with BASE_URL");
      return { uri: `${BASE_URL}/${item.image}` };
    }
    
    // Check for common image path properties
    for (const prop of ['path', 'imagePath', 'url', 'src', 'imageUrl', 'imageURL']) {
      if (item[prop] && typeof item[prop] === 'string') {
        console.log(`Using ${prop} property with BASE_URL`);
        // Don't double-prefix URLs that already have http
        if (item[prop].startsWith('http') || item[prop].startsWith('data:')) {
          return { uri: item[prop] };
        }
        return { uri: `${BASE_URL}/${item[prop]}` };
      }
    }
    
    // Handle object URI format
    if (item.uri || item.URI) {
      const uri = item.uri || item.URI;
      console.log("Using URI property");
      if (uri.startsWith('http') || uri.startsWith('data:')) {
        return { uri };
      }
      return { uri: `${BASE_URL}/${uri}` };
    }
    
    // Check if the item has a base64 encoded image
    if (item.base64 || item.data) {
      const base64Data = item.base64 || item.data;
      console.log("Using base64 data");
      return { uri: `data:image/jpeg;base64,${base64Data}` };
    }
    
    // For Xray and labResults with no explicit image property, the whole object might be the image data
    if (item._id || item.id) {
      const imageId = item._id || item.id;
      console.log("Using item ID as image path with BASE_URL");
      return { uri: `${BASE_URL}/images/${imageId}` };
    }
    
    // Log that we couldn't find an image and using fallback
    console.log("No image found in item, using fallback");
    
    // Fallback to the appropriate placeholder based on the item type
    if (item.type === 'X-ray' || (item.name && item.name.includes('X-ray')) || (item.description && item.description.includes('X-ray'))) {
      return require("../../assets/images/Xray.png");
    } else {
      return require("../../assets/images/microscope.png");
    }
  };


  useEffect(() => {
    fetchAllDiagnoses();
  }, []);
  return {
    state,
    actions: {
      updateState,
      navigateToDiagnosis,
      navigateToChat,

    },
  };
};

export default Logic;
