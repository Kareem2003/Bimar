import { useEffect, useReducer, useState } from "react";
import { reducer } from "../../reducers/reducer";
import { INITIAL_STATE } from "./constant";
import {
  allAppointments,
  cancelAppointment,
  getReceiptDetails,
} from "../../service/AppointmentServices";
import { ToastManager } from "../../helpers/ToastManager";
import ACTION_TYPES from "../../reducers/actionTypes";
import moment from "moment";
import { Alert } from "react-native";

const Logic = (navigation) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [sortType, setSortType] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

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

  // New: Search function
  const searchAppointments = (query) => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "searchQuery",
        value: query,
      },
    ]);

    applyAllFilters(query, state.selectedStatus, state.selectedAppointmentType, sortType, sortOrder, state.allAppointments);
  };

  // New: Filter by appointment type
  const filterByAppointmentType = (type) => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "selectedAppointmentType",
        value: type,
      },
    ]);

    applyAllFilters(state.searchQuery, state.selectedStatus, type, sortType, sortOrder, state.allAppointments);
  };

  // New: Sort appointments
  const sortAppointments = (type = sortType, order = sortOrder) => {
    setSortType(type);
    setSortOrder(order);

    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "sortType",
        value: type,
      },
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "sortOrder",
        value: order,
      },
    ]);

    applyAllFilters(state.searchQuery, state.selectedStatus, state.selectedAppointmentType, type, order, state.allAppointments);
  };

  // New: Combined filter function
  const applyAllFilters = (searchQuery = "", statusFilter = "All", appointmentType = "", sortType = "date", sortOrder = "desc", appointmentsData = null) => {
    // Use provided data or fall back to state data
    const sourceData = appointmentsData || state.allAppointments;
    let filtered = [...sourceData];

    // Apply status filter
    if (statusFilter && statusFilter !== "All") {
      filtered = filtered.filter(appointment => appointment.status === statusFilter);
    }

    // Apply appointment type filter
    if (appointmentType) {
      filtered = filtered.filter(appointment => 
        appointment.bookingType?.toLowerCase().includes(appointmentType.toLowerCase())
      );
    }

    // Apply search filter
    if (searchQuery) {
      const searchTerm = searchQuery.toLowerCase();
      filtered = filtered.filter(appointment =>
        appointment.doctorId?.doctorName?.toLowerCase().includes(searchTerm) ||
        appointment.doctorId?.field?.toLowerCase().includes(searchTerm) ||
        appointment.bookingType?.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting
    switch (sortType) {
      case "name":
        filtered.sort((a, b) => {
          const nameA = (a.doctorId?.doctorName || "").toLowerCase();
          const nameB = (b.doctorId?.doctorName || "").toLowerCase();
          if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
          if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
          return 0;
        });
        break;
      case "time":
        filtered.sort((a, b) => {
          const timeA = moment(a.appointmentTime);
          const timeB = moment(b.appointmentTime);
          return sortOrder === "asc" ? timeA.diff(timeB) : timeB.diff(timeA);
        });
        break;
      case "date":
      default:
        filtered.sort((a, b) => {
          const dateA = moment(a.appointmentDate);
          const dateB = moment(b.appointmentDate);
          return sortOrder === "asc" ? dateA.diff(dateB) : dateB.diff(dateA);
        });
        break;
    }

    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "filteredAppointments",
        value: filtered,
      },
    ]);
  };

  // New: Toggle sort modal
  const toggleSortModal = () => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "showSortModal",
        value: !state.showSortModal,
      },
    ]);
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
          const appointmentsData = response.data.data;
          
          // Apply initial sorting to the data
          let initialFiltered = [...appointmentsData];
          
          // Apply default sorting (date desc)
          initialFiltered.sort((a, b) => {
            const dateA = moment(a.appointmentDate);
            const dateB = moment(b.appointmentDate);
            return dateB.diff(dateA); // desc order
          });
          
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "allAppointments",
              value: appointmentsData,
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
              value: initialFiltered,
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
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "selectedStatus",
        value: status,
      },
    ]);

    applyAllFilters(state.searchQuery, status, state.selectedAppointmentType, sortType, sortOrder, state.allAppointments);
  };

  const handleCancelAppointment = (bookingId) => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
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
          },
        },
      ]
    );
  };

  const handleViewReceipt = (appointmentId) => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "showReceiptModal",
        value: true,
      },
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "loading",
        value: true,
      },
    ]);

    getReceiptDetails(
      appointmentId,
      (response) => {
        if (response?.data?.data) {
          updateState([
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "receiptData",
              value: response.data.data,
            },
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: "loading",
              value: false,
            },
          ]);
        }
      },
      (error) => {
        console.error("Receipt Error:", error);
        updateState([
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "loading",
            value: false,
          },
          {
            type: ACTION_TYPES.UPDATE_PROP,
            prop: "error",
            value: error?.message || "Failed to fetch receipt details",
          },
        ]);
      }
    );
  };

  const handleCloseReceipt = () => {
    updateState([
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "showReceiptModal",
        value: false,
      },
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "receiptData",
        value: null,
      },
      {
        type: ACTION_TYPES.UPDATE_PROP,
        prop: "error",
        value: null,
      },
    ]);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    state,
    updateState,
    handleStatusFilter,
    handleCancelAppointment,
    handleViewReceipt,
    handleCloseReceipt,
    // New functions
    searchAppointments,
    filterByAppointmentType,
    sortAppointments,
    toggleSortModal,
    sortType,
    sortOrder,
    setSortType,
    setSortOrder,
  };
};

export default Logic;
