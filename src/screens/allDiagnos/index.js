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
  RefreshControl,
} from "react-native";
import Logic from "./logic";
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL } from "../../helpers/constants/config";

const MyDiagnoses = ({ navigation }) => {
  const { state, actions } = Logic(navigation);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await actions.fetchAllDiagnoses();
    setIsRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      handleRefresh();
    }, [])
  );

  const filterDiagnoses = (diagnoses) => {
    if (!searchQuery) return diagnoses;
    return diagnoses.filter(
      (diagnosis) =>
        diagnosis.doctorName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        diagnosis.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  if (state.loading && !isRefreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FD9B63" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Diagnoses</Text>
        {isRefreshing && (
          <ActivityIndicator
            size="small"
            color="#16423C"
            style={{ marginLeft: 10 }}
          />
        )}
      </View>

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

      <ScrollView
        style={styles.diagnosesList}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={["#16423C"]}
            tintColor="#16423C"
          />
        }
      >
        {state.error ? (
          <Text style={styles.errorText}>{state.error}</Text>
        ) : (
          <>
            {filterDiagnoses(state.upcomingAppointments).length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Diagnoses</Text>
                {filterDiagnoses(state.upcomingAppointments).map(
                  (diagnosis) => (
                    <TouchableOpacity
                      key={diagnosis.id}
                      style={styles.diagnosisCard}
                      onPress={() => actions.navigateToDiagnosis(diagnosis)}
                    >
                      <Image
                        source={{ uri: `${diagnosis.doctorImage}` }}
                        style={styles.doctorImage}
                      />
                      <View style={styles.diagnosisInfo}>
                        <Text style={styles.doctorName}>
                          {diagnosis.doctorName}
                        </Text>
                        <Text style={styles.diagnosis}>
                          {diagnosis.diagnosis}
                        </Text>
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
                              <Text style={styles.indicatorText}>
                                Lab Results
                              </Text>
                            </View>
                          )}
                          {diagnosis.hasPrescription && (
                            <View style={styles.indicator}>
                              <Icon name="medical" size={16} color="#FD9B63" />
                              <Text style={styles.indicatorText}>
                                Prescription
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                )}
              </View>
            )}

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
                      source={
                        diagnosis.doctorImage
                          ? { uri: `${diagnosis.doctorImage}` }
                          : require("../../assets/images/portrait-hansome-young-male-doctor-man.png")
                      }
                      style={styles.doctorImage}
                    />
                    <View style={styles.diagnosisInfo}>
                      <Text style={styles.doctorName}>
                        {diagnosis.doctorName}
                      </Text>
                      <Text style={styles.diagnosis}>
                        {diagnosis.diagnosis}
                      </Text>
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
                            <Text style={styles.indicatorText}>
                              Lab Results
                            </Text>
                          </View>
                        )}
                        {diagnosis.hasPrescription && (
                          <View style={styles.indicator}>
                            <Icon name="medical" size={16} color="#FD9B63" />
                            <Text style={styles.indicatorText}>
                              Prescription
                            </Text>
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
