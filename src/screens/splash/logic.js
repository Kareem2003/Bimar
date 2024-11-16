import { useContext, useEffect, useReducer, useCallback } from "react";
import { reducer } from "../../reducers/reducer";
import { INITIAL_STATE } from "./constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AUTHENTICATION_TOKEN,
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
      if (authToken) {
        let userInfo = JSON.parse(await AsyncStorage.getItem(USERINFO));
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
        navigation.replace("Login");
      }
    }, 2000); // 3-second delay
  }, [navigation, updateCtxState]);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return { state, updateState };
};

export default Logic;
