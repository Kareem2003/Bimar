import { useContext, useEffect, useReducer } from "react";
import { reducer } from "../../reducers/reducer";
import { INITIAL_STATE } from "./constant";
import { getDoctors } from "../../service/HomeServices";
import { Context } from "../../contexts/appContext";
import ACTION_TYPES from "../../reducers/actionTypes";
import { ToastManager } from "../../helpers/ToastManager";

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { updateState: updateCtxState } = useContext(Context);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const handlePress = (iconName) => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "activeIcon",
        value: iconName,
      },
    ]);

    if (navigation) {
      switch (iconName) {
        case "gear":
          navigation.replace("Settings");
          break;
        case "envelope":
          navigation.replace("Messages");
          break;
        case "home":
          navigation.replace("Home");
          break;
        case "clipboard":
          navigation.replace("Appointments");
          break;
        case "user":
          navigation.replace("Profile");
          break;
      }
    }
  };

  const navigateToDoctors = () => {
    if (navigation) {
      navigation.navigate("Doctors");
    }
  };
  const fetchDoctors = () => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "loading",
        value: true,
      },
    ]);

    getDoctors(
      {},
      (response) => {
        if (response?.data?.data) {
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "doctors",
              value: response.data.data,
            },
          ]);
        } else {
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "error",
              value: "Invalid data format received",
            },
          ]);
        }
      },
      (error) => {
        ToastManager.notify("Error fetching doctors", {
          type: "error",
        });
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "error",
            value: error?.message || "Failed to fetch doctors",
          },
        ]);
      },
      () => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "loading",
            value: false,
          },
        ]);
      }
    );
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return {
    state,
    updateState,
    handlePress,
    navigateToDoctors,
  };
};

export default Logic;
