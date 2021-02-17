import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const loginOptions = {
  title: "התחבר",
  drawerIcon: () => <MaterialCommunityIcons name="location-enter" size={24} />,
};

export const registerOptions = {
  title: "הרשמה",
  drawerIcon: () => <MaterialCommunityIcons name="account-box-outline" size={24} />,
};

export const mainPageOptions = {
  title: "עמוד ראשי",
  drawerIcon: () => <MaterialCommunityIcons name="home" size={24} />,
};

export const UploadPostScreenOptions = {
  title: "פרסם פוסט",
  drawerIcon: () => <MaterialCommunityIcons name="compass" size={24} />, //human-greeting
};

export const UploadRecommendationScreenOptions = {
  title: "פרסם המלצה",
  drawerIcon: () => <MaterialCommunityIcons name="map-marker-check" size={24} />,
};

export const UploadTrackScreenOptions = {
  title: "פרסם מסלול",
  drawerIcon: () => <MaterialCommunityIcons name="routes" size={24} />,
};

export const EditUserDetailsScreenOptions = {
  title: "ערוך פרטי משתמש",
  drawerIcon: () => <MaterialCommunityIcons name="account-edit" size={24} />,
};

export const EditUserTracksScreenOptions = {
  title: "הפרסומים שלי",
  drawerIcon: () => <MaterialCommunityIcons name="playlist-edit" size={24} />,
};
