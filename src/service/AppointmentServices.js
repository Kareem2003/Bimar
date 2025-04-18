import { $securedAxios } from "./axios";

export const allAppointments = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/bookings", payload)
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};

export const cancelAppointment = (
  bookingId,
  onSuccess,
  onError,
  onComplete
) => {
  $securedAxios
    .delete(`/bookings/${bookingId}`)
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
