import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Animated } from 'react-native';
import { styles } from './style';
import Header from "../../components/Header";
import { primaryDark, primaryLight } from "../../styles/colors";
import { ThemeContext } from "../../contexts/themeContext";
import Logic from '../../screens/rateApp/logic';

const RateApp = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const {
    rating,
    feedback,
    setFeedback,
    scaleAnim,
    getRatingEmoji,
    getRatingLabel,
    handleStarPress,
    handleSubmit
  } = Logic(navigation);

  return (
    <View style={{ flex: 1, backgroundColor: isDarkTheme ? primaryDark : primaryLight }}>
      <View style={{ backgroundColor: isDarkTheme ? primaryDark : primaryLight }}>
        <Header
          marginTop={50}
          header={"Rate App"}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={[styles.termsContainer, { backgroundColor: isDarkTheme ? primaryDark : primaryLight }]}>

        <View style={[styles.rateSection, { marginTop: 30 }]}>
          <View style={styles.rateHeader}>
            <Image 
              source={require("../../assets/images/star.png")}
              style={styles.rateIcon}
            />
            <Text style={styles.rateTitle}>Rate Our App</Text>
          </View>
          <Text style={styles.rateText}>
            We value your feedback! Please take a moment to rate our app and help us improve your experience.
          </Text>
        </View>

        <View style={styles.rateSection}>
          <Text style={styles.rateTitle}>Your Rating</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Animated.View 
                key={star} 
                style={{
                  transform: [{ scale: star === rating ? scaleAnim : 1 }]
                }}
              >
                <TouchableOpacity 
                  style={styles.starButton}
                  onPress={() => handleStarPress(star)}
                >
                  <Image 
                    source={require("../../assets/images/star.png")}
                    style={[
                      styles.starIcon,
                      star <= rating ? styles.starIconActive : styles.starIconInactive
                    ]}
                  />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
          {rating > 0 && (
            <>
              <Text style={styles.ratingEmoji}>{getRatingEmoji(rating)}</Text>
              <Text style={styles.ratingValue}>
                {rating} {rating === 1 ? 'Star' : 'Stars'}
              </Text>
              <Text style={styles.ratingLabel}>{getRatingLabel(rating)}</Text>
            </>
          )}
        </View>

        <View style={styles.rateSection}>
          <Text style={styles.feedbackTitle}>Tell Us More</Text>
          <Text style={styles.feedbackText}>
            Share your thoughts about what you like or what we could improve. Your feedback helps us make the app better for everyone.
          </Text>
          <TextInput
            style={[
              styles.feedbackInput,
              isDarkTheme ? styles.feedbackInputDark : styles.feedbackInputLight
            ]}
            placeholder="Enter your feedback here..."
            placeholderTextColor={isDarkTheme ? styles.feedbackPlaceholderDark.color : styles.feedbackPlaceholderLight.color}
            multiline
            value={feedback}
            onChangeText={setFeedback}
          />
        </View>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit Rating</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RateApp;