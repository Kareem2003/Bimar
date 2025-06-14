import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Linking,
  Modal,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { styles } from "./style";
import Logic from "./logic";
import AppButton from "../../components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USERINFO } from "../../helpers/constants/staticKeys";
import ACTION_TYPES from "../../reducers/actionTypes";
import { BASE_URL } from "../../helpers/constants/config";
import { appRate } from "../../service/rateServices";

const DoctorProfile = ({ navigation, route }) => {
  const {
    state,
    updateState,
    bookDoctorAppointment,
    getNextMonthAvailableDates,
    handleDateSelection,
  } = Logic(navigation, route);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showClinicModal, setShowClinicModal] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [calendarDates, setCalendarDates] = useState([]);

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden={true} />
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Doctor Profile</Text>
        </View>
      </View>

      {/* Doctor Profile Image and Name */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: `${BASE_URL}/${
              state.doctor?.doctorImage
            }?t=${new Date().getTime()}`,
          }}
          style={styles.profileImage}
        />
        <Text style={styles.doctorName}>
          {state.doctor?.doctorName || "Dr. Unknown"}
        </Text>
        <Text style={styles.specialization}>
          {state.doctor?.field || "General"}
        </Text>
        <View style={styles.ratingBadge}>
          <Icon name="star" size={18} color="#FD9B63" />
          <Text style={styles.ratingText}>
            {state.doctor?.averageRating
              ? state.doctor.averageRating.toFixed(1)
              : "0"}
          </Text>
          <Text style={styles.reviewCount}>
            {state.doctor?.totalRatings
              ? `${state.doctor.totalRatings} Reviews`
              : "No Reviews"}
          </Text>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={{ gap: 12 }}>
          {/* Gender */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name={state.doctor?.Gender === "Male" ? "male" : "female"}
              size={20}
              color="#FD9B63"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.aboutText}>
              Gender:{" "}
              <Text style={{ color: "#FD9B63", fontWeight: "bold" }}>
                {state.doctor?.Gender || "N/A"}
              </Text>
            </Text>
          </View>
          {/* Years of Experience */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="briefcase"
              size={20}
              color="#2E7D32"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.aboutText}>
              Years of Experience:{" "}
              <Text style={{ color: "#2E7D32", fontWeight: "bold" }}>
                {state.doctor?.yearsOfExprience || "N/A"}
              </Text>
            </Text>
          </View>
          {/* Status */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="checkmark-circle"
              size={20}
              color="#2E7D32"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.aboutText}>
              Status:{" "}
              <Text style={{ color: "#2E7D32", fontWeight: "bold" }}>
                {state.doctor?.status || "N/A"}
              </Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {/* Email Box */}
          <TouchableOpacity
            style={styles.clinicCard}
            onPress={() =>
              state.doctor?.doctorEmail &&
              Linking.openURL(`mailto:${state.doctor.doctorEmail}`)
            }
            activeOpacity={0.8}
          >
            <Icon
              name="mail"
              size={22}
              color="#16423C"
              style={{ marginRight: 10 }}
            />
            <View>
              <Text style={{ color: "#64748B", fontSize: 13 }}>Email</Text>
            </View>
          </TouchableOpacity>
          {/* Phone Box */}
          <TouchableOpacity
            style={styles.clinicCard}
            onPress={() =>
              state.doctor?.doctorPhone &&
              Linking.openURL(`tel:${state.doctor.doctorPhone}`)
            }
            activeOpacity={0.8}
          >
            <Icon
              name="call"
              size={22}
              color="#16423C"
              style={{ marginRight: 10 }}
            />
            <View>
              <Text style={{ color: "#64748B", fontSize: 13 }}>Phone</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Certificates Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Certificates</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 8 }}
        >
          {state.doctor?.certificates?.length > 0 ? (
            state.doctor.certificates.map((cert, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  setSelectedCert(`${BASE_URL}/${cert}`);
                  setShowCertModal(true);
                }}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: `${BASE_URL}/${cert}` }}
                  style={{
                    width: 120,
                    height: 80,
                    borderRadius: 12,
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: "#CBD5E1",
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: "#64748B" }}>No certificates uploaded.</Text>
          )}
        </ScrollView>
        {/* Modal for enlarged certificate */}
        <Modal
          visible={showCertModal && !!selectedCert}
          transparent
          animationType="fade"
          onRequestClose={() => setShowCertModal(false)}
        >
          <StatusBar hidden={false} />
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 40,
                right: 30,
                zIndex: 101,
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: 20,
                padding: 6,
                elevation: 3,
              }}
              onPress={() => setShowCertModal(false)}
            >
              <Icon name="close" size={28} color="#22223B" />
            </TouchableOpacity>
            <Image
              source={{ uri: selectedCert }}
              style={{
                width: 340,
                height: 240,
                borderRadius: 18,
                borderWidth: 2,
                borderColor: "#FD9B63",
                backgroundColor: "#fff",
              }}
              resizeMode="contain"
            />
          </View>
        </Modal>
      </View>

      {/* Clinics Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Clinics</Text>
        {/* Selected Date Indicator */}
        {state.selectedDate && state.selectedClinic && (
          <View style={styles.selectedDateIndicator}>
            <Icon
              name="calendar"
              size={18}
              color="#FD9B63"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.selectedDateText}>Selected Date:</Text>
            <Text style={styles.selectedDateValue}>
              {(() => {
                // Format date as MM/DD (no year)
                const d = new Date(state.selectedDate);
                return `${d.getMonth() + 1}/${d.getDate()}`;
              })()}
            </Text>
            {state.selectedTime ? (
              <>
                <Icon
                  name="time"
                  size={18}
                  color="#FD9B63"
                  style={styles.selectedTimeIcon}
                />
                <Text style={styles.selectedDateValue}>
                  {state.selectedTime}
                </Text>
              </>
            ) : null}
          </View>
        )}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {state.doctor?.clinic?.map((clinic, clinicIndex) => (
            <TouchableOpacity
              key={clinicIndex}
              style={[
                styles.workDayCard,
                state.selectedClinic === clinic.clinicAddress && {
                  borderColor: "#FD9B63",
                  borderWidth: 2,
                  backgroundColor: "#FFF7F0",
                },
              ]}
              onPress={() => {
                setSelectedClinic(clinic);
                setCalendarDates(getNextMonthAvailableDates(clinic));
                setShowClinicModal(true);
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.clinicName}>{clinic.clinicName}</Text>
              {/* Clinic booked indicator */}
              {state.selectedClinic === clinic.clinicAddress &&
                state.selectedDate && (
                  <Icon
                    name="checkmark-circle"
                    size={20}
                    color="#FD9B63"
                    style={{ position: "absolute", top: 5, right: 5 }}
                  />
                )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Modal for Clinic Calendar */}
        <Modal
          visible={showClinicModal && !!selectedClinic}
          transparent={false}
          animationType="fade"
          onRequestClose={() => setShowClinicModal(false)}
        >
          <StatusBar hidden={false} />
          <View style={styles.modalOverlay}>
            <ScrollView
              style={styles.modalScroll}
              contentInsetAdjustmentBehavior="automatic"
              contentContainerStyle={styles.modalContentContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => setShowClinicModal(false)}
                  style={styles.backButton}
                >
                  <Icon name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                  <Text style={styles.headerTitle}>
                    {selectedClinic?.clinicName ||
                      selectedClinic?.clinicAddress}
                  </Text>
                </View>
              </View>
              {/* Clinic Info Section */}
              <View style={styles.clinicInfoSection}>
                {/* Address Card */}
                <View style={styles.addressCard}>
                  <Icon
                    name="location"
                    size={22}
                    color="#FD9B63"
                    style={{ marginRight: 10 }}
                  />
                  <View>
                    <Text style={{ color: "#64748B", fontSize: 13 }}>
                      Address
                    </Text>
                    <Text
                      style={{
                        color: "#16423C",
                        fontWeight: "bold",
                        fontSize: 15,
                      }}
                    >
                      {selectedClinic?.clinicAddress}{" "}
                      {selectedClinic?.clinicCity} {selectedClinic?.clinicArea}
                    </Text>
                  </View>
                </View>

                {/* Phone Card */}
                <View style={styles.phoneCard}>
                  <Icon
                    name="call"
                    size={22}
                    color="#16423C"
                    style={{ marginRight: 10 }}
                  />
                  <View>
                    <Text style={{ color: "#64748B", fontSize: 13 }}>
                      Phone
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 8,
                        marginTop: 2,
                      }}
                    >
                      {(() => {
                        let phones = selectedClinic?.clinicPhone;
                        let allPhones = [];
                        // If it's an array, flatten and parse any stringified arrays inside
                        if (Array.isArray(phones)) {
                          phones.forEach((item) => {
                            if (
                              typeof item === "string" &&
                              item.startsWith("[") &&
                              item.endsWith("]")
                            ) {
                              try {
                                const parsed = JSON.parse(item);
                                if (Array.isArray(parsed)) {
                                  allPhones.push(
                                    ...parsed
                                      .map((p) => p.trim())
                                      .filter(Boolean)
                                  );
                                } else if (parsed) {
                                  allPhones.push(parsed.toString().trim());
                                }
                              } catch (e) {
                                allPhones.push(
                                  ...item
                                    .replace(/\[|\]|"/g, "")
                                    .split(",")
                                    .map((p) => p.trim())
                                    .filter(Boolean)
                                );
                              }
                            } else if (typeof item === "string") {
                              allPhones.push(
                                ...item
                                  .replace(/\[|\]|"/g, "")
                                  .split(",")
                                  .map((p) => p.trim())
                                  .filter(Boolean)
                              );
                            } else if (item) {
                              allPhones.push(item.toString().trim());
                            }
                          });
                        } else if (typeof phones === "string") {
                          if (phones.startsWith("[") && phones.endsWith("]")) {
                            try {
                              const parsed = JSON.parse(phones);
                              if (Array.isArray(parsed)) {
                                allPhones.push(
                                  ...parsed.map((p) => p.trim()).filter(Boolean)
                                );
                              } else if (parsed) {
                                allPhones.push(parsed.toString().trim());
                              }
                            } catch (e) {
                              allPhones.push(
                                ...phones
                                  .replace(/\[|\]|"/g, "")
                                  .split(",")
                                  .map((p) => p.trim())
                                  .filter(Boolean)
                              );
                            }
                          } else {
                            allPhones.push(
                              ...phones
                                .replace(/\[|\]|"/g, "")
                                .split(",")
                                .map((p) => p.trim())
                                .filter(Boolean)
                            );
                          }
                        } else if (phones) {
                          allPhones.push(phones.toString().trim());
                        }
                        if (allPhones.length > 0) {
                          return allPhones.map((phone, idx) => (
                            <TouchableOpacity
                              key={idx}
                              onPress={() => Linking.openURL(`tel:${phone}`)}
                              style={styles.phoneButton}
                              activeOpacity={0.7}
                            >
                              <Text style={styles.phoneButtonText}>
                                {phone}
                              </Text>
                            </TouchableOpacity>
                          ));
                        } else {
                          return null;
                        }
                      })()}
                    </View>
                  </View>
                </View>
                <View style={styles.clinicCardsRow}>
                  {/* Email Card */}
                  <TouchableOpacity
                    style={styles.clinicCard}
                    onPress={() => {
                      if (selectedClinic?.clinicEmail) {
                        Linking.openURL(`mailto:${selectedClinic.clinicEmail}`);
                      }
                    }}
                    activeOpacity={0.8}
                  >
                    <Icon
                      name="mail"
                      size={22}
                      color="#16423C"
                      style={{ marginRight: 10 }}
                    />
                    <View>
                      <Text style={{ color: "#64748B", fontSize: 13 }}>
                        Email
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* Website Card */}
                  <TouchableOpacity
                    style={styles.clinicCard}
                    onPress={() => {
                      if (selectedClinic?.clinicWebsite) {
                        let url = selectedClinic.clinicWebsite;
                        if (!/^https?:\/\//i.test(url)) {
                          url = "http://" + url;
                        }
                        Linking.openURL(url);
                      }
                    }}
                    activeOpacity={0.8}
                  >
                    <Icon
                      name="globe"
                      size={22}
                      color="#16423C"
                      style={{ marginRight: 10 }}
                    />
                    <View>
                      <Text style={{ color: "#64748B", fontSize: 13 }}>
                        Website
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* Location Card */}
                  <TouchableOpacity
                    style={styles.clinicCard}
                    onPress={() => {
                      if (selectedClinic?.clinicLocationLinks) {
                        const address = `${
                          selectedClinic.clinicLocationLinks
                        } ${selectedClinic.clinicCity || ""} ${
                          selectedClinic.clinicArea || ""
                        }`.trim();
                        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          address
                        )}`;
                        Linking.openURL(url);
                      }
                    }}
                    activeOpacity={0.8}
                  >
                    <Icon
                      name="pin"
                      size={22}
                      color="#FD9B63"
                      style={{ marginRight: 10 }}
                    />
                    <View>
                      <Text style={{ color: "#64748B", fontSize: 13 }}>
                        Location
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* Price Card */}
                  <View style={styles.priceCard}>
                    <Icon
                      name="cash"
                      size={22}
                      color="#2E7D32"
                      style={{ marginRight: 10 }}
                    />
                    <View>
                      <Text style={{ color: "#64748B", fontSize: 13 }}>
                        Price
                      </Text>
                      <Text style={styles.priceText}>
                        {selectedClinic?.Price}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "#FD9B63",
                  marginBottom: 5,
                  alignSelf: "center",
                }}
              >
                Booking Dates
              </Text>

              {/* Calendar Section */}
              <ScrollView style={styles.calendarSection}>
                <View
                  style={{ flexDirection: "column", justifyContent: "center" }}
                >
                  {(() => {
                    // Group calendarDates into pairs
                    const rows = [];
                    for (let i = 0; i < calendarDates.length; i += 2) {
                      rows.push(calendarDates.slice(i, i + 2));
                    }
                    return rows.map((row, rowIdx) => (
                      <View key={rowIdx} style={styles.calendarRow}>
                        {row.map((item, idx) => {
                          let workingHours = item.workDay.workingHours;
                          let formattedTimes = [];
                          if (Array.isArray(workingHours)) {
                            formattedTimes = workingHours.map((timeStr) => {
                              if (
                                typeof timeStr === "string" &&
                                timeStr.includes("-")
                              ) {
                                const [start, end] = timeStr
                                  .split("-")
                                  .map((s) => s.trim());
                                const to12 = (t) => {
                                  if (!t) return "";
                                  let [h, m] = t.split(":");
                                  h = parseInt(h, 10);
                                  m = m ? m.padStart(2, "0") : "00";
                                  const ampm = h >= 12 ? "PM" : "AM";
                                  h = h % 12;
                                  if (h === 0) h = 12;
                                  return `${h}:${m} ${ampm}`;
                                };
                                return `${to12(start)} - ${to12(end)}`;
                              }
                              return timeStr;
                            });
                          } else if (
                            typeof workingHours === "string" &&
                            workingHours.includes("-")
                          ) {
                            const [start, end] = workingHours
                              .split("-")
                              .map((s) => s.trim());
                            const to12 = (t) => {
                              if (!t) return "";
                              let [h, m] = t.split(":");
                              h = parseInt(h, 10);
                              m = m ? m.padStart(2, "0") : "00";
                              const ampm = h >= 12 ? "PM" : "AM";
                              h = h % 12;
                              if (h === 0) h = 12;
                              return `${h}:${m} ${ampm}`;
                            };
                            formattedTimes = [`${to12(start)} - ${to12(end)}`];
                          } else {
                            formattedTimes = [workingHours];
                          }
                          const isDaySelected =
                            state.selectedDate === item.formatted &&
                            state.selectedClinic ===
                              selectedClinic?.clinicAddress;
                          return (
                            <TouchableOpacity
                              key={idx}
                              onPress={() =>
                                handleDateSelection(
                                  item.formatted,
                                  selectedClinic
                                )
                              }
                              style={[
                                styles.calendarCard,
                                isDaySelected && styles.calendarCardSelected,
                              ]}
                            >
                              <View
                                onPress={() =>
                                  handleDateSelection(
                                    item.formatted,
                                    selectedClinic
                                  )
                                }
                                style={{ alignItems: "center" }}
                                activeOpacity={0.85}
                              >
                                <Icon
                                  name="calendar"
                                  size={22}
                                  color={isDaySelected ? "#FD9B63" : "#64748B"}
                                  style={{ marginBottom: 2 }}
                                />
                                <Text
                                  style={[
                                    styles.calendarDayText,
                                    {
                                      color: isDaySelected
                                        ? "#FD9B63"
                                        : "#16423C",
                                    },
                                  ]}
                                >
                                  {item.date.toLocaleDateString("en-US", {
                                    weekday: "short",
                                  })}
                                </Text>
                                <Text style={styles.calendarDateText}>
                                  {item.date.getMonth() + 1}/
                                  {item.date.getDate()}
                                </Text>
                              </View>
                              <View
                                style={{ gap: 4, marginTop: 6, width: "100%" }}
                              >
                                {formattedTimes.map((ft, i) => {
                                  const isTimeSelected =
                                    isDaySelected && state.selectedTime === ft;
                                  return (
                                    <TouchableOpacity
                                      key={i}
                                      onPress={() => {
                                        if (isDaySelected) {
                                          updateState([
                                            {
                                              type: "UPDATE_PROP",
                                              prop: "selectedTime",
                                              value: ft,
                                            },
                                          ]);
                                        }
                                      }}
                                      disabled={!isDaySelected}
                                      style={[
                                        styles.calendarTimeButton,
                                        isTimeSelected
                                          ? styles.calendarTimeButtonSelected
                                          : styles.calendarTimeButtonUnselected,
                                        { opacity: isDaySelected ? 1 : 0.5 },
                                      ]}
                                      activeOpacity={0.85}
                                    >
                                      <Icon
                                        name="time"
                                        size={16}
                                        color={
                                          isTimeSelected ? "#fff" : "#FD9B63"
                                        }
                                        style={{ marginRight: 5 }}
                                      />
                                      <Text
                                        style={[
                                          styles.calendarTimeText,
                                          {
                                            color: isTimeSelected
                                              ? "#fff"
                                              : "#FD9B63",
                                            fontWeight: isTimeSelected
                                              ? "bold"
                                              : "normal",
                                          },
                                        ]}
                                      >
                                        {ft}
                                      </Text>
                                    </TouchableOpacity>
                                  );
                                })}
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                        {/* If only one card in the last row, add a spacer for alignment */}
                        {row.length === 1 && (
                          <View style={{ flex: 1, margin: 6 }} />
                        )}
                      </View>
                    ));
                  })()}
                </View>
              </ScrollView>
            </ScrollView>
          </View>
        </Modal>
      </View>

      {/* Book Now Button */}
      <AppButton
        title="BOOK NOW"
        buttonStyle={styles.bookButton}
        textStyle={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}
        onPress={() => {
          if (!state.selectedDate) {
            alert("Please select a date first!");
            return;
          }
          if (state.selectedTime == null) {
            alert("Please select a time first!");
            return;
          }
          bookDoctorAppointment();
        }}
      />

      {/* All Ratings Section */}
      <View style={[styles.section, { marginTop: 0 }]}>
        <Text style={styles.sectionTitle}>What others say</Text>
        {Array.isArray(state.doctor?.ratings) &&
        state.doctor.ratings.length > 0 ? (
          <ScrollView
            style={{ maxHeight: 220 }}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            {state.doctor.ratings
              .slice() // copy array
              .reverse() // show latest first
              .map((r, idx) => (
                <View
                  key={idx}
                  style={{
                    backgroundColor: "#FFF7F0",
                    borderRadius: 10,
                    padding: 12,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: "#F3E8E2",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FontAwesome
                        key={star}
                        name={star <= (r.rating || 0) ? "star" : "star-o"}
                        size={18}
                        color="#FD9B63"
                        style={{ marginRight: 1 }}
                      />
                    ))}
                    <Text
                      style={{ marginLeft: 8, color: "#64748B", fontSize: 12 }}
                    >
                      {r.userName || "Anonymous"}
                    </Text>
                    {r.createdAt && (
                      <Text
                        style={{
                          marginLeft: 8,
                          color: "#A0A0A0",
                          fontSize: 11,
                        }}
                      >
                        {new Date(r.createdAt).toLocaleDateString()}
                      </Text>
                    )}
                  </View>
                  <Text style={{ color: "#22223B", fontSize: 15 }}>
                    {r.comment || ""}
                  </Text>
                </View>
              ))}
          </ScrollView>
        ) : (
          <Text style={{ color: "#64748B" }}>No ratings yet.</Text>
        )}
      </View>

      {/* Rating Section */}
      <View style={[styles.section, { marginBottom: 20 }]}>
        <Text style={styles.sectionTitle}>Rate this Doctor</Text>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 8,
            justifyContent: "center",
          }}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <FontAwesome
                name={star <= rating ? "star" : "star-o"}
                size={32}
                color="#FD9B63"
                style={{ marginHorizontal: 3 }}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.ratingInput}
          placeholder="Leave a comment..."
          value={comment}
          onChangeText={setComment}
          multiline
        />
        {error ? (
          <Text style={{ color: "#DC2626", marginBottom: 4 }}>{error}</Text>
        ) : null}
        {success ? (
          <Text style={{ color: "#2E7D32", marginBottom: 4 }}>{success}</Text>
        ) : null}
        <AppButton
          title={submitting ? "Submitting..." : "Submit Rating"}
          buttonStyle={{
            backgroundColor: "#FD9B63",
            borderRadius: 12,
            marginTop: 4,
            paddingVertical: 12,
          }}
          textStyle={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}
          disabled={submitting || rating === 0}
        />
      </View>
    </ScrollView>
  );
};

export default DoctorProfile;
