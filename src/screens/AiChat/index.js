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
import ACTION_TYPES from "../../reducers/actionTypes";
import AppButton from "../../components/AppButton";
import Icon from "react-native-vector-icons/Ionicons";

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

  const SymptomCard = ({ text, onPress, iconName }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Icon name={iconName} size={24} color="#fff" style={styles.cardIcon} />
        <Text style={styles.cardHeader}>{text}</Text>
      </TouchableOpacity>
    );
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

      <View style={styles.cardContainer}>
        <SymptomCard
          text={"Head"}
          iconName="bandage-outline"
          onPress={() => handleCardClick("head")}
        />
        <SymptomCard
          text={"Eyes"}
          iconName="eye-outline"
          onPress={() => handleCardClick("eyes")}
        />
        <SymptomCard
          text={"Chest"}
          iconName="heart-outline"
          onPress={() => handleCardClick("chest")}
        />
        <SymptomCard
          text={"Urinary/Reproductive"}
          iconName="female-male-outline"
          onPress={() => handleCardClick("urinaryReproductive")}
        />
        <SymptomCard
          text={"Musculoskeletal"}
          iconName="body-outline"
          onPress={() => handleCardClick("musculoskeletal")}
        />
        <SymptomCard
          text={"General"}
          iconName="thermometer-outline"
          onPress={() => handleCardClick("general")}
        />
        <SymptomCard
          text={"Pregnancy"}
          iconName="woman-outline"
          onPress={() => handleCardClick("pregnancy")}
        />
        <SymptomCard
          text={"Digestive"}
          iconName="nutrition-outline"
          onPress={() => handleCardClick("digestive")}
        />
        <SymptomCard
          text={"Throat/Mouth"}
          iconName="chatbubble-outline"
          onPress={() => handleCardClick("throatMouth")}
        />
        <SymptomCard
          text={"Skin"}
          iconName="hand-left-outline"
          onPress={() => handleCardClick("skin")}
        />
        <SymptomCard
          text={"Mental"}
          iconName="happy-outline"
          onPress={() => handleCardClick("mental")}
        />
        <SymptomCard
          text={"Stomach"}
          iconName="medkit-outline"
          onPress={() => handleCardClick("stomach")}
        />
        <SymptomCard
          text={"Limbs"}
          iconName="walk-outline"
          onPress={() => handleCardClick("limbs")}
        />
      </View>

      {/* Symptoms Container */}
      <View style={styles.symptomTagWrapper}>
        <ScrollView horizontal>
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
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendAiModel}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Icon name="chevron-back" size={24} color="#000" />
              </TouchableOpacity>
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
                  marginTop: 70,
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
      {/* Symptom Selection Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose what you feel</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>

            {/* Scrollable content */}
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
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
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AiChatScreen;
