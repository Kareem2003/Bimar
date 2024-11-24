import { useContext, useEffect, useReducer, useCallback } from "react";
import { reducer } from "../../reducers/reducer";
import { INITIAL_STATE } from "./constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AUTHENTICATION_TOKEN,
  IS_FIRST_TIME,
  USERINFO,
} from "../../helpers/constants/staticKeys";
import { Context } from "../../contexts/appContext";
import ACTION_TYPES from "../../reducers/actionTypes";
const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { updateState: updateCtxState } = useContext(Context);

  const updateState = (payload) => {
    dispatch({ payload });
  };
  const checkAuth = useCallback(async () => {
    const authToken = await AsyncStorage.getItem(AUTHENTICATION_TOKEN);
    setTimeout(async () => {
      const isFirstTime = await AsyncStorage.getItem(IS_FIRST_TIME);

      if (authToken) {
        let userInfo = JSON.parse(await AsyncStorage.getItem(USERINFO));
        // Not the first time and authorized
        updateCtxState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "userData",
            value: {
              name: userInfo.name,
              email: userInfo.email,
              companyName: userInfo.companyName,
            },
          },
        ]);
        navigation.reset({ index: 0, routes: [{ name: "Drawer" }] });
      } else {
        // Not authorized
        if (isFirstTime === null) {
          await AsyncStorage.setItem("isFirstTime", "false");
          navigation.replace("StarterTheme");
        } else {
          navigation.replace("Login");
        }
      }
    }, 2000);
  }, [navigation, updateCtxState]);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return { state, updateState };
};

export default Logic;
