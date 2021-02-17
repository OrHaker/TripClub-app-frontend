import React from "react";
import { StyleSheet } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import Text from "./AppText";
import colors from "../utility/colors";

function OfflineNotice() {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return <Text style={styles.text}>⚠️ אין חיבור רשת האפליקציה לא תעבוד כמצופה</Text>;
  return null;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    color: colors.white,
    backgroundColor: colors.danger,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default OfflineNotice;
