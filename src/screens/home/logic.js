import { useContext, useEffect, useReducer } from "react";
import { reducer } from "../../reducers/reducer";
import { INITIAL_STATE } from "./constant";
import {
  getDoctors,
  getMedication,
  getDoctorRating,
} from "../../service/HomeServices";
import { Context } from "../../contexts/appContext";
import ACTION_TYPES from "../../reducers/actionTypes";
import { ToastManager } from "../../helpers/ToastManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USERINFO } from "../../helpers/constants/staticKeys";
import {
  subscribeToUserData,
  USER_DATA_EVENTS,
} from "../../helpers/UserDataManager";

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { updateState: updateCtxState } = useContext(Context);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const fetchUserInfo = async () => {
    try {
      const userInfo = JSON.parse(await AsyncStorage.getItem(USERINFO));
      if (userInfo) {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "userName",
            value: userInfo.userName || "",
          },
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "userInfo",
            value: userInfo || "",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Subscribe to user data updates
  useEffect(() => {
    // Subscribe to profile updates
    const profileUnsubscribe = subscribeToUserData(
      USER_DATA_EVENTS.PROFILE_UPDATED,
      (updatedData) => {
        console.log(
          "Home logic received profile update:",
          updatedData.userName
        );

        // Update the userName in state
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "userName",
            value: updatedData.userName || "",
          },
        ]);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      profileUnsubscribe();
    };
  }, []);

  const fetchDoctorRatings = async (doctors) => {
    try {
      const doctorPromises = doctors.map(async (doctor) => {
        return new Promise((resolve) => {
          const doctorId = doctor._id || doctor.id;
          getDoctorRating(
            doctorId,
            (response) => {
              if (response?.data?.data?.doctor) {
                resolve({
                  ...doctor,
                  averageRating: response.data.data.doctor.averageRating || 0,
                  totalRatings: response.data.data.doctor.totalRatings || 0,
                });
              } else {
                resolve({
                  ...doctor,
                  averageRating: 0,
                  totalRatings: 0,
                });
              }
            },
            (error) => {
              console.log(
                `Failed to fetch rating for doctor ${doctorId}:`,
                error
              );
              resolve({
                ...doctor,
                averageRating: 0,
                totalRatings: 0,
              });
            }
          );
        });
      });

      const doctorsWithRatings = await Promise.all(doctorPromises);
      return doctorsWithRatings;
    } catch (error) {
      console.error("Error fetching doctor ratings:", error);
      return doctors; // Return original doctors if rating fetch fails
    }
  };

  const fetchDoctors = () => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "loading",
        value: true,
      },
    ]);

    getDoctors(
      {},
      async (response) => {
        console.log(
          "Fetched doctor response:",
          response.data.data
          // JSON.stringify(response.data.data.doctor)
        );
        if (response?.data?.data) {
          const doctors = response.data.data;

          // Fetch ratings for all doctors
          const doctorsWithRatings = await fetchDoctorRatings(doctors);

          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "doctors",
              value: doctorsWithRatings,
            },
          ]);
        } else {
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "error",
              value: "Invalid data format received",
            },
          ]);
        }
      },
      (error) => {
        ToastManager.notify("Error fetching doctors", {
          type: "error",
        });
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "error",
            value: error?.message || "Failed to fetch doctors",
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
  };

  // Update the fetchMedicean function in Logic.js
  const fetchMedications = () => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "loading",
        value: true,
      },
    ]);

    getMedication(
      {},
      (response) => {
        if (response?.data?.data) {
          console.log(response.data.data);
          // Transform API data to match component structure
          const initialMedications = response.data.data.map((med, index) => ({
            id: med._id || med.id || `${med.medication}-${Date.now()}`,
            name: med.medication,
            times: med.frequency,
            dose: med.dosage,
            doseTimes: med.times,
            takenCount: 0,
            takenTimes: [],
          }));

          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "initialMedications",
              value: initialMedications,
            },
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "loading",
              value: false,
            },
          ]);
        }
      },
      (error) => {
        ToastManager.notify("Error fetching medications", {
          type: "error",
        });
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "error",
            value: error?.message || "Failed to fetch medications",
          },
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "loading",
            value: false,
          },
        ]);
      }
    );
  };

  const saveMedicines = async (medicines) => {
    try {
      const dataToSave = {
        date: new Date().toISOString().split("T")[0], // Save only "YYYY-MM-DD"
        medicines: medicines,
      };
      const jsonValue = JSON.stringify(dataToSave);
      await AsyncStorage.setItem("medicines", jsonValue);
    } catch (e) {
      console.error("Error saving medicines:", e);
    }
  };

  const loadSavedMedicines = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("medicines");
      if (jsonValue != null) {
        const savedData = JSON.parse(jsonValue);
        const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

        let medicinesToUse = savedData.medicines;

        if (savedData.date !== today) {
          // New day: reset takenCount and takenTimes
          medicinesToUse = savedData.medicines.map((med) => ({
            ...med,
            takenCount: 0,
            takenTimes: [],
          }));
        }

        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "initialMedications",
            value: medicinesToUse,
          },
        ]);

        // After reset, save new clean medicines
        if (savedData.date !== today) {
          saveMedicines(medicinesToUse);
        }
      } else {
        // No saved medicines, so fetch from API
        fetchMedications();
      }
    } catch (e) {
      console.error("Error loading medicines:", e);
      fetchMedications();
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchUserInfo();
    loadSavedMedicines();
  }, []);

  useEffect(() => {
    if (state.initialMedications.length > 0) {
      saveMedicines(state.initialMedications);
    }
  }, [state.initialMedications]);

  return { state, updateState, saveMedicines };
};

export default Logic;
