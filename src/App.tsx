import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { WebView } from 'react-native-webview'; // Import WebView
import LinearGradient from 'react-native-linear-gradient';
import HHPCDateTimeComponent from "./HHPCDateTimeComponent";
import HHPCCalendarComponent from "./HHPCCalendarComponent";
import GregToHHPCConvComponent from "./GregToHHPCConvComponent";
import HHPCToGregConvComponent from "./HHPCToGregConvComponent";
import Footer from "./Footer";
import WebViewComponent from "./WebViewComponent";


const MyApp = () => {
  const [currentScreen, setCurrentScreen] = useState("Home");

  // Renders content dynamically based on the current screen
  const renderScreenContent = () => {
    switch (currentScreen) {
      case "Home":
        return <HomeFragment />;
      case "Calendar":
        return <HHPCCalFragment />;
      case "HHPCConv":
        return <HHPCConvFragment />;
      case "GregConv":
        return <GregConvFragment />;
      case "Q&A":
        return <QAndAFragment />;
      case "Media":
          return <MediaFragment />;
      case "Contact":
          return <ContactFragment />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Gradient Button Container */}
      <LinearGradient
        colors={["#0D47A1", "#1565C0"]} // Gradient colors
        start={{ x: 0, y: 0 }} // Gradient starting point
        end={{ x: 1, y: 0 }}   // Gradient ending point
        style={styles.buttonContainer} // Apply styles
      >
        <Pressable
          style={styles.button}
          onPress={() => setCurrentScreen("Home")}
        >
          <Text style={styles.buttonText}>Home</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => setCurrentScreen("Calendar")}
        >
          <Text style={styles.buttonText}>Calendar</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => setCurrentScreen("HHPCConv")}
        >
          <Text style={styles.buttonText}>HHPC Conv</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => setCurrentScreen("GregConv")}
        >
          <Text style={styles.buttonText}>Greg Conv</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => setCurrentScreen("Q&A")}
        >
          <Text style={styles.buttonText}>Q&A</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => setCurrentScreen("Media")}
        >
          <Text style={styles.buttonText}>Media</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => setCurrentScreen("Contact")}
        >
          <Text style={styles.buttonText}>Contact</Text>
        </Pressable>
      </LinearGradient>

      {/* Fragment-like Container */}
      <View style={styles.fragmentContainer}>{renderScreenContent()}</View>

      {/* Footer */}
      <Footer />
    </View>
  );
};


const ContactFragment = () => <WebViewComponent uri="http://hankehenryontime.com/html/contact.html" />;
const MediaFragment = () => <WebViewComponent uri="http://hankehenryontime.com/html/media.html" />;
const QAndAFragment = () => <WebViewComponent uri="http://hankehenryontime.com/html/qanda.html" />;


// Calendar Fragment
const HHPCCalFragment = () => (
  <View style={styles.fragment}>
    <HHPCCalendarComponent />
  </View>
);

// HHPC Conversion Fragment
const HHPCConvFragment = () => (
  <View style={styles.fragment}>
    <GregToHHPCConvComponent />
  </View>
);

// Gregorian Conversion Fragment
const GregConvFragment = () => (
  <View style={styles.fragment}>
    <HHPCToGregConvComponent />
  </View>
);

// Home Fragment
const HomeFragment = () => (
  <View style={styles.fragment}>
    {/* Date and Time Display */}
    <View style={styles.dateContainer}>
      <Text style={styles.dateText}>Today's HHPC Date is:</Text>
      <HHPCDateTimeComponent />
    </View>

    {/* Title */}
    <Text style={styles.title}>Hanke-Henry Permanent Calendar</Text>

    {/* Scrollable Description */}
    <ScrollView style={styles.scrollView}>
      <View style={styles.textContainer}>
        <Text style={styles.textColumn}>
          The world did not come to an end on December 21, 2012, contrary to
          what the Mayan calendar had predicted. In 2012, news of Iran's
          hyperinflation brought the solar Hijri calendar — used throughout Iran
          and Afghanistan — back into the news. And, every year, over a billion
          people around the world celebrate the Chinese Lunar New Year. Suffice
          to say, there are many calendars out there besides our familiar
          Gregorian calendar.
        </Text>
        <Text style={styles.textColumn}>
          The world should now turn to a calendar that is superior to all
          existing calendars, one which will provide a comprehensive revision of
          the contemporary Gregorian calendar: the Hanke-Henry Permanent
          Calendar (HHPC). The HHPC adheres to the most basic tenant of a fixed
          (read: permanent) calendar: each year, each date falls on the same day
          of the week; in our case, every year begins on Monday, January 1.
        </Text>
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  buttonContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      elevation: 5,
      borderBottomLeftRadius: 20, // Optional: Add rounded edges
      borderBottomRightRadius: 20,
      overflow: "hidden", // Clip content to stay within rounded edges
    },
  button: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10,
    },
  buttonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "bold",
      textTransform: "uppercase",
    },
  fragmentContainer: {
    flex: 1,
  },
  fragment: {
    flex: 1,
    padding: 16,
  },
  dateContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    borderRadius: 8,
  },
  dateText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#101010",
    marginVertical: 4,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#03A9F4",
    marginVertical: 16,
  },
  scrollView: {
    flex: 1,
    marginTop: 16,
  },
  textContainer: {
    flexDirection: "row",
    padding: 8,
  },
  textColumn: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 8,
    color: "#101010",
  },
});

export default MyApp;
