import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  searchContainer: {
    padding: 16,
  },
  searchBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  diagnosesList: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  diagnosisCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginRight: 16,
  },
  diagnosisInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  diagnosis: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  dateTime: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  indicatorsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  indicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5EE",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  indicatorText: {
    fontSize: 12,
    color: "#FD9B63",
    marginLeft: 4,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
