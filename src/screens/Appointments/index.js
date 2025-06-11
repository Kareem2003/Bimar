import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Animated,
  Easing,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { styles } from "./style";
import Logic from "./logic";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-paper";
import AppButton from "../../components/AppButton";
import Header from "../../components/Header";
import withUserDataUpdates from "../../helpers/withUserDataUpdates";
import moment from "moment";
import { BASE_URL } from "../../helpers/constants/config";
import { cancelAppointment } from "../../service/AppointmentServices";
import Ionicons from "react-native-vector-icons/Ionicons";

const Appointments = ({ navigation }) => {
  const {
    state,
    handleStatusFilter,
    handleCancelAppointment,
    handleViewReceipt,
    handleCloseReceipt,
    searchAppointments,
    filterByAppointmentType,
    sortAppointments,
    toggleSortModal,
    sortType,
    sortOrder,
  } = Logic(navigation);

  const [showTypeModal, setShowTypeModal] = useState(false);

  const appointmentTypes = [
    "All",
    ...new Set(
      state.allAppointments
        .map((appointment) => appointment.bookingType)
        .filter(Boolean)
    ),
  ];

  const sortOptions = [
    { label: "Date (Recent First)", type: "date", order: "desc" },
    { label: "Date (Oldest First)", type: "date", order: "asc" },
    { label: "Name (A-Z)", type: "name", order: "asc" },
    { label: "Name (Z-A)", type: "name", order: "desc" },
    { label: "Time (Early First)", type: "time", order: "asc" },
    { label: "Time (Late First)", type: "time", order: "desc" },
  ];

  const handleSearch = (text) => {
    searchAppointments(text);
  };

  const handleTypeSelect = (type) => {
    const selectedType = type === "All" ? "" : type;
    filterByAppointmentType(selectedType);
    setShowTypeModal(false);
  };

  const renderAppointmentCard = (appointment) => {
    const statusColors = {
      Completed: { bg: "#E8F5E9", text: "#2E7D32", icon: "check-circle" },
      Cancelled: { bg: "#FFEBEE", text: "#C62828", icon: "times-circle" },
      Pending: { bg: "#FFF3E0", text: "#EF6C00", icon: "hourglass-half" },
    };

    const status = appointment.status || "Pending";
    const colors = statusColors[status] || statusColors.Pending;

    return (
      <TouchableOpacity
        onPress={() => handleViewReceipt(appointment._id)}
        style={styles.appointmentCard}
      >
        <View style={styles.cardHeader}>
          <Text style={{ fontSize: 13, color: "#718096" }}>
            {moment(appointment.appointmentDate).format("MMM D, YYYY")}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
            <Text style={[styles.statusText, { color: colors.text }]}>
              <Icon name={colors.icon} size={12} /> {status}
            </Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.doctorInfo}>
            <Image
              source={
                appointment.doctorId?.doctorImage
                  ? { uri: `${BASE_URL}/${appointment.doctorId.doctorImage}` }
                  : require("../../assets/images/portrait-hansome-young-male-doctor-man.png")
              }
              style={styles.doctorImage}
            />
            <View style={styles.doctorDetails}>
              <Text style={styles.doctorName}>
                {appointment.doctorId?.doctorName || "Unknown Doctor"}
              </Text>
              <Text style={styles.specialty}>
                {appointment.doctorId?.field || "Specialty not specified"}
              </Text>
            </View>
          </View>

          <View style={styles.appointmentDetails}>
            <View style={styles.detailRow}>
              <Icon name="clock-o" size={14} color="#718096" />
              <Text style={styles.detailText}>
                {appointment.appointmentStartTime 
                  ? moment(appointment.appointmentStartTime, 'HH:mm').format("h:mm A")
                  : "Time not set"
                }
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Icon name="stethoscope" size={14} color="#718096" />
              <Text style={styles.detailText}>
                {appointment.bookingType || "General Visit"}
              </Text>
            </View>
          </View>

          {appointment.status === "Pending" && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancelAppointment(appointment._id)}
            >
              <Ionicons name="close-circle-outline" size={16} color="#DC2626" />
              <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderSearchAndFilters = () => (
    <View style={styles.filtersContainer}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBarWrapper}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search appointments, doctors, specialties..."
            placeholderTextColor="#999"
            onChangeText={handleSearch}
            value={state.searchQuery}
          />
          <Ionicons name="search" size={20} color="#FD9B63" />
        </View>
      </View>

      {/* All Filters in One Row */}
      <View style={styles.allFiltersRow}>
        {/* Status Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.statusFiltersScroll}
        >
          {["All", "Pending", "Completed", "Cancelled"].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterButton,
                state.selectedStatus === status && styles.activeFilterButton,
              ]}
              onPress={() => handleStatusFilter(status)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  state.selectedStatus === status &&
                    styles.activeFilterButtonText,
                ]}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Type Filter */}
        <TouchableOpacity
          style={styles.typeFilterButton}
          onPress={() => setShowTypeModal(true)}
        >
          <Text style={styles.typeFilterButtonText}>
            {state.selectedAppointmentType || "Type"}
          </Text>
          <Ionicons name="chevron-down" size={16} color="#FD9B63" />
        </TouchableOpacity>

        {/* Sort Button */}
        <TouchableOpacity
          style={styles.sortIconButton}
          onPress={toggleSortModal}
        >
          <Ionicons name="funnel" size={20} color="#FD9B63" />
          {(sortType !== "date" || sortOrder !== "desc") && (
            <View style={styles.sortDotIndicator} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStatusFilter = () => null;

  const renderTypeFilterModal = () => (
    <Modal
      visible={showTypeModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowTypeModal(false)}
    >
      <View style={styles.typeModalOverlay}>
        <View style={styles.typeModalContent}>
          <Text style={styles.typeModalTitle}>Select Appointment Type</Text>
          <ScrollView>
            {appointmentTypes.map((type, index) => {
              const isSelected = 
                (type === "All" && !state.selectedAppointmentType) ||
                type === state.selectedAppointmentType;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.typeModalItem,
                    isSelected && styles.typeModalItemSelected,
                  ]}
                  onPress={() => handleTypeSelect(type)}
                >
                  <Text
                    style={[
                      styles.typeModalItemText,
                      isSelected && styles.typeModalItemTextSelected,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity
            style={styles.typeCloseButton}
            onPress={() => setShowTypeModal(false)}
          >
            <Text style={styles.typeCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderSortModal = () => (
    <Modal
      visible={state.showSortModal}
      transparent={true}
      animationType="fade"
      onRequestClose={toggleSortModal}
    >
      <View style={styles.sortModalOverlay}>
        <View style={styles.sortModalContent}>
          <Text style={styles.sortModalTitle}>Sort By</Text>
          <ScrollView>
            {sortOptions.map((option, idx) => {
              const isSelected =
                sortType === option.type && sortOrder === option.order;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.sortModalItem,
                    isSelected && styles.sortModalItemSelected,
                  ]}
                  onPress={() => {
                    sortAppointments(option.type, option.order);
                    toggleSortModal();
                  }}
                >
                  <Text
                    style={[
                      styles.sortModalItemText,
                      isSelected && styles.sortModalItemTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity
            style={styles.sortCloseButton}
            onPress={toggleSortModal}
          >
            <Text style={styles.sortCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderReceiptModal = () => {
    return (
      <Modal
        visible={state.showReceiptModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseReceipt}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Receipt</Text>
              <TouchableOpacity
                onPress={handleCloseReceipt}
                style={{
                  padding: 8,
                  backgroundColor: "#F1F5F9",
                  borderRadius: 20,
                }}
              >
                <Icon name="times" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.receiptContent}
              showsVerticalScrollIndicator={false}
            >
              {state.loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#16423C" />
                </View>
              ) : !state.receiptData ? (
                <View style={styles.errorContainer}>
                  <Icon name="file-text-o" size={40} color="#DC2626" />
                  <Text style={styles.errorText}>No receipt data available</Text>
                </View>
              ) : (
                <View style={styles.receiptContainer}>
                  <View style={styles.receiptSection}>
                    <Text style={styles.sectionTitle}>Receipt Details</Text>
                    <View style={styles.receiptRow}>
                      <Text style={styles.receiptLabel}>Receipt Number</Text>
                      <Text style={styles.receiptValue}>
                        {state.receiptData?.receiptNumber || "Not Available"}
                      </Text>
                    </View>
                    <View style={styles.receiptRow}>
                      <Text style={styles.receiptLabel}>Issue Date</Text>
                      <Text style={styles.receiptValue}>
                        {moment(state.receiptData?.issueDate).format(
                          "MMM D, YYYY h:mm A"
                        )}
                      </Text>
                    </View>
                    <View style={styles.receiptRow}>
                      <Text style={styles.receiptLabel}>Appointment</Text>
                      <Text style={styles.receiptValue}>
                        {moment(state.receiptData?.appointmentDate).format(
                          "MMM D, YYYY h:mm A"
                        )}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.receiptSection}>
                    <Text style={styles.sectionTitle}>Doctor Information</Text>
                    <View style={styles.receiptRow}>
                      <Text style={styles.receiptLabel}>Name</Text>
                      <Text style={styles.receiptValue}>
                        Dr. {state.receiptData?.doctor?.name}
                      </Text>
                    </View>
                    <View style={styles.receiptRow}>
                      <Text style={styles.receiptLabel}>Specialization</Text>
                      <Text style={styles.receiptValue}>
                        {state.receiptData?.doctor?.specialization}
                      </Text>
                    </View>
                    <View style={styles.receiptRow}>
                      <Text style={styles.receiptLabel}>Email</Text>
                      <Text style={styles.receiptValue}>
                        {state.receiptData?.doctor?.email}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.receiptSection}>
                    <Text style={styles.sectionTitle}>Clinic Details</Text>
                    <View style={styles.receiptRow}>
                      <Text style={styles.receiptLabel}>Name</Text>
                      <Text style={styles.receiptValue}>
                        {state.receiptData?.clinic?.name}
                      </Text>
                    </View>
                    <View style={styles.receiptRow}>
                      <Text style={styles.receiptLabel}>Address</Text>
                      <Text style={styles.receiptValue}>
                        {state.receiptData?.clinic?.address}
                      </Text>
                    </View>
                    <View style={styles.receiptRow}>
                      <Text style={styles.receiptLabel}>Location</Text>
                      <Text style={styles.receiptValue}>
                        {state.receiptData?.clinic?.area},{" "}
                        {state.receiptData?.clinic?.city}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.receiptSection, { marginBottom: 30 }]}>
                    <Text style={styles.sectionTitle}>Payment Details</Text>
                    <View style={styles.paymentRow}>
                      <Text style={styles.receiptLabel}>Base Price</Text>
                      <Text style={styles.receiptValue}>
                        ${state.receiptData?.payment?.basePrice || 0}
                      </Text>
                    </View>
                    <View style={styles.paymentRow}>
                      <Text style={styles.receiptLabel}>Tax Amount</Text>
                      <Text style={styles.receiptValue}>
                        ${state.receiptData?.payment?.taxAmount || 0}
                      </Text>
                    </View>
                    <View style={[styles.paymentRow, { borderBottomWidth: 0 }]}>
                      <Text
                        style={[
                          styles.receiptLabel,
                          { fontWeight: "600", color: "#334155" },
                        ]}
                      >
                        Total Amount
                      </Text>
                      <Text
                        style={[
                          styles.receiptValue,
                          { color: "#16423C", fontSize: 18 },
                        ]}
                      >
                        $
                        {state.receiptData?.payment?.totalAmount ||
                          state.receiptData?.payment?.basePrice ||
                          0}
                      </Text>
                    </View>
                    <View style={{ alignItems: "flex-end", marginTop: 10 }}>
                      <View
                        style={{
                          backgroundColor: "#E8F5E9",
                          paddingVertical: 6,
                          paddingHorizontal: 12,
                          borderRadius: 20,
                        }}
                      >
                        <Text style={{ color: "#2E7D32", fontSize: 14 }}>
                          Paid via{" "}
                          {state.receiptData?.payment?.paymentMethod ||
                            "Not Specified"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Header
          marginTop={50}
          header={"Appointments"}
          onPress={() => navigation.navigate("Home")}
        />

        {state.loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#16423C" />
          </View>
        ) : state.error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{state.error}</Text>
          </View>
        ) : (
          <>
            {renderSearchAndFilters()}
            <View style={styles.appointmentsContainer}>
              {state.filteredAppointments.length > 0 ? (
                state.filteredAppointments.map((appointment) => (
                  <View key={appointment._id}>
                    {renderAppointmentCard(appointment)}
                  </View>
                ))
              ) : (
                <View style={{ alignItems: "center", padding: 20 }}>
                  <Icon name="calendar-times-o" size={40} color="#CBD5E0" />
                  <Text style={{ color: "#718096", marginTop: 10 }}>
                    No appointments found
                  </Text>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
      {renderReceiptModal()}
      {renderTypeFilterModal()}
      {renderSortModal()}
    </View>
  );
};

export default withUserDataUpdates(Appointments);
