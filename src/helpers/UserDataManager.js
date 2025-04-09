// UserDataManager.js - Manages user data across the app and provides update notifications

import AsyncStorage from '@react-native-async-storage/async-storage';
import { USERINFO } from './constants/staticKeys';
import { NativeEventEmitter, NativeModules, DeviceEventEmitter, Platform } from 'react-native';

// Create a simple event emitter class for React Native
class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  addListener(eventType, listener) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(listener);
    return { remove: () => this.removeListener(eventType, listener) };
  }

  on(eventType, listener) {
    return this.addListener(eventType, listener);
  }

  removeListener(eventType, listener) {
    if (!this.listeners[eventType]) {
      return;
    }
    
    const index = this.listeners[eventType].indexOf(listener);
    if (index !== -1) {
      this.listeners[eventType].splice(index, 1);
    }
  }

  off(eventType, listener) {
    return this.removeListener(eventType, listener);
  }

  emit(eventType, ...args) {
    if (!this.listeners[eventType]) {
      return;
    }
    
    this.listeners[eventType].forEach(listener => {
      try {
        listener(...args);
      } catch (error) {
        console.error(`Error emitting ${eventType} event:`, error);
      }
    });
  }

  // Utility method to remove all listeners
  removeAllListeners(eventType) {
    if (eventType) {
      delete this.listeners[eventType];
    } else {
      this.listeners = {};
    }
  }
}

// Create an event emitter for user data changes
const userDataEmitter = new EventEmitter();

// Event types
export const USER_DATA_EVENTS = {
  PROFILE_UPDATED: 'PROFILE_UPDATED',
  IMAGE_UPDATED: 'IMAGE_UPDATED',
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  USER_LOGGED_OUT: 'USER_LOGGED_OUT'
};

// Update user data in AsyncStorage and notify listeners
export const updateUserData = async (userData, eventType = USER_DATA_EVENTS.PROFILE_UPDATED) => {
  try {
    // Make sure we have the current user data
    const currentUserData = await AsyncStorage.getItem(USERINFO);
    if (!currentUserData) {
      console.error('No user data found to update');
      return false;
    }

    // Parse current data and merge with updates
    const parsedCurrentData = JSON.parse(currentUserData);
    const mergedData = { ...parsedCurrentData, ...userData };
    
    // Save updated data
    await AsyncStorage.setItem(USERINFO, JSON.stringify(mergedData));
    
    // Notify listeners about the update
    userDataEmitter.emit(eventType, mergedData);
    console.log(`UserDataManager: Emitted ${eventType} event with updated data`);
    
    return true;
  } catch (error) {
    console.error('Error updating user data:', error);
    return false;
  }
};

// Subscribe to user data changes
export const subscribeToUserData = (eventType, callback) => {
  const subscription = userDataEmitter.on(eventType, callback);
  
  // Return an unsubscribe function
  return () => {
    subscription.remove();
  };
};

// Get current user data
export const getCurrentUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem(USERINFO);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Update specific user profile fields
export const updateUserProfile = async (profileData) => {
  return updateUserData(profileData, USER_DATA_EVENTS.PROFILE_UPDATED);
};

// Update user profile image
export const updateUserProfileImage = async (imageUrl) => {
  return updateUserData({ profileImage: imageUrl }, USER_DATA_EVENTS.IMAGE_UPDATED);
}; 