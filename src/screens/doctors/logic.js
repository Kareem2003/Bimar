import { useContext, useEffect, useReducer, useState } from "react";
import { reducer } from "../../reducers/reducer";
import { getDoctors, getDoctorRating } from "../../service/HomeServices";
import { Context } from "../../contexts/appContext";
import ACTION_TYPES from "../../reducers/actionTypes";
import { INITIAL_STATE } from "./constant";

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { updateState: updateCtxState } = useContext(Context);
  const [sortType, setSortType] = useState("rating");
  const [sortOrder, setSortOrder] = useState("desc");

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const fetchDoctorRatings = async (doctors) => {
    try {
      const doctorPromises = doctors.map(async (doctor) => {
        return new Promise((resolve) => {
          const doctorId = doctor._id || doctor.id;
          getDoctorRating(
            doctorId,
            (response) => {
              if (response?.data?.data?.doctor) {
                resolve({
                  ...doctor,
                  averageRating: response.data.data.doctor.averageRating || 0,
                  totalRatings: response.data.data.doctor.totalRatings || 0,
                });
              } else {
                resolve({
                  ...doctor,
                  averageRating: 0,
                  totalRatings: 0,
                });
              }
            },
            (error) => {
              console.log(
                `Failed to fetch rating for doctor ${doctorId}:`,
                error
              );
              resolve({
                ...doctor,
                averageRating: 0,
                totalRatings: 0,
              });
            }
          );
        });
      });

      const doctorsWithRatings = await Promise.all(doctorPromises);
      return doctorsWithRatings;
    } catch (error) {
      console.error("Error fetching doctor ratings:", error);
      return doctors; // Return original doctors if rating fetch fails
    }
  };

  const filterDoctors = (city, field) => {
    let filtered = [...state.doctors];

    if (city) {
      filtered = filtered.filter((doctor) =>
        doctor.clinic?.[0]?.clinicArea
          ?.toLowerCase()
          .includes(city.toLowerCase())
      );
    }

    if (field) {
      filtered = filtered.filter((doctor) =>
        doctor.field?.toLowerCase().includes(field.toLowerCase())
      );
    }

    updateState([
      {
        type: "UPDATE_PROP",
        prop: "filteredDoctors",
        value: filtered,
      },
      {
        type: "UPDATE_PROP",
        prop: "selectedCity",
        value: city,
      },
      {
        type: "UPDATE_PROP",
        prop: "selectedField",
        value: field,
      },
    ]);
  };

  const searchDoctors = (query) => {
    updateState([
      {
        type: "UPDATE_PROP",
        prop: "searchQuery",
        value: query,
      },
    ]);

    let filtered = [...state.doctors];

    if (query) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(
        (doctor) =>
          doctor.doctorName?.toLowerCase().includes(searchTerm) ||
          doctor.field?.toLowerCase().includes(searchTerm) ||
          doctor.clinic?.[0]?.clinicArea?.toLowerCase().includes(searchTerm)
      );
    }

    updateState([
      {
        type: "UPDATE_PROP",
        prop: "filteredDoctors",
        value: filtered,
      },
    ]);
  };

  const sortDoctors = (type = sortType, order = sortOrder) => {
    let list =
      state.filteredDoctors.length > 0
        ? [...state.filteredDoctors]
        : [...state.doctors];
    switch (type) {
      case "name":
        list.sort((a, b) => {
          const nameA = (a.doctorName || "").toLowerCase();
          const nameB = (b.doctorName || "").toLowerCase();
          if (nameA < nameB) return order === "asc" ? -1 : 1;
          if (nameA > nameB) return order === "asc" ? 1 : -1;
          return 0;
        });
        break;
      case "experience":
        list.sort((a, b) =>
          order === "asc"
            ? (a.yearsOfExprience || 0) - (b.yearsOfExprience || 0)
            : (b.yearsOfExprience || 0) - (a.yearsOfExprience || 0)
        );
        break;
      case "rating":
      default:
        list.sort((a, b) =>
          order === "asc"
            ? (a.averageRating || 0) - (b.averageRating || 0)
            : (b.averageRating || 0) - (a.averageRating || 0)
        );
        break;
    }
    updateState([
      {
        type: "UPDATE_PROP",
        prop: "filteredDoctors",
        value: list,
      },
    ]);
    setSortType(type);
    setSortOrder(order);
  };

  useEffect(() => {
    const fetchDoctors = () => {
      updateState([
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: "loading",
          value: true,
        },
      ]);

      getDoctors(
        {},
        async (response) => {
          if (response?.data?.data) {
            const doctors = response.data.data;

            // Fetch ratings for all doctors
            const doctorsWithRatings = await fetchDoctorRatings(doctors);

            updateState([
              {
                type: ACTION_TYPES.UPDATE_PROP,
                prop: "doctors",
                value: doctorsWithRatings,
              },
            ]);
          } else {
            updateState([
              {
                type: ACTION_TYPES.UPDATE_PROP,
                prop: "error",
                value: "Invalid data format received",
              },
            ]);
          }
        },
        (error) => {
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "error",
              value: error?.message || "Failed to fetch doctors",
            },
          ]);
        },
        () => {
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "loading",
              value: false,
            },
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
    searchDoctors,
    sortDoctors,
    sortType,
    sortOrder,
    setSortType,
    setSortOrder,
  };
};

export default Logic;
