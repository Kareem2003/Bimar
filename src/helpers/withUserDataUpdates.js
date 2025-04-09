// withUserDataUpdates.js - Higher-order component to add user data subscription to any component

import React, { useEffect } from 'react';
import { subscribeToUserData, USER_DATA_EVENTS } from './UserDataManager';

// Higher-order component that adds user data update capabilities to any component
const withUserDataUpdates = (WrappedComponent, options = {}) => {
  // Set default options
  const {
    subscribeToProfileUpdates = true,
    subscribeToImageUpdates = true,
    onProfileUpdate = null,
    onImageUpdate = null,
  } = options;

  // Return a new component with the subscription logic built in
  const WithUserDataUpdates = (props) => {
    // Set up user data subscriptions
    useEffect(() => {
      const subscriptions = [];

      // Subscribe to profile updates if enabled
      if (subscribeToProfileUpdates) {
        const profileUnsubscribe = subscribeToUserData(
          USER_DATA_EVENTS.PROFILE_UPDATED,
          (updatedData) => {
            console.log(`${WrappedComponent.displayName || WrappedComponent.name || 'Component'} received PROFILE_UPDATED:`, updatedData);
            
            // Call the custom handler if provided
            if (onProfileUpdate) {
              onProfileUpdate(updatedData, props);
            }
          }
        );
        subscriptions.push(profileUnsubscribe);
      }

      // Subscribe to image updates if enabled
      if (subscribeToImageUpdates) {
        const imageUnsubscribe = subscribeToUserData(
          USER_DATA_EVENTS.IMAGE_UPDATED,
          (updatedData) => {
            console.log(`${WrappedComponent.displayName || WrappedComponent.name || 'Component'} received IMAGE_UPDATED:`, updatedData);
            
            // Call the custom handler if provided
            if (onImageUpdate) {
              onImageUpdate(updatedData, props);
            }
          }
        );
        subscriptions.push(imageUnsubscribe);
      }

      // Cleanup subscriptions on unmount
      return () => {
        subscriptions.forEach(unsubscribe => unsubscribe());
      };
    }, [props]);

    // Render the wrapped component with all original props
    return <WrappedComponent {...props} />;
  };

  // Set display name for better debugging
  WithUserDataUpdates.displayName = `WithUserDataUpdates(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithUserDataUpdates;
};

export default withUserDataUpdates; 