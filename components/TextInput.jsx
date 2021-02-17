import React from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../utility/colors";

function AppTextInput({
  icon,
  width = "95%",
  onChangeText,
  backgroundColor = colors.light,
  color = colors.dark,
  multiline = false,
  style,
  onIconPress,
  iconStyle,
  ...otherProps
}) {
  return (
    <View style={[styles.container, { width, backgroundColor }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.medium}
          style={[styles.icon, iconStyle]}
          onPress={onIconPress}
        />
      )}
      <TextInput
        placeholderTextColor={colors.medium}
        style={[styles.text, style, { width, color }]}
        multiline={multiline}
        {...otherProps}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: "row",
    marginVertical: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icon: { marginLeft: 10 },
  text: {
    textAlign: "right",
    fontSize: 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    minHeight: 50,
    paddingHorizontal: 20,
  },
});

export default AppTextInput;
