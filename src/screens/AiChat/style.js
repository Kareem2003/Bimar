import { StyleSheet } from "react-native";

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
});
