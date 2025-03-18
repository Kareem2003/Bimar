import {
  useContext,
  useEffect,
  useReducer,
  useCallback,
  useState,
} from "react";
import { reducer } from "../../reducers/reducer";
import { INITIAL_STATE } from "./constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AUTHENTICATION_TOKEN,
  USERINFO,
} from "../../helpers/constants/staticKeys";
import { Context } from "../../contexts/appContext";
import ACTION_TYPES from "../../reducers/actionTypes";
import { patientLogin } from "../../service/AuthServices";
import { ToastManager } from "../../helpers/ToastManager";
const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { updateState: updateCtxState } = useContext(Context);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const handleLogin = () => {
    const payload = {
      userEmail: state.email,
      userPassword: state.password,
    };

    // Check if email and password are defined
    if (!payload.userEmail || !payload.userPassword) {
      ToastManager.notify("Email and password are required.", {
        type: "error",
      });
      return;
    }

    dispatch({
      payload: [
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: `loading`,
          value: true,
        },
      ],
    });

    patientLogin(
      payload,
      async (res) => {
        if (res.data.status === "success") {
          ToastManager.notify("Logged in successfully!", {
            type: "success",
          });
          const cookies = res.headers["set-cookie"];
          const token = extractTokenFromCookies(cookies);
          // Store token in AsyncStorage using Promise chain
          if (token) {
            Promise.all([
              AsyncStorage.setItem(AUTHENTICATION_TOKEN, token),
              AsyncStorage.setItem(USERINFO, JSON.stringify(res.data.patient)),
            ])
              .then(() => {
                navigation.replace("MainApp");
              })
              .catch((error) => {
                ToastManager.notify("Error storing credentials", {
                  type: "error",
                });
              });
          }
        } else {
          ToastManager.notify("Login Failed!", {
            type: "error",
          });
        }
      },
      (errorMessage) => {
        ToastManager.notify(errorMessage, {
          type: "error",
        });
        dispatch({
          payload: [
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: `loading`,
              value: false,
            },
          ],
        });
      },
      () => {}
    );
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Helper function to extract token from cookies
  const extractTokenFromCookies = (cookies) => {
    if (!cookies) return null;
    const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwt="));
    return jwtCookie ? jwtCookie.split("=")[1].split(";")[0] : null;
  };

  const togglePasswordVisibility = () => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "isPasswordVisible",
        value: !state.isPasswordVisible,
      },
    ]);
  };

  return {
    state,
    updateState,
    handleLogin,
    validateEmail,
    extractTokenFromCookies,
    togglePasswordVisibility,
  };
};

export default Logic;
