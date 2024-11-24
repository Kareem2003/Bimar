import React, { useContext } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Logic from "./logic";
import { styles } from "./style";
import ThemeToggleButton from "../../components/ThemeToggleButton";
import AppInput from "../../components/AppInput";
import { ThemeContext } from "../../contexts/themeContext";
import AuthTitles from "../../components/AuthTitles";
import AntDesign from "react-native-vector-icons/AntDesign";
import { greyColorDark, greyColorLight } from "../../styles/colors";

const StarterTheme = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { state, updateState, loginNavigate } = Logic(navigation);

  return (
    <View
      style={isDarkTheme ? [styles.containerDark] : [styles.containerLight]}
    >
      <AuthTitles isDarkTheme={isDarkTheme} text="Choose Your Theme" />
      <Image
        style={styles.img}
        source={require("./../../assets/images/Theme.png")}
      />
      <ThemeToggleButton isDarkTheme={isDarkTheme} />
      <TouchableOpacity
        style={{
          marginVertical: 20,
          backgroundColor: isDarkTheme ? greyColorDark : greyColorLight,
          padding: 10,
          borderRadius: 10,
        }}
        onPress={loginNavigate}
      >
        <AntDesign name="right" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default StarterTheme;
