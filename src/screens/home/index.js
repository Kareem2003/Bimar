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

  // Calculate medication status: taken, missed, or upcoming
  const getMedicationStatus = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const medicationTime = new Date();
    medicationTime.setHours(hours, minutes, 0);
    
    const now = new Date();
    
    // If the time has passed by more than 2 hours and not taken, mark as missed
    if (now > medicationTime && (now - medicationTime) > 2 * 60 * 60 * 1000) {
      return 'missed';
    }
    
    // Otherwise, it's either upcoming or available to take
    return 'upcoming';
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
        
        // If time has passed, set it for tomorrow
        if (doseTime < now) {
          doseTime.setDate(doseTime.getDate() + 1);
        }
        
        const timeDiff = doseTime - now;
        if (timeDiff < minTimeDiff) {
          minTimeDiff = timeDiff;
          nextMed = { 
            name: med.name, 
            time: time,
            formattedTime: formatTo12Hour(hours, minutes)
          };
        }
      });
    });
    
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
    
    return (
      <View style={styles.statusIconUpcoming}>
        <MaterialIcons name="circle" size={12} color="#fff" />
      </View>
    );
  };

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

        {/* Medication section */}
        <View style={styles.medicationCard}>
          <View style={styles.medicationHeader}>
            <Text style={styles.medicationTitle}>Today's medication</Text>
            <Text style={styles.medicationSubtext}>
              You've taken {medications.reduce((sum, med) => sum + (med.takenTimes?.length || 0), 0)} out of 5 meds today!
            </Text>
          </View>

          {/* Horizontal scrollable medication cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.medicationCardsScroll}
          >
            {/* First Paracetamol - 9:00 AM */}
            <TouchableOpacity style={styles.medicationCardItem} onPress={() => toggleMedication(1, "09:00")}>
              <Text style={styles.pillName}>Paracetamol</Text>
              <Text style={styles.pillTime}>9:00 AM</Text>
              <View style={styles.pillStatus}>
                {(medications[0].takenTimes || []).includes("09:00") ? (
                  <>
                    <View style={[styles.statusIcon, styles.statusIconTaken]}>
                      <MaterialIcons name="check" size={10} color="#fff" />
                    </View>
                    <Text style={[styles.pillStatusText, styles.statusTextTaken]}>taken</Text>
                  </>
                ) : (
                  <>
                    <View style={[styles.statusIcon, styles.statusIconMissed]}>
                      <MaterialIcons name="close" size={10} color="#fff" />
                    </View>
                    <Text style={[styles.pillStatusText, styles.statusTextMissed]}>missed</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>

            {/* Second Paracetamol - 13:00 PM */}
            <TouchableOpacity style={styles.medicationCardItem} onPress={() => toggleMedication(1, "13:00")}>
              <Text style={styles.pillName}>Paracetamol</Text>
              <Text style={styles.pillTime}>13:00 PM</Text>
              <View style={styles.pillStatus}>
                {(medications[0].takenTimes || []).includes("13:00") ? (
                  <>
                    <View style={[styles.statusIcon, styles.statusIconTaken]}>
                      <MaterialIcons name="check" size={10} color="#fff" />
                    </View>
                    <Text style={[styles.pillStatusText, styles.statusTextTaken]}>taken</Text>
                  </>
                ) : (
                  <>
                    <View style={[styles.statusIcon, styles.statusIconMissed]}>
                      <MaterialIcons name="close" size={10} color="#fff" />
                    </View>
                    <Text style={[styles.pillStatusText, styles.statusTextMissed]}>missed</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>

            {/* Third Paracetamol - 17:00 PM */}
            <TouchableOpacity style={styles.medicationCardItem} onPress={() => toggleMedication(1, "17:00")}>
              <Text style={styles.pillName}>Paracetamol</Text>
              <Text style={styles.pillTime}>17:00 PM</Text>
              <View style={styles.pillStatus}>
                {(medications[0].takenTimes || []).includes("17:00") ? (
                  <>
                    <View style={[styles.statusIcon, styles.statusIconTaken]}>
                      <MaterialIcons name="check" size={10} color="#fff" />
                    </View>
                    <Text style={[styles.pillStatusText, styles.statusTextTaken]}>taken</Text>
                  </>
                ) : (
                  <>
                    <View style={[styles.statusIcon, styles.statusIconMissed]}>
                      <MaterialIcons name="close" size={10} color="#fff" />
                    </View>
                    <Text style={[styles.pillStatusText, styles.statusTextMissed]}>missed</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>

            {/* First Amoxicillin - 8:00 AM */}
            <TouchableOpacity style={styles.medicationCardItem} onPress={() => toggleMedication(2, "08:00")}>
              <Text style={styles.pillName}>Amoxicillin</Text>
              <Text style={styles.pillTime}>8:00 AM</Text>
              <View style={styles.pillStatus}>
                {(medications[1].takenTimes || []).includes("08:00") ? (
                  <>
                    <View style={[styles.statusIcon, styles.statusIconTaken]}>
                      <MaterialIcons name="check" size={10} color="#fff" />
                    </View>
                    <Text style={[styles.pillStatusText, styles.statusTextTaken]}>taken</Text>
                  </>
                ) : (
                  <>
                    <View style={[styles.statusIcon, styles.statusIconMissed]}>
                      <MaterialIcons name="close" size={10} color="#fff" />
                    </View>
                    <Text style={[styles.pillStatusText, styles.statusTextMissed]}>missed</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>

            {/* Second Amoxicillin - 14:00 PM */}
            <TouchableOpacity style={styles.medicationCardItem} onPress={() => toggleMedication(2, "14:00")}>
              <Text style={styles.pillName}>Amoxicillin</Text>
              <Text style={styles.pillTime}>14:00 PM</Text>
              <View style={styles.pillStatus}>
                {(medications[1].takenTimes || []).includes("14:00") ? (
                  <>
                    <View style={[styles.statusIcon, styles.statusIconTaken]}>
                      <MaterialIcons name="check" size={10} color="#fff" />
                    </View>
                    <Text style={[styles.pillStatusText, styles.statusTextTaken]}>taken</Text>
                  </>
                ) : (
                  <>
                    <View style={[styles.statusIcon, styles.statusIconMissed]}>
                      <MaterialIcons name="close" size={10} color="#fff" />
                    </View>
                    <Text style={[styles.pillStatusText, styles.statusTextMissed]}>missed</Text>
                  </>
                )}
                </View>
            </TouchableOpacity>
          </ScrollView>

          {/* Progress indicator with fluid, ink-like fill */}
          <View style={styles.progressRow}>
            <View style={styles.progressCircleContainer}>
              <View style={styles.progressBackground} />
              
              {calculateProgress() > 0 && (
                calculateProgress() >= 100 ? (
                  // Special case for 100% - fully filled circle
                  <View style={{
                    position: 'absolute',
                    width: 65,
                    height: 65,
                    borderRadius: 32.5,
                    backgroundColor: '#6A9C89',
                    zIndex: 5
                  }} />
                ) : (
                  // For 1-99%, show a fluid circular progress
                  <View style={{
                    position: 'absolute',
                    width: 65,
                    height: 65,
                    overflow: 'hidden',
                    borderRadius: 32.5,
                  }}>
                    <View style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: 65,
                      height: `${calculateProgress()}%`,
                      backgroundColor: '#6A9C89',
                      borderTopLeftRadius: calculateProgress() > 90 ? 0 : 32.5,
                      borderTopRightRadius: calculateProgress() > 90 ? 0 : 32.5,
                    }} />
                  </View>
                )
              )}
              
              <View style={styles.progressInnerCircle}>
                <Text style={styles.progressPercentage}>{calculateProgress()}%</Text>
              </View>
            </View>

            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>Complete</Text>
              {getNextMedication() ? (
                <Text style={styles.nextMedicationText}>
                  Next: {getNextMedication().name} - {getNextMedication().formattedTime}
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
