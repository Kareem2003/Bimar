import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import usePrescriptionLogic from './logic';
import { styles } from './style';

const PrescriptionScreen = ({ navigation, route }) => {
  const prescriptionData = route.params?.prescription;
  const { prescription, loading, error, formatDate } = usePrescriptionLogic(prescriptionData, route.params);

  console.log("Route params:", route.params);
  
  // Function to safely render data
  const safeRender = (component, fallback = null) => {
    try {
      return component();
    } catch (err) {
      console.log("Render error:", err);
      return fallback;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={[styles.errorText, {marginTop: 10, fontSize: 14}]}>
          Please ask your doctor to create a prescription for this diagnosis.
        </Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // If we don't have a prescription object at this point, something went wrong
  if (!prescription) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load prescription data</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backIcon}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prescription Details</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Prescription Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prescription Information</Text>
          
          {safeRender(() => (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date:</Text>
              <Text style={styles.infoValue}>{formatDate(prescription.prescriptionDate)}</Text>
            </View>
          ))}
          
          {safeRender(() => (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Follow-up Date:</Text>
              <Text style={styles.infoValue}>{formatDate(prescription.followUpDate)}</Text>
            </View>
          ))}
          
          {safeRender(() => (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status:</Text>
              <View style={[
                styles.statusBadge, 
                { backgroundColor: 
                  prescription.prescriptionStatus === 'Issued' ? '#4CAF50' : 
                  prescription.prescriptionStatus === 'Expired' ? '#F44336' : '#FFC107'
                }
              ]}>
                <Text style={styles.statusText}>{prescription.prescriptionStatus}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Medications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medications</Text>
          {safeRender(() => (
            prescription.prescriptionInstruction && prescription.prescriptionInstruction.length > 0 ? (
              prescription.prescriptionInstruction.map((medication, index) => (
                <View key={index} style={styles.medicationCard}>
                  <Text style={styles.medicationName}>{medication.medication}</Text>
                  <View style={styles.medicationDetails}>
                    <View style={styles.medicationDetail}>
                      <Icon name="medical-outline" size={16} color="#555" />
                      <Text style={styles.detailText}>Dosage: {medication.dosage}</Text>
                    </View>
                    <View style={styles.medicationDetail}>
                      <Icon name="time-outline" size={16} color="#555" />
                      <Text style={styles.detailText}>{medication.frequency} times daily</Text>
                    </View>
                    <View style={styles.medicationDetail}>
                      <Icon name="calendar-outline" size={16} color="#555" />
                      <Text style={styles.detailText}>Duration: {medication.duration} weeks</Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noDataText}>No medications prescribed</Text>
            )
          ), <Text style={styles.noDataText}>Failed to load medication data</Text>)}
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Doctor's Notes</Text>
          <View style={styles.notesCard}>
            <Text style={styles.notesText}>
              {prescription.notes || "No additional notes provided"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrescriptionScreen;
