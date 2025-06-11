import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTHENTICATION_TOKEN, USERINFO } from '../helpers/constants/staticKeys';
import { BASE_URL } from '../helpers/constants/config';

class DiagnosisService {
  constructor() {
    this.baseURL = BASE_URL;
  }

  async getAuthHeaders() {
    const token = await AsyncStorage.getItem(AUTHENTICATION_TOKEN);
    console.log('Auth token retrieved:', token ? 'Token exists' : 'No token found');
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  async uploadFiles(diagnosisId, files, fileType) {
    try {
      const headers = await this.getAuthHeaders();
      
      console.log('Adding files to existing diagnosis:', diagnosisId);
      console.log('File type:', fileType);
      console.log('Number of files:', files.length);

      const formData = new FormData();

      // Add files to FormData based on type
      files.forEach((file, index) => {
        const fileField = fileType === 'xray' ? 'Xray' : 'labResults';
        formData.append(fileField, {
          uri: file.uri,
          type: file.type === 'image' ? 'image/jpeg' : 'application/pdf',
          name: file.name,
        });
      });

      // Use the appropriate endpoint based on file type
      const endpoint = fileType === 'xray' 
        ? `${this.baseURL}/Diagnosis/${diagnosisId}/xrays`
        : `${this.baseURL}/Diagnosis/${diagnosisId}/lab-results`;

      console.log('Using endpoint:', endpoint);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // If not JSON, get the text to see what's being returned
        const textResponse = await response.text();
        console.error('Non-JSON response:', textResponse);
        throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Upload failed with errors:', errorData);
        throw new Error(errorData.message || `Upload failed: ${response.status}`);
      }

      const result = await response.json();
      console.log('Upload successful:', result);
      return result;
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error;
    }
  }

  async addXraysToDiagnosis(diagnosisId, formData) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseURL}/Diagnosis/${diagnosisId}/xrays`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding X-rays:', error);
      throw error;
    }
  }

  async addLabResultsToDiagnosis(diagnosisId, formData) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseURL}/Diagnosis/${diagnosisId}/lab-results`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding lab results:', error);
      throw error;
    }
  }

  async updateDiagnosisWithFiles(diagnosisId, formData) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseURL}/Diagnosis/${diagnosisId}/update-with-files`, {
        method: 'PATCH',
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating diagnosis with files:', error);
      throw error;
    }
  }

  async removeXrayFile(diagnosisId, xrayIndex) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseURL}/Diagnosis/${diagnosisId}/xray/${xrayIndex}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error removing X-ray file:', error);
      throw error;
    }
  }

  async removeLabResultFile(diagnosisId, labResultIndex) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseURL}/Diagnosis/${diagnosisId}/lab-result/${labResultIndex}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error removing lab result file:', error);
      throw error;
    }
  }

  async createDiagnosisWithFiles(formData) {
    try {
      const headers = await this.getAuthHeaders();
      
      console.log('Creating new diagnosis with files...');
      
      const response = await fetch(`${this.baseURL}/Diagnosis`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      console.log('Create diagnosis response status:', response.status);

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response from create:', textResponse);
        throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to create diagnosis: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating diagnosis with files:', error);
      throw error;
    }
  }

  async createDiagnosis(formData) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseURL}/Diagnosis`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create diagnosis');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating diagnosis:', error);
      throw error;
    }
  }

  async getDiagnosis(patientId) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseURL}/Diagnosis?patientId=${patientId}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch diagnosis');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching diagnosis:', error);
      throw error;
    }
  }

  async getSpecificDiagnosis(patientId, diagnosisId) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseURL}/Diagnosis/patient/${patientId}/diagnosis/${diagnosisId}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch specific diagnosis');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching specific diagnosis:', error);
      throw error;
    }
  }

  async getXrayFile(diagnosisId, xrayId) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseURL}/Diagnosis/${diagnosisId}/xray/${xrayId}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch X-ray file');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching X-ray file:', error);
      throw error;
    }
  }

  async getLabResultFile(diagnosisId, labResultId) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseURL}/Diagnosis/${diagnosisId}/labresult/${labResultId}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch lab result file');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching lab result file:', error);
      throw error;
    }
  }

  async updateDiagnosis(diagnosisId, updateData) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseURL}/Diagnosis/${diagnosisId}`, {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update diagnosis');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating diagnosis:', error);
      throw error;
    }
  }

  async deleteDiagnosis(diagnosisId) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await fetch(`${this.baseURL}/Diagnosis/${diagnosisId}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete diagnosis');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting diagnosis:', error);
      throw error;
    }
  }
}

export default new DiagnosisService(); 