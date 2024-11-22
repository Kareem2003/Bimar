import dotProp from "dot-prop-immutable";
import ACTION_TYPES from "./actionTypes";

export const reducer = (state, action) => {
  const { UPDATE_PROP, DELETE_PROP, MERGE_PROP } = ACTION_TYPES;
  let newState = state;
  for (let i = 0; i < action.payload.length; i++) {
    switch (action.payload[i].type) {
      case UPDATE_PROP: {
        newState = dotProp.set(
          newState,
          action.payload[i].prop,
          action.payload[i].value
        );
        break;
      }
      case DELETE_PROP: {
        newState = dotProp.delete(newState, action.payload[i].prop);
        break;
      }
      case MERGE_PROP: {
        newState = dotProp.merge(
          newState,
          action.payload[i].prop,
          action.payload[i].value
        );
        break;
      }
    }
  }
  return newState;
};
