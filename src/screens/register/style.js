import { Dimensions } from "react-native";
import { primaryDark, primaryLight } from "../../styles/colors";

const { width } = Dimensions.get("window");

export const styles = {
  // General Container
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff", // Dynamic in Register.js based on the theme
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  // Form Title
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  // Input Fields
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: "#F9F9F9",
  },
  inputWrapper: {
    backgroundColor: "#F2F2F2",
    width: width * 0.8,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // Labels
  label: {
    margin: 10,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  // Buttons
  buttonContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },
  button: {
    width: 150,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: primaryDark,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  // Link Styles
  linksContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  link: {
    color: "#007BFF",
    marginVertical: 5,
    fontSize: 14,
  },
  // Progress Bar (Steps)
  stepWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    width: "80%",
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#D3D3D3",
    justifyContent: "center",
    alignItems: "center",
  },
  stepCircleActive: {
    backgroundColor: "#FD9B63",
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#D3D3D3",
  },
  stepLineActive: {
    backgroundColor: "#FD9B63",
  },
  // Pickers
  pickerWrapper: {
    width: width * 0.75,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    marginTop: 20,
  },
  picker: {
    flex: 1,
    color: "#333",
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    backgroundColor: "transparent",
  },
};
