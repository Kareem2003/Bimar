import { useReducer, useEffect } from "react";
import { reducer } from "../../reducers/reducer";
import { bookDate } from "../../service/HomeServices";
import { INITIAL_STATE } from "./constant";
import { patientLogin } from "../../service/AuthServices";
import ACTION_TYPES from "../../reducers/actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTHENTICATION_TOKEN } from "../../helpers/constants/staticKeys";
import { ToastManager } from "../../helpers/ToastManager";

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

  return {
    state,
    updateState,
    bookDoctorAppointment,
  };
};

export default Logic;
