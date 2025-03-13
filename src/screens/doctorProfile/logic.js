import { useReducer, useEffect } from "react";
import { reducer } from "../../reducers/reducer";
import { bookDate } from "../../service/HomeServices";
import { INITIAL_STATE } from "./constant";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AUTHENTICATION_TOKEN } from "../../helpers/constants/staticKeys";

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const sendSelectedDateToDB = async (doctorId, clinicId, selectedDate) => {
    if (!doctorId || !clinicId) {
      alert("Doctor ID, Clinic ID, or Patient ID is missing!");
      return;
    }

    if (!selectedDate) {
      alert("Please select a date first!");
      return;
    }

    const startTime = `${selectedDate}T10:00:00Z`;
    const endTime = `${selectedDate}T11:00:00Z`;
    const requestBody = {
      doctorId,
      clinicId,
      appointmentDate: selectedDate,
      appointmentStartTime: startTime,
      appointmentEndTime: endTime,
      bookingType: "first-Visit",
      notes: "Routine checkup",
    };

    console.log("Request Body:", requestBody);

    bookDate(
      requestBody,
      (response) => {
        console.log("✅ Response Data:", response);
        if (response.status === "success") {
          alert("🎉 Appointment saved successfully!");
        } else {
          alert(
            "⚠️ Failed to save appointment: " +
              (response.message || "Unknown error")
          );
        }
      },
      (error) => {
        console.error("❌ Error saving appointment:", error);
        alert(
          "⚠️ Failed to save appointment: " +
            (error.message || "Network error!")
        );
      },
      () => {
        console.log("ℹ️ Booking request completed.");
      }
    );

    // try {
    //   // Get the authentication token
    //   const token = await AsyncStorage.getItem(AUTHENTICATION_TOKEN);

    //   if (!token) {
    //     alert("Please login to book an appointment");
    //     navigation.navigate('login');
    //     return;
    //   }

    //   const response = await fetch("http://192.168.100.4:3000/bookings", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": `Bearer ${token}` // Add the token to headers
    //     },
    //     body: JSON.stringify({
    //       doctorId: doctorId,
    //       selectedDate: selectedDate,
    //     }),
    //   });

    //   const data = await response.json();
    //   if (response.ok) {
    //     alert("Appointment saved successfully!");
    //   } else {
    //     alert("Failed to save appointment: " + data.message);
    //   }
    // } catch (error) {
    //   console.error("Error saving appointment:", error);
    //   alert("Something went wrong. Please try again.");
    // }
  };

  useEffect(() => {
    bookDate(
      {},
      (response) => {
        console.log("✅ Response Data:", response);
        
      },
      (error) => {
        console.error("❌ Error saving appointment:", error);
        alert(
          "⚠️ Failed to save appointment: " +
            (error.message || "Network error!")
        );
      },
      () => {
        console.log("ℹ️ Booking request completed.");
      }
    );
  }, []);

  return {
    state,
    updateState,
    sendSelectedDateToDB,
  };
};

export default Logic;
