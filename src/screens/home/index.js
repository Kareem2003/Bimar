import { styles } from "./style";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
} from "react-native";
import Logic from "./logic";
import LottieView from "lottie-react-native";
import TypeWriterEffect from "react-native-typewriter-effect";
import MenuButton from "../../components/menuButton";
import StepCounter from "../../service/stepCounter";
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = ({ navigation }) => {
  const { state, updateState } = Logic(navigation);
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;
  const [currentTime, setCurrentTime] = useState(new Date());
  const timeIndicatorPosition = useRef(new Animated.Value(0)).current;

  const calculateMedicationTimes = (times, firstDose) => {
    const [hours, minutes] = firstDose.split(":").map(Number);
    const interval = times === 2 ? 6 : 4;

    return Array.from({ length: times }, (_, index) => {
      const newHours = (hours + interval * index) % 24;
      const formattedHours = newHours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      return `${formattedHours}:${formattedMinutes}`;
    });
  };

  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Paracetamol",
      times: 3,
      dose: 500,
      doseTimes: calculateMedicationTimes(3, "09:00"),
      completed: false,
      takenCount: 0,
      image: require("../../assets/images/med1.png"),
    },
    {
      id: 2,
      name: "Amoxicillin",
      times: 2,
      dose: 250,
      doseTimes: calculateMedicationTimes(2, "08:00"),
      completed: false,
      takenCount: 0,
      image: require("../../assets/images/med2.png"),
    },
  ]);

  const handleMedicationPress = (item, time) => {
    if (
      expandedItem &&
      expandedItem.id === item.id &&
      expandedItem.time === time
    ) {
      // Collapse
      Animated.parallel([
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setExpandedItem(null));
    } else {
      // Expand
      setExpandedItem({ ...item, time });
      Animated.parallel([
        Animated.timing(scaleAnimation, {
          toValue: 1.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const toggleMedication = (medicationId, doseTime) => {
    setMedications((prev) =>
      prev.map((med) => {
        if (med.id === medicationId) {
          const updatedTakenTimes = med.takenTimes || [];
          const timeIndex = updatedTakenTimes.indexOf(doseTime);

          if (timeIndex === -1) {
            // Mark as taken
            updatedTakenTimes.push(doseTime);
          } else {
            // Unmark as taken
            updatedTakenTimes.splice(timeIndex, 1);
          }

          return {
            ...med,
            takenTimes: updatedTakenTimes,
            takenCount: updatedTakenTimes.length,
            completed: updatedTakenTimes.length >= med.times,
          };
        }
        return med;
      })
    );
  };

  const getTimeRemaining = (nextDoseTime) => {
    // Implement actual time calculation logic here
    return "2 hours 15 min";
  };

  // Add this helper function to format hours to 12-hour system
  const formatTo12Hour = (hour, minute) => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12; // Convert 0 to 12
    const displayMinute = minute.toString().padStart(2, "0");
    return `${displayHour}:${displayMinute} ${period}`;
  };

  useEffect(() => {
    // Up and down animation
    const upDownAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 10,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    // Left and right wiggle animation
    const wiggleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 5,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -5,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    // Start both animations
    upDownAnimation.start();
    wiggleAnimation.start();

    // Cleanup animations on unmount
    return () => {
      upDownAnimation.stop();
      wiggleAnimation.stop();
    };
  }, [translateY, translateX]);
  

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      // Calculate position for time indicator
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const position = hours * 100 + (minutes / 60) * 100;

      Animated.spring(timeIndicatorPosition, {
        toValue: position,
        useNativeDriver: true,
        friction: 90,
        tension: 40,
      }).start();
    }, 60000);

    // Initial position
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const initialPosition = hours * 100 + (minutes / 60) * 100;
    timeIndicatorPosition.setValue(initialPosition);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <MenuButton navigation={navigation} />
            <Text style={styles.greeting}>Hi, {state.userName || "User"}</Text>
          </View>
          <Text style={styles.subGreeting}>How are you feeling today!</Text>
        </View>

        {/* Health Journey Banner */}
        <TouchableOpacity
          style={styles.healthCard}
          onPress={() => {
            navigation.navigate("AiChatScreen");
          }}
        >
          <View style={styles.CircleBackground}></View>
          {/* Animated Image Container */}
          <Animated.View
            style={[
              styles.bannerImageContainer,
              {
                transform: [
                  { translateY }, // Up and down movement
                  { translateX }, // Left and right wiggle
                ],
              },
            ]}
          >
            <LottieView
              source={require("../../assets/images/robot_wave_hi.json")}
              style={styles.bannerImage}
              autoPlay
              loop
            />
          </Animated.View>

          {/* Text Container */}
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerText}>Don't know where to go?</Text>
            <TypeWriterEffect
              style={styles.bannerSubText}
              content="Your friend Bimar will help!"
            />
          </View>
        </TouchableOpacity>

        {/* Doctor Cards (Horizontal Scroll) */}
        <View style={styles.doctorSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitle}>Our Doctors</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Doctors")}>
              <Text style={styles.showMoreText}>Show More</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} style={styles.cardScroll}>
            {state.loading ? (
              <ActivityIndicator size="large" color="#FD9B63" />
            ) : state.error ? (
              <Text style={styles.errorText}>{state.error}</Text>
            ) : state.doctors && state.doctors.length > 0 ? (
              state.doctors.map((doctor) => (
                <TouchableOpacity
                  key={doctor._id || doctor.id}
                  style={styles.doctorCard}
                  onPress={() =>
                    navigation.navigate("DoctorProfile", { doctor })
                  }
                >
                  <View style={styles.circleWrapper}>
                    <View style={styles.circleOne}></View>
                    <View style={styles.circleTwo}></View>
                  </View>
                  <Image
                    source={
                      doctor.doctorImage && doctor.doctorImage !== "null"
                        ? { uri: doctor.doctorImage }
                        : require("../../assets/images/portrait-hansome-young-male-doctor-man.png")
                    }
                    style={styles.doctorImage}
                  />
                  <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>
                      {doctor.doctorName || "Dr. Unknown"}
                    </Text>
                    <Text style={styles.doctorSpecialization}>
                      {doctor.field || "General"}
                    </Text>
                    <Text style={styles.doctorSpecialization}>
                      {doctor.clinic && doctor.clinic.length > 0
                        ? doctor.clinic[0].clinicArea
                        : "Clinic Area Not Available"}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noDataText}>No doctors available</Text>
            )}
          </ScrollView>
        </View>

        {/* Today's List of Medication */}
        {/* Today's List of Medication */}
        <View style={styles.medicationSection}>
          <Text style={styles.sectionTitle}>Today's Medications</Text>

          {/* Timeline Container */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.timelineScrollContainer}
          >
            {/* Timeline Hours */}
            <View style={styles.timelineHours}>
              {Array.from({ length: 24 }, (_, i) => (
                <View key={i} style={styles.hourContainer}>
                  <Text style={styles.hourText}>{formatTo12Hour(i, 0)}</Text>
                  <View style={styles.timelineLine} />
                </View>
              ))}

              {/* Current Time Indicator */}
              <Animated.View
                style={[
                  styles.currentTimeIndicator,
                  {
                    transform: [{ translateX: timeIndicatorPosition }],
                  },
                ]}
              >
                <View style={styles.timeIndicatorLine} />
                <View style={styles.timeIndicatorDot} />
                <Text style={styles.currentTimeText}>
                  {formatTo12Hour(
                    currentTime.getHours(),
                    currentTime.getMinutes()
                  )}
                </Text>
              </Animated.View>
            </View>

            {/* Medication Circles */}
            <View style={styles.medicationCircles}>
              {medications.flatMap((item) =>
                item.doseTimes.map((time, timeIndex) => {
                  const [hour, minute] = time.split(":").map(Number);
                  // Center the medication circle under the hour marker
                  const leftPosition = (hour + minute / 60) * 100 - 20; // 20 is half the width of medication circle
                  const isExpanded =
                    expandedItem?.id === item.id && expandedItem?.time === time;
                  const isTaken = (item.takenTimes || []).includes(time);

                  return (
                    <TouchableOpacity
                      key={`${item.id}-${timeIndex}`}
                      onPress={() => handleMedicationPress(item, time)}
                      style={[
                        styles.medicationCircleContainer,
                        {
                          position: "absolute",
                          left: leftPosition,
                          zIndex: isExpanded ? 2 : 1,
                        },
                      ]}
                    >
                      <Animated.View
                        style={[
                          styles.medicationCircle,
                          {
                            transform: [
                              {
                                scale: isExpanded ? scaleAnimation : 1,
                              },
                            ],
                          },
                        ]}
                      >
                        <Image source={item.image} style={styles.circleImage} />
                        {isTaken && (
                          <View style={styles.checkMarkOverlay}>
                            <Icon name="check" size={15} color="#fff" />
                          </View>
                        )}
                      </Animated.View>

                      {/* Expanded Details */}
                      <Animated.View
                        style={[
                          styles.expandedDetails,
                          {
                            opacity: isExpanded ? opacityAnimation : 0,
                            display: isExpanded ? "flex" : "none",
                          },
                        ]}
                      >
                        <Text style={styles.expandedName}>{item.name}</Text>
                        <Text style={styles.expandedDose}>
                          {item.dose}mg -{" "}
                          {formatTo12Hour(...time.split(":").map(Number))}
                        </Text>
                        <TouchableOpacity
                          style={[
                            styles.takeButton,
                            isTaken && styles.takenButton,
                          ]}
                          onPress={() => toggleMedication(item.id, time)}
                        >
                          <Text style={styles.takeButtonText}>
                            {isTaken ? "Taken" : "Take Now"}
                          </Text>
                        </TouchableOpacity>
                      </Animated.View>
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
