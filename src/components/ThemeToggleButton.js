import React, { useContext } from "react";
import { Button } from "react-native";
import { ThemeContext } from "../contexts/themeContext";

const ThemeToggleButton = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button
      title={`Switch to ${isDarkTheme ? "Light" : "Dark"} Theme`}
      onPress={toggleTheme}
    />
  );
};

export default ThemeToggleButton;
