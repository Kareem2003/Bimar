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
  OTP,
  USERINFO,
} from "../../helpers/constants/staticKeys";
import { Context } from "../../contexts/appContext";
import ACTION_TYPES from "../../reducers/actionTypes";
import {
  forgotPassword,
  resetPassword,
  verifyOTP,
} from "../../service/AuthServices";
import { ToastManager } from "../../helpers/ToastManager";

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
    if (state.currentStep - 1 < 1) {
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

  const updateFormData = (field, value) => {
    const trimmedField = field.trim();
    let validationText = "";

    if (
      trimmedField === "userEmail" &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
    ) {
      validationText = "Invalid email format";
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

  const handleEmailValidation = () => {
    let isValid = true;
    const newValidationMessages = {}; // Object to hold validation messages

    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        state.formData.userEmail
      )
    ) {
      isValid = false;
      newValidationMessages.userEmailValidationText = "Invalid email format";
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

    if (isValid) {
      forgotPassword(
        state.formData.userEmail,
        (res) => {
          console.log(res);
          const cookies = res.headers["set-cookie"];
          const otp = extractOtpFromCookies(cookies);

          console.log(cookies);

          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "otpAsync",
              value: otp,
            },
          ]);
          ToastManager.notify(
            `OTP Sent To your Email ${state.formData.userEmail}`,
            {
              type: "success",
            }
          );
          handleNext();
        },
        (error) => {
          const errorMessage = error.data || "An unknown error occurred"; // Default message if error.data is undefined
          ToastManager.notify(errorMessage, {
            type: "error",
          });
        },
        () => {}
      );
    } else {
      ToastManager.notify("Please fix the errors before proceeding.", {
        type: "error",
      });
    }
  };
  const handleResendOTP = () => {
    forgotPassword(
      state.formData.userEmail,
      (res) => {
        console.log(res);
        const cookies = res.headers["set-cookie"];
        const otp = extractOtpFromCookies(cookies);

        console.log(cookies);

        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "otpAsync",
            value: otp,
          },
        ]);
        ToastManager.notify(
          `OTP Sent To your Email ${state.formData.userEmail}`,
          {
            type: "success",
          }
        );
      },
      (error) => {
        const errorMessage = error.data || "An unknown error occurred"; // Default message if error.data is undefined
        ToastManager.notify(errorMessage, {
          type: "error",
        });
      },
      () => {}
    );
  };

  const handleVerifyOTP = (otp) => {
    verifyOTP(
      otp,
      (res) => {
        if (res.data.status === "success") {
          ToastManager.notify("OTP verified successfully!", {
            type: "success",
          });
          handleNext();
        } else {
          ToastManager.notify("OTP verification failed. Please try again.", {
            type: "error",
          });
        }
      },
      (error) => {
        const errorMessage = error.data || "An unknown error occurred"; // Default message if error.data is undefined
        ToastManager.notify(errorMessage, {
          type: "error",
        });
      },
      () => {}
    );
  };

  const handleUpdatePassword = () => {
    if (state.formData.userPassword !== state.reEnterYourPassword) {
      ToastManager.notify("Passwords do not match. Please try again.", {
        type: "error",
      });
      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: "reEnterYourPasswordValidationText",
          value: "Passwords do not match.",
        },
      ]);
      return;
    }

    resetPassword(
      state.formData.userPassword,
      (res) => {
        ToastManager.notify("Password updated successfully!", {
          type: "success",
        });
        navigation.replace("Login");
      },
      (error) => {
        ToastManager.notify("Failed to update password. Please try again.", {
          type: "error",
        });
      },
      () => {}
    );
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const extractOtpFromCookies = (cookies) => {
    if (!cookies) return null;
    const otpcookie = cookies.find((cookie) => cookie.startsWith("otp="));
    return otpcookie ? otpcookie.split("=")[1].split(";")[0] : null;
  };

  return {
    state,
    updateState,
    handleNext,
    handleBack,
    togglePasswordVisibility,
    isPasswordVisible,
    handleEmailValidation,
    handleUpdatePassword,
    handleVerifyOTP,
    updateFormData,
    handleResendOTP,
  };
};

export default Logic;
