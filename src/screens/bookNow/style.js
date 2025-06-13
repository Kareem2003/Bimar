import { Dimensions } from "react-native";
import { primary } from "../../styles/colors";

export const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#6A9C89",
  },

  // New doctor profile card styles
  doctorProfileCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 16,
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },

  doctorInfoContainer: {
    marginLeft: 16,
    flex: 1,
  },

  doctorName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#16423C",
    marginBottom: 8,
  },

  doctorPrice: {
    fontSize: 18,
    fontWeight: "semi-bold",
    color: "#333",
  },

  // Pricing summary styles
  pricingSummaryContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16423C",
    marginBottom: 16,
  },

  pricingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  pricingLabel: {
    fontSize: 16,
    color: "#666",
  },

  pricingValue: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16423C",
  },

  bookButtonContainer: {
    marginHorizontal: 16,
    // marginTop: 32,
    alignItems: "center",
  },
  receiptContainer: {
    // Matches Appointments receiptContainer
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  receiptSection: {
    backgroundColor: "#F8FAFC",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#16423C",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingBottom: 10,
  },
  receiptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  receiptLabel: {
    fontSize: 15,
    color: "#64748B",
    flex: 1,
  },
  receiptValue: {
    fontSize: 15,
    color: "#334155",
    fontWeight: "500",
    flex: 2,
    textAlign: "right",
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
};
