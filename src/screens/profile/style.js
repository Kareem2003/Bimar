import { Dimensions } from "react-native";
import { primary, primaryDark } from "../../styles/colors";

export const styles = {
  scrollContainer: {
    flexGrow: 1,
    padding: 16, // Adjust padding as needed
    paddingBottom: 50, // extra space at the bottom
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  editTitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    // Add any additional styling if needed
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: "#333",
  },
  buttonStyle: {
    backgroundColor: primaryDark,
    width: "100%",
    height: 50,
    marginTop: 50,
  },
  buttonTextStyle: {
    color: "#fff",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
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
};
