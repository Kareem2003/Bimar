import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Toast from "../components/Toast";

const ToastManager = (() => {
  const toasts = [];
  const listeners = [];

  const notify = (message, options) => {
    const id = Math.random().toString(36).substr(2, 9);
    toasts.push({ id, message, ...options });
    listeners.forEach((listener) => listener([...toasts]));
    setTimeout(() => dismiss(id), options?.duration || 3000);
  };

  const dismiss = (id) => {
    const index = toasts.findIndex((toast) => toast.id === id);
    if (index !== -1) toasts.splice(index, 1);
    listeners.forEach((listener) => listener([...toasts]));
  };

  const onChange = (callback) => listeners.push(callback);

  return { notify, onChange, dismiss };
})();

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    ToastManager.onChange(setToasts);
  }, []);

  return (
    <View style={styles.container}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => ToastManager.dismiss(toast.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 10,
    left: 10,
    zIndex: 1000,
  },
});

export { ToastManager, ToastContainer };
