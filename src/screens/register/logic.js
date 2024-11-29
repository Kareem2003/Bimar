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
import { patientLogin } from "../../service/AuthServices";
const Logic = (navigation) => {
  const [currentStep, setCurrentStep] = useState(1); // Step indicator: 1 or 2
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    city: "",
    area: "",
    gender: "",
    weight: "",
    hight: "",
    BloodType: "",
  });

  const handleNext = () => {
    const next = currentStep + 1;
    setCurrentStep(next); // Move to the next section
  };

  const handleBack = () => {
    const prev = currentStep - 1;
    setCurrentStep(prev); // Return to the first section
  };

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return {
    updateFormData,
    handleNext,
    handleBack,
    currentStep,
    formData,
  };
};

export default Logic;
