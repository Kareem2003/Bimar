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
import { ToastManager } from "../../helpers/ToastManager";
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
    let isValid = true; // Flag to track overall form validity
    const newValidationMessages = {}; // Object to hold validation messages

    // Validate each field
    if (!state.formData.userName) {
      isValid = false;
      newValidationMessages.userNameValidationText = "Name is required";
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        state.formData.userEmail
      )
    ) {
      isValid = false;
      newValidationMessages.userEmailValidationText = "Invalid email format";
    }
    if (state.formData.userPassword.length < 8) {
      isValid = false;
      newValidationMessages.userPasswordValidationText =
        "Password must be at least 8 characters";
    }
    if (!state.formData.City) {
      isValid = false;
      newValidationMessages.CityValidationText = "City is required";
    }
    if (!state.formData.Area) {
      isValid = false;
      newValidationMessages.AreaValidationText = "Area is required";
    }
    if (!state.formData.Gender) {
      isValid = false;
      newValidationMessages.GenderValidationText = "Gender is required";
    }
    if (!state.formData.userPhone) {
      isValid = false;
      newValidationMessages.userPhoneValidationText =
        "Phone number is required";
    } else if (!/^\d{10}$/.test(state.formData.userPhone)) {
      isValid = false;
      newValidationMessages.userPhoneValidationText =
        "Phone number must be 10 digits";
    }
    if (!state.formData.DateofBirth) {
      isValid = false;
      newValidationMessages.DateofBirthValidationText =
        "Date of Birth is required";
    }
    if (!state.formData.userWeight) {
      isValid = false;
      newValidationMessages.userWeightValidationText = "Weight is required";
    } else if (
      isNaN(state.formData.userWeight) ||
      state.formData.userWeight <= 0
    ) {
      isValid = false;
      newValidationMessages.userWeightValidationText =
        "Weight must be a positive number";
    }
    if (!state.formData.userHeight) {
      isValid = false;
      newValidationMessages.userHeightValidationText = "Height is required";
    } else if (
      isNaN(state.formData.userHeight) ||
      state.formData.userHeight <= 0
    ) {
      isValid = false;
      newValidationMessages.userHeightValidationText =
        "Height must be a positive number";
    }
    if (!state.formData.BooldType) {
      isValid = false;
      newValidationMessages.BooldTypeValidationText = "Blood type is required";
    }

    // Update state with validation messages
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "formData",
        value: {
          ...state.formData,
          ...newValidationMessages,
        },
      },
    ]);

    // If valid, proceed with registration
    if (isValid) {
      // Call the registration service
      patientRegister(
        state.formData,
        (res) => {
          ToastManager.notify(res.data, { type: res.status });
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "formData",
              value: INITIAL_STATE.formData,
            },
          ]);
          navigation.navigate("Login");
        },
        (error) => {
          if (error.data) {
            const errorMessage = error.data.join("\n");
            ToastManager.notify(errorMessage, { type: "error" });
          } else {
            ToastManager.notify("An unknown error occurred", {
              type: "error",
            });
          }
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
              prop: "formData",
              value: {
                ...state.formData,
                ...errorMessages,
              },
            },
          ]);
        },
        () => {}
      );
    } else {
      ToastManager.notify("Please fix the errors before proceeding.", {
        type: "error",
      });
    }
  };

  const updateFormData = (field, value) => {
    const trimmedField = field.trim();
    let validationText = "";

    if (trimmedField === "userName" && value.trim() === "") {
      validationText = "Name is required";
    } else if (
      trimmedField === "userEmail" &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
    ) {
      validationText = "Invalid email format";
    } else if (trimmedField === "userPassword" && value.length < 8) {
      validationText = "Password must be at least 8 characters";
    } else if (trimmedField === "City" && value.trim() === "") {
      validationText = "City is required";
    } else if (trimmedField === "Area" && value.trim() === "") {
      validationText = "Area is required";
    } else if (trimmedField === "DateofBirth" && !(value instanceof Date)) {
      validationText = "Invalid date format";
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

  const handleDateConfirm = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    updateFormData("DateofBirth", formattedDate);
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "isDatePickerVisible",
        value: false,
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
    handleDateConfirm,
  };
};

export default Logic;
