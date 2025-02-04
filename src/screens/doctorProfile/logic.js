import { useReducer } from 'react';
import { reducer } from '../../reducers/reducer';

const INITIAL_STATE = {
  loading: false,
  error: null,
};

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  return {
    state,
    updateState,
  };
};

export default Logic;
