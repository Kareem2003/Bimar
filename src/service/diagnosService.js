// src/services/diagnoseServices.js
import { BASE_URL } from "../helpers/constants/config";
import $axios from "./axios";

export const getPatientDiagnosis = (payload, onSuccess, onError, onComplete) => {
  $axios
    .get("/Diagnosis",payload)
    .then(response => onSuccess(response.data))
    .catch(onError)
    .finally(onComplete);
};