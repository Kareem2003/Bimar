// filepath: e:\Bimar\src\components\ProfilePicture.js
import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../helpers/constants/config';

const ProfilePicture = ({ 
  profileImage, 
  onImageChange, 
  profileName, 
  profileHandle, 
  layout = 'center', // Default layout is 'center'
  size = 120, // Default size
  clickable = true // Default clickable is true
}) => {
  const isRowLayout = layout === 'row';

  // Choose the wrapper style based on layout
  const wrapperStyle = isRowLayout ? styles.contentWrapperRow : styles.contentWrapperCenter;
  // Choose the text container style based on layout
  const textContainerStyle = isRowLayout ? styles.textContainerRow : styles.textContainerCenter;
  // Choose text alignment
  const textAlignStyle = { textAlign: isRowLayout ? 'left' : 'center' }; 

  // Dynamic image container style based on size
  const imageContainerDynamicStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  // Dynamic placeholder icon size
  const placeholderIconSize = size * 0.66; // Adjust multiplier as needed

  // Dynamic camera icon size and position
  const cameraIconSize = size * 0.16;
  const cameraIconContainerSize = size * 0.3;
  const cameraIconContainerPosition = {
    bottom: size * 0.02,
    right: size * 0.02,
    width: cameraIconContainerSize,
    height: cameraIconContainerSize,
    borderRadius: cameraIconContainerSize / 2,
  }

  // Safe handler for image change
  const handlePress = () => {
    try {
      if (onImageChange) {
        // Show options to user
        Alert.alert(
          "Change Profile Picture",
          "Choose a photo from your gallery",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Open Gallery",
              onPress: () => {
                try {
                  onImageChange();
                } catch (error) {
                  console.error('Error calling image change handler:', error);
                  Alert.alert(
                    'Error',
                    'Unable to open photo gallery. Please try again later.',
                    [{ text: 'OK' }]
                  );
                }
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error handling image change:', error);
      Alert.alert(
        'Error',
        'Unable to open photo gallery. Please try again later.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={wrapperStyle}> 
        <TouchableOpacity 
          onPress={clickable ? handlePress : null} // Use safe handler
          style={styles.imageWrapper}
          disabled={!clickable} // Disable touchable opacity if not clickable
        >
          {/* Apply dynamic size to imageContainer */}
          <View style={[styles.imageContainer, imageContainerDynamicStyle]}>
            {profileImage ? (
              <Image
                source={{ uri: `${BASE_URL}/${profileImage}?t=${new Date().getTime()}` }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.placeholderContainer}>
                {/* Use dynamic icon size */}
                <Icon name="person-circle-outline" size={placeholderIconSize} color="#16423C" /> 
              </View>
            )}
            {/* Only show camera icon if clickable */}
            {clickable && (
              <View style={[styles.cameraIconContainer, cameraIconContainerPosition]}>
                <Icon name="camera" size={cameraIconSize} color="#fff" />
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* Profile Name and Handle */}
        <View style={textContainerStyle}>
          <Text style={[styles.profileName, textAlignStyle]}>{profileName}</Text>
          <Text style={[styles.profileHandle, textAlignStyle]}>{profileHandle}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  // Styles for Centered Layout
  contentWrapperCenter: {
    alignItems: 'center', // Center items vertically
    width: '100%',
  },
  textContainerCenter: {
    alignItems: 'center',
    marginTop: 10, // Add margin back for center layout
  },
  // Styles for Row Layout
  contentWrapperRow: { 
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textContainerRow: {
    marginLeft: 15, // Add left margin for row layout
    flex: 1, 
  },
  // Common styles
  imageWrapper: {
    // Shared image wrapper styles if any, otherwise can be removed if not needed
    // If layout='center', marginBottom might be needed here or on contentWrapperCenter
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#f5f5f5',
    overflow: 'visible',
    alignItems: 'center', // Center placeholder icon
    justifyContent: 'center', // Center placeholder icon
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 1000, // Ensure it's always circular
    borderWidth: 2,
    borderColor: '#fff',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 1000, // Ensure it's always circular
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#fff',
  },
  cameraIconContainer: {
    position: 'absolute',
    backgroundColor: '#16423C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292929',
  },
  profileHandle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#858585',
  },
});

export default ProfilePicture;
