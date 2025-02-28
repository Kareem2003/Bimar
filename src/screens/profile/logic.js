import { useReducer, useEffect } from "react";
import { reducer } from "../../reducers/reducer";
import { INITIAL_STATE } from "./constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USERINFO } from "../../helpers/constants/staticKeys";
import ACTION_TYPES from "../../reducers/actionTypes";
import { ToastManager } from "../../helpers/ToastManager";
import { updatePatient } from "../../service/AuthServices";

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
 
  const updateState = (payload) => {
    dispatch({ payload });
  };

  const setLoading = (value) => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: 'loading',
        value
      }
    ]);
  };

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(await AsyncStorage.getItem(USERINFO));

      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: 'formData',
          value: {
            userName: userInfo.userName || '',
            userEmail: userInfo.userEmail || '',
            userPhone: userInfo.userPhone || '',
            medicalRecord: {
              bloodType: userInfo.bloodType || ''
            },
            personalRecords: {
              userWeight: userInfo.userWeight?.toString() || '',
              userHeight: userInfo.userHeight?.toString() || '',
              DateOfBirth: userInfo.DateOfBirth || '',
              Gender: userInfo.Gender || '',
              City: userInfo.City || '',
              Area: userInfo.Area || '',
            }
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
      ToastManager.notify('Error loading user data', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(await AsyncStorage.getItem(USERINFO));
      const userId = userInfo.id;

      if (!userId) {
        ToastManager.notify('User ID not found', { type: 'error' });
        return;
      }

      updatePatient(
        userId,
        state.formData,
        async () => {
          const updatedUserInfo = {
            id: userId,
            ...state.formData.personalRecords,
            ...state.formData,
            bloodType: state.formData.medicalRecord.bloodType
          };
          
          await AsyncStorage.setItem(USERINFO, JSON.stringify(updatedUserInfo));
          ToastManager.notify('Profile updated successfully', { type: 'success' });
          await fetchUserInfo();
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: 'currentStep',
              value: 1,
            }
          ]);
        },
        (error) => ToastManager.notify(error || 'Failed to update profile', { type: 'error' }),
        () => setLoading(false)
      );
    } catch (error) {
      ToastManager.notify('An unexpected error occurred', { type: 'error' });
      setLoading(false);
    }
  };

  const handleNext = () => {
    const next = state.currentStep + 1;
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: 'currentStep',
        value: next,
      },
    ]);
  };

  const handleBack = () => {
    if (state.currentStep - 1 < 1) {
      navigation.navigate("Home");
      return;
    }
    const prev = state.currentStep - 1;
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: 'currentStep',
        value: prev,
      },
    ]);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return {
    state,
    updateState,
    handleNext,
    handleBack,
    handleSave
  };
};

export default Logic;
