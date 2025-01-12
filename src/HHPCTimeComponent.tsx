import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const HHPCTimeComponent: React.FC = () => {
  const [time, setTime] = useState<string>("");

  const checkTime = (i: number): string => (i < 10 ? "0" + i : i.toString());

  const startTime = () => {
    const updateTime = () => {
      const today = new Date();
      const h = today.getUTCHours();
      const m = today.getUTCMinutes();
      const s = today.getUTCSeconds();


      setTime(`${checkTime(h)}:${checkTime(m)}:${checkTime(s)}`);

    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    startTime();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{time || "Loading time..."}</Text>
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
  timeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default HHPCTimeComponent;
