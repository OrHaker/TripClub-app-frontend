import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Routes from "./routes";
import Header from "../components/Header";

import EditUserTracksScreen from "./../screens/EditUserTracksScreen";
import EditUserPostsScreen from "../screens/EditUserPostsScreen";
import EditUserRecommendationScreen from "./../screens/EditUserRecommendationScreen";
import EditUserUploadSelctionScreen from "./../screens/EditUserUploadSelctionScreen";

import colors from "../utility/colors";

const Stack = createStackNavigator();

const EditUserUploadNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.EDIT_USER_UPLOAD_SELECTION_SCREEN}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 15,
          height: 40,
        },
        animationEnabled: true,
        animationTypeForReplace: "push",
        headerBackTitle: "הקודם",
        cardOverlayEnabled: true,
      }}
    >
      <Stack.Screen
        name={Routes.EDIT_USER_UPLOAD_SELECTION_SCREEN}
        component={EditUserUploadSelctionScreen}
        options={{
          title: "בחר את התוכן שברצונך לערוך",
          header: () => (
            <Header
              isOnUserPage
              onBackPress={() => navigation.goBack()}
              title="בחר את התוכן שברצונך לערוך"
            />
          ),
        }}
      />

      <Stack.Screen
        name={Routes.EDIT_USER_TRACKS_SCREEN}
        component={EditUserTracksScreen}
        options={{
          title: "ערוך מסלולי משתמש",
        }}
      />
      <Stack.Screen
        name={Routes.EDIT_USER_POSTS_SCREEN}
        component={EditUserPostsScreen}
        options={{
          title: "ערוך את הפוסטים שלך",
        }}
      />

      <Stack.Screen
        name={Routes.EDIT_USER_RECOMMENDATION_SCREEN}
        component={EditUserRecommendationScreen}
        options={{
          title: "ערוך את ההמלצות שלך",
        }}
      />
    </Stack.Navigator>
  );
};

export default EditUserUploadNavigator;
