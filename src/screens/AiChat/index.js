import { styles } from "./style";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import Logic from "./logic";
import LottieView from "lottie-react-native";
import Header from "../../components/Header";
import SymptomCard from "../../components/SymptomCard";
import ACTION_TYPES from "../../reducers/actionTypes";
import AppButton from "../../components/AppButton";

const AiChatScreen = ({ navigation }) => {
  const { state, updateState, handleRemoveSymptom, sendAiModel } =
    Logic(navigation);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleCardClick = (symptomType) => {
    setSelectedSymptoms(state[symptomType]);
    setIsModalVisible(true);
  };

  const handleSymptomPress = (symptom) => {
    const isSelected = state.symptoms.includes(symptom);

    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "symptoms",
        value: isSelected
          ? state.symptoms.filter((s) => s !== symptom)
          : [...state.symptoms, symptom],
      },
    ]);
  };

  const handleSendAiModel = () => {
    sendAiModel();
    setIsResultModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Header
        header="Choose the symptoms"
        marginTop={50}
        onPress={() => navigation.navigate("Home")}
      />

      <View style={styles.robotContainer}>
        <LottieView
          source={require("../../assets/images/robot_ask.json")}
          style={styles.robotImage}
          autoPlay
          loop
        />
      </View>

      {/* Symptoms Container */}
      <ScrollView horizontal={true} style={styles.symptomsContainer}>
        <View style={{ flexDirection: "row" }}>
          {state.symptoms.map((symptom, index) => (
            <TouchableOpacity
              key={index}
              style={styles.symptomTagContainer}
              onPress={() => handleRemoveSymptom(symptom)}
            >
              <Text style={styles.symptomText}>{symptom}</Text>
              <Text style={styles.deleteIcon}>✕</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.cardContainer}>
        <SymptomCard text={"Head"} onPress={() => handleCardClick("head")} />
        <SymptomCard text={"Chest"} onPress={() => handleCardClick("chest")} />
        <SymptomCard text={"Skin"} onPress={() => handleCardClick("skin")} />
        <SymptomCard text={"Limb"} onPress={() => handleCardClick("limb")} />
        <SymptomCard
          text={"Stomach"}
          onPress={() => handleCardClick("stomach")}
        />
        <SymptomCard
          text={"General"}
          onPress={() => handleCardClick("general")}
        />
      </View>

      <View style={{ marginTop: 20, alignItems: "center" }}>
        <AppButton title="Send" onPress={handleSendAiModel} />
      </View>

      {/* Result Modal */}
      <Modal
        visible={isResultModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsResultModalVisible(false)}
      >
        <View style={styles.fullPageModal}>
          {state.isProcessing ? (
            <>
              <Text style={styles.resultText}>
                We are looking into your case. Please wait!
              </Text>
              <LottieView
                source={require("../../assets/images/robot_search.json")}
                style={styles.robotImageCheck}
                autoPlay
                loop
              />
            </>
          ) : (
            <View>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 20,
                  color: "#16423C",
                  textAlign: "center",
                }}
              >
                It's recommended that you consult
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 20,
                  color: "#F08900",
                  textAlign: "center",
                }}
              >
                {state.specialist}
              </Text>
              <ScrollView
                contentContainerStyle={{
                  alignItems: "center",
                }}
              >
                {state.doctors && state.doctors.length > 0 ? (
                  state.doctors.map((doctor) => (
                    <TouchableOpacity
                      key={doctor._id || doctor.id}
                      style={styles.doctorCard}
                      onPress={() => {
                        setIsResultModalVisible(false);
                        navigation.navigate("DoctorProfile", { doctor });
                      }}
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
          )}
        </View>
      </Modal>

      {/* Modal to display symptoms */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.closeButtonText}>Choose what you feel</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tagsContainer}>
              {selectedSymptoms.map((symptom, index) => {
                const isSelected = state.symptoms.includes(symptom);
                return (
                  <TouchableOpacity
                    key={index}
                    style={
                      isSelected ? styles.selectedTag : styles.unSelectedTag
                    }
                    onPress={() => handleSymptomPress(symptom)}
                  >
                    <Text
                      style={
                        isSelected
                          ? styles.tagTextSelected
                          : styles.tagTextUnSelected
                      }
                    >
                      {symptom}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AiChatScreen;
