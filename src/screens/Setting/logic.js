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

const maritalStatus = [
  { label: "Bachelor", value: "0" },
  { label: "Married", value: "1" },
];



const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
 
  const updateState = (payload) => {
    dispatch({ payload });
  };

  const handleNext = () => {
    const next = state.currentStep + 1;
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: `currentStep`,
        value: next,
      },
    ]);
  };

  const handleBack = () => {
    if (state.currentStep-1 < 1) {
      state.setcurrentStep = navigation.navigate("Home");
      return;
    }
    const prev = state.currentStep - 1;
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: `currentStep`,
        value: prev,
      },
    ]);
  };



  return {
    state,
    updateState,
    handleNext,
    handleBack,
    maritalStatus,
  };
};

export default Logic;
