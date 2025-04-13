import { BASE_URL } from "../helpers/constants/config";
import $axios from "./axios";
export const getDoctors = (payload, onSuccess, onError, onComplete) => {
  $axios
    .get("/doctor/doctors")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};

export const bookDate = (payload, onSuccess, onError, onComplete) => {
  $axios
    .post("/bookings", payload)
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
