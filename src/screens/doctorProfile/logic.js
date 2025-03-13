import { useReducer } from "react";
import { reducer } from "../../reducers/reducer";


const INITIAL_STATE = {
  loading: false,
  error: null,
};

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const sendSelectedDateToDB = async (doctorId, clinicId, selectedDate) => {
    if (!doctorId || !clinicId) {
        alert("Doctor ID or Clinic ID is missing!");
        console.error("Missing IDs:", { doctorId, clinicId });
        return;
    }

    if (!selectedDate) {
        alert("Please select a date first!");
        return;
    }

    try {
        console.log("Sending request to API...");

        // Formatting appointment times
        const startTime = `${selectedDate}T10:00:00Z`;
        const endTime = `${selectedDate}T11:00:00Z`;

        const requestBody = {
            patientId: null,  // Using null for patient ID
            doctorId,  
            clinicId,  
            appointmentDate: selectedDate,
            appointmentStartTime: startTime,
            appointmentEndTime: endTime,
            bookingType: "first-Visit",
            notes: "Routine checkup",
        };

        console.log("Request Body:", requestBody);

        const response = await fetch("http://192.168.100.4:3000/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        console.log("Response Status:", response.status);

        let responseData;
        try {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }
        } catch (jsonError) {
            console.error("Failed to parse JSON:", jsonError);
            responseData = await response.text();
        }

        console.log("Response Data:", responseData);

        if (response.ok) {
            alert("Appointment saved successfully!");
        } else {
            alert("Failed to save appointment: " + (responseData.message || responseData));
        }
    } catch (error) {
        console.error("Error saving appointment:", error);
        alert("Network error! Please check your internet connection.");
    }
};



  return {
    state,
    updateState,
    sendSelectedDateToDB,
  };
};

export default Logic;
