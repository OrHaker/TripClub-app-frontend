import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../utility/colors";

const AppButton = ({ title, onPress, color = "primary", width = "95%", icon, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: colors[color],
          borderColor:
            color === "dark" || color === "black" ? colors.medium : colors.black,
          width,
        },
        { ...style },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color:
              color === "white" || color === "light" || color === "secondary"
                ? colors.dark
                : colors.light,
          },
        ]}
      >
        {title}
      </Text>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          style={[styles.icon]}
          size={20}
          color={
            color === "white" || color === "light" || color === "secondary"
              ? colors.dark
              : colors.light
          }
        />
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderColor: colors.black,
    borderWidth: 1,
  },
  text: {
    color: colors.light,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  icon: {
    marginHorizontal: 10,
  },
});
