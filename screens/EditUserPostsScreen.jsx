import React from "react";
import { StyleSheet, View, Image, Alert, TouchableNativeFeedback } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CacheManager } from "react-native-expo-image-cache";

import AppActivityIndicator from "../components/AppActivityIndicator";
import Button from "./../components/AppButton";
import Text from "./../components/AppText";
import UserImage from "../components/UserImage";
import TextInput from "./../components/TextInput";
import Screen from "./../components/Screen";
import Picker from "./../components/Picker";
import { TripClubContext } from "../context";

import { postImageUpload } from "./../api/imagesController";
import { getAllTracksByUser } from "./../api/trackController";
import { getAllPostsByUserId, updatePost } from "./../api/postController";
import Title from "./../components/Title";

const toPostsPickerSchema = (item) => {
  return { label: item.description, value: item.postId };
};
const toPickerSchema = (item) => {
  return { label: item.description, value: item.trackCode };
};

const EditUserPostsScreen = ({ navigation }) => {
  const { user } = React.useContext(TripClubContext);

  const [base64, setBase64] = React.useState("");
  const [image, setImage] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(false);

  const [post, setPost] = React.useState("");

  const [postsPickerItems, setPostsPickerItems] = React.useState([]);
  const [selectedPickerItem, setSelectedPickerItem] = React.useState(null);

  const [selectedPost, setSelectedPost] = React.useState(null);
  const [userPosts, setUserPosts] = React.useState([]);

  const [trackCode, setTrackCode] = React.useState(null);
  const [userTracks, setUserTracks] = React.useState([]);

  function getDate() {
    const today = new Date();
    return `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  }

  const _handleUpdatePost = async () => {
    if (!selectedPost) {
      Alert.alert(" ✋ 📢 ", "לא נבחר פוסט לעידכון", [{ text: "הבנתי" }]);
      return;
    } else if (post.trim() === "") {
      Alert.alert(" ✋ 📢 ", "גוף הפוסט ריק", [{ text: "הבנתי" }]);
      return;
    }

    setIsLoading(true);
    const objToSend = {
      postId: selectedPost.postId,
      userId: user.userId,
      description: post,
      uploadDate: getDate(),
    };

    if (trackCode !== null) objToSend.trackCode = trackCode;
    if (image === null) objToSend.postImage = "";
    else if (image !== null) objToSend.postImage = selectedPost.postImage;
    const returnedPost = await updatePost(objToSend);
    if (returnedPost !== null) {
      if (image !== null && base64 !== null) {
        const imgUri = await postImageUpload(base64, `post${returnedPost.postId}`);
        if (imgUri !== null) {
          updatePost({ ...returnedPost, postImage: imgUri });
        } else Alert.alert("משהו השתבש ✋", "...סליחה אבל משהו השתבש בפרסום התמונה");
      }
    } else {
      Alert.alert("משהו השתבש ✋", "...סליחה אבל משהו השתבש בפרסום הפוסט");
    }
    setIsLoading(false);
    if (returnedPost !== null) {
      Alert.alert("👌", "הפוסט עודכן בהצלחה");
      setSelectedPost(null);
      setSelectedPickerItem(null);
      setTrackCode(null);
      setBase64("");
      setImage(null);
      setPost("");
    }
  };

  const _handleUploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setBase64(result.base64);
    }
  };

  const _handleTakePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, //if true make higher resolution--too big to handle
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setBase64(result.base64);
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      async function fetchApi() {
        const cancelTrack = { description: "בטל בחירת מסלול", trackCode: -1 };
        setIsLoading(true);
        const localTracks = await getAllTracksByUser(user.userId);
        if (localTracks) setUserTracks([cancelTrack, ...localTracks]);
        const returnedUserPosts = await getAllPostsByUserId(user.userId);
        setUserPosts(returnedUserPosts);

        setPostsPickerItems(returnedUserPosts.map((p) => toPostsPickerSchema(p)));
        setIsLoading(false);
      }
      setSelectedPost(null);
      setSelectedPickerItem(null);
      setTrackCode(null);
      setBase64("");
      setImage(null);
      setPost("");
      fetchApi();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <Screen style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAware}>
          <UserImage user={user} />
          <Text>{user.userName}</Text>
          <Text>עריכת הפוסטים</Text>
          <Picker
            selectedItem={selectedPickerItem}
            placeholder="בחר פוסט"
            cancelButtonBG="secondary"
            items={postsPickerItems}
            onSelectItem={(item) => {
              const currPost = userPosts.find((p) => p.postId === item.value);
              setPost(currPost.description);
              setSelectedPost(currPost);
              setSelectedPickerItem(toPostsPickerSchema(currPost));
              if (currPost.trackCode > 0) setTrackCode(currPost.trackCode);
              else setTrackCode(null);
              if (currPost.postImage) setImage(currPost.postImage);
              else setImage(null);
            }}
            icon="map-marker-multiple"
          />
          <TextInput
            value={post}
            multiline={true}
            numberOfLines={7}
            placeholder="גוף הפוסט..."
            style={styles.postInput}
            maxLength={250}
            onChangeText={(txt) => setPost(txt)}
          />
          {selectedPost && (
            <>
              {trackCode === null && (
                <View style={styles.buttonsContainer}>
                  <Button
                    title="הוסף תמונה"
                    icon="tooltip-image"
                    color="black"
                    onPress={_handleUploadImage}
                    width="45%"
                  />
                  <Button
                    title="צלם תמונה"
                    icon="camera"
                    color="medium"
                    onPress={_handleTakePicture}
                    width="45%"
                  />
                </View>
              )}
              {image === null && (
                <Picker
                  selectedItem={toPickerSchema({
                    trackCode,
                    description: trackCode
                      ? userTracks.find((t) => t.trackCode == trackCode).description
                      : "לא נבחר מסלול",
                  })}
                  placeholder="הוסף מסלול"
                  cancelButtonBG="secondary"
                  items={userTracks.map((t) => toPickerSchema(t))}
                  onSelectItem={(item) => {
                    if (item.value === -1) {
                      setTrackCode(null);
                      return;
                    }
                    const temp = userTracks.find((t) => t.trackCode === item.value);
                    setTrackCode(temp.trackCode);
                  }}
                  icon="map-marker-multiple"
                />
              )}
              <Button title="עדכן פוסט" onPress={_handleUpdatePost} color="secondary" />
              {image && (
                <TouchableNativeFeedback
                  onPress={() =>
                    Alert.alert(`📢`, `תרצה להסיר את התמונה שנבחרה?`, [
                      {
                        text: "לא",
                        style: "cancel",
                      },
                      {
                        text: "כן",
                        onPress: () => {
                          setImage(null);
                          setBase64(null);
                        },
                      },
                    ])
                  }
                >
                  <Image
                    source={{ uri: `${image}?date=${Date.now()}` }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </TouchableNativeFeedback>
              )}
            </>
          )}
        </KeyboardAwareScrollView>
      </Screen>
      <AppActivityIndicator visible={isLoading} />
    </>
  );
};

export default EditUserPostsScreen;

const styles = StyleSheet.create({
  buttonsContainer: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "90%",
    height: "25%",
  },
  hintText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  keyboardAware: {
    flex: 1,
    height: "70%",
    alignItems: "center",
  },
  postInput: {
    fontSize: 23,
    textAlignVertical: "top",
    paddingTop: 15,
    height: 170,
  },
});
