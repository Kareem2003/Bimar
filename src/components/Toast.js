import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  PanResponder,
} from "react-native";

const Toast = ({ message, type = "info", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);
  const opacity = new Animated.Value(1);
  const translateX = new Animated.Value(0); // For horizontal movement

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 20; // Start swipe if moved more than 20 pixels
      },
      onPanResponderMove: (evt, gestureState) => {
        translateX.setValue(gestureState.dx); // Update the position based on swipe
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 100) {
          // Swiped right
          closeToast();
        } else if (gestureState.dx < -100) {
          // Swiped left
          closeToast();
        } else {
          // Reset position if not swiped enough
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    // Auto-dismiss after duration
    const timer = setTimeout(() => {
      closeToast();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const closeToast = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      if (onClose) onClose();
    });
  };

  if (!visible) return null;

  const typeStyles = {
    info: { backgroundColor: "#007bff" },
    success: { backgroundColor: "#28a745" },
    warning: { backgroundColor: "#ffc107" },
    error: { backgroundColor: "#dc3545" },
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.toast,
        typeStyles[type],
        { opacity, transform: [{ translateX }] },
      ]}
    >
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={closeToast} style={styles.closeButton}>
        <Text style={styles.closeText}>&times;</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 20,
    right: 20,
    left: 20,
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1000,
  },
  message: {
    color: "#fff",
    flex: 1,
  },
  closeButton: {
    marginLeft: 10,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Toast;
