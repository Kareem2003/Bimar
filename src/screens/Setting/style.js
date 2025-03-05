import { Dimensions } from "react-native";
import { primary, primaryLight } from "../../styles/colors";
import { Dropdown } from "react-native-element-dropdown";

export const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
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
    width: 34,
    height: 34,
    marginLeft: -2,
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

  header: {
    marginTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    color: "#000",
  },

  Dropdown:{
    width: 40,
    height: 20,
    backgroundColor: "transparent", 
    borderWidth: 0,
    paddingHorizontal: 0,
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  // Terms page styles
  termsContainer: {
    flex: 1,
    padding: 20,
  },
  termsSection: {
    marginBottom: 25,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
  },
  termsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#16423C",
  },
  termsText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
  termsDivider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 15,
  },

};
