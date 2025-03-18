// src/services/diagnoseServices.js
import { BASE_URL } from "../helpers/constants/config";
import $securedAxios from "./axios";

export const getPatientDiagnosis = (patientId, onSuccess, onError, onComplete) => {
  $securedAxios
    .get(`${BASE_URL}/Diagnosis/`)
    .then(response => onSuccess(response.data))
    .catch(onError)
    .finally(onComplete);
};