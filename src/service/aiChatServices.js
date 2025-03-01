import { BASE_URL } from "../helpers/constants/config";
import $securedAxios from "./axios";

export const getHead = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/symptoms/head")
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
export const getSkin = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/symptoms/skin")
    .then(onSuccess)
    .catch(onError)
    .finally(onComplete);
};
export const getLimb = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/symptoms/limb")
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
export const getGeneral = (payload, onSuccess, onError, onComplete) => {
  $securedAxios
    .get("/symptoms/general")
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
