import axios from "axios";
import { BASE_URL } from "../helpers/constants/config";
import {
  AUTHENTICATION_TOKEN,
  USERINFO,
} from "../helpers/constants/staticKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "../navigation/authNavigator";
export const unsecured = axios.create({
  timeout: 10000, // 10 second timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
});
export const secured = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

const requestHandler = async (request) => {
  const authToken = await AsyncStorage.getItem(AUTHENTICATION_TOKEN);
  let headers = {};
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  request.headers.common = {
    ...request.headers.common,
    ...headers,
  };
  return request;
};

const responseHandler = (response) => {
  return response;
};
const errHandler = (error) => {
  if (error.response) {
    const errorData = error.response.data;
    if (errorData.status === "fail") {
      return Promise.reject(errorData);
    }
  } else if (error.request) {
    return Promise.reject("No response received from server.");
  } else {
    return Promise.reject(error);
  }
};

// SECURED REQUEST HANDLER
secured.interceptors.request.use((request) => requestHandler(request));

// SECURED RESPONSE HANDLER
secured.interceptors.response.use(
  (response) => responseHandler(response),
  (err) => errHandler(err)
);

unsecured.interceptors.response.use(
  (response) => responseHandler(response),
  (err) => errHandler(err)
);

export const secureGet = (url, onSuccess, onError, onComplete = (f) => {}) => {
  secured
    .get(url, { "Content-Type": "application/raw" })

    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      onError(error);
    })
    .finally((f) => {
      onComplete(f);
    });
};

export const securePost = (
  url,
  body,
  onSuccess,
  onError,
  onComplete = (f) => {}
) => {
  secured
    .post(url, body)
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      onError(error);
    })
    .finally((f) => {
      onComplete(f);
    });
};
export const unsecureGet = (url, onSuccess, onError, onComplete = () => {}) => {
  unsecured
    .get(url)
    .then((response) => {
      console.log("API Response:", response);
      onSuccess(response);
    })
    .catch((error) => {
      console.error("API Error Details:", {
        message: error.message,
        response: error.response,
        request: error.request
      });
      
      if (error.response) {
        // Server responded with error
        onError(error.response.data);
      } else if (error.request) {
        // Request made but no response
        onError("Server is not responding. Please check your connection.");
      } else {
        // Request setup error
        onError(error.message);
      }
    })
    .finally(() => {
      onComplete();
    });
};
export const unsecurePost = (
  url,
  body,
  onSuccess,
  onError,
  onComplete = (f) => {}
) => {
  unsecured
    .post(url, body)
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      onError(error);
    })
    .finally((f) => {
      onComplete(f);
    });
};
