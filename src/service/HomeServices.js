import { BASE_URL } from "../helpers/constants/config";
import { unsecureGet } from "./axios";

export const getDoctors = (payload, onSuccess, onError, onComplete) => {
  const API_URL = "http://192.168.1.10:3000/doctor/doctors";
  console.log("Fetching doctors from:", API_URL);
  
  unsecureGet(
    API_URL,
    (response) => {
      console.log("Doctors fetch successful:", response);
      onSuccess(response);
    },
    (error) => {
      console.error("Doctors fetch failed:", error);
      onError(error);
    },
    onComplete
  );
};
