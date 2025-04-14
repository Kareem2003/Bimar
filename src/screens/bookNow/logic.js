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
    bookDate(
      {
        doctorId: state.doctor._id,
        clinicId: state.doctor.clinic[0]._id,
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
        value: route.params.doctor.clinic[0].Price,
      },
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "selectedDate",
        value: route.params.selectedDate,
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
