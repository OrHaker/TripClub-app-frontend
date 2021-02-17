import React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TripClubContext } from "../context";

import LoggedInNavigator from "./LoggedInNavigator";
import LoginScreen from "./../screens/LoginScreen";
import RegisterScreen from "./../screens/RegisterScreen";
import DrawerContent from "./DrawerContent";

import UploadPostScreen from "./../screens/UploadPostScreen";
import UploadRecommendationScreen from "./../screens/UploadRecommendationScreen";
import UploadTrackScreen from "./../screens/UploadTrackScreen";

import Routes from "../navigation/routes";
import {
  registerOptions,
  loginOptions,
  mainPageOptions,
  UploadPostScreenOptions,
  UploadRecommendationScreenOptions,
  UploadTrackScreenOptions,
  EditUserDetailsScreenOptions,
  EditUserTracksScreenOptions,
} from "./navigationUtilConstants";
import colors from "../utility/colors";

import UsersNavigator from "./UsersNavigator";
import EditUserUploadNavigator from "./EditUserUploadNavigator";

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  const { user } = React.useContext(TripClubContext);

  const loggedInScreens = (
    <>
      <Drawer.Screen
        name={Routes.LOGGED_IN_NAVIGATOR}
        component={LoggedInNavigator}
        options={mainPageOptions}
      />
      <Drawer.Screen
        name={Routes.UPLOAD_POSTS_CREEN}
        component={UploadPostScreen}
        options={UploadPostScreenOptions}
      />
      <Drawer.Screen
        name={Routes.UPLOAD_RECOMMENDATION_SCREEN}
        component={UploadRecommendationScreen}
        options={UploadRecommendationScreenOptions}
      />
      <Drawer.Screen
        name={Routes.UPLOAD_TRACK_SCREEN}
        component={UploadTrackScreen}
        options={UploadTrackScreenOptions}
      />
      <Drawer.Screen
        name={Routes.EDIT_USER_DETAILS}
        component={UsersNavigator}
        options={EditUserDetailsScreenOptions}
      />
      <Drawer.Screen
        name={Routes.EDIT_USER_UPLOAD_SELECTION_SCREEN}
        component={EditUserUploadNavigator}
        options={EditUserTracksScreenOptions}
      />
    </>
  );

  const defaultScreens = (
    <>
      <Drawer.Screen name={Routes.LOGIN} component={LoginScreen} options={loginOptions} />
      <Drawer.Screen
        name={Routes.REGISTER}
        component={RegisterScreen}
        options={registerOptions}
      />
    </>
  );

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerContentOptions={{
        style: styles.style,
        labelStyle: styles.labelStyle,
      }}
      drawerStyle={styles.drawerStyle}
    >
      {user ? loggedInScreens : defaultScreens}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerStyle: { backgroundColor: colors.cream },
  labelStyle: {
    color: colors.dark,
    fontWeight: "bold",
  },
  style: {
    width: "100%",
    paddingTop: 10,
    borderLeftColor: colors.medium,
    borderLeftWidth: 3,
  },
});

export default MainNavigator;
