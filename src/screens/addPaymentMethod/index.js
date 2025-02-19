import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  TextInput,
} from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import CreditCard from "react-native-credit-card-display";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.85;

const INITIAL_CARD_STATE = {
  valid: false,
  values: {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  },
  status: {
    number: "incomplete",
    name: "incomplete",
    expiry: "incomplete",
    cvc: "incomplete",
  },
  focused: "",
};

const AddPaymentMethod = ({ navigation }) => {
  const [cardData, setCardData] = useState(INITIAL_CARD_STATE);
  const [showBack, setShowBack] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameOnCard, setNameOnCard] = useState("");
  const fadeAnim = useState(new Animated.Value(0))[0];
  const pan = React.useRef(new Animated.ValueXY()).current;

  // Fade in animation on mount
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const formatExpiryDate = (expiry) => {
    if (!expiry) return "MM/YY";
    // Remove any non-digit characters
    const cleaned = expiry.replace(/\D/g, "");
    // Format as MM/YY
    if (cleaned.length >= 4) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return expiry;
  };

  const handleCardInputChange = useCallback((formData) => {
    const formattedExpiry = formatExpiryDate(formData.values.expiry);

    setCardData((prevState) => ({
      ...prevState,
      valid: formData.valid,
      values: {
        ...formData.values,
        expiry: formattedExpiry,
      },
      status: formData.status,
      focused: formData.focused,
    }));

    setShowBack(formData.focused === "cvc");
  }, []);

  const getFieldStatus = useCallback(
    (fieldName) => {
      const status = cardData.status[fieldName];
      return {
        valid: status === "valid",
        error: status === "invalid",
        incomplete: status === "incomplete",
      };
    },
    [cardData.status]
  );

  const handleNameChange = (text) => {
    setNameOnCard(text);
    setCardData((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        name: text,
      },
      status: {
        ...prevState.status,
        name: text.length > 0 ? "valid" : "incomplete",
      },
    }));
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation?.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>
        <Text>Add Payment Method</Text>
      </Text>
      <View style={styles.backButton} /> {/* Empty view for spacing */}
    </View>
  );

  const renderCardStatus = () => {
    if (!cardData.valid) return null;
    return (
      <View style={styles.cardStatus}>
        <Icon name="check-circle" size={20} color="#4CAF50" />
        <Text style={styles.cardStatusText}>Card details valid</Text>
      </View>
    );
  };

  const handleSubmit = useCallback(async () => {
    try {
      if (!cardData.valid) {
        Alert.alert(
          "Incomplete Details",
          "Please fill in all card details correctly.",
          [{ text: "OK" }]
        );
        return;
      }

      setIsSubmitting(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        Alert.alert("Success", "Your card has been added successfully.", [
          {
            text: "OK",
            onPress: () => navigation?.goBack(),
          },
        ]);
      } catch (error) {
        throw new Error("Failed to process payment. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An unexpected error occurred", [
        { text: "OK" },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  }, [cardData.valid, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      {renderHeader()}

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.cardContainer}>
          <CreditCard
            number={cardData.values.number || "•••• •••• •••• ••••"}
            name={nameOnCard.toUpperCase() || "NAME ON CARD"}
            expiration={cardData.values.expiry || "MM/YY"}
            cvc={cardData.values.cvc || "•••"}
            brand={cardData.values.type}
            style={styles.card}
            flipped={showBack}
            cardStyles={{
              expiryLabel: styles.cardLabel,
              expiryText: styles.expiryText,
            }}
          />
        </View>

        {renderCardStatus()}

        <View style={styles.formContainer}>
          <View style={styles.nameInputContainer}>
            <Text style={styles.labelStyle}>Name on Card</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="Enter Name"
              placeholderTextColor="#A0AEC0"
              value={nameOnCard}
              onChangeText={handleNameChange}
              autoCapitalize="characters"
              maxLength={24}
            />
          </View>

          <CreditCardInput
            onChange={handleCardInputChange}
            requiresName={false}
            cardScale={1}
            inputContainerStyle={styles.inputContainer}
            labelStyle={styles.labelStyle}
            inputStyle={styles.inputStyle}
            validColor="#4CAF50"
            invalidColor="#F44336"
            placeholderColor="#A0AEC0"
            additionalInputsProps={{
              expiry: {
                maxLength: 5,
                placeholder: "MM/YY",
                keyboardType: "numeric",
              },
            }}
          />

          <TouchableOpacity
            style={[
              styles.submitButton,
              (!cardData.valid || isSubmitting || !nameOnCard) &&
                styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!cardData.valid || isSubmitting || !nameOnCard}
            activeOpacity={0.8}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.submitButtonText}>
                {cardData.valid && nameOnCard
                  ? "Add Card"
                  : "Complete Card Details"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  cardContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  card: {
    width: CARD_WIDTH,
    height: 200,
    borderRadius: 16,
    backgroundColor: "#16423C",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  cardStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
  },
  cardStatusText: {
    marginLeft: 8,
    color: "#4CAF50",
    fontWeight: "500",
  },
  cardLabel: {
    color: "#A0AEC0",
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  expiryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: "auto",
  },
  expirySection: {
    alignItems: "flex-end",
  },
  cardNumber: {
    color: "#FFFFFF",
    fontSize: 22,
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 20,
  },
  nameSection: {
    flex: 2,
  },
  nameText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1,
  },
  inputContainer: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  inputStyle: {
    fontSize: 16,
    color: "#fff",
    height: 50,
    backgroundColor: "#6A9C89",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  labelStyle: {
    color: "#4A5568",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  submitButton: {
    flexDirection: "row",
    backgroundColor: "#16423C",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    marginHorizontal: 16,
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: "#BDBDBD",
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButtonIcon: {
    marginLeft: 8,
  },
  nameInputContainer: {
    width: "90%",
    margin: "auto",
  },
});

export default AddPaymentMethod;
