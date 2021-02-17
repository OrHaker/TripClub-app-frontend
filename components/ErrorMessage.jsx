import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../utility/colors";

import Text from "./AppText";

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return <View />;

  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: { color: colors.danger },
});

export default ErrorMessage;
