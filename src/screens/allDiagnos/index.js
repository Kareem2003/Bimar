import { styles } from "./style";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Logic from "./logic";

const MyDiagnoses = ({ navigation }) => {
  const { state, actions } = Logic(navigation);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter diagnoses based on search query
  const filterDiagnoses = (diagnoses) => {
    if (!searchQuery) return diagnoses;
    return diagnoses.filter(diagnosis => 
      diagnosis.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      diagnosis.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  if (state.loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FD9B63" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Diagnoses</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBarWrapper}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search diagnoses, doctors..."
            placeholderTextColor="#999"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
          <Icon name="search" size={20} color="#FD9B63" />
        </View>
      </View>

      {/* Diagnoses List */}
      <ScrollView style={styles.diagnosesList}>
        {state.error ? (
          <Text style={styles.errorText}>{state.error}</Text>
        ) : (
          <>
            {/* Recent Diagnoses */}
            {filterDiagnoses(state.upcomingAppointments).length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Diagnoses</Text>
                {filterDiagnoses(state.upcomingAppointments).map((diagnosis) => (
                  <TouchableOpacity
                    key={diagnosis.id}
                    style={styles.diagnosisCard}
                    onPress={() => actions.navigateToDiagnosis(diagnosis)}
                  >
                    <Image
                      source={require("../../assets/images/portrait-hansome-young-male-doctor-man.png")}
                      style={styles.doctorImage}
                    />
                    <View style={styles.diagnosisInfo}>
                      <Text style={styles.doctorName}>{diagnosis.doctorName}</Text>
                      <Text style={styles.diagnosis}>{diagnosis.diagnosis}</Text>
                      <Text style={styles.dateTime}>
                        {diagnosis.displayDate}
                      </Text>
                      <View style={styles.indicatorsRow}>
                        {diagnosis.hasXray && (
                          <View style={styles.indicator}>
                            <Icon name="document" size={16} color="#FD9B63" />
                            <Text style={styles.indicatorText}>X-ray</Text>
                          </View>
                        )}
                        {diagnosis.hasLabResults && (
                          <View style={styles.indicator}>
                            <Icon name="flask" size={16} color="#FD9B63" />
                            <Text style={styles.indicatorText}>Lab Results</Text>
                          </View>
                        )}
                        {diagnosis.hasPrescription && (
                          <View style={styles.indicator}>
                            <Icon name="medical" size={16} color="#FD9B63" />
                            <Text style={styles.indicatorText}>Prescription</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Past Diagnoses */}
            {filterDiagnoses(state.pastAppointments).length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Past Diagnoses</Text>
                {filterDiagnoses(state.pastAppointments).map((diagnosis) => (
                  <TouchableOpacity
                    key={diagnosis.id}
                    style={styles.diagnosisCard}
                    onPress={() => actions.navigateToDiagnosis(diagnosis)}
                  >
                    <Image
                      source={require("../../assets/images/portrait-hansome-young-male-doctor-man.png")}
                      style={styles.doctorImage}
                    />
                    <View style={styles.diagnosisInfo}>
                      <Text style={styles.doctorName}>{diagnosis.doctorName}</Text>
                      <Text style={styles.diagnosis}>{diagnosis.diagnosis}</Text>
                      <Text style={styles.dateTime}>
                        {diagnosis.displayDate}
                      </Text>
                      <View style={styles.indicatorsRow}>
                        {diagnosis.hasXray && (
                          <View style={styles.indicator}>
                            <Icon name="document" size={16} color="#FD9B63" />
                            <Text style={styles.indicatorText}>X-ray</Text>
                          </View>
                        )}
                        {diagnosis.hasLabResults && (
                          <View style={styles.indicator}>
                            <Icon name="flask" size={16} color="#FD9B63" />
                            <Text style={styles.indicatorText}>Lab Results</Text>
                          </View>
                        )}
                        {diagnosis.hasPrescription && (
                          <View style={styles.indicator}>
                            <Icon name="medical" size={16} color="#FD9B63" />
                            <Text style={styles.indicatorText}>Prescription</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default MyDiagnoses;
