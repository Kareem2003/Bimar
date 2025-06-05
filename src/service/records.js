import { $securedAxios } from "./axios";

export const allRecords = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/patientRecords", payload)
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};

export const updateRecords = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .patch("/patientRecords", payload)
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};