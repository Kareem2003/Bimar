import { BASE_URL } from "../helpers/constants/config";
import $axios from "./axios";
import { $securedAxios } from "./axios";
export const getDoctors = (payload, onSuccess, onError, onComplete) => {
  $axios
    .get("/doctor/doctors")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};

export const bookDate = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .post("/bookings", payload)
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};

export const getMedication = (payload, onSuccess, onError, onComplete) => {
  $axios
    .get("/medication/track")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
