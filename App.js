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
import Home from "./src/screens/home";
import HomeNavigator from "./src/navigation/homeNavigator";
import Profile from "./src/screens/profile";
import Appointments from "./src/screens/Appointments";
import Settingsscreen from "./src/screens/Setting";
import MyDiagnosis from "./src/screens/myDiagnosis";
import Diagnos from "./src/screens/diagnos";
import Doctors from "./src/screens/doctors";
import DoctorProfile from "./src/screens/doctorProfile";
const App = () => {
  return (
    <Provider>
      <ThemeProvider>
        <ToastContainer />
        {/* <NavContainer /> */}
        <Home />
        {/* <Doctors /> */}
        {/* <Settingsscreen /> */}
        {/* <MyDiagnosis /> */}
        {/* <DoctorProfile /> */}
      </ThemeProvider>
    </Provider>
  );
};

export default App;
