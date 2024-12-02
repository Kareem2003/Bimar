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

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
      state.setcurrentStep = navigation.navigate("Login");
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

  const handleUpdatePassword = () => {
    ////////////////////////////////////////////////////////////////
  };

  const handleVerifyCode = () => {
    ////////////////////////////////////////////////////////////////
  };


  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return {
    state,
    updateState,
    handleNext,
    handleBack,
    togglePasswordVisibility,
    isPasswordVisible,
  };
};

export default Logic;
