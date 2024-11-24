import React, { useContext } from "react";
import { View, Text } from "react-native";
import Logic from "./logic";
import { styles } from "./style";
import { ThemeContext } from "../../contexts/themeContext";
import { primaryDark, primaryLight } from "../../styles/colors";

const Home = ({ navigation }) => {
  const { state, updateState } = Logic(navigation);
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <View
      style={
        ([styles.container],
        { backgroundColor: isDarkTheme ? primaryDark : primaryLight })
      }
    >
      <Text>Home Screen</Text>
    </View>
  );
};

export default Home;
