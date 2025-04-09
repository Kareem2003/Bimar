// useUserData.js - Custom hook for working with user data

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USERINFO } from './constants/staticKeys';
import { subscribeToUserData, USER_DATA_EVENTS } from './UserDataManager';

/**
 * Custom hook that provides access to user data and subscribes to updates
 * @returns {Object} Object containing user data and related functions
 */
const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user data initially
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const storedData = await AsyncStorage.getItem(USERINFO);
        if (storedData) {
          setUserData(JSON.parse(storedData));
        }
      } catch (err) {
        console.error('Error loading user data:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Subscribe to user data updates
  useEffect(() => {
    // Profile updates subscription
    const profileUnsubscribe = subscribeToUserData(
      USER_DATA_EVENTS.PROFILE_UPDATED,
      (updatedData) => {
        console.log('useUserData hook received PROFILE_UPDATED:', updatedData);
        setUserData(updatedData);
      }
    );

    // Image updates subscription
    const imageUnsubscribe = subscribeToUserData(
      USER_DATA_EVENTS.IMAGE_UPDATED,
      (updatedData) => {
        console.log('useUserData hook received IMAGE_UPDATED:', updatedData);
        setUserData(updatedData);
      }
    );

    // Cleanup subscriptions
    return () => {
      profileUnsubscribe();
      imageUnsubscribe();
    };
  }, []);

  return {
    userData,
    loading,
    error,
    // Convenience getters for common user data
    userName: userData?.userName || '',
    userEmail: userData?.userEmail || '',
    profileImage: userData?.profileImage || '',
    // Add other getters as needed
  };
};

export default useUserData; 