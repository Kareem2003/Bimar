import { useReducer, useEffect } from "react";
import { reducer } from "../../reducers/reducer";
import { INITIAL_STATE } from "./constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USERINFO } from "../../helpers/constants/staticKeys";
import ACTION_TYPES from "../../reducers/actionTypes";
import { ToastManager } from "../../helpers/ToastManager";
import { updatePatient } from "../../service/AuthServices";
import { uploadImage } from "../../service/profileService";
import { AUTHENTICATION_TOKEN } from "../../helpers/constants/staticKeys";
import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { updateUserProfile, updateUserProfileImage, subscribeToUserData, USER_DATA_EVENTS } from "../../helpers/UserDataManager";

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateState = (payload) => {
    console.log("🛠 updateState called with:", payload);
    // Check if payload is a function (used for state updates)
    if (typeof payload === 'function') {
      const currentState = { ...state };
      const newPayload = payload(currentState);
      dispatch({ payload: newPayload });
      return;
    }
    
    // Handle regular payload (array of actions)
    if (Array.isArray(payload)) {
      payload.forEach((item) => {
        if (item.prop === "profileImage") {
          console.log("🔄 Updating profileImage:", item.value);
        }
      });
      dispatch({ payload });
    } else {
      console.error("Invalid payload type:", typeof payload);
    }
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

  const loadUserData = async () => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(await AsyncStorage.getItem(USERINFO));
      console.log("userInfo", userInfo);

      if (!userInfo) {
        ToastManager.notify('Error loading user data', { type: 'error' });
        return;
      }

      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: 'formData',
          value: {
            userName: userInfo.userName || '',
            userEmail: userInfo.userEmail || '',
            userPhone: userInfo.userPhone || '',
            profileImage: userInfo.profileImage || '',
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
          prop: 'profileImage',
          value: userInfo.profileImage || ''
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
      const userId = userInfo?.id;

      if (!userId) {
        ToastManager.notify('User ID not found', { type: 'error' });
        return;
      }

      const updatePayload = {
        userName: state.formData.userName,
        userEmail: state.formData.userEmail,
        userPhone: state.formData.userPhone,
        profileImage: state.profileImage,
        personalRecords: {
          userHeight: parseInt(state.formData.personalRecords?.userHeight || "0"),
          userWeight: parseInt(state.formData.personalRecords?.userWeight || "0"),
          DateOfBirth: state.formData.personalRecords?.DateOfBirth || "",
          Gender: state.formData.personalRecords?.Gender || "",
          City: state.formData.personalRecords?.City || "",
          Area: state.formData.personalRecords?.Area || "",
        },
        medicalRecord: {
          bloodType: state.formData.medicalRecord?.bloodType || ""
        }
      };

      console.log("Update payload:", updatePayload);

      updatePatient(
        userId,
        updatePayload,
        async (updatedData) => {
          console.log("Profile update successful", updatedData);
          
          // Use UserDataManager to update and notify all components
          await updateUserProfile({
            userName: state.formData.userName,
            userEmail: state.formData.userEmail,
            userPhone: state.formData.userPhone,
            profileImage: state.profileImage,
            ...state.formData.personalRecords,
            bloodType: state.formData.medicalRecord?.bloodType
          });
          
          ToastManager.notify('Profile updated successfully', { type: 'success' });
          
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: 'currentStep',
              value: 1
            }
          ]);
          
          setLoading(false);
        },
        (error) => {
          console.error("Profile update error:", error);
          ToastManager.notify(error || 'Failed to update profile', { type: 'error' });
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("handleSave error:", error);
      ToastManager.notify('An error occurred while saving', { type: 'error' });
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

  const handleUpload = async (imageUri) => {
    if (!imageUri) {
      ToastManager.notify("No image selected", { type: "error" });
      return;
    }

    // Use array-based action instead of function
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: 'loading',
        value: true
      }
    ]);

    try {
      await uploadImage(
        imageUri,
        async (imageUrl) => {
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: 'formData.profileImage',
              value: imageUrl
            },
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: 'profileImage',
              value: imageUrl
            }
          ]);
          
          // Use UserDataManager to update profile image and notify all components
          await updateUserProfileImage(imageUrl);
          
          ToastManager.notify("Profile picture updated successfully!", { type: "success" });
        },
        (error) => {
          ToastManager.notify(error, { type: "error" });
        }
      );
    } catch (error) {
      ToastManager.notify("Failed to upload image. Please try again.", { type: "error" });
    } finally {
      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: 'loading',
          value: false
        }
      ]);
    }
  };

  const handleImageSelect = async () => {
    try {
      // Request permission first
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please allow access to your photo library to select a profile picture.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      console.log("Opening image picker...");
      
      // Launch image picker specifically for the photo library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      console.log('Image picker result:', result);
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        console.log("Selected image:", selectedImage.uri);
        await handleUpload(selectedImage.uri);
      } else {
        console.log("No image selected or picker canceled");
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      ToastManager.notify("Error selecting image. Please try again.", { type: "error" });
      
      Alert.alert(
        "Error",
        "Failed to select image. Would you like to try again?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Try Again",
            onPress: () => {
              setTimeout(() => {
                handleImageSelect();
              }, 500);
            }
          }
        ]
      );
    }
  };

  // Subscribe to user data updates
  useEffect(() => {
    // Subscribe to profile updates
    const profileUnsubscribe = subscribeToUserData(
      USER_DATA_EVENTS.PROFILE_UPDATED, 
      (updatedData) => {
        console.log('Profile logic received PROFILE_UPDATED event:', updatedData);
        
        // Update local state with new user data
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: 'userName',
            value: updatedData.userName || ''
          },
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: 'userEmail',
            value: updatedData.userEmail || ''
          },
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: 'formData',
            value: {
              userName: updatedData.userName || '',
              userEmail: updatedData.userEmail || '',
              userPhone: updatedData.userPhone || '',
              profileImage: updatedData.profileImage || '',
              medicalRecord: {
                bloodType: updatedData.bloodType || ''
              },
              personalRecords: {
                userWeight: updatedData.userWeight?.toString() || '',
                userHeight: updatedData.userHeight?.toString() || '',
                DateOfBirth: updatedData.DateOfBirth || '',
                Gender: updatedData.Gender || '',
                City: updatedData.City || '',
                Area: updatedData.Area || '',
              }
            }
          }
        ]);
      }
    );
    
    // Subscribe to image updates
    const imageUnsubscribe = subscribeToUserData(
      USER_DATA_EVENTS.IMAGE_UPDATED, 
      (updatedData) => {
        console.log('Profile logic received IMAGE_UPDATED event:', updatedData);
        
        // Update profile image in state
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: 'profileImage',
            value: updatedData.profileImage || ''
          },
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: 'formData.profileImage',
            value: updatedData.profileImage || ''
          }
        ]);
      }
    );
    
    // Cleanup subscriptions on unmount
    return () => {
      profileUnsubscribe();
      imageUnsubscribe();
    };
  }, []);

  useEffect(() => {
    loadUserData();
  }, []);

  return {
    state,
    updateState,
    handleNext,
    handleBack,
    handleSave,
    handleUpload,
    handleImageSelect,
  };
};

export default Logic;