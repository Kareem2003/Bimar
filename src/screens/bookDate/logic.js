import { useReducer, useEffect } from "react";
import { INITIAL_STATE } from "./constant";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_DATE":
      return { ...state, selectedDate: action.payload };

    case "UPDATE_BOOKINGS":
      return {
        ...state,
        bookings: {
          ...state.bookings,
          [action.payload.date]: action.payload.count,
        },
      };

    default:
      return state;
  }
};

const Logic = (navigation, route) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateState = (type, payload) => {
    dispatch({ type, payload });
  };

  const handleNext = () => {
    if (!state.selectedDate) {
      alert("Please select a date before proceeding.");
      return;
    }
    if (state.bookings[state.selectedDate] >= 10) {
      alert("This date is fully booked. Please choose another date.");
      return;
    }
    navigation.navigate("BookNow");
  };

  const handleBooking = (date) => {
    updateState("UPDATE_DATE", date);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
  }, [state.selectedDate]);

  return {
    state,
    handleNext,
    handleBooking,
    handleBack,
  };
};

export default Logic;
