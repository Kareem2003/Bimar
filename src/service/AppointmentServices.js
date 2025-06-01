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
    .patch(`/bookings/${bookingId}`)
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};

export const getReceiptDetails = (appointmentId, onSuccess, onError, onComplete) => {
  $securedAxios
    .get(`/bookings/receipt/${appointmentId}`)
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};