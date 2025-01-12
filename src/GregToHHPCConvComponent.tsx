import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import GregToHHPCConv from "./GregToHHPCConv";

const GregToHHPCConvComponent = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date'); // Can be 'date' or 'time'
  const [selectedYear, setSelectedYear] = useState(date.getFullYear());
  const [selectedTime, setSelectedTime] = useState(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      setDate(new Date(currentDate.setFullYear(selectedYear))); // Update date with selected year
      setSelectedTime(currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })); // Update time
    }
    setShow(false);
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setDate(new Date(date.setFullYear(year))); // Update the date with the new year
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
      <Text style={styles.title}>Enter Gregorian Calendar Date</Text>
        <View style={styles.dateYearRow}>
          <View style={styles.datePickerContainer}>
            <Text style={styles.label}>Select Gregorian Date:</Text>
            <TouchableOpacity onPress={() => showMode('date')}>
              <Text style={styles.dateText}>
                {date.toLocaleDateString([], {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Year Picker next to the date */}
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Select Year:</Text>
            <Picker
              selectedValue={selectedYear}
              onValueChange={(itemValue) => handleYearChange(itemValue)}
              style={styles.yearPicker}
            >
              {Array.from({ length: 231 }, (_, i) => 1970 + i).map((year) => (
                <Picker.Item key={year} label={year.toString()} value={year} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Time Picker */}
        <View style={styles.timePickerContainer}>
          <Text style={styles.label}>Select Time:</Text>
          <TouchableOpacity onPress={() => showMode('time')}>
            <Text style={styles.timeText}>{selectedTime || 'hh:mm AM/PM'}</Text>
          </TouchableOpacity>
        </View>

        {/* DateTimePicker */}
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            display="default"
            onChange={onChange}
          />
        )}

        {/* Converted HHPC Date*/}

            <GregToHHPCConv
              date={date.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' })}
              time={selectedTime}
            />
        {/*</View>*/}

        <Text style={styles.instructions}>
          <Text style={styles.instructionsTitle}>How to Use the Converter:</Text>
          {"\n\n"}Enter a <Text style={styles.highlight}>Gregorian calendar date</Text> between <Text style={styles.highlight}>1970</Text> and <Text style={styles.highlight}>2200</Text>, and the corresponding Hanke-Henry Permanent Calendar (HHPC) date will be displayed.
          {"\n\n"}The converter will also adjust the <Text style={styles.highlight}>time</Text> from your local time zone to <Text style={styles.highlight}>Coordinated Universal Time (UTC)</Text>, the universal standard adopted by HHPC.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 40,
  },
  dateYearRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  datePickerContainer: {
    flex: 1,
    marginRight: 10,
  },
  pickerContainer: {
    flex: 1,
    marginLeft: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginVertical: 8,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  yearPicker: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  timePickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  instructions: {
      fontSize: 16,
      lineHeight: 24, // Improves readability with consistent line height
      color: "#003366", // Dark blue color for text
      textAlign: "center", // Center alignment for better layout
      marginTop: 20,
      marginBottom: 20,
      paddingHorizontal: 15, // Padding for text edges
    },
    instructionsTitle: {
      fontWeight: "bold",
      fontSize: 18,
      textDecorationLine: "underline", // Adds a title feel
      color: "#003366",
    },
    highlight: {
      fontWeight: "bold",
      color: "#0055AA", // Lighter blue for emphasized text
    },



});

export default GregToHHPCConvComponent;