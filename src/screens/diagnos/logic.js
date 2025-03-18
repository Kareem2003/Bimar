import { useEffect, useReducer } from "react";
import { reducer } from "../../reducers/reducer";
import ACTION_TYPES from "../../reducers/actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { INITIAL_STATE } from "./constant";
import { AUTHENTICATION_TOKEN, USERINFO } from "../../helpers/constants/staticKeys";
import axios from "axios";
import { ToastManager } from "../../helpers/ToastManager";

// Set up axios with your base URL
const api = axios.create({
  // Replace with your actual backend URL
  baseURL: "http://192.168.100.14:3000", // Use your local IP if testing locally
  // or
  // baseURL: 'https://your-production-api.com',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const Logic = (navigation, route) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const diagnosisId = route?.params?.diagnosisId;
  const passedDiagnosis = route?.params?.diagnosis;

  const updateState = (payload) => {
    dispatch({ payload });
  };

  useEffect(() => {
    const fetchDiagnosisDetails = async () => {
      try {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "loading",
            value: true,
          },
        ]);

        const token = await AsyncStorage.getItem(AUTHENTICATION_TOKEN);
        const userInfo = await AsyncStorage.getItem(USERINFO);
        const user = userInfo ? JSON.parse(userInfo) : null;

        if (!token || !user) {
          navigation.navigate("Login");
          return;
        }

        // Debug log to check user info
        console.log("User info:", user);
        console.log("User ID:", user.id || user._id);

        // Make sure we have a valid user ID
        const userId = user.id || user._id;
        if (!userId) {
          throw new Error('User ID not found in stored user info');
        }

        // Set up headers
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        api.defaults.headers.common['Cookie'] = `jwt=${token}`;
        api.defaults.withCredentials = true;

        // Use the correct endpoint format with the full path
        const response = await api.get(`/Diagnosis/patient/${userId}/diagnosis/${diagnosisId}`);
        console.log("API Response:", response.data);

        if (!response.data || !response.data.data) {
          throw new Error('Invalid response format');
        }

        const diagnosisData = response.data.data;

        // Process the diagnosis details
        const processedDiagnosis = {
          id: diagnosisData.id || diagnosisData._id,
          doctorName: diagnosisData.doctorName,
          specialization: diagnosisData.specialization,
          date: diagnosisData.displayDate || new Date(diagnosisData.date).toLocaleDateString(),
          time: new Date(diagnosisData.date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }),
          diagnosis: Array.isArray(diagnosisData.diagnosis) ? diagnosisData.diagnosis[0] : diagnosisData.diagnosis,
          treatmentPlan: diagnosisData.treatmentPlan || '',
          prescriptions: diagnosisData.prescription ? [diagnosisData.prescription] : [],
          xrays: diagnosisData.Xray || [],
          labResults: diagnosisData.labResults || [],
          notes: diagnosisData.notes || [],
          hasXray: diagnosisData.hasXray,
          hasLabResults: diagnosisData.hasLabResults,
          hasPrescription: diagnosisData.hasPrescription
        };

        // Update state with all the details
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "currentDiagnos",
            value: [processedDiagnosis],
          },
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "prescriptionCount",
            value: processedDiagnosis.prescriptions.length,
          },
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "xrayCount",
            value: processedDiagnosis.xrays.length,
          },
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "testingResultCount",
            value: processedDiagnosis.labResults.length,
          },
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "notes",
            value: processedDiagnosis.notes.map(note => ({
              id: `note-${note.id || Math.random()}`,
              text: note.text || ''
            })),
          }
        ]);

      } catch (error) {
        console.error("Error details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          url: error.config?.url,
          headers: error.config?.headers,
          userInfo: await AsyncStorage.getItem(USERINFO) // Add this for debugging
        });
        
        if (error.response?.status === 401) {
          await AsyncStorage.removeItem(AUTHENTICATION_TOKEN);
          await AsyncStorage.removeItem(USERINFO);
          ToastManager.notify(error.response?.data?.message || "Session expired. Please login again.", {
            type: "warning",
          });
          navigation.replace("Login");
          return;
        }

        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "error",
            value: error.response?.data?.error || "Failed to fetch diagnosis details",
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

    if (diagnosisId) {
      fetchDiagnosisDetails();
    } else {
      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: "error",
          value: "No diagnosis ID provided",
        },
      ]);
    }
  }, [diagnosisId]);

  return { state, updateState, actions: { navigateToAttachment } };
};

export default Logic;
