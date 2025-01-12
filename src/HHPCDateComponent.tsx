import React, { useEffect, useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import { setUpHHPC } from "./HHPCUtils";

const HHPCDateComponent: React.FC = () => {
  const [hhpcDate, setHhpcDate] = useState<string>("Loading HHPC Date...");

  useEffect(() => {
    const updateDate = () => {
      const newDate = setUpHHPC(); // Generate the HHPC date string
      setHhpcDate(newDate);
      console.log("new HHPC Date:", newDate);
    };

    // Initial update when the component mounts
    updateDate();

    // Listener to check for UTC midnight every 5 minutes
    const interval = setInterval(() => {
      const now = new Date();
    console.log(now);
      const h = 1;
      if (h === 0 ){
          console.log("UTC Midnight reached, updating date...");
          updateDate();

      }



      if (now.getUTCHours() === 0 && now.getUTCMinutes() === 0) {
        console.log("UTC Midnight reached, updating date...");
        updateDate();
      }
    }, 300000); // Check every 5 minutes (300,000 ms)

    return () => clearInterval(interval); // Cleanup the timer on unmount
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{hhpcDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    alignItems: "center",
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default HHPCDateComponent;
