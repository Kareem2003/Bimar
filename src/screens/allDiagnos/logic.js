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

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const api = axios.create({
    baseURL: "http://192.168.100.14:3000",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const navigateToDiagnosis = (diagnosis) => {
    navigation.navigate("Diagnos", {
      diagnosisId: diagnosis.id,
      diagnosis: {
        ...diagnosis,
        specialization: diagnosis.specialization || 'General Practice',
        image: diagnosis.doctorImage || require("../../assets/images/portrait-hansome-young-male-doctor-man.png"),
        time: new Date(diagnosis.date).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        attachments: [
          ...(diagnosis.hasXray ? [{
            id: 1,
            type: 'X-ray',
            prescriptionName: 'X-ray Results',
            time: new Date(diagnosis.date).toLocaleTimeString(),
            image: require("../../assets/images/Xray.png")
          }] : []),
          ...(diagnosis.hasLabResults ? [{
            id: 2,
            type: 'Lab Results',
            prescriptionName: 'Laboratory Test Results',
            time: new Date(diagnosis.date).toLocaleTimeString(),
            image: require("../../assets/images/microscope.png")
          }] : []),
          ...(diagnosis.hasPrescription ? [{
            id: 3,
            type: 'Prescription',
            prescriptionName: 'Medical Prescription',
            time: new Date(diagnosis.date).toLocaleTimeString(),
            image: require("../../assets/images/pdf.png")
          }] : [])
        ]
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

      const token = await AsyncStorage.getItem(AUTHENTICATION_TOKEN);
      if (!token) {
        console.log("No token found - redirecting to login");
        navigation.navigate("Login");
        return;
      }

      const axiosConfig = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Cookie': `jwt=${token}`
        }
      };

      console.log("Fetching diagnoses...");
      const response = await api.get('/Diagnosis', axiosConfig);
      console.log("Raw API Response:", response.data);

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

      if (error.response?.status === 401) {
        await AsyncStorage.removeItem(AUTHENTICATION_TOKEN);
        await AsyncStorage.removeItem(USERINFO);
        ToastManager.notify("Session expired. Please login again.", {
          type: "warning",
        });
        navigation.replace("Login");
        return;
      }

      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: "error",
          value: error.response?.data?.message || "Failed to fetch diagnoses",
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

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post(
        `${api.defaults.baseURL}/auth/login`,
        credentials
      );
      const { token, user } = response.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userData", JSON.stringify(user));

      navigation.navigate("Home");
    } catch (error) {
      console.error("Login failed:", error);
      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: "error",
          value: error.response?.data?.message || "Login failed",
        },
      ]);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userData");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout failed:", error);
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
      handleLogin,
      handleLogout,
    },
  };
};

export default Logic;
