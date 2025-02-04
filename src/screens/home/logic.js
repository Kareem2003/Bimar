import { useContext, useEffect, useReducer } from "react";
import { reducer } from "../../reducers/reducer";
import { INITIAL_STATE } from "./constant";
import { getDoctors } from "../../service/HomeServices";
import { Context } from "../../contexts/appContext";
import ACTION_TYPES from "../../reducers/actionTypes";

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { updateState: updateCtxState } = useContext(Context);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const handlePress = (iconName) => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: 'activeIcon',
        value: iconName
      }
    ]);

    if (navigation) {
      switch (iconName) {
        case 'gear':
          navigation.navigate('Settings');
          break;
        case 'envelope':
          navigation.navigate('Messages');
          break;
        case 'home':
          navigation.navigate('Home');
          break;
        case 'clipboard':
          navigation.navigate('Appointments');
          break;
        case 'user':
          navigation.navigate('Profile');
          break;
      }
    }
  };

  const navigateToDoctors = () => {
    if (navigation) {
      navigation.navigate('Doctors');
    }
  };

  useEffect(() => {
    const fetchDoctors = () => {
      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: 'loading',
          value: true
        }
      ]);

      getDoctors(
        {},
        (response) => {
          console.log("Doctors data received:", response.data);
          if (response?.data?.data) {
            updateState([
              {
                type: ACTION_TYPES.UPDATE_PROP,
                prop: 'doctors',
                value: response.data.data
              }
            ]);
          } else {
            console.error("Invalid doctors data format:", response.data);
            updateState([
              {
                type: ACTION_TYPES.UPDATE_PROP,
                prop: 'error',
                value: "Invalid data format received"
              }
            ]);
          }
        },
        (error) => {
          console.error("Error fetching doctors:", error);
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: 'error',
              value: error?.message || "Failed to fetch doctors"
            }
          ]);
        },
        () => {
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: 'loading',
              value: false
            }
          ]);
        }
      );
    };

    fetchDoctors();
  }, []);

  return {
    state,
    updateState,
    handlePress,
    navigateToDoctors
  };
};

export default Logic;
