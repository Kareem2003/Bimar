import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Pedometer } from "expo-sensors";
import AppleHealthKit from "react-native-health";
import GoogleFit, { Scopes } from "react-native-google-fit";

const StepCounter = () => {
  const [steps, setSteps] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (Platform.OS === "ios") {
      requestHealthKitData();
    } else {
      requestGoogleFitData();
    }
  }, []);

  // 📌 iOS: Request HealthKit Data
  const requestHealthKitData = async () => {
    const options = {
      permissions: {
        read: [AppleHealthKit.Constants.Permissions.Steps],
      },
    };

    AppleHealthKit.initHealthKit(options, (err, results) => {
      if (err) {
        console.error("Error initializing HealthKit: ", err);
        return;
      }
      setIsAvailable(true);
      const today = new Date();
      AppleHealthKit.getStepCount(
        { date: today.toISOString() },
        (error, result) => {
          if (!error && result) {
            setSteps(result.value || 0);
          }
        }
      );
    });
  };

  // 📌 Android: Request Google Fit Data
  const requestGoogleFitData = async () => {
    const options = {
      scopes: [Scopes.FITNESS_ACTIVITY_READ],
    };

    GoogleFit.authorize(options)
      .then((authResult) => {
        if (authResult.success) {
          setIsAvailable(true);
          const today = new Date();
          GoogleFit.getDailyStepCountSamples({
            startDate: today.toISOString(),
            endDate: new Date().toISOString(),
          })
            .then((res) => {
              if (res.length > 0) {
                setSteps(res[0].steps || 0);
              }
            })
            .catch((error) => console.error("Error fetching steps: ", error));
        } else {
          console.error("Google Fit authorization failed");
        }
      })
      .catch((error) => console.error("Google Fit error: ", error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Step Counter</Text>
      {isAvailable ? (
        <Text style={styles.stepText}>{steps} Steps</Text>
      ) : (
        <Text style={styles.errorText}>Step data not available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    margin: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  stepText: {
    fontSize: 30,
    color: "blue",
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginTop: 10,
  },
});

export default StepCounter;
