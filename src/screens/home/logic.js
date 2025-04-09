import { useContext, useEffect, useReducer } from "react";
import { reducer } from "../../reducers/reducer";
import { INITIAL_STATE } from "./constant";
import { getDoctors } from "../../service/HomeServices";
import { Context } from "../../contexts/appContext";
import ACTION_TYPES from "../../reducers/actionTypes";
import { ToastManager } from "../../helpers/ToastManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USERINFO } from "../../helpers/constants/staticKeys";
import { subscribeToUserData, USER_DATA_EVENTS } from "../../helpers/UserDataManager";

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { updateState: updateCtxState } = useContext(Context);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const fetchUserInfo = async () => {
    try {
      const userInfo = JSON.parse(await AsyncStorage.getItem(USERINFO));
      if (userInfo) {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "userName",
            value: userInfo.userName || "",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Subscribe to user data updates
  useEffect(() => {
    // Subscribe to profile updates
    const profileUnsubscribe = subscribeToUserData(
      USER_DATA_EVENTS.PROFILE_UPDATED,
      (updatedData) => {
        console.log('Home logic received profile update:', updatedData.userName);
        
        // Update the userName in state
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "userName",
            value: updatedData.userName || "",
          },
        ]);
      }
    );
    
    // Cleanup subscription on unmount
    return () => {
      profileUnsubscribe();
    };
  }, []);

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

  return { state, updateState };
};

export default Logic;
