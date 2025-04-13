import $securedAxios from "./axios";

export const bookDate = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .post("/bookings", payload)
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
