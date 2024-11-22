import { Dimensions } from "react-native";
import { primary } from "../../styles/colors";
export const styles = {
  container: {
    backgroundColor: primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 1,
  },
};
