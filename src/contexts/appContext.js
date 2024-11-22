import createDataContext from "./createDataContext";
import { reducer } from "../reducers/reducer";

const INITIAL_STATE = {
  userData: {},
};

const updateState = (dispatch) => {
  return (payload) => {
    dispatch({ payload });
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { updateState },
  INITIAL_STATE
);
