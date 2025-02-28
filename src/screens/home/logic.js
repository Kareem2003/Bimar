import { useContext, useEffect, useReducer } from "react";
import { reducer } from "../../reducers/reducer";
import { INITIAL_STATE } from "./constant";
import { getDoctors } from "../../service/HomeServices";
import { Context } from "../../contexts/appContext";
import ACTION_TYPES from "../../reducers/actionTypes";
import { ToastManager } from "../../helpers/ToastManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USERINFO } from "../../helpers/constants/staticKeys";

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { updateState: updateCtxState } = useContext(Context);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const fetchUserInfo = async () => {
    const userInfo = JSON.parse(await AsyncStorage.getItem(USERINFO));
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "userName",
        value: userInfo.userName,
      },
    ]);
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
          navigation.navigate("Settings");
          break;
        case "envelope":
          navigation.navigate("Messages");
          break;
        case "home":
          navigation.navigate("Home");
          break;
        case "clipboard":
          navigation.navigate("Appointments");
          break;
        case "user":
          navigation.navigate("Profile");
          break;
      }
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
    fetchUserInfo();
  }, []);

  return {
    state,
    updateState,
    handlePress,
  };
};

export default Logic;
