import { useReducer } from "react";
import { ToastManager } from "../../helpers/ToastManager";
import ACTION_TYPES from "../../reducers/actionTypes";
import { reducer } from "../../reducers/reducer";
import { patientRegister } from "../../service/AuthServices";
import { INITIAL_STATE } from "./constant";
const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const handleRegister = () => {
    patientRegister(
      state.formData,
      (res) => {
        ToastManager.notify("User Created successfully", { type: "success" });
        navigation.navigate("Login");
      },
      (error) => {
        if (error.data) {
          const errorMessage = error.data.join("\n");
          ToastManager.notify(errorMessage, { type: "error" });
        } else {
          ToastManager.notify("An unknown error occurred", {
            type: "error",
          });
        }
      }
    );
  };

  const handleChange = (field, value) => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: `formData.${field}`,
        value: value,
      },
    ]);
  };

  const togglePasswordVisibility = () => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "isPasswordVisible",
        value: !state.isPasswordVisible,
      },
    ]);
  };

  const handleDateOfBirthConfirm = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD

    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "formData.personalRecords.DateOfBirth",
        value: formattedDate,
      },
    ]);
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "isDatePickerVisible",
        value: false,
      },
    ]);
  };

  return {
    state,
    updateState,
    handleChange,
    togglePasswordVisibility,
    handleDateOfBirthConfirm,
    handleRegister,
  };
};

export default Logic;
