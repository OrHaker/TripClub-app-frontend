import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../utility/colors";
import UserImage from "../components/UserImage";

import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useIsDrawerOpen } from "@react-navigation/drawer";

import { TripClubContext } from "../context";
import AppText from "./AppText";

const Header = ({
  backgroundColor = "primary",
  isOnUserPage = false,
  onBackPress,
  title,
  style,
}) => {
  const { user } = React.useContext(TripClubContext);
  const isDrawerOpen = useIsDrawerOpen();
  const [isOpen, setIsOpen] = React.useState(isDrawerOpen);

  React.useEffect(() => {
    setIsOpen(isDrawerOpen);
  }, [isDrawerOpen]);
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: colors[backgroundColor] }, style]}>
      {isOnUserPage && (
        <MaterialCommunityIcons
          name={"arrow-right"}
          color={colors.medium}
          style={[styles.icon, styles.backIcon]}
          onPress={onBackPress}
        />
      )}
      {!isOnUserPage && <UserImage user={user} style={styles.userImage} />}

      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <MaterialCommunityIcons
          name={isOpen ? "close" : "menu"}
          color={colors.white}
          style={styles.icon}
        />
      </TouchableOpacity>
      <AppText>{title}</AppText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  backIcon: { fontSize: 27 },
  container: {
    width: "100%",
    height: 40,
    // flexDirection: "row-reverse",//for image in right side
    // justifyContent: "flex-start",//for image in right side
    flexDirection: "row", //for image in left side
    justifyContent: "flex-start", //for image in left side
    alignItems: "center",

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  icon: {
    marginHorizontal: 5,
    fontSize: 25,
    color: colors.black,
  },
  userImage: {
    height: 30,
    width: 30,
  },
});
