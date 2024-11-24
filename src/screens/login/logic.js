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
const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { updateState: updateCtxState } = useContext(Context);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const handleLogin = () => {
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
      async (res) => {
        if (res.data.status === "success") {
          const cookies = res.headers["set-cookie"];
          const token = extractTokenFromCookies(cookies);
          // Store token in AsyncStorage
          if (token) {
            await AsyncStorage.setItem(AUTHENTICATION_TOKEN, token);
            await AsyncStorage.setItem(
              USERINFO,
              JSON.stringify(res.data.patient)
            );
          }
          navigation.replace("HomeNav");
        } else {
          console.log("Login failed");
        }
      },
      (e) => {
        console.error("Error:", e);
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

  // Helper function to extract token from cookies
  const extractTokenFromCookies = (cookies) => {
    if (!cookies) return null;
    const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwt="));
    return jwtCookie ? jwtCookie.split("=")[1].split(";")[0] : null;
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return {
    state,
    updateState,
    handleLogin,
    isPasswordVisible,
    togglePasswordVisibility,
  };
};

export default Logic;
