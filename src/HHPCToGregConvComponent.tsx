import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import HHPCToGregConv from './HHPCToGregConv';

const HHPCToGregConvComponent = () => {
  const [hhpcDate, setHhpcDate] = useState('');
  const [hhpcTime, setHhpcTime] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [fullDate, setFullDate] = useState('');
  const [triggerConvert, setTriggerConvert] = useState(false);
  const [isDefaultTimeUsed, setIsDefaultTimeUsed] = useState(false);

  const isValidMMDD = (date) => {
    const regex = /^(0[1-9]|1[0-3])\/(0[1-9]|[1-2][0-9]|3[0-1])$/;
    return regex.test(date);
  };

  const isValidTime = (time) => {
    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/; // HH:mm format
    return regex.test(time);
  };

  const handleDateSubmit = () => {
    if (isValidMMDD(hhpcDate)) {
      setFullDate(`${hhpcDate}/${selectedYear}`);
      if (!hhpcTime) {
        setIsDefaultTimeUsed(true); // Set flag to indicate default time is used
        setTriggerConvert(true); // Trigger conversion with default time
      }
    } else {
      Alert.alert('Invalid Date', 'Please enter a valid HHPC date in MM/DD format.');
    }
  };

  const handleTimeSubmit = () => {
      if (isValidTime(hhpcTime)) {
        setIsDefaultTimeUsed(false); // Reset the default time flag when user manually enters time
        setTriggerConvert(true); // Trigger conversion if the time is valid
      } else {
        Alert.alert('Invalid Time', 'Please enter a valid time in HH:mm format.');
      }
    };

useEffect(() => {
    // Trigger the conversion whenever the selected year changes
    if (hhpcDate) {
      handleDateSubmit();
    }
  }, [selectedYear]);

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.formContainer}>

      <Text style={styles.titleText}>Enter HHPC Date</Text>


      <View style={styles.horizontalContainer}>
        <Text style={styles.label}>Hanke-Henry Date:</Text>
        <Text style={styles.label}>UTC Time:</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.textInput, styles.smallInput]}
          placeholder="MM/DD"
          value={hhpcDate}
          onChangeText={setHhpcDate}
          keyboardType="numeric"
          onSubmitEditing={handleDateSubmit}
        />

         <Picker
                  selectedValue={selectedYear}
                  onValueChange={(year) => setSelectedYear(year)} // Update selectedYear without calling handleDateSubmit here
                  style={[styles.yearPicker, styles.smallPicker]}
                >
                  {Array.from({ length: 231 }, (_, i) => 1970 + i).map((year) => (
                    <Picker.Item key={year} label={year.toString()} value={year} />
                  ))}
                </Picker>

        <TextInput
          style={[styles.textInput, styles.smallInput]}
          placeholder="HH:MM"
          value={isDefaultTimeUsed && !hhpcTime ? '' : hhpcTime} // Only show time if user entered it
          onChangeText={setHhpcTime}
          keyboardType="numeric"
          onSubmitEditing={handleTimeSubmit}
        />
      </View>

      {triggerConvert && fullDate && (hhpcTime || isDefaultTimeUsed) ? (
        <HHPCToGregConv inputdate={fullDate} inputtime={hhpcTime || '12:00'}
         isDefaultTimeUsed={isDefaultTimeUsed}/>
      ) : (
        <HHPCToGregConv inputdate="" inputtime="" isDefaultTimeUsed={isDefaultTimeUsed}/> // Empty default values
      )}

      <Text style={styles.instructions}>
        Enter a <Text style={styles.highlight}>Hanke-Henry Permanent Calendar (HHPC) date</Text> between the years <Text style={styles.highlight}>1970</Text> and <Text style={styles.highlight}>2200</Text> to convert it to the corresponding <Text style={styles.highlight}>Gregorian Calendar date</Text>.
        {"\n\n"}
        To input a date in the <Text style={styles.highlight}>Xtr (Extra) month</Text>, use <Text style={styles.highlight}>13</Text> as the month value. Refer to the Calendar tab on the HHOT website for a list of years that include the Xtr month.
        {"\n\n"}
        The converter also adjusts the <Text style={styles.highlight}>time</Text> from <Text style={styles.highlight}>Coordinated Universal Time (UTC)</Text>, the standard time for HHPC, to your local time zone automatically.
      </Text>


    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  titleContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
   titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#2196F3',
      textAlign: 'center',
      marginBottom: 20,
    },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    flex: 1,
    marginRight: 8,
  },
  yearPicker: {
    flex: 2,
  },

  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  label: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  resultLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F3214B',
  },
  smallInput: {
    width: '25%', // Adjust width as needed
    marginRight: 5,
  },
  smallPicker: {
    width: '35%', // Adjust width as needed
  },


  instructions: {
      fontSize: 16,
      lineHeight: 26, // Slightly increased for improved readability
      color: "#003366", // Dark blue for professional look
      textAlign: "justify", // Justify alignment for better text flow
      marginVertical: 20, // Adds spacing above and below the block
      paddingHorizontal: 20, // Uniform padding for consistency
    },
    instructionsTitle: {
      fontWeight: "bold",
      fontSize: 20, // Slightly larger title font size for emphasis
      textDecorationLine: "underline", // Underlined for title effect
      color: "#002244", // Slightly darker shade of blue for the title
      marginBottom: 10, // Space below the title
    },
    highlight: {
      fontWeight: "bold",
      color: "#0055AA", // Light blue for key phrases
    },
});

export default HHPCToGregConvComponent;
