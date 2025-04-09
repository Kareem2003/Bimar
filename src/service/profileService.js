import $axios from "./axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { AUTHENTICATION_TOKEN, USERINFO } from "../helpers/constants/staticKeys";
import { ToastManager } from "../helpers/ToastManager";
import axios from "axios";
import { BASE_URL } from "../helpers/constants/config";
import { Platform } from "react-native";


export const uploadImage = async (imageUri, success, error, complete) => {
  console.log("uploadImage service called with URI:", imageUri); 
  
  try {
    const token = await AsyncStorage.getItem(AUTHENTICATION_TOKEN);
    
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const formData = new FormData();
    
    // Extract file name from URI and handle platform differences
    const uriParts = imageUri.split('/');
    let fileName = uriParts[uriParts.length - 1] || `profile-${Date.now()}.jpg`;
    
    // Remove query parameters if any
    if (fileName.includes('?')) {
      fileName = fileName.split('?')[0];
    }
    
    // Force extension if not present
    if (!fileName.includes('.')) {
      fileName = `${fileName}.jpg`;
    }
    
    // Get mime type based on file extension
    const fileExtension = (fileName.split('.').pop() || '').toLowerCase();
    let mimeType = 'image/jpeg'; // Default
    
    if (fileExtension === 'png') {
      mimeType = 'image/png';
    } else if (fileExtension === 'gif') {
      mimeType = 'image/gif';
    } else if (fileExtension === 'webp') {
      mimeType = 'image/webp';
    }
    
    // Handle file:// prefix for iOS
    const finalUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
    
    // Create the file object for upload
    formData.append('profileImage', {
      uri: finalUri,
      type: mimeType,
      name: fileName
    });

    console.log("Making upload request to server with:", fileName, mimeType);
    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Cookie': `jwt=${token}`
      },
      method: 'PATCH',
      url: `${BASE_URL}/patientsAuth/update-profile-picture`,
      data: formData,
      timeout: 10000,
      withCredentials: true
    };
    
    // console.log("Request config:", { ... }); // Remove log (potentially sensitive)

    const response = await axios(config);
    // console.log("Upload response:", response.data); // Remove log

    if (response.data && response.data.status === 'success') {
      const imageUrl = response.data.data.profileImage;
      // console.log("New image URL:", imageUrl); // Remove log
      
      // Update AsyncStorage with the new image URL
      const userInfo = JSON.parse(await AsyncStorage.getItem(USERINFO));
      if (userInfo) {
        userInfo.profileImage = imageUrl;
        await AsyncStorage.setItem(USERINFO, JSON.stringify(userInfo));
        // console.log("Updated user info in AsyncStorage"); // Remove log
      }
      
      success?.(imageUrl);
    } else {
      throw new Error(response.data?.message || 'Failed to upload image');
    }
  } catch (err) {
    console.error("Upload error:", err.response?.data || err.message); // Keep error log
    error?.(err.response?.data?.message || err.message || 'Failed to upload image');
  } finally {
    complete?.();
  }
};


