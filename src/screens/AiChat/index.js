import { styles } from "./style";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import Logic from "./logic";
import LottieView from "lottie-react-native";
import Header from "../../components/Header";
import ACTION_TYPES from "../../reducers/actionTypes";
import AppButton from "../../components/AppButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { BASE_URL } from "../../helpers/constants/config";

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

  const SymptomCard = ({ text, onPress, iconName, iconType = "Ionicons" }) => {
    let IconComponent = Ionicons;
    if (iconType === "FontAwesome5") IconComponent = FontAwesome5;
    if (iconType === "MaterialCommunityIcons")
      IconComponent = MaterialCommunityIcons;

    return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <IconComponent
          name={iconName}
          size={24}
          color="#fff"
          style={styles.cardIcon}
        />
        <Text style={styles.cardHeader}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <StatusBar hidden={true} />
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

        <View style={styles.cardContainer}>
          <SymptomCard
            text={"General"}
            iconName="thermometer-outline"
            onPress={() => handleCardClick("general")}
          />
          <SymptomCard
            text={"Head"}
            iconName="brain"
            iconType="FontAwesome5"
            onPress={() => handleCardClick("head")}
          />
          <SymptomCard
            text={"Eyes"}
            iconName="eye"
            iconType="FontAwesome5"
            onPress={() => handleCardClick("eyes")}
          />
          <SymptomCard
            text={"Chest"}
            iconName="lungs"
            iconType="FontAwesome5"
            onPress={() => handleCardClick("chest")}
          />
          <SymptomCard
            text={"Urinary"}
            iconName="transgender"
            iconType="FontAwesome5"
            onPress={() => handleCardClick("urinaryReproductive")}
          />
          <SymptomCard
            text={"Musculoskeletal"}
            iconName="body-outline"
            onPress={() => handleCardClick("musculoskeletal")}
          />
          <SymptomCard
            text={"Pregnancy"}
            iconName="human-pregnant"
            iconType="MaterialCommunityIcons"
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
            iconName="stomach"
            iconType="MaterialCommunityIcons"
            onPress={() => handleCardClick("stomach")}
          />
          <SymptomCard
            text={"Limbs"}
            iconName="walk-outline"
            onPress={() => handleCardClick("limbs")}
          />
        </View>

        {/* Result Modal */}
        <Modal
          visible={isResultModalVisible}
          transparent={false}
          animationType="fade"
          onRequestClose={() => setIsResultModalVisible(false)}
        >
          <StatusBar hidden={false} />
          <View style={styles.fullPageModal}>
            {state.isProcessing ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FFF7F1",
                  borderRadius: 24,
                  margin: 50,
                  shadowColor: "#FD9B63",
                  shadowOpacity: 0.15,
                  shadowRadius: 16,
                  elevation: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  {/* <TouchableOpacity
                    onPress={() => setIsResultModalVisible(false)}
                    style={[
                      styles.backButton,
                      {
                        marginRight: 10,
                        backgroundColor: "#fff",
                        elevation: 4,
                      },
                    ]}
                  >
                    <Ionicons name="chevron-back" size={28} color="#FD9B63" />
                  </TouchableOpacity> */}
                  <Text style={[styles.resultText, { fontSize: 20 }]}>
                    🤖 Our AI is thinking...
                  </Text>
                </View>
                <LottieView
                  source={require("../../assets/images/robot_search.json")}
                  style={{ width: 220, height: 220 }}
                  autoPlay
                  loop
                />
                <Text
                  style={{
                    fontSize: 18,
                    color: "#FD9B63",
                    marginTop: 10,
                    marginBottom: 12,
                    textAlign: "center",
                    fontStyle: "italic",
                  }}
                >
                  Finding the best advice for you!
                </Text>
                <LottieView
                  source={require("../../assets/images/loader-dots.json")}
                  style={{ width: 80, height: 40, marginTop: 10 }}
                  autoPlay
                  loop
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: "#888",
                    marginTop: 12,
                    textAlign: "center",
                  }}
                >
                  Please wait while we analyze your symptoms...
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    marginTop: 30,
                    color: "#16423C",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  🎉 Result is ready!
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 10,
                    color: "#F08900",
                    textAlign: "center",
                  }}
                >
                  {state.specialist
                    ? `You should see a ${state.specialist}!`
                    : "We couldn't find a specialist."}
                </Text>
                <ScrollView
                  contentContainerStyle={{
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  {state.doctors && state.doctors.length > 0 ? (
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
                                doctor.doctorImage &&
                                doctor.doctorImage !== "null"
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
                              <MaterialIcons
                                name="history"
                                size={12}
                                color="#666"
                              />
                              <Text style={styles.infoText}>
                                8+ years experience
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.statusBadge}>
                          <View style={styles.starContainer}>
                            <Icon name="star" size={10} color="#FD9B63" />
                            <Text style={styles.ratingText}>
                              {doctor.averageRating
                                ? doctor.averageRating.toFixed(1)
                                : "N/A"}
                            </Text>
                          </View>
                          <Text style={styles.availableText}>
                            {doctor.price || doctor.consultationFee || "500"}LE
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={styles.noDataText}>No doctors available</Text>
                  )}
                </ScrollView>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#B00020",
                    marginTop: 24,
                    marginBottom: 10,
                    textAlign: "center",
                    fontStyle: "italic",
                    paddingHorizontal: 20,
                  }}
                >
                  ⚠️ This advice is generated by AI and may not be 100%
                  accurate.
                </Text>
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
      <View
        style={[
          styles.buttonContainer,
          {
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            alignItems: "center",
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.sendButton,
            state.symptoms.length === 0 && { backgroundColor: "#ccc" }, // faded color when disabled
          ]}
          onPress={handleSendAiModel}
          disabled={state.symptoms.length === 0}
          activeOpacity={state.symptoms.length === 0 ? 1 : 0.7}
        >
          <Text
            style={[
              styles.sendButtonText,
              state.symptoms.length === 0 && { color: "#888" }, // faded text when disabled
            ]}
          >
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AiChatScreen;
