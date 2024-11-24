import axios from "axios";
import { BASE_URL } from "../helpers/constants/config";
import {
  AUTHENTICATION_TOKEN,
  USERINFO,
} from "../helpers/constants/staticKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "../navigation/authNavigator";
export const unsecured = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
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
const errHandler = (response) => {
  if (response.response.status == 401) {
    AsyncStorage.clear();
    navigationRef.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
    return Promise.reject("Please Log in Again");
  } else {
    return Promise.reject(response);
  }
};

// SECURED REQUEST HANDLER
secured.interceptors.request.use((request) => requestHandler(request));

// SECURED RESPONSE HANDLER
secured.interceptors.response.use(
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
export const unsecureGet = (
  url,
  onSuccess,
  onError,
  onComplete = (f) => {}
) => {
  unsecured
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
