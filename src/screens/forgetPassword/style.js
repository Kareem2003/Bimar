import { Dimensions } from "react-native";
import { primary } from "../../styles/colors";

export const styles = {
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
    marginLeft: 5,
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
    margin: 10,
    marginTop: 5,
  },
  resendText: {
    color: "#FD9B63",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
};
