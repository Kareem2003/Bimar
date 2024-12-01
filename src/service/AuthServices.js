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
export const patientRegister = (payload, onSuccess, onError, onComplete) => {
  unsecurePost(
    "/patientsAuth/patientRegister",
    {
      userName: payload.userName,
      userPhone: payload.userPhone,
      userEmail: payload.userEmail,
      userPassword: payload.userPassword,
      City: payload.City,
      Area: payload.Area,
      Gender: payload.Gender,
      userWeight: payload.userWeight,
      userHeight: payload.userHeight,
      DateofBirth: payload.DateofBirth,
      BooldType: payload.BooldType,
    },
    onSuccess,
    onError,
    onComplete
  );
};
