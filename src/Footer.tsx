import React from "react";
import { View, Text, StyleSheet, Image, Linking, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const Footer = () => {
  return (
    <LinearGradient
      colors={["#0D47A1", "#1565C0"]}// Dark-to-medium blue gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.footer}
    >
      <View style={styles.footerRow}>
        {/* Logo Section */}
        <View style={styles.footerCell}>
          <Image
            source={require("../assets/images/jhu_small.png")}
            style={styles.logo}
          />
        </View>
        {/* Links Section */}
        <View style={styles.footerCell}>
          <Pressable
            onPress={() => Linking.openURL("http://henry.pha.jhu.edu/rch.html")}
          >
            <Text style={styles.link}>Prof Henry's Site</Text>
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL("https://sites.krieger.jhu.edu/iae/about/")}
          >
            <Text style={styles.link}>Institute for Applied Economics</Text>
          </Pressable>
        </View>
      </View>
      {/* Footer Text
      <Text style={styles.footerText}>© Hanke-Henry Permanent Calendar</Text>*/}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  footerCell: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  link: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF", // White text for links
    textDecorationLine: "underline",
    marginVertical: 4,
  },
  footerText: {
    fontSize: 12,
    color: "#E3F2FD", // Light blue text for footer copyright
    textAlign: "center",
  },
});

export default Footer;
