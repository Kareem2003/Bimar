import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  robotContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  robotImage: {
    width: 150,
    height: 150,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    height: "50%", // Half the screen
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {},
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  selectedTag: {
    backgroundColor: "#007BFF",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
  },
  unSelectedTag: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
  },
  tagTextSelected: {
    color: "#fff",
    fontSize: 14,
  },
  tagTextUnSelected: {
    color: "#007BFF",
    fontSize: 14,
  },
  symptomsContainer: {
    flexDirection: "row",
    flexWrap: "no-wrap",
    marginHorizontal: 10,
  },
  symptomTagContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
  },
  symptomText: {
    color: "white",
    fontSize: 14,
    marginRight: 6,
  },
  deleteIcon: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    fontWeight: "bold",
  },
  fullPageModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  resultContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
  robotImageCheck: {
    width: 300,
    height: 300,
  },
  doctorSection: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  doctorCard: {
    backgroundColor: "#fff",
    marginVertical: 15,
    borderRadius: 10,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: Dimensions.get("window").width * 0.8,
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
});
