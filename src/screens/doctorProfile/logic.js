import { useReducer, useEffect, useState } from "react";
import { reducer } from "../../reducers/reducer";
import { bookDate } from "../../service/HomeServices";
import { INITIAL_STATE } from "./constant";
import { patientLogin } from "../../service/AuthServices";
import ACTION_TYPES from "../../reducers/actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTHENTICATION_TOKEN } from "../../helpers/constants/staticKeys";
import { ToastManager } from "../../helpers/ToastManager";
import {
  addDoctorRate,
  getDoctorRate,
  updateDoctorRate,
} from "../../service/rateServices";
import { USERINFO } from "../../helpers/constants/staticKeys";

const Logic = (navigation, route) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [hasFetchedRatings, setHasFetchedRatings] = useState(false);
  const [userRating, setUserRating] = useState(null);

  const updateState = (payload) => {
    dispatch({ payload });
  };
  const bookDoctorAppointment = () => {
    navigation.navigate("BookNow", {
      doctor: state.doctor,
      selectedDate: state.selectedDate,
      clinicId: state.doctor?.clinicId || state.doctor?.clinic_id,
    });
  };

  useEffect(() => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "doctor",
        value: route.params.doctor,
      },
    ]);
  }, []);

  // Fetch ratings when doctor data is available (only once)
  useEffect(() => {
    if ((state.doctor?._id || state.doctor?.id) && !hasFetchedRatings) {
      setHasFetchedRatings(true);
      fetchRates();
    }
  }, [state.doctor?._id, hasFetchedRatings]);

  const rateDoctor = (rating, comment) => {
    if (userRating) {
      // Update existing rating
      updateDoctorRate(
        {
          ratingId: userRating.id,
          rating: rating,
          comment: comment,
        },
        (response) => {
          ToastManager.notify("Rating updated successfully", {
            type: "success",
          });
          // Reset form immediately
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "rating",
              value: 0,
            },
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "comment",
              value: "",
            },
          ]);
          setUserRating(null);
          // Refresh ratings after updating
          setTimeout(() => {
            fetchRates();
          }, 500);
        },
        (error) => {
          ToastManager.notify(error, { type: "error" });
        },
        () => {}
      );
    } else {
      // Add new rating
      addDoctorRate(
        {
          doctorId: state.doctor._id || state.doctor.id,
          rating: rating,
          comment: comment,
        },
        (response) => {
          ToastManager.notify("Rating added successfully", { type: "success" });
          // Reset form immediately
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "rating",
              value: 0,
            },
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "comment",
              value: "",
            },
          ]);
          // Refresh ratings after adding a new one
          setTimeout(() => {
            fetchRates();
          }, 500);
        },
        (error) => {
          ToastManager.notify(error, { type: "error" });
        },
        () => {}
      );
    }
  };

  const fetchRates = () => {
    const doctorId = state.doctor._id || state.doctor.id;
    getDoctorRate(
      { doctorId: doctorId },
      async (response) => {
        // Fix: Access the nested data structure
        const ratingsData = response.data?.data;

        if (ratingsData) {
          // Update doctor info with latest rating stats
          const updatedDoctor = {
            ...state.doctor,
            averageRating: ratingsData.doctor.averageRating,
            totalRatings: ratingsData.doctor.totalRatings,
          };

          // Get current user data to check if they've already rated
          try {
            const currentUserData = await AsyncStorage.getItem(USERINFO);
            const currentUser = currentUserData
              ? JSON.parse(currentUserData)
              : null;

            // Check if current user has already rated this doctor
            const currentUserRating = ratingsData.ratings?.find(
              (rating) => rating.patient?.id === currentUser?.id
            );

            if (currentUserRating) {
              setUserRating(currentUserRating);
              updateState([
                {
                  type: ACTION_TYPES.UPDATE_PROP,
                  prop: "rating",
                  value: currentUserRating.rating,
                },
                {
                  type: ACTION_TYPES.UPDATE_PROP,
                  prop: "comment",
                  value: currentUserRating.comment,
                },
              ]);
            } else {
              setUserRating(null);
            }
          } catch (error) {
            console.error("Error getting current user data:", error);
          }

          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "doctor",
              value: updatedDoctor,
            },
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "ratings",
              value: ratingsData.ratings || [],
            },
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "ratingStats",
              value: ratingsData.ratingStats || {},
            },
          ]);
        }
      },
      (error) => {
        ToastManager.notify(error, { type: "error" });
      },
      () => {}
    );
  };

  const handleDateSelection = (date, clinic) => {
    if (
      state.selectedDate === date &&
      state.selectedClinic === clinic?.clinicAddress
    ) {
      // Deselect if clicking the selected date again
      updateState([
        { type: ACTION_TYPES.UPDATE_PROP, prop: "selectedDate", value: null },
        { type: ACTION_TYPES.UPDATE_PROP, prop: "selectedClinic", value: null },
        { type: ACTION_TYPES.UPDATE_PROP, prop: "selectedTime", value: null }, // Also clear selectedTime
      ]);
    } else {
      updateState([
        { type: ACTION_TYPES.UPDATE_PROP, prop: "selectedDate", value: date },
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: "selectedClinic",
          value: clinic?.clinicAddress,
        },
        { type: ACTION_TYPES.UPDATE_PROP, prop: "selectedTime", value: null }, // Reset time when new date/clinic is selected
      ]);
    }
  };

  const getNextMonthAvailableDates = (clinic) => {
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
    let dates = [];
    for (let i = 0; i < 28; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = daysOfWeek[date.getDay()];
      const workDay = clinic.clinicWorkDays?.find((wd) => wd.day === dayName);
      if (workDay) {
        dates.push({
          date: new Date(date),
          formatted: date.toISOString().split("T")[0],
          workDay,
        });
      }
    }
    return dates;
  };

  return {
    state,
    updateState,
    bookDoctorAppointment,
    rateDoctor,
    fetchRates,
    handleDateSelection,
    getNextMonthAvailableDates,
    userRating,
  };
};

export default Logic;
