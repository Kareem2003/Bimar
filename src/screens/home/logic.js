import React, { useContext, useEffect, useReducer } from "react";
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
import { useFocusEffect } from "@react-navigation/native";

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
        // console.log(
        //   "Fetched doctor response:",
        //   response.data.data
        //   // JSON.stringify(response.data.data.doctor)
        // );
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

  // Use focus effect to refresh data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      // Refresh doctor data when screen comes into focus
      fetchDoctors();
    }, [])
  );

  const fetchMedication = () => {
    getMedication(
      {},
      (response) => {
        if (response?.data?.data) {
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "medications",
              value: response.data.data,
            },
          ]);
        }
      },
      (error) => {
        ToastManager.notify("Error fetching medications", {
          type: "error",
        });
      }
    );
  };

  const saveMedicines = (medicines) => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "medications",
        value: medicines,
      },
    ]);
  };

  useEffect(() => {
    fetchUserInfo();
    fetchMedication();
  }, []);

  return {
    state,
    updateState,
    saveMedicines,
  };
};

export default Logic;
