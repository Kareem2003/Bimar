import { BASE_URL } from "../helpers/constants/config";
import { unsecurePost, secureGet } from "./axios";

export const getDoctors = (payload, onSuccess, onError, onComplete) => {
  secureGet("/doctor/doctors", {}, onSuccess, onError, onComplete);
};
