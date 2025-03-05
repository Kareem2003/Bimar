import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { Calendar } from "react-native-calendars";
import { ThemeContext } from "../../contexts/themeContext";
import { styles } from "./style";
import Logic from "./logic";

const BookDate = ({ navigation }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { state, handleNext, handleBack, handleBooking } = Logic(navigation);

  const onDayPress = (day) => {
    handleBooking(day.dateString);
  };

  console.log("Selected Date:", state.selectedDate);

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? "#222" : "#fff" }]}>
      <Text style={styles.title}>Select Booking Date</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [state.selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: "#ff9800",
            selectedTextColor: "#fff",
          },
          ...Object.keys(state.bookings).reduce((acc, date) => {
            if (state.bookings[date] >= 10) {
              acc[date] = {
                disabled: true,
                marked: true,
                dotColor: "red",
                selectedColor: "gray",
              };
            }
            return acc;
          }, {}),
        }}
        theme={{
          calendarBackground: "#fff",
          textSectionTitleColor: "#16423C",
          selectedDayBackgroundColor: "#FF5733",
          selectedDayTextColor: "#fff",
          todayTextColor: "#ff9800",
          dayTextColor: "#000",
          textDisabledColor: "#888",
          dotColor: "#00adf7",
          selectedDotColor: "#ffffff",
          arrowColor: "#16423C",
          monthTextColor: "#ff9800",
          textMonthFontWeight: "bold",
          indicatorColor: "#ff9800",
        }}
      />
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={handleBack} color={isDarkTheme ? "#ccc" : "#ff9800"} />
        <Button title="Next" onPress={handleNext} color={isDarkTheme ? "#ccc" : "#ff9800"} />
      </View>
    </View>
  );
};

export default BookDate;
