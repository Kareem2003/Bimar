import { Dimensions } from "react-native";
import { primary } from "../../styles/colors";

export const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  // Main container styles
  mainContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  profilePictureContainer: {
    alignItems: "center",
  },
  profilePictureWrapper: {
    alignItems: "center",
  },
  // Save button styles
  saveButton: {
    width: "100%",
    height: 50,
    marginTop: 30,
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  linksContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  link: {
    color: "#F08900",
    marginVertical: 5,
  },
  img: {
    width: 55,
    height: 55,
  },
  imageFill: {
    width: 55,
    height: 55,
    borderRadius: 50,
    margin: 5,
  },
  imgActive: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: "#FD9B63",
    margin: "auto",
  },
  circle: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: "#FD9B63",
    borderRadius: 50,
    margin: "auto",
  },
  line: {
    height: 2,
    backgroundColor: "#000",
    width: "20%",
    margin: "auto",
  },
  lineActive: {
    height: 2,
    backgroundColor: "#FD9B63",
    width: "20%",
    margin: "auto",
  },
  label: {
    marginTop: 8,
    color: "#555",
  },
  // Security Section Styles
  securitySection: {
    marginTop: 1,
    marginBottom: 20,
  },
  securityHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16423C",
  },
  securityDivider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  changePasswordButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  changePasswordContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  changePasswordIcon: {
    marginRight: 15,
  },
  changePasswordText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
};
