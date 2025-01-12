import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getMonths } from "./HHPCXtraWeek";

const HHPCCalendarComponent: React.FC = () => {
  const currentDate = new Date();
  const [monthIndex, setMonthIndex] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [months, setMonths] = useState([]);

  useEffect(() => {
    setMonths(getMonths(selectedYear));
  }, [selectedYear]);

  const handlePrevMonth = () => {
    if (monthIndex > 0) {
      setMonthIndex(monthIndex - 1);
    } else {
      Alert.alert("No previous month");
    }
  };

  const handleNextMonth = () => {
    if (monthIndex < months.length - 1) {
      setMonthIndex(monthIndex + 1);
    } else {
      Alert.alert("No next month");
    }
  };

  const handleYearChange = (year: string) => {
    const newYear = parseInt(year);
    const newMonths = getMonths(newYear);

    if (monthIndex >= newMonths.length) {
      setMonthIndex(newMonths.length - 1); // Adjust to the last valid month
    }

    setSelectedYear(newYear);
  };

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const displayMonth = () => {
    const month = months[monthIndex];
    if (!month) return null;

    const firstDayOfMonth = month.startDay;
    const days = [];

    // Check for "Xtra" month and render appropriately
      if (month.name === 'Xtra') {
        // Display the 7 extra days for the Xtra month
        for (let i = 1; i <= 7; i++) {
          days.push(
            <View key={i} style={[styles.day, styles.filledDay]}>
              <Text style={styles.dayLabel}>{String(i)}</Text>
            </View>
          );
        }
      } else {
        // Regular month rendering logic
        days.push(
          <View key="days-of-week" style={styles.weekRow}>
            {daysOfWeek.map((day, index) => (
              <View key={index} style={styles.day}>
                <Text style={styles.weekDayLabel}>{day}</Text>
              </View>
            ))}
          </View>
        );

        for (let i = 0; i < firstDayOfMonth; i++) {
          days.push(<View key={`blank-${i}`} style={styles.day} />);
        }

        for (let i = firstDayOfMonth + 1; i <= month.numDays + firstDayOfMonth; i++) {
          days.push(
            <View key={i} style={[styles.day, styles.filledDay]}>
              <Text style={styles.dayLabel}>{String(i - firstDayOfMonth)}</Text>
            </View>
          );
        }

        while ((days.length - 1) % 7 !== 0) {
          days.push(<View key={`blank-end-${days.length}`} style={styles.day} />);
        }
      }

      return days;
    };

  return (
    <View style={styles.container}>
      {/* Month and Year Picker */}
      <View style={styles.header}>
        <Text style={styles.monthText}>{months[monthIndex]?.name || "Loading..."}</Text>
        <Picker
          selectedValue={selectedYear.toString()}
          style={styles.yearPicker}
          onValueChange={handleYearChange}
          mode="dropdown" // Use dropdown mode for compactness
        >
          {[...Array(81).keys()].map((i) => {
            const year = 2020 + i;
            return <Picker.Item key={year} label={year.toString()} value={year.toString()} />;
          })}
        </Picker>
      </View>

      {/* Calendar grid */}
      <ScrollView contentContainerStyle={styles.calendar}>
        <View style={styles.grid}>{displayMonth()}</View>
      </ScrollView>

      {/* Navigation buttons */}
      <View style={styles.buttonsContainer}>
        <Button title="Previous" onPress={handlePrevMonth} color="#0D47A1" />
        <Button title="Next" onPress={handleNextMonth} color="#0D47A1" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4FF", // Light blue background
    padding: 16,
    alignItems: "center",
  },
  header: {
    flexDirection: "row", // Horizontal layout
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    width: "100%",
    paddingTop: 10, // Adjust to make header more compact
  },
  monthText: {
    fontSize: 18, // Reduced size
    fontWeight: "bold",
    color: "#0D47A1",
  },
  yearPicker: {
      width: 140, // Fixed width to make it compact
      height: 50, // Reduced height for Picker
      marginLeft: 8, // Add spacing between month text and picker
    },
  calendar: {
    marginTop: 10, // Adjust top margin
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  day: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#ddd",
    backgroundColor: "#E3F2FD", // Light blue background for empty days
    borderRadius: 8,
  },
  filledDay: {
    backgroundColor: "#BBDEFB", // Slightly darker blue for filled days
  },
  dayLabel: {
    fontSize: 18,
    color: "#0D47A1", // Dark blue text for days
    textAlign: "center",
  },
  weekDayLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0D47A1", // Dark blue for weekday labels
    textAlign: "center",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 20, // Reduce space between calendar and buttons
    justifyContent: "space-between",
    width: "80%",
  },
});

export default HHPCCalendarComponent;
