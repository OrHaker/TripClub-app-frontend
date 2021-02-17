import React from "react";
import { View, StyleSheet, Image, Dimensions, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../utility/colors";
import Text from "./AppText";
import Title from "./Title";
import UserImage from "./UserImage";
import { TripClubContext } from "../context";
import { deleteRecommendation } from "./../api/recommendationController";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const RecommendationCard = (recommendation) => {
  const {
    destinationName,
    userName,
    userImage,
    recoId,
    userId,
    destinationCode,
    description,
    postImage,
    uploadDate,
    fetchApi,
  } = recommendation;

  const { user } = React.useContext(TripClubContext);

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
              Alert.alert(`🚨`, `תרצה להסיר את ההמלצה שלך?`, [
                {
                  text: "לא",
                  style: "cancel",
                },
                {
                  text: "כן",
                  onPress: () => {
                    deleteRecommendation(recoId);
                    fetchApi();
                  },
                },
              ])
            }
          />
        )}
      </View>
      <Text style={styles.description}>{description.trim()}</Text>
      <Text>{`ב - ${destinationName}`}</Text>
      {postImage ? (
        <Image
          style={styles.postImage}
          source={{ uri: `${postImage}?date=${Date.now()}` }}
          defaultSource={require("../assets/icon.png")}
        />
      ) : null}
    </View>
  );
};

export default RecommendationCard;

const styles = StyleSheet.create({
  card: {
    width: WINDOW_WIDTH,
    overflow: "hidden",
    padding: 5,
    marginTop: 40,
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
