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
import { patientLogin, patientRegister } from "../../service/AuthServices";
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
    const prev = state.currentStep - 1;
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: `currentStep`,
        value: prev,
      },
    ]);
  };

  const handleRegister = () => {
    patientRegister(
      state.formData,
      (res) => {
        console.log("res", res);
      },
      (error) => {
        console.error("Error messages:", error);
        // Assuming error is an array of error messages
        const errorMessages = error.reduce((acc, message) => {
          if (message.includes("Name")) {
            acc.userNameValidationText = message;
          } else if (message.includes("Password")) {
            acc.userPasswordValidationText = message;
          } else if (message.includes("Email")) {
            acc.userEmailValidationText = message;
          } else if (message.includes("Phone")) {
            acc.userPhoneValidationText = message;
          } else if (message.includes("City")) {
            acc.CityValidationText = message;
          } else if (message.includes("Gender")) {
            acc.GenderValidationText = message;
          } else if (message.includes("Area")) {
            acc.AreaValidationText = message;
          } else if (message.includes("Weight")) {
            acc.userWeightValidationText = message;
          } else if (message.includes("Height")) {
            acc.userHeightValidationText = message;
          } else if (message.includes("DateofBirth")) {
            acc.DateofBirthValidationText = message;
          } else if (message.includes("BooldType")) {
            acc.BooldTypeValidationText = message;
          }
          return acc;
        }, {});

        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: 'formData',
            value: {
              ...state.formData,
              ...errorMessages,
            },
          },
        ]);
      },
      () => {}
    );
  };

  const updateFormData = (field, value) => {
    const trimmedField = field.trim();
    let validationText = "";

    if (trimmedField === "userName" && value.trim() === "") {
      validationText = "Name is required";
    } else if (trimmedField === "userEmail" && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      validationText = "Invalid email format";
    } else if (trimmedField === "userPassword" && value.length < 8) {
      validationText = "Password must be at least 8 characters";
    } else if (trimmedField === "City" && value.trim() === "") {
      validationText = "City is required";
    } else if (trimmedField === "Area" && value.trim() === "") {
      validationText = "Area is required";
    } else if (trimmedField === "DateofBirth" && value.trim() === "") {
      validationText = "Date of Birth is required";
    } else if (trimmedField === "userPhone" && value.trim() === "") {
      validationText = "Phone number is required";
    }

    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: `formData.${trimmedField}`,
        value: value,
      },
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: `formData.${trimmedField}ValidationText`,
        value: validationText,
      },
    ]);
  };

  return {
    state,
    updateState,
    updateFormData,
    handleNext,
    handleBack,
    handleRegister,
  };
};

export default Logic;
