import { BASE_URL } from "../helpers/constants/config";
import $securedAxios from "./axios";

export const getDoctors = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/doctor/doctors")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
