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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { BASE_URL } from "../../helpers/constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [activeMedicationIndex, setActiveMedicationIndex] = useState(null);
  const [expandAnim, setExpandAnim] = useState(new Animated.Value(0));

  // Define the initial medication configuration outside of useState to use for resets
  const initialMedications = [
    {
      id: 1,
      name: "Paracetamol",
      times: 3,
      dose: 500,
      doseTimes: ["09:00", "13:00", "17:00"],
      completed: false,
      takenCount: 0,
      takenTimes: [],
      image: require("../../assets/images/med1.png"),
    },
    {
      id: 2,
      name: "Amoxicillin",
      times: 2,
      dose: 250,
      doseTimes: ["08:00", "14:00"],
      completed: false,
      takenCount: 0,
      takenTimes: [],
      image: require("../../assets/images/med2.png"),
    },
  ];

  const [medications, setMedications] = useState(initialMedications);

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

  // Function to sort medication doses by time
  const getSortedMedicationDoses = () => {
    const allDoses = [];
    
    medications.forEach(med => {
      med.doseTimes.forEach(time => {
        allDoses.push({
          id: med.id,
          name: med.name,
          time: time,
          formattedTime: formatTo12Hour(...time.split(':').map(Number)),
          isTaken: (med.takenTimes || []).includes(time),
          status: (med.takenTimes || []).includes(time) ? 'taken' : getMedicationStatus(time)
        });
      });
    });
    
    // Sort by time (HH:MM format)
    return allDoses.sort((a, b) => {
      const [aHours, aMinutes] = a.time.split(':').map(Number);
      const [bHours, bMinutes] = b.time.split(':').map(Number);
      
      // First compare hours
      if (aHours !== bHours) {
        return aHours - bHours;
      }
      // If hours are the same, compare minutes
      return aMinutes - bMinutes;
    });
  };

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

  const toggleMedication = async (medicationId, doseTime) => {
    const updatedMedications = medications.map((med) => {
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
    });

    setMedications(updatedMedications);
    
    // Store the taken status with today's date
    const today = new Date().toDateString();
    await AsyncStorage.setItem('medications_' + today, JSON.stringify(updatedMedications));
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

  // Calculate medication status: upcoming, pending, or missed
  const getMedicationStatus = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const medicationTime = new Date();
    medicationTime.setHours(hours, minutes, 0);
    
    const now = new Date();
    
    // Calculate time difference in minutes
    const diffMs = medicationTime - now;
    const diffMinutes = diffMs / (1000 * 60);
    
    // If the medication time is in the future but within 30 minutes, it's pending
    if (diffMinutes > 0 && diffMinutes <= 30) {
      return 'pending';
    }
    
    // If the medication time has passed by 30 minutes and not taken, mark as missed
    if (diffMinutes < -30) {
      return 'missed';
    }
    
    // If the medication time is in the future (more than 30 minutes), it's upcoming
    if (diffMinutes > 30) {
      return 'upcoming';
    }
    
    // If we're within +/- 30 minutes of medication time, it's pending
    return 'pending';
  };
  
  // Calculate progress percentage
  const calculateProgress = () => {
    const totalDoses = medications.reduce((sum, med) => sum + med.doseTimes.length, 0);
    const takenDoses = medications.reduce((sum, med) => sum + (med.takenTimes?.length || 0), 0);
    
    if (totalDoses === 0) return 0;
    return Math.round((takenDoses / totalDoses) * 100);
  };
  
  // Find the next medication dose
  const getNextMedication = () => {
    const now = new Date();
    let nextMed = null;
    let minTimeDiff = Infinity;
    
    medications.forEach(med => {
      med.doseTimes.forEach(time => {
        if ((med.takenTimes || []).includes(time)) return; // Skip taken doses
        
        const [hours, minutes] = time.split(':').map(Number);
        const doseTime = new Date();
        doseTime.setHours(hours, minutes, 0);
        
        // Calculate time difference in minutes
        const diffMs = doseTime - now;
        const diffMinutes = diffMs / (1000 * 60);
        
        // If medication time has passed by more than 30 minutes, 
        // consider it for tomorrow (unless it's marked as missed)
        if (diffMinutes < -30 && getMedicationStatus(time) === 'missed') {
          doseTime.setDate(doseTime.getDate() + 1);
        }
        
        const timeDiff = doseTime - now;
        if (timeDiff > 0 && timeDiff < minTimeDiff) {
          minTimeDiff = timeDiff;
          nextMed = { 
            name: med.name, 
            time: time,
            formattedTime: formatTo12Hour(hours, minutes),
            status: getMedicationStatus(time)
          };
        }
      });
    });
    
    // If no upcoming medication, check for pending ones
    if (!nextMed) {
      medications.forEach(med => {
        med.doseTimes.forEach(time => {
          if ((med.takenTimes || []).includes(time)) return; // Skip taken doses
          
          const status = getMedicationStatus(time);
          if (status === 'pending') {
            const [hours, minutes] = time.split(':').map(Number);
            nextMed = { 
              name: med.name, 
              time: time,
              formattedTime: formatTo12Hour(hours, minutes),
              status: 'pending'
            };
            return; // Break the loop
          }
        });
      });
    }
    
    return nextMed;
  };

  // Function to render medication status icon
  const renderStatusIcon = (medication, time) => {
    const isTaken = (medication.takenTimes || []).includes(time);
    
    if (isTaken) {
      return (
        <View style={styles.statusIconTaken}>
          <MaterialIcons name="check" size={12} color="#fff" />
        </View>
      );
    }
    
    const status = getMedicationStatus(time);
    
    if (status === 'missed') {
      return (
        <View style={styles.statusIconMissed}>
          <MaterialIcons name="close" size={12} color="#fff" />
        </View>
      );
    }
    
    if (status === 'pending') {
      return (
        <View style={styles.statusIconPending}>
          <MaterialIcons name="access-time" size={12} color="#fff" />
        </View>
      );
    }
    
    return (
      <View style={styles.statusIconUpcoming}>
        <MaterialIcons name="circle" size={12} color="#fff" />
      </View>
    );
  };

  // Load medication status on app startup
  useEffect(() => {
    console.log("Loading medication status");
    
    const loadMedicationStatus = async () => {
      try {
        const today = new Date().toDateString();
        console.log("Today's date:", today);
        
        // Check if the day has changed since last app open
        const lastOpenDate = await AsyncStorage.getItem('last_open_date');
        console.log("Last open date:", lastOpenDate);
        
        // FORCE RESET if day has changed
        if (lastOpenDate && lastOpenDate !== today) {
          console.log("DAY CHANGED - Forcing medication reset");
          // Clear all medication data for today
          await AsyncStorage.removeItem('medications_' + today);
          
          // Reset medications to initial state
          const resetMedications = initialMedications.map(med => ({
            ...med,
            takenTimes: [],
            takenCount: 0,
            completed: false
          }));
          
          // Save the reset state for today
          await AsyncStorage.setItem('medications_' + today, JSON.stringify(resetMedications));
          setMedications(resetMedications);
          
          // Update the last open date
          await AsyncStorage.setItem('last_open_date', today);
          console.log("Reset completed and saved for today:", today);
          return; // Exit early since we've already set the medications
        }
        
        // If no day change detected, proceed with normal loading
        const storedData = await AsyncStorage.getItem('medications_' + today);
        
        if (storedData) {
          // If we have data for today, use it
          console.log("Found today's medication data");
          const storedMedications = JSON.parse(storedData);
          setMedications(storedMedications);
        } else {
          // If no data for today, reset using the original configuration
          console.log("No data found for today - Creating new medication data");
          const resetMedications = initialMedications.map(med => ({
            ...med,
            takenTimes: [],
            takenCount: 0,
            completed: false
          }));
          
          // Save the reset state for today
          await AsyncStorage.setItem('medications_' + today, JSON.stringify(resetMedications));
          setMedications(resetMedications);
        }
        
        // Always update the last open date
        await AsyncStorage.setItem('last_open_date', today);
      } catch (error) {
        console.log('Error loading medication status', error);
      }
    };
    
    loadMedicationStatus();
    
    // Midnight check for day change
    const setupMidnightReset = () => {
      const now = new Date();
      const night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // tomorrow
        0, 0, 0 // midnight
      );
      const msToMidnight = night.getTime() - now.getTime();
      
      console.log(`Scheduling midnight reset in ${Math.round(msToMidnight/1000/60)} minutes`);
      
      // Set timeout for midnight
      const midnightTimeout = setTimeout(() => {
        console.log("MIDNIGHT REACHED - Resetting medications");
        loadMedicationStatus(); // Force reload at midnight
        
        // Set up next day's timeout
        setupMidnightReset();
      }, msToMidnight);
      
      return midnightTimeout;
    };
    
    // Set up midnight reset
    const midnightTimeout = setupMidnightReset();
    
    // Additional check for day changes while app is running
    const dayChangeInterval = setInterval(async () => {
      const lastOpenDate = await AsyncStorage.getItem('last_open_date');
      const today = new Date().toDateString();
      
      if (lastOpenDate !== today) {
        console.log("Day change detected during app runtime");
        loadMedicationStatus(); // Force reload
      }
    }, 60000); // Check every minute
    
    return () => {
      clearInterval(dayChangeInterval);
      clearTimeout(midnightTimeout);
    };
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
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ padding: 5 }}
          >
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
                  <View style={styles.greenWave} />
                  <View style={styles.orangeBubble} />
                  <View style={styles.greenBar} />
                  <View style={styles.orangeDot} />

                  <View style={styles.doctorImageBorder}>
                    <View style={styles.doctorImageContainer}>
                      <Image
                        source={
                          doctor.doctorImage && doctor.doctorImage !== "null"
                            ? { uri: `${BASE_URL}/${doctor.doctorImage}` }
                            : require("../../assets/images/portrait-hansome-young-male-doctor-man.png")
                        }
                        style={styles.doctorImage}
                        resizeMode="cover"
                      />
                    </View>
                  </View>

                  <View style={styles.doctorContent}>
                    <View style={styles.doctorInfo}>
                      <Text style={styles.doctorName}>
                        {doctor.doctorName || "UnKnown"}
                      </Text>
                      <Text style={styles.doctorSpecialty}>
                        {doctor.field || "Internal Medicine"}
                      </Text>

                      <View style={styles.infoRow}>
                        <MaterialIcons
                          name="location-on"
                          size={12}
                          color="#666"
                        />
                        <Text style={styles.infoText}>
                          {doctor.clinic && doctor.clinic.length > 0
                            ? doctor.clinic[0].clinicArea
                            : "Nasr City"}
                        </Text>
                      </View>

                      <View style={styles.infoRow}>
                        <MaterialIcons name="history" size={12} color="#666" />
                        <Text style={styles.infoText}>8+ years experience</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.statusBadge}>
                    <View style={styles.starContainer}>
                      <Icon name="star" size={10} color="#FD9B63" />
                      <Text style={styles.ratingText}>4.8</Text>
                    </View>
                    <Text style={styles.availableText}>
                      {doctor.clinic &&
                      doctor.clinic.length > 0 &&
                      doctor.clinic[0].Price
                        ? `${doctor.clinic[0].Price}LE`
                        : "__LE"}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noDataText}>No doctors available</Text>
            )}
          </ScrollView>
        </View>

        {/* Medication section */}
        <View style={styles.medicationCard}>
          <View style={styles.medicationHeader}>
            <Text style={styles.medicationTitle}>Today's medication</Text>
            <Text style={styles.medicationSubtext}>
              You've taken{" "}
              {medications.reduce(
                (sum, med) => sum + (med.takenTimes?.length || 0),
                0
              )}{" "}
              out of 5 meds today!
            </Text>
          </View>

          {/* Horizontal scrollable medication cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.medicationCardsScroll}
          >
            {getSortedMedicationDoses().map((dose, index) => (
              <TouchableOpacity
                key={`${dose.id}-${dose.time}`}
                style={styles.medicationCardItem}
                onPress={() => toggleMedication(dose.id, dose.time)}
              >
                <Text style={styles.pillName}>{dose.name}</Text>
                <Text style={styles.pillTime}>{dose.formattedTime}</Text>
                <View style={styles.pillStatus}>
                  {dose.isTaken ? (
                    <>
                      <View style={[styles.statusIcon, styles.statusIconTaken]}>
                        <MaterialIcons name="check" size={10} color="#fff" />
                      </View>
                      <Text
                        style={[styles.pillStatusText, styles.statusTextTaken]}
                      >
                        taken
                      </Text>
                    </>
                  ) : (
                    <>
                      <View
                        style={[
                          styles.statusIcon,
                          dose.status === "missed"
                            ? styles.statusIconMissed
                            : dose.status === "pending"
                            ? styles.statusIconPending
                            : styles.statusIconUpcoming,
                        ]}
                      >
                        <MaterialIcons
                          name={
                            dose.status === "missed"
                              ? "close"
                              : dose.status === "pending"
                              ? "access-time"
                              : "circle"
                          }
                          size={10}
                          color="#fff"
                        />
                      </View>
                      <Text
                        style={[
                          styles.pillStatusText,
                          dose.status === "missed"
                            ? styles.statusTextMissed
                            : dose.status === "pending"
                            ? styles.statusTextPending
                            : styles.statusTextUpcoming,
                        ]}
                      >
                        {dose.status}
                      </Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Progress indicator with fluid, ink-like fill */}
          <View style={styles.progressRow}>
            <View style={styles.progressCircleContainer}>
              <View style={styles.progressBackground} />

              {calculateProgress() > 0 &&
                (calculateProgress() >= 100 ? (
                  // Special case for 100% - fully filled circle
                  <View
                    style={{
                      position: "absolute",
                      width: 65,
                      height: 65,
                      borderRadius: 32.5,
                      backgroundColor: "#6A9C89",
                      zIndex: 5,
                    }}
                  />
                ) : (
                  // For 1-99%, show a fluid circular progress
                  <View
                    style={{
                      position: "absolute",
                      width: 65,
                      height: 65,
                      overflow: "hidden",
                      borderRadius: 32.5,
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: 65,
                        height: `${calculateProgress()}%`,
                        backgroundColor: "#6A9C89",
                        borderTopLeftRadius:
                          calculateProgress() > 90 ? 0 : 32.5,
                        borderTopRightRadius:
                          calculateProgress() > 90 ? 0 : 32.5,
                      }}
                    />
                  </View>
                ))}

              <View style={styles.progressInnerCircle}>
                <Text style={styles.progressPercentage}>
                  {calculateProgress()}%
                </Text>
              </View>
            </View>

            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>Complete</Text>
              {getNextMedication() ? (
                <Text style={styles.nextMedicationText}>
                  Next: {getNextMedication().name} -{" "}
                  {getNextMedication().formattedTime}
                </Text>
              ) : (
                <Text style={styles.nextMedicationText}>
                  All medications taken for today!
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
