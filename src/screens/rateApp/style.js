import { Dimensions } from "react-native";
import { primary, primaryLight } from "../../styles/colors";

export const styles = {
  rateSection: {
    width: '90%',
    marginBottom: 20,
    borderRadius: 16,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    alignSelf: 'center'
  },
  rateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  rateIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  rateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#16423C",
    letterSpacing: 0.3,
  },
  rateText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
    letterSpacing: 0.2,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  starButton: {
    padding: 6,
    marginHorizontal: 3,
  },
  starIcon: {
    width: 40,
    height: 40,
  },
  starIconActive: {
    opacity: 1,
    tintColor: '#FFD700',
  },
  starIconInactive: {
    opacity: 0.3,
    tintColor: '#999',
  },
  submitButton: {
    width: '90%',
    backgroundColor: "#16423C",
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 30,
    shadowColor: "#16423C",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#0D2A22",
    alignSelf: 'center'
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  feedbackSection: {
    marginTop: 15,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#16423C",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  feedbackText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
    letterSpacing: 0.2,
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16423C",
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 0.3,
  },
  feedbackInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    fontSize: 14,
    lineHeight: 20,
  },
  feedbackInputDark: {
    color: '#fff',
  },
  feedbackInputLight: {
    color: '#000',
  },
  feedbackPlaceholderDark: {
    color: '#999',
  },
  feedbackPlaceholderLight: {
    color: '#666',
  },
  ratingEmoji: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 8,
  },
  ratingLabel: {
    fontSize: 14,
    color: "#666",
    textAlign: 'center',
    marginTop: 4,
    letterSpacing: 0.2,
  },
};