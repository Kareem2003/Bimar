import { Dimensions } from "react-native";
import { primary } from "../../styles/colors";
export const styles = {
  container: {
    flex: 1,
    backgroundColor: "#E9EFEC",
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: -1,
  },
  header: {
    marginTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 24,
    color: "#000",
  },
  subGreeting: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
  },
};
