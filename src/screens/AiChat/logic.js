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
  getDigestive,
  getEyes,
  getGeneral,
  getHead,
  getLimbs,
  getMental,
  getMusculoskeletal,
  getPregnancy,
  getSkin,
  getSpecialistDoctor,
  getStomach,
  getThroatMouth,
  getUrinaryReproductive,
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

    getEyes(
      {},
      (response) => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "eyes",
            value: response.data,
          },
        ]);
      },
      (error) => {
        console.log("error", error);
        ToastManager.notify("Error fetching eyes symptoms", {
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

    getUrinaryReproductive(
      {},
      (response) => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "urinaryReproductive",
            value: response.data,
          },
        ]);
      },
      (error) => {
        console.log("error", error);
        ToastManager.notify("Error fetching urinary/reproductive symptoms", {
          type: "error",
        });
      },
      () => {}
    );

    getMusculoskeletal(
      {},
      (response) => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "musculoskeletal",
            value: response.data,
          },
        ]);
      },
      (error) => {
        console.log("error", error);
        ToastManager.notify("Error fetching musculoskeletal symptoms", {
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

    getPregnancy(
      {},
      (response) => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "pregnancy",
            value: response.data,
          },
        ]);
      },
      (error) => {
        console.log("error", error);
        ToastManager.notify("Error fetching pregnancy symptoms", {
          type: "error",
        });
      },
      () => {}
    );

    getDigestive(
      {},
      (response) => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "digestive",
            value: response.data,
          },
        ]);
      },
      (error) => {
        console.log("error", error);
        ToastManager.notify("Error fetching digestive symptoms", {
          type: "error",
        });
      },
      () => {}
    );

    getThroatMouth(
      {},
      (response) => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "throatMouth",
            value: response.data,
          },
        ]);
      },
      (error) => {
        console.log("error", error);
        ToastManager.notify("Error fetching throat/mouth symptoms", {
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

    getMental(
      {},
      (response) => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "mental",
            value: response.data,
          },
        ]);
      },
      (error) => {
        console.log("error", error);
        ToastManager.notify("Error fetching mental symptoms", {
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

    getLimbs(
      {},
      (response) => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "limbs",
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
        getDoctors(res.data.specialist);
      },
      (err) => {
        console.log("err", err);
      },
      () => {}
    );
  };

  const getDoctors = (field) => {
    console.log(field);
    getSpecialistDoctor(
      {
        field: field,
      },
      (res) => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "doctors",
            value: res.data.data,
          },
        ]);
      },
      (error) => {
        console.log("res", error);
      },
      () => {
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "isProcessing",
            value: false,
          },
        ]);
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
    getDoctors,
  };
};

export default Logic;
