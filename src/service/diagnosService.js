// src/services/diagnoseServices.js
import { BASE_URL } from "../helpers/constants/config";
import { $securedAxios } from "./axios";

export const getPatientDiagnosis = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/Diagnosis",payload)
    .then(response => onSuccess(response.data))
    .catch(onError)
    .finally(onComplete);
};