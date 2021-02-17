import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import PostsFeed from "./../screens/PostsFeed";
import RecommendationFeed from "./../screens/RecommendationFeed";
import TracksFeed from "./../screens/TracksFeed";
import colors from "../utility/colors";
import DestinationSelectionScreen from "../screens/DestinationSelectionScreen";

import Routes from "../navigation/routes";
const Tab = createBottomTabNavigator();

const LoggedInNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          borderTopColor: "rgba(0, 0, 0, 0.1)",
          borderTopWidth: 2,
        },
        activeTintColor: colors.lightGreen,
        labelStyle: { fontSize: 13, fontWeight: "700" },
        activeBackgroundColor: "rgba(0, 0, 0, 0.02)",
      }}
    >
      <Tab.Screen
        name={Routes.POSTS_FEED}
        component={PostsFeed}
        options={{
          title: "ראשי",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="search-web" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.RECOMMENDATIONS_FEED}
        component={RecommendationFeed}
        options={{
          title: "המלצות",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="radar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.TRACKS_FEED}
        component={TracksFeed}
        options={{
          title: "מסלולים",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="routes" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.DESTINATION_SELECTION}
        component={DestinationSelectionScreen}
        options={{
          title: "בחר יעד",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-map-marker" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default LoggedInNavigator;
