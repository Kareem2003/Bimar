import { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { ToastManager } from "../../helpers/ToastManager";
import { appRate } from "../../service/rateServices";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USERINFO, AUTHENTICATION_TOKEN } from "../../helpers/constants/staticKeys";

const Logic = (navigation) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [userId, setUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await AsyncStorage.getItem(USERINFO);
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUserId(parsedData.id);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        ToastManager.notify("Error fetching user information", { type: "error" });
      }
    };
    fetchUserInfo();
  }, []);

  const getRatingEmoji = (rating) => {
    switch (rating) {
      case 1: return '😢';
      case 2: return '😕';
      case 3: return '😐';
      case 4: return '😊';
      case 5: return '😍';
      default: return '';
    }
  };

  const getRatingLabel = (rating) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return '';
    }
  };

  const handleStarPress = (starValue) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    setRating(starValue);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    if (rating === 0) {
      ToastManager.notify("Please select a rating", { type: "error" });
      return;
    }

    if (!userId) {
      ToastManager.notify("User information not found", { type: "error" });
      return;
    }

    try {
      setIsSubmitting(true);

      appRate({
        rating: rating,
        comment: feedback
      }, 
      () => {
        ToastManager.notify("Thank you for your feedback!", { type: "success" });
        navigation.goBack();
      },
      (error) => {
        ToastManager.notify(error, { type: "error" });
        setIsSubmitting(false);
      });
    } catch (error) {
      console.error('Error during rating submission:', error);
      ToastManager.notify("Error submitting rating", { type: "error" });
      setIsSubmitting(false);
    }
  };

  return {
    rating,
    feedback,
    setFeedback,
    scaleAnim,
    getRatingEmoji,
    getRatingLabel,
    handleStarPress,
    handleSubmit,
    isSubmitting
  };
};

export default Logic;
