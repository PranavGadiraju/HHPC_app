import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

interface HHPCProps {
  date: string; // Expected in "MM/DD/YYYY" format
  time: string; // Expected in "HH:mm am/pm" format
}


const HHPC = (date: string, time: string, bool: boolean) => {


    const isDST = (d: Date) => {
    const jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
    const jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
    return Math.max(jan, jul) !== d.getTimezoneOffset() ? 1 : 0;
  };

  const dayMS = 86400000;
  const hourMS = 3600000;
  const minMS = 60000;

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const months = ["January","February", "March", "April", "May", "June","July","August",  "September",  "October", "November", "December", "Xtra"];

  const xtraYears = [
    1970, 1976, 1981, 1987, 1992, 1998, 2004, 2009, 2015, 2020, 2026, 2032, 2037, 2043, 2048, 2054, 2060, 2065,
    2071, 2076, 2082, 2088, 2093, 2099, 2105, 2111, 2116, 2122, 2128, 2133, 2139, 2144, 2150, 2156, 2161, 2167,
    2172, 2178, 2184, 2189, 2195,
  ];

  const base = new Date('2018-01-01T00:00:00Z'); //'1/1//2018'
  let year = 2018;
  let month = 1;
  let day = 1;
  let xtraBool = 0;
  let thirdM = 0;

  let hours = parseInt(time);
  let mins = parseInt(time.substring(3, 5));

  let diffMS = 0;


  const [month1, day1, year1] = date.split("/").map(Number);
  const formattedDateStr = `${year1}-${String(month1).padStart(2, '0')}-${String(day1).padStart(2, '0')}`;
  const inputDate = new Date(formattedDateStr);




 if (isNaN(inputDate.getTime()) || isNaN(base.getTime())) {
   console.error("Invalid date detected.");
 } else {
   diffMS =
     inputDate.getTime() +
     isDST(inputDate) * hourMS +
     inputDate.getTimezoneOffset() * minMS -
     base.getTime();


 }



  if (bool) {
    diffMS += hourMS * hours + minMS * mins;
  }

  let diffDays = Math.floor(diffMS / dayMS);
  diffMS %= dayMS;

  let diffHours = Math.floor(diffMS / hourMS);
  diffMS %= hourMS;

  let diffMinute = Math.floor(diffMS / minMS);

  if (diffMinute < 0) {
          diffMinute += 60;
          diffHours -= 1;
      }

      if (diffHours < 0) {
          diffHours += 24;
          diffDays -= 1;
      }

  while (diffDays < 0) {
    year -= 1;
    diffDays += xtraYears.includes(year) ? 371 : 364;
  }

  xtraBool = xtraYears.includes(year) ? 1 : 0;

  while (diffDays > 0) {
    if (diffDays >= 364 + 7 * xtraBool) {
      diffDays -= 364 + 7 * xtraBool;
      year += 1;
      xtraBool = xtraYears.includes(year) ? 1 : 0;
    } else if (diffDays > 91) {
      diffDays -= 91;
      month += 3;
    } else if (diffDays >= 30 + thirdM) {
      diffDays -= 30 + thirdM;
      month += 1;
      thirdM = month % 3 === 0 ? 1 : 0;
    } else {
      diffDays -= 1;
      day += 1;
    }
  }

  const dayNum = day + Math.floor((month - 1) * 30 + (month - 1) / 3);
  const dayName = weekdays[(dayNum - 1) % 7];

   return `${dayName} ${months[month - 1]} ${day} ${year}`;


};

const GregToHHPCConv: React.FC<HHPCProps> = ({ date, time }) => {
  const [hhpcDate, setHhpcDate] = useState<string>("");

  const parseDate = () => {
    // Parse date
    const [month, day, year] = date.split("/").map(Number);
    const localDate = new Date(year, month - 1, day);
    return localDate;
  };

  const parseTime = () => {

      // Parse time
      const [timePart, period] = time.split(" ");
      let [hours, minutes] = timePart.split(":").map(Number);

      if (period.toLowerCase() === "pm" && hours !== 12) {
        hours += 12;
      }
      if (period.toLowerCase() === "am" && hours === 12) {
        hours = 0;
      }
      return (hours +":"+ minutes);
          };


 const calculatedUTCTime = () => {

     const [hours, minutes] = parseTime().split(":").map(Number);

         const now = parseDate(); // Current date
         const localDateTime = new Date(
           now.getFullYear(),
           now.getMonth(),
           now.getDate(),
           hours,
           minutes,
           0, // seconds
           0  // milliseconds
         );



             // Convert local time to UTC
             const utcDateTime = new Date(localDateTime.toUTCString());

             // Extract UTC time components
             const utcHours = utcDateTime.getUTCHours().toString().padStart(2, "0");
             const utcMinutes = utcDateTime.getUTCMinutes().toString().padStart(2, "0");


        return (utcHours +":"+ utcMinutes +" UTC");
      };






  const calHHPCDate = HHPC(date, parseTime(), true);
  const calUTCTime = calculatedUTCTime();
  return (
       <View style={styles.resultsContainer}>


          <View style={styles.timeContainer}>

             <View style={styles.resultRow}>
                     <Text style={styles.resultLabel}>HHPC Date: </Text>
                     <Text style={styles.resultValue}>{calHHPCDate}</Text>
             </View>

           </View>



            <View style={styles.resultRow}>
                     <Text style={styles.resultLabel}>Time: </Text>
                     <Text style={styles.resultValue}>{calUTCTime}</Text>
            </View>

           </View>
    );
  };

  const styles = StyleSheet.create({

    resultsContainer: {
        marginTop: 10, // Space below the results container
      },
    resultRow: {
        flexDirection: "row",
        alignItems: "center", // Align vertically in the center
        marginBottom: 15,
      },
      resultLabel: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#444", // Dark gray for the label text
        minWidth: 100, // Ensures labels have enough space
      },
      resultValue: {
          fontSize: 18,
          fontWeight: "bold", // Makes the value bold
          color: "red", // Red color for emphasis
    },

      timeContainer: {
          marginBottom: 15, // Add space below the time display row
        },
  });

export default GregToHHPCConv;
