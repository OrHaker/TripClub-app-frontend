import React from "react";
import { View, StyleSheet, Image, Dimensions, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import UserImage from "./UserImage";
import Text from "./AppText";
import Title from "./Title";
import TracksCard from "./TracksCard";

import colors from "../utility/colors";
import { deletePost } from "./../api/postController";
import { getTrackById } from "../api/trackController";
import { TripClubContext } from "../context";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const PostsCard = ({
  description,
  uploadDate,
  postImage,
  postId,
  trackCode,
  userName,
  userImage,
  userId,
  fetchApi,
}) => {
  const [track, setTrack] = React.useState(null);

  const { user } = React.useContext(TripClubContext);

  React.useEffect(() => {
    async function fetchApi() {
      const localTrack = await getTrackById(trackCode);
      if (localTrack) setTrack(localTrack);
    }
    if (trackCode > 0) fetchApi();
  }, []);

  if (track !== null)
    return (
      <TracksCard
        userImage={userImage}
        userName={userName}
        description={description}
        trackLocations={track.trackLocations}
        userId={userId}
        uploadDate={uploadDate}
        user={user}
        trackCode={trackCode}
        fetchApi={fetchApi}
      />
    );
  return (
    <View style={styles.card}>
      <View style={styles.imageAndUserName}>
        <UserImage user={{ userImage, userId }} />
        <Title style={styles.title}>{userName}</Title>
        <Text style={styles.date}>{uploadDate.split("-").join("/")}</Text>
        {user.userId === userId && (
          <MaterialCommunityIcons
            name="close"
            size={20}
            color={colors.medium}
            style={styles.icon}
            onPress={() =>
              Alert.alert(`🚨`, `תרצה להסיר את הפוסט שלך?`, [
                {
                  text: "לא",
                  style: "cancel",
                },
                {
                  text: "כן",
                  onPress: () => {
                    deletePost(postId);
                    fetchApi();
                  },
                },
              ])
            }
          />
        )}
      </View>
      <Text style={styles.description}>{description.trim()}</Text>
      {postImage ? (
        <Image
          style={styles.postImage}
          source={{ uri: `${postImage}?date=${Date.now()}` }}
        />
      ) : null}
    </View>
  );
};

export default PostsCard;

const styles = StyleSheet.create({
  card: {
    width: WINDOW_WIDTH,
    overflow: "hidden",
    padding: 5,
  },
  description: {
    color: colors.secondary,
  },
  date: { fontSize: 15, color: colors.medium },
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
    height: WINDOW_HEIGHT * 0.35,
    marginBottom: 10,
  },
  postImage: {
    alignSelf: "center",
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.35,
  },
  profileImage: { height: 30, width: 30 },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 7,
    marginHorizontal: 10,
  },
});
