import axios from "axios";
import { BASE_URL } from "../helpers/constants/config";
import { AUTHENTICATION_TOKEN } from "../helpers/constants/staticKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Helper function to generate common headers
const getCommonHeaders = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
});

export const $axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    common: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
  timeout: 20000, // Increase timeout if necessary
  withCredentials: true, // Include credentials (cookies) in requests
});

export const $axiosFormData = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

export const $securedAxios = axios.create({
  baseURL: BASE_URL,
  headers: getCommonHeaders(),
  timeout: 10000, // 10 seconds timeout
});

const requestHandler = async (request) => {
  const authToken = await AsyncStorage.getItem(AUTHENTICATION_TOKEN);
  if (authToken) {
    request.headers.Authorization = `Bearer ${authToken}`;
  }
  return request;
};

const responseHandler = (response) => {
  return response;
};

const errHandler = (error) => {
  if (error.code === "ECONNABORTED") {
    return Promise.reject("Request timed out. Please try again.");
  }
  if (error.response) {
    const { status, data } = error.response;
    if (status === 401) {
      // Handle token expiration and refresh logic here
    }
    return Promise.reject(data || "An error occurred");
  } else if (error.request) {
    ToastManager.notify("No response received from server.", {
      type: "error",
    });
    return Promise.reject("No response received from server.");
  } else {
    ToastManager.notify(error.message || "An error occurred", {
      type: "error",
    });
    return Promise.reject(error.message || "An error occurred");
  }
};

// UNSECURED RESPONSE HANDLER
$axios.interceptors.response.use(responseHandler, errHandler);

// UNSECURED RESPONSE HANDLER
$axiosFormData.interceptors.response.use(responseHandler, errHandler);

// SECURED REQUEST HANDLER
$securedAxios.interceptors.request.use(requestHandler, errHandler);

// SECURED RESPONSE HANDLER
$securedAxios.interceptors.response.use(responseHandler, errHandler);

// Export the axios instance
export default $axios;
