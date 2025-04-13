import React, { useEffect } from "react";
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
  const { state, handleStatusFilter, handleCancelAppointment } =
    Logic(navigation);

  const renderAppointmentCard = (appointment) => {
    const statusColors = {
      Completed: { bg: "#E8F5E9", text: "#2E7D32", icon: "check-circle" },
      Cancelled: { bg: "#FFEBEE", text: "#C62828", icon: "times-circle" },
      Pending: { bg: "#FFF3E0", text: "#EF6C00", icon: "hourglass-half" },
    };

    const status = appointment.status || "Pending";
    const colors = statusColors[status] || statusColors.Pending;

    return (
      <View style={styles.appointmentCard}>
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
                {moment(appointment.appointmentTime).format("h:mm A")}
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
      </View>
    );
  };

  const renderStatusFilter = () => (
    <View style={styles.filterContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
    </View>
  );

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
            {renderStatusFilter()}
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
    </View>
  );
};

export default withUserDataUpdates(Appointments);
