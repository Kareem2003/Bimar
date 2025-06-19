import { $securedAxios } from "./axios";

export const appRate = (payload, onSuccess, onError, onComplete) => {
    $securedAxios
      .post("/rateApp/", {
        rating: payload.rating,
        comment: payload.comment
      })
      .then(onSuccess)
      .catch((error) => {
        // Extract the error message
        const errorMessage = error.data?.[0] || "An error occurred"; // Access the first item in the data array
        onError(errorMessage); // Pass the string message to onError
      })
      .finally(onComplete);
};

export const getUserRating = (onSuccess, onError, onComplete) => {
    $securedAxios
      .get("/rateApp/")
      .then(onSuccess)
      .catch((error) => {
        // Extract the error message
        const errorMessage = error.data?.[0] || "An error occurred"; // Access the first item in the data array
        onError(errorMessage); // Pass the string message to onError
      })
      .finally(onComplete);
};

export const updateUserRating = (payload, onSuccess, onError, onComplete) => {
    $securedAxios
      .patch("/rateApp/", {
        rating: payload.rating,
        comment: payload.comment
      })
      .then(onSuccess)
      .catch((error) => {
        // Extract the error message
        const errorMessage = error.data?.[0] || "An error occurred"; // Access the first item in the data array
        onError(errorMessage); // Pass the string message to onError
      })
      .finally(onComplete);
};

export const addDoctorRate = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .post("/rate/", {
      doctorId: payload.doctorId,
      rating: payload.rating,
      comment: payload.comment,
    })
    .then((response) => {
      // Check if the response indicates success
      if (response.data && response.data.status === "success") {
        onSuccess(response);
      } else {
        // If response doesn't indicate success, treat as error
        const errorMessage = response.data?.message || "An error occurred";
        onError(errorMessage);
      }
    })
    .catch((error) => {
      // Extract the error message
      const errorMessage = error.response?.data?.[0] || error.response?.data?.message || "An error occurred";
      onError(errorMessage); // Pass the string message to onError
    })
    .finally(onComplete);
};

export const getDoctorRate = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get(`/rate/${payload.doctorId}`)
    .then(onSuccess)
    .catch((error) => {
      // Extract the error message
      const errorMessage = error.data?.[0] || "An error occurred"; // Access the first item in the data array
      onError(errorMessage); // Pass the string message to onError
    })
    .finally(onComplete);
};

export const updateDoctorRate = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .patch(`/rate/`, {
      ratingId: payload.ratingId,
      rating: payload.rating,
      comment: payload.comment, // comment is optional
    })
    .then((response) => {
      // Check if the response indicates success
      if (response.data && response.data.status === "success") {
        onSuccess(response);
      } else {
        // If response doesn't indicate success, treat as error
        const errorMessage = response.data?.message || "An error occurred";
        onError(errorMessage);
      }
    })
    .catch((error) => {
      // Extract the error message
      const errorMessage = error.response?.data?.[0] || error.response?.data?.message || "An error occurred";
      onError(errorMessage); // Pass the string message to onError
    })
    .finally(() => {
      onComplete();
    });
};