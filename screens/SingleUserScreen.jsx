import React from "react";
import { StyleSheet, Image, Dimensions, FlatList, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";

import * as Linking from "expo-linking";

import AppActivityIndicator from "../components/AppActivityIndicator";
import Screen from "./../components/Screen";
import Text from "../components/AppText";
import PostsCard from "./../components/PostsCard";

import { getUserById } from "../api/userController";
import colors from "../utility/colors";
import Routes from "../navigation/routes";
import { getAllPostsByUserId } from "./../api/postController";

const windowWidth = Dimensions.get("window").width;

const SingleUserScreen = ({ route, navigation }) => {
  const renderUserImage = () =>
    user?.userImage
      ? { uri: `${user.userImage}?date=${Date.now()}` }
      : user?.gender === "m"
      ? require("../assets/male-avatar-photographer.png")
      : require("../assets/female-avatar-photographer.png");

  const isFocused = useIsFocused();

  const [user, setUser] = React.useState({});
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const renderItem = ({ item }) => <PostsCard {...item} />;

  React.useEffect(() => {
    async function fetchApi() {
      const { userId } = route.params.user;
      setIsLoading(true);
      const returnedUser = await getUserById(userId);
      const returnedPosts = await getAllPostsByUserId(userId);
      setUser(returnedUser);
      setPosts(returnedPosts ?? null);
      setIsLoading(false);
    }
    fetchApi();
  }, [route.params.user]);

  React.useEffect(() => {
    if (!isFocused) {
      navigation.dispatch(StackActions.replace(Routes.EDIT_USER_DETAILS));
    }
  }, [isFocused]);

  return (
    <>
      <Screen style={styles.container}>
        {!isLoading && (
          <>
            <View style={styles.row}>
              <Image
                source={renderUserImage()}
                style={user?.userImage ? styles.profileImage : styles.emptyProfileImage}
              />
              <Text style={styles.text}>{user.userName}</Text>
            </View>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => Linking.openURL(`mailto:${user.email}`)}>
                <Text style={styles.text}>{user.email}</Text>
              </TouchableOpacity>
              <Text style={styles.text}>{user.gender === "m" ? "זכר" : "נקבה"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.discription}>{user.discription}</Text>
            </View>
            {posts.length > 0 && (
              <View style={styles.flatListWrapper}>
                <FlatList
                  data={posts}
                  keyExtractor={(post) => post.postId.toString()}
                  renderItem={renderItem}
                />
              </View>
            )}
          </>
        )}
      </Screen>
      <AppActivityIndicator visible={isLoading} />
    </>
  );
};

export default SingleUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.light,
  },
  discription: {
    marginVertical: 2,
    fontSize: 15,
    paddingHorizontal: 10,
  },
  flatListWrapper: {
    flex: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    borderTopWidth: 1,
  },
  text: {
    marginVertical: 5,
    fontSize: 20,
    paddingHorizontal: 20,
  },
  profileImage: {
    marginTop: 20,
    width: windowWidth / 5,
    height: windowWidth / 5,
    borderRadius: 30,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 2,
  },
  emptyProfileImage: {
    marginTop: 20,
    width: windowWidth / 6,
    height: windowWidth / 6,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
});
