import { useContext, useEffect, useReducer } from "react";
import { reducer } from "../../reducers/reducer";
import { INITIAL_STATE } from "./constant";
import { getDoctors } from "../../service/HomeServices";
import { Context } from "../../contexts/appContext";
import ACTION_TYPES from "../../reducers/actionTypes";
import { ToastManager } from "../../helpers/ToastManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USERINFO } from "../../helpers/constants/staticKeys";
import {
  getChest,
  getGeneral,
  getHead,
  getLimb,
  getSkin,
  getStomach,
  predictSpecialist,
} from "../../service/aiChatServices";

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const handleRemoveSymptom = (symptomToRemove) => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "symptoms",
        value: state.symptoms.filter((symptom) => symptom !== symptomToRemove),
      },
    ]);
  };

  const fetchSymptoms = () => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "loading",
        value: true,
      },
    ]);

    getHead(
      {},
      (response) => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "head",
            value: response.data,
          },
        ]);
      },
      (error) => {
        console.log("error", error);
        ToastManager.notify("Error fetching head symptoms", {
          type: "error",
        });
      },
      () => {}
    );

    getChest(
      {},
      (response) => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "chest",
            value: response.data,
          },
        ]);
      },
      (error) => {
        console.log("error", error);
        ToastManager.notify("Error fetching chest symptoms", {
          type: "error",
        });
      },
      () => {}
    );

    getSkin(
      {},
      (response) => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "skin",
            value: response.data,
          },
        ]);
      },
      (error) => {
        console.log("error", error);
        ToastManager.notify("Error fetching skin symptoms", {
          type: "error",
        });
      },
      () => {}
    );

    getLimb(
      {},
      (response) => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "limb",
            value: response.data,
          },
        ]);
      },
      (error) => {
        console.log("error", error);
        ToastManager.notify("Error fetching limb symptoms", {
          type: "error",
        });
      },
      () => {}
    );

    getStomach(
      {},
      (response) => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "stomach",
            value: response.data,
          },
        ]);
      },
      (error) => {
        console.log("error", error);
        ToastManager.notify("Error fetching stomach symptoms", {
          type: "error",
        });
      },
      () => {}
    );

    getGeneral(
      {},
      (response) => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "general",
            value: response.data,
          },
        ]);
      },
      (error) => {
        console.log("error", error);
        ToastManager.notify("Error fetching general symptoms", {
          type: "error",
        });
      },
      () => {}
    );
  };

  const sendAiModel = () => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "isProcessing",
        value: true,
      },
    ]);
    predictSpecialist(
      { symptoms: state.symptoms },
      (res) => {
        console.log("res", res.data);
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "specialist",
            value: res.data.specialist,
          },
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "prediction",
            value: res.data.prediction,
          },
        ]);
      },
      (err) => {
        console.log("err", err);
      },
      () => {
        setTimeout(() => {
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "isProcessing",
              value: false,
            },
          ]);
        }, 1000);
      }
    );
  };

  useEffect(() => {
    fetchSymptoms();
  }, []);

  return {
    state,
    updateState,
    handleRemoveSymptom,
    sendAiModel,
  };
};

export default Logic;
