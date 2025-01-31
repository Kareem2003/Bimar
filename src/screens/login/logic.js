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
    let valid = true;

    // Reset errors
    updateState([
      { type: ACTION_TYPES.UPDATE_PROP, prop: 'emailError', value: "" },
      { type: ACTION_TYPES.UPDATE_PROP, prop: 'passwordError', value: "" },
    ]);

    // Validate inputs
    if (!state.email) {
      updateState([{ type: ACTION_TYPES.UPDATE_PROP, prop: 'emailError', value: "Email is required." }]);
      valid = false;
    } else if (!validateEmail(state.email)) {
      updateState([{ type: ACTION_TYPES.UPDATE_PROP, prop: 'emailError', value: "Please enter a valid email address." }]);
      valid = false;
    }

    if (!state.password) {
      updateState([{ type: ACTION_TYPES.UPDATE_PROP, prop: 'passwordError', value: "Password is required." }]);
      valid = false;
    }

    if (!valid) {
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

    const payload = {
      userEmail: state.email,
      userPassword: state.password,
    };

    patientLogin(
      payload,
      (res) => {
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
              AsyncStorage.setItem(USERINFO, JSON.stringify(res.data.patient))
            ])
              .then(() => {
                navigation.replace("HomeNav");
              })
              .catch(error => {
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
      (e) => {
        ToastManager.notify(e, {
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
