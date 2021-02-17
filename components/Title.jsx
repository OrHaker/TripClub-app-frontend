import React from "react";
import { StyleSheet, Platform } from "react-native";

import colors from "../utility/colors";
import Text from "./AppText";

const Title = ({ children, color = "dark", style }) => {
  return (
    <Text style={[styles.title, { color: colors[color], ...style }]}>{children}</Text>
  );
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});
