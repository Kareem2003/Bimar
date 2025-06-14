import { useReducer, useEffect } from "react";
import { reducer } from "../../reducers/reducer";
import { bookDate } from "../../service/HomeServices";
import { INITIAL_STATE } from "./constant";
import { patientLogin } from "../../service/AuthServices";
import ACTION_TYPES from "../../reducers/actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTHENTICATION_TOKEN } from "../../helpers/constants/staticKeys";
import { ToastManager } from "../../helpers/ToastManager";
import { addDoctorRate, getDoctorRate } from "../../service/rateServices";

const Logic = (navigation, route) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const bookDoctorAppointment = () => {
    navigation.navigate("BookNow", {
      doctor: state.doctor,
      selectedDate: state.selectedDate,
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

  const rateDoctor = () => {
    addDoctorRate(
      {
        doctorId: state.doctor.id,
        rating: state.rating,
        comment: state.comment,
      },
      (response) => {
        ToastManager.showToast("Rating added successfully", "success");
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "rating",
            value: response.data.rating,
          },
        ]);
      },
      (error) => {
        ToastManager.showToast(error, "error");
      },
      () => {}
    );
  };

  const fetchRates = () => {
    getDoctorRate(
      { doctorId: state.doctor.id },
      (response) => {
        if (response.data.length > 0) {
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "rating",
              value: response.data[0].rating,
            },
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "comment",
              value: response.data[0].comment,
            },
          ]);
        }
      },
      (error) => {
        ToastManager.showToast(error, "error");
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
  };
};

export default Logic;
