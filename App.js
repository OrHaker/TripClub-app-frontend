import React from "react";
import { StyleSheet, I18nManager } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import theme from "./navigation/navigationTheme";
import OfflineNotice from "./components/OfflineNotice";

import { TripClubProvider } from "./context";

import MainNavigator from "./navigation/MainNavigator";

I18nManager.forceRTL(true);

export default function App() {
  return (
    <TripClubProvider>
      <NavigationContainer theme={theme}>
        <OfflineNotice />
        <MainNavigator />
      </NavigationContainer>
    </TripClubProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
