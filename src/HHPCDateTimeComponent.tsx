import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { setUpHHPC } from "./HHPCUtils";

const HHPCDateTimeComponent: React.FC = () => {
  const [time, setTime] = useState<string>("Loading time...");
  const [hhpcDate, setHhpcDate] = useState<string>("Loading HHPC Date...");

  const checkTime = (i: number): string => (i < 10 ? "0" + i : i.toString());

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();

      // Update time
      const h = now.getUTCHours();
      const m = now.getUTCMinutes();
      const s = now.getUTCSeconds();
      setTime(`${checkTime(h)}:${checkTime(m)}:${checkTime(s)}`);


      // Update HHPC date if it's midnight
      if (now.getUTCHours() === 0 && now.getUTCMinutes() === 0 && now.getUTCSeconds() === 0) {
        console.log("UTC Midnight reached, updating HHPC date...");
        console.log(setUpHHPC());
        setHhpcDate(setUpHHPC());
      }
    };

    // Initial updates
    setHhpcDate(setUpHHPC());
    updateTimeAndDate();

    // Set interval for updates
    const interval = setInterval(updateTimeAndDate, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{hhpcDate}</Text>
      <Text style={styles.timeText}>{time}</Text>
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  timeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
});

export default HHPCDateTimeComponent;
