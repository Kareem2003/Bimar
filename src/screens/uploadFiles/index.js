import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { ToastManager } from '../../helpers/ToastManager';
import DiagnosisService from '../../service/diagnosisService';

const UploadFiles = ({ navigation, route }) => {
  const { diagnosisId, onFilesAdded } = route.params || {};
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [fileType, setFileType] = useState('labResults'); // 'labResults' or 'xray'

  const handleImageUpload = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please allow access to your photo library to upload images.',
          [{ text: 'OK' }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets) {
        const newFiles = result.assets.map(asset => ({
          id: Date.now() + Math.random(),
          uri: asset.uri,
          name: asset.fileName || `image_${Date.now()}.jpg`,
          type: 'image',
          size: asset.fileSize || 0,
        }));
        
        if (uploadedFiles.length + newFiles.length > 5) {
          ToastManager.notify('Maximum 5 files allowed', { type: 'warning' });
          return;
        }
        
        setUploadedFiles(prev => [...prev, ...newFiles]);
        ToastManager.notify('Images selected successfully', { type: 'success' });
      }
    } catch (error) {
      console.error('Error selecting images:', error);
      ToastManager.notify('Error selecting images', { type: 'error' });
    }
  };

  const handleDocumentUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        multiple: true,
      });

      if (!result.canceled && result.assets) {
        const newFiles = result.assets.map(asset => ({
          id: Date.now() + Math.random(),
          uri: asset.uri,
          name: asset.name,
          type: asset.mimeType?.startsWith('image/') ? 'image' : 'document',
          size: asset.size || 0,
        }));
        
        if (uploadedFiles.length + newFiles.length > 5) {
          ToastManager.notify('Maximum 5 files allowed', { type: 'warning' });
          return;
        }
        
        setUploadedFiles(prev => [...prev, ...newFiles]);
        ToastManager.notify('Documents selected successfully', { type: 'success' });
      }
    } catch (error) {
      console.error('Error selecting documents:', error);
      ToastManager.notify('Error selecting documents', { type: 'error' });
    }
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) {
      ToastManager.notify('Please select at least one file to upload', { type: 'warning' });
      return;
    }

    if (!diagnosisId) {
      ToastManager.notify('Diagnosis ID is required', { type: 'error' });
      return;
    }

    setIsUploading(true);
    
    try {
      ToastManager.notify(`Adding ${getFileTypeLabel().toLowerCase()} to existing diagnosis...`, { type: 'info' });
      
      const result = await DiagnosisService.uploadFiles(diagnosisId, uploadedFiles, fileType);
      
      // Handle the response based on the backend structure
      let successMessage = `${getFileTypeLabel()} added successfully!`;
      let detailsMessage = '';
      
      if (result.data) {
        if (result.data.message) {
          successMessage = result.data.message;
        }
        if (result.data.addedFiles) {
          detailsMessage += `\nAdded: ${result.data.addedFiles} files`;
        }
        if (result.data.totalXrays) {
          detailsMessage += `\nTotal X-rays: ${result.data.totalXrays}`;
        }
        if (result.data.totalLabResults) {
          detailsMessage += `\nTotal Lab Results: ${result.data.totalLabResults}`;
        }
      }
      
      ToastManager.notify(successMessage, { type: 'success' });
      
      // Call the callback to refresh the diagnosis screen
      if (onFilesAdded) {
        onFilesAdded();
      }
      
      // Show success message with details
      Alert.alert(
        'Files Added Successfully',
        `${successMessage}${detailsMessage}\n\nFiles have been added to the existing diagnosis.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      console.error('Upload error:', error);
      
      // Show detailed error message
      Alert.alert(
        'Upload Failed',
        error.message || 'Failed to add files to diagnosis. Please try again.',
        [
          {
            text: 'OK',
            style: 'default'
          }
        ]
      );
    } finally {
      setIsUploading(false);
    }
  };

  const getFileTypeLabel = () => {
    return fileType === 'xray' ? 'X-Ray Images' : 'Lab Results';
  };

  const getFileTypeDescription = () => {
    return fileType === 'xray' 
      ? 'Add X-ray images to your existing diagnosis. Files will be added without removing existing ones.'
      : 'Add lab results to your existing diagnosis. You can upload images or PDF documents. Files will be added without removing existing ones.';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload {getFileTypeLabel()}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.description}>
          {getFileTypeDescription()}
        </Text>

        {/* File Type Selector */}
        <View style={styles.fileTypeSelector}>
          <TouchableOpacity 
            style={[
              styles.fileTypeButton, 
              fileType === 'labResults' && styles.fileTypeButtonActive
            ]}
            onPress={() => setFileType('labResults')}
          >
            <Icon name="document-text-outline" size={20} color={fileType === 'labResults' ? '#FFF' : '#16423C'} />
            <Text style={[
              styles.fileTypeButtonText,
              fileType === 'labResults' && styles.fileTypeButtonTextActive
            ]}>
              Lab Results
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.fileTypeButton, 
              fileType === 'xray' && styles.fileTypeButtonActive
            ]}
            onPress={() => setFileType('xray')}
          >
            <Icon name="scan-outline" size={20} color={fileType === 'xray' ? '#FFF' : '#16423C'} />
            <Text style={[
              styles.fileTypeButtonText,
              fileType === 'xray' && styles.fileTypeButtonTextActive
            ]}>
              X-Ray Images
            </Text>
          </TouchableOpacity>
        </View>

        {/* Upload Buttons */}
        <View style={styles.uploadButtons}>
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={handleImageUpload}
          >
            <Icon name="image-outline" size={24} color="#16423C" />
            <Text style={styles.uploadButtonText}>Upload Images</Text>
          </TouchableOpacity>

          {fileType === 'labResults' && (
            <TouchableOpacity 
              style={styles.uploadButton}
              onPress={handleDocumentUpload}
            >
              <Icon name="document-outline" size={24} color="#16423C" />
              <Text style={styles.uploadButtonText}>Upload Documents</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* File Count */}
        <View style={styles.fileCountContainer}>
          <Text style={styles.fileCountText}>
            Files selected: {uploadedFiles.length}/5
          </Text>
        </View>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <View style={styles.filesSection}>
            <Text style={styles.sectionTitle}>
              Selected Files ({uploadedFiles.length})
            </Text>
            {uploadedFiles.map((file) => (
              <View key={file.id} style={styles.fileItem}>
                <View style={styles.fileInfo}>
                  <Icon 
                    name={file.type === 'image' ? 'image-outline' : 'document-outline'} 
                    size={20} 
                    color="#666" 
                  />
                  <View style={styles.fileDetails}>
                    <Text style={styles.fileName} numberOfLines={1}>
                      {file.name}
                    </Text>
                    <Text style={styles.fileSize}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => removeFile(file.id)}
                  style={styles.removeButton}
                >
                  <Icon name="close-circle" size={20} color="#FF4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitButton, isUploading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isUploading}
        >
          <Text style={styles.submitButtonText}>
            {isUploading ? 'Uploading...' : `Upload ${getFileTypeLabel()}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#16423C',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 22,
  },
  fileTypeSelector: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 4,
  },
  fileTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  fileTypeButtonActive: {
    backgroundColor: '#16423C',
  },
  fileTypeButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#16423C',
  },
  fileTypeButtonTextActive: {
    color: '#FFF',
  },
  uploadButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  uploadButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    marginTop: 8,
    fontSize: 14,
    color: '#16423C',
    fontWeight: '500',
  },
  fileCountContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  fileCountText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filesSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#16423C',
    marginBottom: 12,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileDetails: {
    marginLeft: 12,
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  fileSize: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  removeButton: {
    padding: 4,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  submitButton: {
    backgroundColor: '#16423C',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#999',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UploadFiles; 