import { useContext, useEffect, useReducer, useCallback } from "react";
import { reducer } from "../../reducers/reducer";
import { INITIAL_STATE } from "./constant";
import { Context } from "../../contexts/appContext";
import { allRecords, updateRecords } from "../../service/records";
import ACTION_TYPES from "../../reducers/actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USERINFO } from "../../helpers/constants/staticKeys";

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { updateState: updateCtxState } = useContext(Context);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const updateMedicalRecords = useCallback((payload) => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "updating",
        value: true,
      },
    ]);

    updateRecords(
      payload,
      (response) => {
        console.log("Update successful:", response.data);
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "updateSuccess",
            value: true,
          },
        ]);
        // Refresh data after successful update
        fetchMedicalRecords();
      },
      (error) => {
        console.error("Error updating records:", error);
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "updateError",
            value: "Failed to update records. Please try again.",
          },
        ]);
      },
      () => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "updating",
            value: false,
          },
        ]);
      }
    );
  }, []);

  const clearUpdateStatus = useCallback(() => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "updateSuccess",
        value: false,
      },
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "updateError",
        value: null,
      },
    ]);
  }, []);

  const fetchMedicalRecords = useCallback(() => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "loading",
        value: true,
      },
    ]);

    allRecords(
      {},
      async (response) => {
        console.log("Medical Records API Response:", response.data);
        const data = response.data?.data || {};
        const medicalRecord = data.medicalRecord || {};
        const personalRecords = data.personalRecords || {};

        // Get user gender to conditionally show wife's number
        let userGender = null;
        try {
          const userInfo = JSON.parse(await AsyncStorage.getItem(USERINFO));
          userGender = userInfo?.Gender;
        } catch (error) {
          console.error('Error fetching user gender:', error);
        }

        // Transform API data to UI format
        const transformedRecords = [];

        // Family History - Always show
        const { genatics = [], genaticsDiseases = [] } = medicalRecord.familyHistory || {};
        let familyHistoryInfo = "No family history recorded";
        if (genatics.length > 0 || genaticsDiseases.length > 0) {
          familyHistoryInfo = `${genatics.join(", ")}${genatics.length > 0 && genaticsDiseases.length > 0 ? " &\n" : ""}${genaticsDiseases.join(", ")}`;
        }
        transformedRecords.push({
          id: 1,
          name: "Family History",
          info: familyHistoryInfo,
          genatics,
          genaticsDiseases,
          icon: require("../../assets/images/family-history.png"),
        });

        // Allergic - Always show
        const allergies = medicalRecord.allgeric || [];
        transformedRecords.push({
          id: 2,
          name: "Allergic",
          info: allergies.length > 0 ? allergies.join(" &\n") : "No allergies recorded",
          allgeric: allergies,
          icon: require("../../assets/images/allgeric-icon.png"),
        });

        // Chronic Medications - Always show
        const chronicMeds = medicalRecord.chronicMedications || [];
        transformedRecords.push({
          id: 3,
          name: "Chronic Medications",
          info: chronicMeds.length > 0 ? chronicMeds.join(" &\n") : "No chronic medications recorded",
          chronicMedications: chronicMeds,
          icon: require("../../assets/images/chronicMedications.png"),
        });

        // Surgeries - Always show
        const surgeries = medicalRecord.surgeries || [];
        transformedRecords.push({
          id: 4,
          name: "Surgeries",
          info: surgeries.length > 0 ? surgeries.join(" &\n") : "No surgeries recorded",
          surgeries: surgeries,
          icon: require("../../assets/images/surgeries.png"),
        });

        // Chronic Diseases - Always show
        const chronicDiseases = medicalRecord.chronicDiseases || [];
        transformedRecords.push({
          id: 5,
          name: "Chronic Diseases",
          info: chronicDiseases.length > 0 ? chronicDiseases.join(" &\n") : "No chronic diseases recorded",
          chronicDiseases: chronicDiseases,
          icon: require("../../assets/images/Chronic-Diseases.png"),
        });

        // Vaccinations - Always show
        const vaccinations = medicalRecord.vaccinations || [];
        transformedRecords.push({
          id: 6,
          name: "Vaccinations",
          info: vaccinations.length > 0 ? vaccinations.join(" &\n") : "No vaccinations recorded",
          vaccinations: vaccinations,
          icon: require("../../assets/images/Vaccinations.png"),
        });

        // Personal Records Summary - Always show
        const personalInfo = [];
        
        // Work Name
        personalInfo.push(`Work Name: ${personalRecords.workName || "Not specified"}`);
        
        // Work Place
        personalInfo.push(`Work Place: ${personalRecords.workPlace || "Not specified"}`);
        
        // Children Number
        personalInfo.push(`Children Number: ${personalRecords.childrenNumber !== undefined ? personalRecords.childrenNumber : "Not specified"}`);
        
        // Birth Date of First Child
        personalInfo.push(`Birth Date of First Child: ${personalRecords.birthDateOfFirstChild || "Not specified"}`);
        
        // Smoking
        personalInfo.push(`Smoking: ${personalRecords.smoking || "Not specified"}`);
        
        // Alcohol
        personalInfo.push(`Alcohol: ${personalRecords.alcohol || "Not specified"}`);
        
        // Wives Number - Only show if user is not female
        if (userGender !== 'Female') {
          personalInfo.push(`Wives Number: ${personalRecords.wifesNumber !== undefined ? personalRecords.wifesNumber : "Not specified"}`);
        }
        
        // Pets Types
        const petsText = personalRecords.petsTypes && personalRecords.petsTypes.length > 0 
          ? personalRecords.petsTypes.join(", ") 
          : "Not specified";
        personalInfo.push(`Pets Types: ${petsText}`);
        
        // Family Status
        personalInfo.push(`Family Status: ${personalRecords.familyStatus || "Not specified"}`);
        
        transformedRecords.push({
          id: 7,
          name: "Personal Information",
          info: personalInfo.join(" \n"),
          personalRecords,
          icon: require("../../assets/images/portrait-hansome-young-male-doctor-man.png"),
        });

        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "medicalRecords",
            value: transformedRecords,
          },
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "rawMedicalData",
            value: medicalRecord,
          },
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "rawPersonalData",
            value: personalRecords,
          },
        ]);
      },
      (error) => {
        console.error("Error fetching medical records:", error);
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "error",
            value: "Failed to fetch medical records. Please try again.",
          },
        ]);
      },
      () => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "loading",
            value: false,
          },
        ]);
      }
    );
  }, []);

  useEffect(() => {
    fetchMedicalRecords();
  }, [fetchMedicalRecords]);

  return { state, updateState, actions: { fetchMedicalRecords, updateMedicalRecords, clearUpdateStatus } };
};

export default Logic;
