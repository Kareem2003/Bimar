import { useState } from 'react';
import { Animated } from 'react-native';
import { ToastManager } from "../../helpers/ToastManager";

const Logic = (navigation) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const scaleAnim = new Animated.Value(1);

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

  const handleSubmit = () => {
    if (rating === 0) {
      ToastManager.notify("Please select a rating", { type: "error" });
      return;
    }
    
    ToastManager.notify("Thank you for your feedback!", { type: "success" });
    navigation.goBack();
  };

  return {
    rating,
    feedback,
    setFeedback,
    scaleAnim,
    getRatingEmoji,
    getRatingLabel,
    handleStarPress,
    handleSubmit
  };
};

export default Logic;
