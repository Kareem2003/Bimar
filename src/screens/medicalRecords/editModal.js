import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { styles } from './style';
import AppInput from '../../components/AppInput';
import AppSelect from '../../components/AppSelect';
import AppButton from '../../components/AppButton';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditRecordModal = ({ 
  visible, 
  onClose, 
  record, 
  onUpdate,
  loading 
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (record && visible) {
      initializeFormData();
    }
  }, [record, visible]);

  const initializeFormData = () => {
    const data = {};
    
    switch (record.name) {
      case 'Family History':
        data.genatics = record.genatics || [];
        data.genaticsDiseases = record.genaticsDiseases || [];
        break;
      case 'Allergic':
        data.allgeric = record.allgeric || [];
        break;
      case 'Chronic Medications':
        data.chronicMedications = record.chronicMedications || [];
        break;
      case 'Surgeries':
        data.surgeries = record.surgeries || [];
        break;
      case 'Chronic Diseases':
        data.chronicDiseases = record.chronicDiseases || [];
        break;
      case 'Vaccinations':
        data.vaccinations = record.vaccinations || [];
        break;
      case 'Personal Information':
        const personalRecords = record.personalRecords || {};
        data.workName = personalRecords.workName || '';
        data.workPlace = personalRecords.workPlace || '';
        data.childrenNumber = personalRecords.childrenNumber?.toString() || '';
        data.birthDateOfFirstChild = personalRecords.birthDateOfFirstChild || '';
        data.smoking = personalRecords.smoking || '';
        data.alcohol = personalRecords.alcohol || '';
        data.wifesNumber = personalRecords.wifesNumber?.toString() || '';
        data.petsTypes = personalRecords.petsTypes || [];
        data.familyStatus = personalRecords.familyStatus || '';
        break;
      default:
        break;
    }
    
    setFormData(data);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => {
      const newArray = [...(prev[field] || [])];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => {
      const newArray = [...(prev[field] || [])];
      newArray.splice(index, 1);
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const handleSave = () => {
    if (!record) return;

    let updatePayload = {
      personalRecords: {},
      medicalRecord: {}
    };

    try {
      switch (record.name) {
        case 'Family History':
          updatePayload.medicalRecord.familyHistory = {
            genatics: (formData.genatics || []).filter(item => item.trim()),
            genaticsDiseases: (formData.genaticsDiseases || []).filter(item => item.trim())
          };
          break;
        case 'Allergic':
          updatePayload.medicalRecord.allgeric = (formData.allgeric || []).filter(item => item.trim());
          break;
        case 'Chronic Medications':
          updatePayload.medicalRecord.chronicMedications = (formData.chronicMedications || []).filter(item => item.trim());
          break;
        case 'Surgeries':
          updatePayload.medicalRecord.surgeries = (formData.surgeries || []).filter(item => item.trim());
          break;
        case 'Chronic Diseases':
          updatePayload.medicalRecord.chronicDiseases = (formData.chronicDiseases || []).filter(item => item.trim());
          break;
        case 'Vaccinations':
          updatePayload.medicalRecord.vaccinations = (formData.vaccinations || []).filter(item => item.trim());
          break;
        case 'Personal Information':
          const petsFiltered = (formData.petsTypes || []).filter(item => item.trim());
          updatePayload.personalRecords = {
            workName: formData.workName || undefined,
            workPlace: formData.workPlace || undefined,
            childrenNumber: formData.childrenNumber ? parseInt(formData.childrenNumber) : undefined,
            birthDateOfFirstChild: formData.birthDateOfFirstChild || undefined,
            smoking: formData.smoking || undefined,
            alcohol: formData.alcohol || undefined,
            wifesNumber: formData.wifesNumber ? parseInt(formData.wifesNumber) : undefined,
            petsTypes: petsFiltered.length > 0 ? petsFiltered : undefined,
            familyStatus: formData.familyStatus || undefined
          };
          // Remove undefined values
          Object.keys(updatePayload.personalRecords).forEach(key => {
            if (updatePayload.personalRecords[key] === undefined) {
              delete updatePayload.personalRecords[key];
            }
          });
          break;
      }

      // Remove empty objects
      if (Object.keys(updatePayload.medicalRecord).length === 0) {
        delete updatePayload.medicalRecord;
      }
      if (Object.keys(updatePayload.personalRecords).length === 0) {
        delete updatePayload.personalRecords;
      }

      onUpdate(updatePayload);
    } catch (error) {
      Alert.alert('Error', 'Please check your input format');
    }
  };

  const renderArrayField = (fieldName, title, placeholder) => {
    const items = formData[fieldName] || [];
    
    return (
      <View style={styles.arrayFieldContainer}>
        <Text style={styles.arrayFieldTitle}>{title}</Text>
        {items.map((item, index) => (
          <View key={index} style={styles.arrayItemContainer}>
            <View style={styles.arrayInputContainer}>
              <AppInput
                term={item}
                placeholder={placeholder}
                onChangeText={(value) => handleArrayChange(fieldName, index, value)}
                inputWrapperStyle={styles.arrayInput}
              />
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeArrayItem(fieldName, index)}
            >
              <Icon name="trash" size={16} color="#ff4444" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addArrayItem(fieldName)}
        >
          <Icon name="plus" size={16} color="#6A9C89" />
          <Text style={styles.addButtonText}>Add {title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFormFields = () => {
    if (!record) return null;

    switch (record.name) {
      case 'Family History':
        return (
          <>
            {renderArrayField('genatics', 'Genetics', 'e.g., Heart Disease')}
            {renderArrayField('genaticsDiseases', 'Genetic Diseases', 'e.g., Diabetes')}
          </>
        );
      case 'Allergic':
        return renderArrayField('allgeric', 'Allergies', 'e.g., Peanuts');
      case 'Chronic Medications':
        return renderArrayField('chronicMedications', 'Chronic Medications', 'e.g., Metformin');
      case 'Surgeries':
        return renderArrayField('surgeries', 'Surgeries', 'e.g., Appendectomy');
      case 'Chronic Diseases':
        return renderArrayField('chronicDiseases', 'Chronic Diseases', 'e.g., Diabetes');
      case 'Vaccinations':
        return renderArrayField('vaccinations', 'Vaccinations', 'e.g., COVID-19');
      case 'Personal Information':
        return (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Work Name</Text>
              <AppInput
                term={formData.workName || ''}
                placeholder="Enter your work/job title"
                onChangeText={(value) => handleInputChange('workName', value)}
                inputWrapperStyle={styles.personalInput}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Work Place</Text>
              <AppInput
                term={formData.workPlace || ''}
                placeholder="Enter your workplace"
                onChangeText={(value) => handleInputChange('workPlace', value)}
                inputWrapperStyle={styles.personalInput}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Children Number</Text>
              <AppInput
                term={formData.childrenNumber || ''}
                placeholder="Enter number of children"
                onChangeText={(value) => handleInputChange('childrenNumber', value)}
                keyboardType="numeric"
                inputWrapperStyle={styles.personalInput}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Birth Date of First Child</Text>
              <AppInput
                term={formData.birthDateOfFirstChild || ''}
                placeholder="YYYY-MM-DD"
                onChangeText={(value) => handleInputChange('birthDateOfFirstChild', value)}
                inputWrapperStyle={styles.personalInput}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Smoking</Text>
              <AppSelect
                options={[
                  { label: 'Yes', value: 'Yes' },
                  { label: 'No', value: 'No' },
                  { label: 'Former smoker', value: 'Former smoker' }
                ]}
                defaultValue={formData.smoking || null}
                placeholder="Select smoking status"
                onChange={(value) => handleInputChange('smoking', value)}
                containerStyle={styles.selectInput}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Alcohol</Text>
              <AppInput
                term={formData.alcohol || ''}
                placeholder="Enter alcohol consumption"
                onChangeText={(value) => handleInputChange('alcohol', value)}
                inputWrapperStyle={styles.personalInput}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Wives Number</Text>
              <AppInput
                term={formData.wifesNumber || ''}
                placeholder="Enter number of wives"
                onChangeText={(value) => handleInputChange('wifesNumber', value)}
                keyboardType="numeric"
                inputWrapperStyle={styles.personalInput}
              />
            </View>
            {renderArrayField('petsTypes', 'Pets Types', 'e.g., Dog')}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Family Status</Text>
              <AppSelect
                options={[
                  { label: 'Single', value: 'Single' },
                  { label: 'Married', value: 'Married' },
                  { label: 'Divorced', value: 'Divorced' },
                  { label: 'Widowed', value: 'Widowed' }
                ]}
                defaultValue={formData.familyStatus || null}
                placeholder="Select family status"
                onChange={(value) => handleInputChange('familyStatus', value)}
                containerStyle={styles.selectInput}
              />
            </View>
          </>
        );
      default:
        return null;
    }
  };

  if (!record) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.editModalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit {record.name}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                <Icon name="times" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.modalContent}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              <View style={styles.currentDataSection}>
                <Text style={styles.sectionTitle}>Current Data:</Text>
                <Text style={styles.currentDataText}>{record.info}</Text>
              </View>

              <View style={styles.editSection}>
                <Text style={styles.sectionTitle}>Update Information:</Text>
                {renderFormFields()}
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.updateButton}
                onPress={handleSave}
                disabled={loading}
              >
                <Text style={{
                  color: "#FFF",
                  fontSize: 14,
                  fontWeight: "bold",
                  opacity: loading ? 0.6 : 1
                }}>
                  {loading ? "Updating..." : "Update"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default EditRecordModal; 