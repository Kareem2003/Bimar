import { Dimensions } from "react-native";
import { primary } from "../../styles/colors";
export const styles = {
  container: {
    flex: 1,
    backgroundColor: "#E9EFEC",
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: -1,
  },
  header: {
    marginTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  menuButton: {
    padding: 8,
    marginRight: 15,
  },
  greeting: {
    fontSize: 24,
    color: "#000",
    flex: 1,
  },
  subGreeting: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
  },
  //Health Journey Banner
  healthCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#16423C",
    borderRadius: 20,
    height: 130,
    overflow: "hidden",
    flexDirection: "row", // Align image and text side by side
    alignItems: "center", // Center items vertically
    paddingHorizontal: 20, // Add some padding
  },
  bannerImageContainer: {
    width: 100, // Adjust width for the image container
    height: 100, // Adjust height for the image container
    justifyContent: "center",
    alignItems: "center",
  },
  bannerImage: {
    width: 130, // Adjust image size
    height: 130,
  },
  bannerTextContainer: {
    flex: 1, // Take remaining space
    marginLeft: 20, // Add spacing between image and text
  },
  bannerText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFF",
  },
  bannerSubText: {
    fontSize: 14,
    color: "#FD9B63",
    marginTop: 5,
  },
  CircleBackground: {
    backgroundColor: "#6A9C89",
    borderRadius: 55,
    width: 110,
    height: 110,
    position: "absolute",
    top: -1,
    left: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  // Search Bar
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  searchBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 25,
    elevation: 2,
  },

  searchBar: {
    flex: 1,
    paddingLeft: 20,
    height: 40,
    fontSize: 16,
    color: "#0000",
  },

  filterIconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 40,
  },
  //Services Section
  servicesSection: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  showMoreText: {
    color: "#FD9B63",
  },
  serviceCards: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  serviceCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "45%",
    elevation: 2,
    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    // Android shadow property
    //elevation: 5,
  },
  cardText: {
    fontSize: 14,
    color: "#000",
    marginTop: 10,
  },
  // doctor section
  doctorSection: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  doctorCard: {
    backgroundColor: "#FFF",
    marginRight: 15,
    borderRadius: 10,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: 260,
    height: 140,
    overflow: "hidden",
  },
  circleWrapper: {
    position: "absolute",
    top: -10,
    left: -10,
    zIndex: -1,
  },
  circleOne: {
    position: "absolute",
    width: 110,
    height: 110,
    backgroundColor: "#6A9C89",
    borderRadius: 55,
    top: 30,
    left: 10,
    opacity: 0.6,
    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    // Android shadow property
    //elevation: 5,
  },
  circleTwo: {
    position: "absolute",
    width: 70,
    height: 70,
    backgroundColor: "#FD9B63",
    borderRadius: 35,
    top: 15,
    left: 60,
  },
  doctorImage: {
    position: "absolute",
    width: 100,
    height: 150,
  },
  doctorInfo: {
    justifyContent: "center",
    flex: 1,
    paddingLeft: 110,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  doctorSpecialization: {
    fontSize: 14,
    color: "#666",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#16423C",
    width: "100%",
    height: 60,
  },
  navButton: {
    alignItems: "center",
    paddingBottom: 15,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  filterOption: {
    padding: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#E9EFEC",
  },
  filterText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#FD9B63",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  medicationSection: {
    marginTop: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  // Medication list styles
  medicationListContainer: {
    paddingVertical: 15,
    paddingRight: 20,
  },
  medicationItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginLeft: 10,
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 0,
  },
  medicationImageContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  medicationImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  medicationName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  medicationTime: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  medicationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 4,
    color: '#3A86FF',
  },
  statusTextTaken: {
    color: '#5CAE9F',
  },
  statusTextMissed: {
    color: '#FD9B63',
  },
  statusIconTaken: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#5CAE9F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIconMissed: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FD9B63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIconUpcoming: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#3A86FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Progress section styles
  progressSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircleContainer: {
    width: 65,
    height: 65,
    position: 'relative',
  },
  progressBackground: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderWidth: 4,
    borderColor: '#E0F2E9',
    position: 'absolute',
  },
  progressStep: {
    position: 'absolute',
    width: 3,
    height: 28,
    backgroundColor: '#E0F2E9',
    top: 4, // Align with the border
    left: 31, // (65 / 2) - (3 / 2) to center the bar
    transformOrigin: 'bottom center',
    borderRadius: 1.5,
  },
  progressStepActive: {
    backgroundColor: '#6A9C89', // Use the app's primary green color
  },
  progressArc: {
    width: 65,
    height: 65,
    position: 'absolute',
    borderRadius: 32.5,
  },
  progressArcInner: {
    width: 65,
    height: 65,
    position: 'absolute',
  },
  progressArcComplete: {
    position: 'absolute',
  },
  progressInnerCircle: {
    width: 57,
    height: 57,
    borderRadius: 28.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 4,
    left: 4,
    zIndex: 10,
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  progressInfo: {
    marginLeft: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  nextMedicationText: {
    fontSize: 14,
    color: '#666',
  },
  timelineScrollContainer: {
    paddingVertical: 20,
  },
  timelineHours: {
    flexDirection: "row",
    alignItems: "flex-start",
    height: 150,
    position: "relative",
  },
  hourContainer: {
    width: 100,
    alignItems: "center",
  },
  hourText: {
    fontSize: 11,
    color: "#666",
    marginBottom: 5,
  },
  timelineLine: {
    width: "100%",
    height: 4,
    backgroundColor: "#008000",
    marginTop: 10,
  },
  medicationCircles: {
    position: "absolute",
    top: 50,
    left: 50,
    right: 0,
    height: 150,
  },
  medicationCircleContainer: {
    position: "absolute",
    alignItems: "center",
    width: 40, // Fixed width to match the circle size
  },
  medicationCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkMarkOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(76, 175, 80, 0.8)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  expandedDetails: {
    position: "absolute",
    top: 45, // Position below the circle
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 120,
    alignItems: "center",
    marginLeft: -40, // Center the expanded details under the circle
    zIndex: 9999,
  },
  expandedName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  expandedDose: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  expandedTime: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  takeButton: {
    backgroundColor: "#16423C",
    padding: 6,
    borderRadius: 15,
    alignItems: "center",
  },
  takenButton: {
    backgroundColor: '#5CAE9F',
  },
  takeButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  circleImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  timeLabel: {
    position: "absolute",
    bottom: -20,
    fontSize: 10,
    color: "#666",
  },
  medicationDetailsCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailsImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  detailsName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailsDose: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  detailsTaken: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  detailsTime: {
    fontSize: 14,
    color: "#666",
  },
  currentTimeIndicator: {
    position: "absolute",
    top: 0,
    height: "100%",
    alignItems: "center",
    zIndex: 2,
    elevation: 3, // For Android
  },
  timeIndicatorLine: {
    position: "absolute",
    top: 30, // Adjust based on your timeline layout
    width: 2,
    height: "100%",
    backgroundColor: "#FD9B63",
  },
  timeIndicatorDot: {
    position: "absolute",
    top: 28, // Adjust to align with timeline
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FD9B63",
  },
  currentTimeText: {
    position: "absolute",
    top: 8,
    backgroundColor: "#FD9B63",
    color: "#fff",
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 11,
    fontWeight: "bold",
  },
  // New medication card styles to match the image
  medicationCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  medicationHeader: {
    marginBottom: 15,
  },
  medicationTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  medicationSubtext: {
    fontSize: 15,
    color: '#6A9C89',
    fontWeight: '500',
  },
  medicationCardsScroll: {
    marginBottom: 20,
  },
  medicationCardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  pillName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  pillTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  pillStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3A86FF',
  },
  statusIconTaken: {
    backgroundColor: '#34C759',
  },
  statusIconMissed: {
    backgroundColor: '#FD9B63',
  },
  pillStatusText: {
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 4,
    color: '#3A86FF',
  },
};
