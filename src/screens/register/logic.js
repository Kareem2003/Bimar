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
import { useRef } from "react";
import { Animated } from "react-native";
import { BackHandler } from "react-native";
import { Dimensions } from "react-native";
const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const handleRegister = () => {
    // let isValid = true;
    // let validationText = "";
    // // Validate form data
    // if (state.formData.userName === "") {
    //   validationText = "Name is required";
    //   isValid = false;
    // } else if (
    //   !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    //     state.formData.userEmail
    //   )
    // ) {
    //   validationText = "Invalid email format";
    //   isValid = false;
    // } else if (state.formData.userPassword.length < 8) {
    //   validationText = "Password must be at least 8 characters";
    //   isValid = false;
    // } else if (state.formData.userPhone === "") {
    //   validationText = "Phone number is required";
    //   isValid = false;
    // } else if (state.formData.personalRecords.City === "") {
    //   validationText = "City is required";
    //   isValid = false;
    // } else if (state.formData.personalRecords.Area === "") {
    //   validationText = "Area is required";
    //   isValid = false;
    // } else if (state.formData.personalRecords.Gender === "") {
    //   validationText = "Gender is required";
    //   isValid = false;
    // } else if (state.formData.medicalRecord.bloodType === "") {
    //   validationText = "bloodType is required";
    //   isValid = false;
    // } else if (
    //   isNaN(state.formData.personalRecords.userWeight) ||
    //   state.formData.personalRecords.userWeight <= 0
    // ) {
    //   validationText = "Weight must be a positive number";
    //   isValid = false;
    // } else if (
    //   isNaN(state.formData.personalRecords.userHeight) ||
    //   state.formData.personalRecords.userHeight <= 0
    // ) {
    //   validationText = "Height must be a positive number";
    //   isValid = false;
    // }

    patientRegister(
      state.formData,
      (res) => {

        console.log("res", res);

        ToastManager.notify("User Created successfully", { type: "success" });
        navigation.navigate("Login");
      },
      (error) => {
        console.log("error", error);

        if (error.data) {
          const errorMessage = error.data.join("\n");
          ToastManager.notify(errorMessage, { type: "error" });
        } else {
          ToastManager.notify("An unknown error occurred", {
            type: "error",
          });
        }
      }
    );
  };

  const progressBarWidth = useRef(
    new Animated.Value((state.step / 5) * 100)
  ).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressBarWidth, {
      toValue: (state.step / 5) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [state.step]);

  const handleNext = () => {
    Animated.timing(slideAnim, {
      toValue: -Dimensions.get("window").width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: "step",
          value: state.step + 1,
        },
      ]);
      slideAnim.setValue(Dimensions.get("window").width);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleBack = () => {
    if (state.step === 1) {
      return;
    }
    Animated.timing(slideAnim, {
      toValue: Dimensions.get("window").width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: "step",
          value: state.step - 1,
        },
      ]);
      slideAnim.setValue(-Dimensions.get("window").width);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    const backAction = () => {
      if (state.step > 1) {
        handleBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [state.step]);

  const handleChange = (field, value) => {
    const fieldParts = field.split(".");
    // Update state with the new value and validation text
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: `formData.${field}`,
        value: value,
      },
    ]);
  };

  const togglePasswordVisibility = () => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "isPasswordVisible",
        value: !state.isPasswordVisible,
      },
    ]);
  };

  const handleDateOfBirthConfirm = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD

    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "formData.personalRecords.DateOfBirth",
        value: formattedDate,
      },
    ]);
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "isDatePickerVisible",
        value: false,
      },
    ]);
  };
  const handleDateOfFirstChildConfirm = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD

    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "formData.personalRecords.birthDateOfFirstChild",
        value: formattedDate,
      },
    ]);
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "isDateOfChildPickerVisible",
        value: false,
      },
    ]);
  };

  return {
    state,
    updateState,
    handleNext,
    handleBack,
    handleChange,
    togglePasswordVisibility,
    handleDateOfBirthConfirm,
    handleDateOfFirstChildConfirm,
    progressBarWidth,
    slideAnim,
    handleRegister,
  };
};

export default Logic;
