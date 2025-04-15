import $axios from "./axios";

export const allAppointments = (payload, onSuccess, onError, onComplete) => {
  $axios
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
  $axios
    .patch(`/bookings/${bookingId}`)
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
