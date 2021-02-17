import React from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

import colors from "../utility/colors";
import Text from "./AppText";
import Title from "./Title";
import UserImage from "./UserImage";

import { deleteTrack } from "../api/trackController";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const TracksCard = ({
  userName,
  userId,
  userImage,
  user,
  uploadDate,
  description,
  trackLocations,
  trackCode,
  fetchApi,
}) => {
  const [region, setRegion] = React.useState({
    latitudeDelta: 100,
    longitudeDelta: 100,
    latitude: 100,
    longitude: 100,
  });

  const jsonTrackLocations = JSON.parse(trackLocations);
  const renderMarkers = jsonTrackLocations?.map(
    ({ latitude, longitude, locationName }, index) => (
      <Marker
        key={index}
        coordinate={{
          latitude,
          longitude,
        }}
        title={locationName}
        pinColor={colors.primary}
      />
    )
  );

  React.useEffect(() => {
    setRegion({
      latitudeDelta: 100,
      longitudeDelta: 100,
      latitude: jsonTrackLocations[0].latitude,
      longitude: jsonTrackLocations[0].longitude,
    });
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.detailsContainer}>
        <View style={styles.imageAndUserName}>
          <UserImage user={{ userImage, userId }} />
          <Title style={styles.title}>{userName}</Title>
          {uploadDate && (
            <Text style={styles.date}>{uploadDate.split("-").join("/")}</Text>
          )}
          {user?.userId === userId && (
            <MaterialCommunityIcons
              name="close"
              size={20}
              color={colors.medium}
              style={styles.icon}
              onPress={() =>
                Alert.alert(`🚨`, `תרצה להסיר את המסלול שלך?`, [
                  {
                    text: "לא",
                    style: "cancel",
                  },
                  {
                    text: "כן",
                    onPress: () => {
                      deleteTrack(trackCode);
                      fetchApi();
                    },
                  },
                ])
              }
            />
          )}
        </View>
        <Text style={styles.description}>{description.trim()}</Text>
      </View>
      <MapView style={styles.mapStyle} region={region}>
        {renderMarkers}
      </MapView>
    </View>
  );
};

export default TracksCard;

const styles = StyleSheet.create({
  card: {
    width: WINDOW_WIDTH,
    overflow: "hidden",
    padding: 5,
  },
  date: { fontSize: 15, color: colors.medium },
  detailsContainer: {
    padding: 0,
  },
  description: {
    color: colors.secondary,
  },
  imageAndUserName: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    right: 3,
  },
  mapStyle: {
    alignSelf: "center",
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.3,
  },
  profileImage: { height: 30, width: 30 },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 7,
    marginHorizontal: 10,
  },
});
