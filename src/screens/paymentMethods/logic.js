import { useContext, useEffect, useReducer, useCallback } from "react";
import { reducer } from "../../reducers/reducer";
import { INITIAL_STATE } from "./constant";
import { Context } from "../../contexts/appContext";
const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { updateState: updateCtxState } = useContext(Context);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  return { state, updateState };
};

export default Logic;
