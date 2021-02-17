import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import Button from "../components/AppButton";
import Text from "../components/AppText";
import colors from "../utility/colors";
import Screen from "./../components/Screen";
import Routes from "../navigation/routes";

const EditUserUploadSelctionScreen = ({ navigation }) => {
  return (
    <Screen style={styles.container}>
      <Text style={styles.header}>בחר את התוכן שברצונך לערוך </Text>
      <View style={styles.row}>
        <Button
          style={styles.circle}
          title="הפוסטים שלי"
          color="lightGreen"
          onPress={() => navigation.navigate(Routes.EDIT_USER_POSTS_SCREEN)}
        />
        <Button
          style={styles.circle}
          title="המסלולים שלי"
          color="royalBlue"
          onPress={() => navigation.navigate(Routes.EDIT_USER_TRACKS_SCREEN)}
        />
      </View>
      <Button
        style={styles.circle}
        title="ההמלצות שלי"
        color="paradisePink"
        onPress={() => navigation.navigate(Routes.EDIT_USER_RECOMMENDATION_SCREEN)}
      />
    </Screen>
  );
};

export default EditUserUploadSelctionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.cream,
  },
  circle: {
    height: Dimensions.get("screen").width * 0.45,
    width: Dimensions.get("screen").width * 0.45,
    borderRadius: 120,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.8,
    shadowRadius: 400,

    elevation: 10,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  header: { fontWeight: "bold" },
});
