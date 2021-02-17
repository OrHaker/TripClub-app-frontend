import React from "react";
import { StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import Routes from "../navigation/routes";
import { useNavigation } from "@react-navigation/native";

const UserImage = ({ user, style }) => {
  const navigation = useNavigation();
  const renderUserImage = () =>
    user?.userImage
      ? { uri: `${user.userImage}?date=${Date.now()}` }
      : require("../assets/dog.png");

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate(Routes.EDIT_USER_DETAILS, {
          screen: Routes.SINGLE_USER,
          params: {
            user,
          },
        });
      }}
    >
      <Image source={renderUserImage()} style={[styles.profileImage, style]} />
    </TouchableWithoutFeedback>
  );
};

export default UserImage;

const styles = StyleSheet.create({
  profileImage: {
    height: 40,
    width: 40,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 2,
  },
});
