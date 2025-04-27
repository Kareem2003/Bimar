import { BASE_URL } from "../helpers/constants/config";
import $securedAxios from "./axios";

export const getHead = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/symptoms/head")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
export const getEyes = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/symptoms/eyes")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
export const getChest = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/symptoms/chest")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
export const getUrinaryReproductive = (
  payload,
  onSuccess,
  onError,
  onComplete
) => {
  $securedAxios
    .get("/symptoms/urinary-reproductive")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
export const getMusculoskeletal = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/symptoms/musculoskeletal")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
export const getGeneral = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/symptoms/general")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
export const getPregnancy = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/symptoms/pregnancy")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
export const getDigestive = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/symptoms/digestive")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
export const getThroatMouth = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/symptoms/throat-mouth")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
export const getSkin = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/symptoms/skin")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
export const getMental = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/symptoms/mental")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
export const getStomach = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/symptoms/stomach")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
export const getLimbs = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/symptoms/limbs")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};

export const predictSpecialist = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .post("/ai/predict", { symptoms: payload.symptoms })
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};

export const getSpecialistDoctor = (
  payload,
  onSuccess,
  onError,
  onComplete
) => {
  $securedAxios
    .post("/doctor/field", { field: payload.field })
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
