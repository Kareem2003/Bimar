/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { SafeAreaView, StyleSheet, Text, useColorScheme } from "react-native";
import { Provider } from "./src/contexts/appContext";
import NavContainer from "./src/navigation/navContainer";

const App = () => {
  return (
    <Provider>
      <NavContainer></NavContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
