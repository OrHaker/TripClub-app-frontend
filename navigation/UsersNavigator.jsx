import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Routes from "./routes";
import EditUserDetailsScreen from "./../screens/EditUserDetailsScreen";
import SingleUserScreen from "../screens/SingleUserScreen";
import colors from "../utility/colors";

import Header from "../components/Header";
const Stack = createStackNavigator();
function UsersNavigator({ navigation }) {
  return (
    <Stack.Navigator initialRouteName={Routes.EDIT_USER_DETAILS}>
      <Stack.Screen
        name={Routes.EDIT_USER_DETAILS}
        component={EditUserDetailsScreen}
        options={{
          title: "ערוך פרטי משתמש",
          headerStyle: {
            backgroundColor: colors.medium,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          animationTypeForReplace: "none",
          header: () => (
            <Header
              isOnUserPage={true}
              onBackPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={Routes.SINGLE_USER}
        component={SingleUserScreen}
        options={{
          title: "צפה בפרופיל",
          headerStyle: {
            backgroundColor: colors.medium,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          animationTypeForReplace: "push",
          header: () => (
            <Header isOnUserPage={true} onBackPress={() => navigation.goBack()} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default UsersNavigator;
