import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// Updated Header Component
const Header = ({ header, onPress, marginTop = 25 }) => (
  <View style={[headerStyles.header, { marginTop: marginTop }]}>
    <TouchableOpacity onPress={onPress} style={headerStyles.backButton}>
      <Icon name="chevron-back" size={24} color="#000" />
    </TouchableOpacity>
    <Text style={headerStyles.title}>{header}</Text>
  </View>
);

// Header Styles
const headerStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 16,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    paddingBottom: 16,
    left: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
});

export default Header;
