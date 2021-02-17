import React from "react";
import { FlatList, Animated, View } from "react-native";

import Screen from "./../components/Screen";
import AppActivityIndicator from "../components/AppActivityIndicator";
import PostsCard from "../components/PostsCard";

import { getAllPosts } from "./../api/postController";
import Header from "../components/Header";

const PostsFeed = ({ navigation }) => {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const renderItem = ({ item }) => <PostsCard fetchApi={fetchApi} {...item} />;

  async function fetchApi() {
    setIsLoading(true);
    const localPosts = await getAllPosts();
    if (localPosts) setPosts(localPosts);
    setTimeout(() => setIsLoading(false), 200);
  }

  React.useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <Screen>
        <Header />
        <FlatList
          refreshing={isLoading}
          onRefresh={fetchApi}
          data={posts}
          keyExtractor={(post) => post.postId.toString()}
          renderItem={renderItem}
          //onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)}
        />
      </Screen>
      <AppActivityIndicator visible={isLoading} />
    </>
  );
};

export default PostsFeed;
