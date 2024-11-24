import { BASE_URL } from "../helpers/constants/config";
import { unsecurePost } from "./axios";

export const patientLogin = (payload, onSuccess, onError, onComplete) => {
  unsecurePost(
    "/patientsAuth/patientLogin",
    {
      userEmail: payload.userEmail,
      userPassword: payload.userPassword,
    },
    onSuccess,
    onError,
    onComplete
  );
};
