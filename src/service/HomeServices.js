import { BASE_URL } from "../helpers/constants/config";
import $axios from "./axios";
export const getDoctors = (payload, onSuccess, onError, onComplete) => {
  $axios
    .get("/doctor/doctors")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};

export const bookDate = (payload, onSuccess, onError, onComplete) => {
  $axios
    .post("/bookings", {
      "doctorId":"67b89f7eb0e5c52b39099a16",
        "clinicId":"67b89f7eb0e5c52b39099a17",
        "appointmentDate":"2025-12-20",
        "appointmentStartTime":"2023-12-15T10:00:00Z",
        "appointmentEndTime":"2023-12-15T11:00:00Z",
        "bookingType":"first-Visit",
        "notes":"Routine checkup"
    })
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};