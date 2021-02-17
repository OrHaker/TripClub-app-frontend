import React from "react";
import { StyleSheet, SafeAreaView, StatusBar, View } from "react-native";

import colors from "../utility/colors";

function Screen({ children, style, statusBarBG = "lightGreen" }) {
  return (
    <SafeAreaView style={[styles.screen]}>
      <StatusBar
        backgroundColor={colors[statusBarBG]}
        barStyle={
          statusBarBG === "dark" || statusBarBG === "black"
            ? "light-content"
            : "dark-content"
        }
      />
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
