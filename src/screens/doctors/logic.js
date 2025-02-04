import { useContext, useEffect, useReducer } from "react";
import { reducer } from "../../reducers/reducer";
import { getDoctors } from "../../service/HomeServices";
import { Context } from "../../contexts/appContext";
import ACTION_TYPES from "../../reducers/actionTypes";
import { INITIAL_STATE } from "./constant";

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { updateState: updateCtxState } = useContext(Context);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const filterDoctors = (city, field) => {
    let filtered = [...state.doctors];

    if (city) {
      filtered = filtered.filter(doctor => 
        doctor.clinic?.[0]?.clinicArea?.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (field) {
      filtered = filtered.filter(doctor => 
        doctor.field?.toLowerCase().includes(field.toLowerCase())
      );
    }

    updateState([
      {
        type: 'UPDATE_PROP',
        prop: 'filteredDoctors',
        value: filtered
      },
      {
        type: 'UPDATE_PROP',
        prop: 'selectedCity',
        value: city
      },
      {
        type: 'UPDATE_PROP',
        prop: 'selectedField',
        value: field
      }
    ]);
  };

  const searchDoctors = (query) => {
    updateState([{
      type: 'UPDATE_PROP',
      prop: 'searchQuery',
      value: query
    }]);

    let filtered = [...state.doctors];

    if (query) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(doctor => 
        doctor.doctorName?.toLowerCase().includes(searchTerm) ||
        doctor.field?.toLowerCase().includes(searchTerm) ||
        doctor.clinic?.[0]?.clinicArea?.toLowerCase().includes(searchTerm)
      );
    }

    updateState([{
      type: 'UPDATE_PROP',
      prop: 'filteredDoctors',
      value: filtered
    }]);
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
          if (response?.data?.data) {
            updateState([
              {
                type: ACTION_TYPES.UPDATE_PROP,
                prop: 'doctors',
                value: response.data.data
              }
            ]);
          } else {
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
    filterDoctors,
    searchDoctors
  };
};

export default Logic;
