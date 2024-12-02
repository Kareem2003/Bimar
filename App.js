/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from "react";
import { Provider } from "./src/contexts/appContext";
import NavContainer from "./src/navigation/navContainer";
import ThemeProvider from "./src/contexts/themeContext";
import { ToastContainer } from "./src/helpers/ToastManager";

const App = () => {
  return (
    <Provider>
      <ThemeProvider>
        <ToastContainer />
        <NavContainer />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
