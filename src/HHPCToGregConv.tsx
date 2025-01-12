import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HHPCProps {
  inputdate: string; // Expected in "MM/DD/YYYY" format
  inputtime: string; // expected in "HH:mm" format
  isDefaultTimeUsed: boolean; // flag to indicate to check time is entered
}

const xtraYears = [
  1970, 1976, 1981, 1987, 1992, 1998, 2004, 2009, 2015, 2020, 2026, 2032, 2037,
  2043, 2048, 2054, 2060, 2065, 2071, 2076, 2082, 2088, 2093, 2099, 2105, 2111,
  2116, 2122, 2128, 2133, 2139, 2144, 2150, 2156, 2161, 2167, 2172, 2178, 2184,
  2189, 2195,
];

const HHPCToGregConv: React.FC<HHPCProps> = ({ inputdate, inputtime, isDefaultTimeUsed }) => {
  const [goutDate, setGoutDate] = useState('MM/DD/YYYY');
  const [goutTime, setGoutTime] = useState('');

  const isValidHHT = (input: string): boolean => {
    if (!input || input.length !== 10) {
      setGoutDate('Please enter a date in MM/DD/YYYY format');
      return false;
    }

    const year = parseInt(input.substring(6, 10));
    const month = parseInt(input.substring(0, 2));
    const day = parseInt(input.substring(3, 5));

    if (input.charAt(2) !== '/' || input.charAt(5) !== '/') {
      setGoutDate('Please enter a date in MM/DD/YYYY format');
      return false;
    } else if (year < 1970 || year > 2200) {
      setGoutDate('Please insert a date within 1970 - 2200');
      return false;
    } else if (month > 13 || day > 31 || month < 1 || day < 1) {
      setGoutDate('Please enter a valid HHPC date');
      return false;
    } else if (day ===31 && month % 3 !== 0)
      {
      setGoutDate('Please enter a valid HHPC date');
      return false;
    } else if (month === 13) {

         if (!xtraYears.includes(year)) {
           setGoutDate('Please enter a valid HHPC date');
           return false;
         }
         if (day > 7) {
           setGoutDate('Please enter a valid HHPC date');
           return false;
         }
       }

    return true;
  };

  const isValidTime = (inputtime: string): boolean => {
    const [hours, mins] = inputtime.split(':').map(Number);
    if (hours > 23 || mins > 59 || isNaN(hours) || isNaN(mins)) {
      setGoutTime('Please enter a valid time');
      return false;
    }
    return true;
  };

  const convertToGregorian = () => {
    if (!isValidHHT(inputdate)) {
      setGoutDate('');
      return;
    }

    const inputTime = isDefaultTimeUsed ? inputtime : ''; // Use input time if it's provided
    if (inputTime && !isValidTime(inputTime)) return;
    console.log( "valid time");
    const [month, day, year] = inputdate.split('/').map(Number);

    const baseDate = new Date(Date.UTC(2018, 0, 1)); // Base HHPC reference date
    let diffDays = 0;

    let currentYear = 2018;
    let xtra = xtraYears.includes(currentYear) ? 7 : 0;

    // Adjust days based on year difference
    if (year > currentYear) {
      while (currentYear < year) {
        diffDays += 364 + (xtraYears.includes(currentYear) ? 7 : 0);
        currentYear++;
      }
    } else if (year < currentYear) {
      while (currentYear > year) {
        currentYear--;
        diffDays -= 364 + (xtraYears.includes(currentYear) ? 7 : 0);
      }
    }

    // Adjust days based on month and day differences
    //const monthsDays = (m: number): number => (m % 3 === 0 ? 31 : m === 13 ? 7 : 30);
   // Adjust days based on month and day differences
     const monthsDays = (m: number): number => (m % 3 === 0 ? 31 : m === 13 ? (xtraYears.includes(year) ? 7 : 0) : 30);


    for (let m = 1; m < month; m++) {
      diffDays += monthsDays(m);
    }
    diffDays += day - 1; // Adjust for days within the month

    // Calculate the target date
    const targetDate = new Date(baseDate.getTime() + diffDays * 86400000);
    let hours = 0, minutes = 0;

    if (inputtime) {
      const [inputHours, inputMinutes] = inputtime.split(':').map(Number);
      hours = inputHours;
      minutes = inputMinutes;

      const targetDate1 = new Date(targetDate);
      targetDate1.setUTCHours(hours, minutes, 0, 0); // Setting the UTC time

      // Handle time zone offset (UTC adjustment)
      const offset = targetDate.getTimezoneOffset(); // Minutes offset
      hours -= Math.floor(offset / 60);
      minutes -= offset % 60;

      // Adjust hours and minutes overflow
      if (minutes < 0) {
        minutes += 60;
        hours -= 1;
      }
      if (minutes >= 60) {
        minutes -= 60;
        hours += 1;
      }
      if (hours < 0) {
        hours += 24;
        targetDate.setUTCDate(targetDate.getUTCDate() - 1);
      }
      if (hours >= 24) {
        hours -= 24;
        targetDate.setUTCDate(targetDate.getUTCDate() + 1);
      }

      const localDate = new Date(targetDate1);
      const gregorianTime1 = localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const localTimeZone = getLocalTimeZone();

      setGoutTime(`${gregorianTime1}, ${localTimeZone}`);

    }

    setGoutDate(targetDate.toUTCString().split(' ').slice(0, 4).join(' '));

  };

  const getLocalTimeZone = () => {
    const options = { timeZoneName: 'long' };
    const timeZoneString = new Date().toLocaleString('en-US', options);

    // In case it's split into multiple parts like "Eastern Standard Time"
    const parts = timeZoneString.split(' ');




    // Check for both "Standard" and "Daylight" time
    if (parts.length >= 3) {
      return parts.slice(3).join(' '); // "Eastern Standard Time"
    }

    // If not matching, fallback to just the basic name
    return parts.slice(-2).join(' ');  // Fallback example: "Standard Time"
  };


  useEffect(() => {
    convertToGregorian();
  }, [inputdate, inputtime, isDefaultTimeUsed]);

  return (
    <View style={styles.resultsContainer}>
      <View style={styles.resultRow}>
        <Text style={styles.resultLabel}>Gregorian Date: </Text>
        <Text style={styles.resultValue}>{goutDate || ''}</Text>
      </View>

      <View>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Time: </Text>
          {/* Conditionally render goutTime based on isDefaultTimeUsed */}
          <Text style={styles.resultValue}>
                {isDefaultTimeUsed ? '' : goutTime || ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    marginTop: 40, // Space below the results container
  },
  resultRow: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center align items vertically
    marginBottom: 20, // Space between rows
  },
  resultLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#444', // Dark gray for the label text
    marginRight: 5, // Add a small space between label and value
  },
  resultValue: {
    fontSize: 18,
    fontWeight: 'bold', // Makes the value bold
    color: 'red', // Red color for emphasis
  },
});

export default HHPCToGregConv;
