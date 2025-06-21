import {
  useContext,
  useEffect,
  useReducer,
  useCallback,
  useState,
} from "react";
import { reducer } from "../../reducers/reducer";
import { INITIAL_STATE } from "./constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AUTHENTICATION_TOKEN,
  USERINFO,
} from "../../helpers/constants/staticKeys";
import { Context } from "../../contexts/appContext";
import ACTION_TYPES from "../../reducers/actionTypes";
import { bookDate } from "../../service/HomeServices";
import { ToastManager } from "../../helpers/ToastManager";

const Logic = (navigation, route) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const handleBooking = () => {
    // Validate all required data
    if (!state.doctor) {
      ToastManager.notify("Doctor information not available", { type: "error" });
      return;
    }

    if (!state.selectedClinic) {
      ToastManager.notify("No clinic selected", { type: "error" });
      return;
    }

    if (!state.selectedDate) {
      ToastManager.notify("No date selected", { type: "error" });
      return;
    }

    if (!state.doctor._id) {
      ToastManager.notify("Doctor ID not available", { type: "error" });
      return;
    }

    if (!state.selectedClinic._id) {
      ToastManager.notify("Clinic ID not available", { type: "error" });
      return;
    }

    console.log("Booking with data:", {
      doctorId: state.doctor._id,
      clinicId: state.selectedClinic._id,
      appointmentDate: state.selectedDate,
      clinicName: state.selectedClinic.clinicName,
      clinicAddress: state.selectedClinic.clinicAddress
    });

    bookDate(
      {
        doctorId: state.doctor._id,
        clinicId: state.selectedClinic._id,
        appointmentDate: state.selectedDate,
      },
      (res) => {
        ToastManager.notify(
          `Booked successfully. Booking number: ${res.data.data.bookingNumber}`,
          {
            type: "success",
          }
        );
        navigation.navigate("Home");
      },
      (err) => {
        ToastManager.notify(err.data[0], {
          type: "error",
        });
      },
      () => {}
    );
  };

  useEffect(() => {
    console.log("route", route.params);
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "doctor",
        value: route.params.doctor,
      },
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "price",
        value: route.params.selectedClinic?.Price || route.params.doctor.clinic[0].Price,
      },
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "selectedDate",
        value: route.params.selectedDate,
      },
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "selectedClinic",
        value: route.params.selectedClinic,
      },
    ]);
  }, []);

  return {
    state,
    updateState,
    handleBooking,
  };
};

export default Logic;
