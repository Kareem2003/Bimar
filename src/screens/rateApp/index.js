import React, { useContext, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Animated, Platform, ScrollView, SafeAreaView, KeyboardAvoidingView, Keyboard, ActivityIndicator } from 'react-native';
import { styles } from './style';
import Header from "../../components/Header";
import { primaryDark, primaryLight } from "../../styles/colors";
import { ThemeContext } from "../../contexts/themeContext";
import Logic from '../../screens/rateApp/logic';

const RateApp = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const scrollViewRef = useRef(null);
  const {
    rating,
    feedback,
    setFeedback,
    scaleAnim,
    getRatingEmoji,
    getRatingLabel,
    handleStarPress,
    handleSubmit,
    isLoading,
    hasExistingRating
  } = Logic(navigation);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            y: 300,
            animated: true
          });
        }, 100);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  if (isLoading) {
    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: isDarkTheme ? primaryDark : primaryLight }}>
        <Header
          marginTop={40}
          header={"Rate App"}
          onPress={() => navigation.goBack()}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FD9B63" />
          <Text style={{ marginTop: 10, color: isDarkTheme ? '#fff' : '#000' }}>Loading your rating...</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkTheme ? primaryDark : primaryLight }}>
      <Header
        marginTop={40}
        header={"Rate App"}
        onPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.termsContainer, { backgroundColor: isDarkTheme ? primaryDark : primaryLight }]}>
            <View style={[styles.rateSection, { marginTop: 20 }]}>
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
              style={[styles.submitButton, { marginBottom: 20 }]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>
                {hasExistingRating ? 'Update Rating' : 'Submit Rating'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RateApp;