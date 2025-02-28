import { BASE_URL } from "../helpers/constants/config";
import $axios from "./axios";

export const patientLogin = (payload, onSuccess, onError, onComplete) => {
  $axios
    .post("/patientsAuth/patientLogin", {
      userEmail: payload.userEmail,
      userPassword: payload.userPassword,
    })
    .then(onSuccess)
    .catch((error) => {
      console.log("error", error);
      // Extract the error message
      const errorMessage =
        error.data?.[0] || "An error occurred"; // Access the first item in the data array
      onError(errorMessage); // Pass the string message to onError
    })
    .finally(onComplete);
};
export const patientRegister = (payload, onSuccess, onError, onComplete) => {
  $axios.post(
    "/patientsAuth/patientRegister",
    {
      userName: payload.userName,
      userPhone: payload.userPhone,
      userEmail: payload.userEmail,
      userPassword: payload.userPassword,
      personalRecords: {
        City: payload.personalRecords.City,
        Area: payload.personalRecords.Area,
        userWeight: payload.personalRecords.userWeight,
        userHeight: payload.personalRecords.userHeight,
        DateOfBirth: payload.personalRecords.DateOfBirth,
        emergencyContact: payload.personalRecords.emergencyContact,
        workName: payload.personalRecords.workName,
        workPlace: payload.personalRecords.workPlace,
        childrenNumber: payload.personalRecords.childrenNumber,
        birthDateOfFirstChild: payload.personalRecords.birthDateOfFirstChild,
        smoking: payload.personalRecords.smoking,
        alcohol: payload.personalRecords.alcohol,
        wifesNumber: payload.personalRecords.wifesNumber,
        petsTypes: payload.personalRecords.petsTypes,
        familyStatus: payload.personalRecords.familyStatus,
        Gender: payload.personalRecords.Gender,
      },
    },
    onSuccess,
    onError,
    onComplete
  );
};
export const forgotPassword = (payload, onSuccess, onError, onComplete) => {
  $axios.post(
    "/patientsAuth/forgot-password",
    {
      userEmail: payload,
    },
    onSuccess,
    onError,
    onComplete
  );
};
export const verifyOTP = (payload, onSuccess, onError, onComplete) => {
  $axios.post(
    "/patientsAuth/verify-otp",
    {
      otp: payload,
    },
    onSuccess,
    onError,
    onComplete
  );
};
export const resetPassword = (payload, onSuccess, onError, onComplete) => {
  $axios.post(
    "/patientsAuth/reset-password",
    {
      newPassword: payload,
    },
    onSuccess,
    onError,
    onComplete
  );
};
export const updatePatient = (id, payload, onSuccess, onError, onComplete) => {

  const requestData = {
    userName: payload.userName,
    userEmail: payload.userEmail,
    userPhone: payload.userPhone,
    personalRecords: {
      userHeight: parseInt(payload.personalRecords?.userHeight || '0'),
      userWeight: parseInt(payload.personalRecords?.userWeight || '0'),
      DateOfBirth: payload.personalRecords?.DateOfBirth || '',
      Gender: payload.personalRecords?.Gender || '',
      City: payload.personalRecords?.City || '',
      Area: payload.personalRecords?.Area || ''
    },
    medicalRecord: {
      bloodType: payload.medicalRecord?.bloodType || ''
    }
  };

  $axios
    .patch(`/patientsAuth/${id}`, requestData)
    .then((response) => {
      if (response.data && response.data.data === "Updated Successfulyy") {
        $axios.get(`/patientsAuth/${id}`)
          .then((userResponse) => {
            onSuccess({
              data: {
                ...userResponse.data,
                id: id
              }
            });
          })
          .catch(() => {

            onSuccess(response);
          });
      } else {
        onSuccess(response);
      }
    })
    .catch((error) => {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred during update";
      onError(errorMessage);
    })
    .finally(() => {
      if (onComplete) onComplete();
    });
};