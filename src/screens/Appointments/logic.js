import { useEffect, useReducer } from "react";
import { reducer } from "../../reducers/reducer";
import { INITIAL_STATE } from "./constant";
import {
  allAppointments,
  cancelAppointment,
} from "../../service/AppointmentServices";
import { ToastManager } from "../../helpers/ToastManager";
import ACTION_TYPES from "../../reducers/actionTypes";
import moment from "moment";

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateState = (payload) => {
    dispatch({ payload });
  };

  const categorizeAppointments = (appointments) => {
    const upcoming = [];
    const past = [];

    appointments.forEach((appointment) => {
      const appointmentDate = moment(appointment.appointmentDate);
      const today = moment();

      if (appointment.status === "Pending" && appointmentDate.isAfter(today)) {
        upcoming.push(appointment);
      } else {
        past.push(appointment);
      }
    });

    return { upcoming, past };
  };

  const filterAppointments = (appointments, statusFilter) => {
    if (!statusFilter || statusFilter === "All") {
      return appointments;
    }
    return appointments.filter(
      (appointment) => appointment.status === statusFilter
    );
  };

  const fetchAppointments = () => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "loading",
        value: true,
      },
    ]);

    allAppointments(
      {},
      (response) => {
        if (response?.data?.data) {
          const { upcoming, past } = categorizeAppointments(response.data.data);
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "allAppointments",
              value: response.data.data,
            },
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "upcomingAppointments",
              value: upcoming,
            },
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "pastAppointments",
              value: past,
            },
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "filteredAppointments",
              value: response.data.data,
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
        ToastManager.notify("Error fetching appointments", {
          type: "error",
        });
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "error",
            value: error?.message || "Failed to fetch appointments",
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

  const handleStatusFilter = (status) => {
    const filtered = filterAppointments(state.allAppointments, status);
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "filteredAppointments",
        value: filtered,
      },
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "selectedStatus",
        value: status,
      },
    ]);
  };

  const handleCancelAppointment = (bookingId) => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "loading",
        value: true,
      },
    ]);

    cancelAppointment(
      bookingId,
      () => {
        ToastManager.notify("Appointment cancelled successfully", {
          type: "success",
        });
        fetchAppointments();
      },
      (error) => {
        ToastManager.notify("Failed to cancel appointment", {
          type: "error",
        });
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "error",
            value: error?.message || "Failed to cancel appointment",
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

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    state,
    updateState,
    handleStatusFilter,
    handleCancelAppointment,
  };
};

export default Logic;
