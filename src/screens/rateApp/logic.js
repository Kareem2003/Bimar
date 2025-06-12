import { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { ToastManager } from "../../helpers/ToastManager";
import { appRate, getUserRating, updateUserRating } from "../../service/rateServices";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USERINFO, AUTHENTICATION_TOKEN } from "../../helpers/constants/staticKeys";

const Logic = (navigation) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [userId, setUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasExistingRating, setHasExistingRating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const fetchExistingRating = () => {
      getUserRating(
        (response) => {
          // console.log('=== NEW getUserRating response ===');
          // console.log('response.data:', response.data);
          
          // Based on the logs, the structure is: response.data.data contains {rating, comment}
          if (response.data && response.data.data && response.data.data.rating !== undefined) {
            const ratingData = response.data.data;
            // console.log('✅ Found rating data:', ratingData);
            
            setRating(ratingData.rating);
            setFeedback(ratingData.comment || '');
            setHasExistingRating(true);
            
            // console.log('✅ Set rating to:', ratingData.rating);
            // console.log('✅ Set feedback to:', ratingData.comment);
            // console.log('✅ Set hasExistingRating to: true');
          } else {
            console.log('❌ No rating data found');
            setHasExistingRating(false);
          }
          
          setIsLoading(false);
        },
        (error) => {
          console.log('❌ getUserRating error:', error);
          setIsLoading(false);
          setHasExistingRating(false);
        },
        () => {
          // console.log('getUserRating completed');
        }
      );
    };

    fetchExistingRating();
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

      const ratingService = hasExistingRating ? updateUserRating : appRate;
      const serviceType = hasExistingRating ? 'UPDATE (PUT)' : 'CREATE (POST)';
      
      // console.log(`🚀 Submitting rating using ${serviceType}`);
      // console.log('📊 Rating data:', { rating, comment: feedback });
      // console.log('🔄 hasExistingRating:', hasExistingRating);
      
      ratingService({
        rating: rating,
        comment: feedback
      }, 
      (response) => {
        // console.log('✅ Rating submission successful:', response);
        ToastManager.notify("Thank you for your feedback!", { type: "success" });
        navigation.goBack();
      },
      (error) => {
        // console.log('❌ Rating submission error:', error);
        // console.log('❌ Error type:', typeof error);
        // console.log('❌ Error details:', JSON.stringify(error, null, 2));
        ToastManager.notify(error, { type: "error" });
        setIsSubmitting(false);
      });
    } catch (error) {
      console.error('💥 Exception during rating submission:', error);
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
    isSubmitting,
    hasExistingRating,
    isLoading
  };
};

export default Logic;
