import {
  useContext,
  useEffect,
  useReducer,
  useCallback,
  useState,
} from "react";
import { reducer } from "../../reducers/reducer";
import { INITIAL_STATE } from "./constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AUTHENTICATION_TOKEN,
  USERINFO,
} from "../../helpers/constants/staticKeys";
import { Context } from "../../contexts/appContext";
import ACTION_TYPES from "../../reducers/actionTypes";

const maritalStatus = [
  { label: "Bachelor", value: "0" },
  { label: "Married", value: "1" },
];
const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
 
  const updateState = (payload) => {
    dispatch({ payload });
  };

  const fetchUserInfo = async () => {
    try {
      const userInfo = JSON.parse(await AsyncStorage.getItem(USERINFO));

      // Update both the top-level state and formData
      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: 'formData',
          value: {
            ...state.formData,
            userName: userInfo.userName || '',
            userEmail: userInfo.userEmail || '',
            userPhone: userInfo.userPhone || '',
            userWeight: userInfo.userWeight?.toString() || '',
            userHeight: userInfo.userHeight?.toString() || ''
          }
        },
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: 'userName',
          value: userInfo.userName || ''
        },
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: 'userEmail',
          value: userInfo.userEmail || ''
        },
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: 'userPhone',
          value: userInfo.userPhone || ''
        }
      ]);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleNext = () => {
    const next = state.currentStep + 1;
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: `currentStep`,
        value: next,
      },
    ]);
  };

  const handleBack = () => {
    if (state.currentStep-1 < 1) {
      navigation.navigate("Home");
      return;
    }
    const prev = state.currentStep - 1;
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: `currentStep`,
        value: prev,
      },
    ]);
  };

  return {
    state,
    updateState,
    handleNext,
    handleBack,
    maritalStatus,
  };
};

export default Logic;
