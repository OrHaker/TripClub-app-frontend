import React from "react";
import { StyleSheet, View, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AppActivityIndicator from "../components/AppActivityIndicator";
import Button from "./../components/AppButton";
import Text from "./../components/AppText";
import TextInput from "./../components/TextInput";
import Screen from "./../components/Screen";
import UserImage from "../components/UserImage";

import { TripClubContext } from "../context";

import { recommendationImageUpload } from "./../api/imagesController";
import {
  insertNewRecommendation,
  updateRecommendation,
} from "./../api/recommendationController";
import Routes from "../navigation/routes";

const UploadRecommendationScreen = ({ navigation }) => {
  const { user, destination } = React.useContext(TripClubContext);

  const [recommendation, setRecommendation] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [base64, setBase64] = React.useState("");

  function getDate() {
    const today = new Date();
    return `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  }

  const _handleUploadRecommendation = async () => {
    setIsLoading(true);
    if (recommendation.trim() === "") {
      alert("שדות ריקים", "😃🌍");
      return;
    }
    const temp = await insertNewRecommendation({
      recoId: -1,
      userId: user.userId,
      destinationCode: destination.destinationCode,
      description: recommendation,
      postImage: "",
      uploadDate: getDate(),
    });
    if (temp !== null) {
      if (image !== null && base64 !== null) {
        const imgUri = await recommendationImageUpload(
          base64,
          `recommendation${temp.recoId}`
        );
        if (imgUri !== null) updateRecommendation({ ...temp, postImage: imgUri });
        else Alert.alert("משהו השתבש ✋", "...סליחה אבל משהו השתבש בפרסום התמונה");
      }
    } else {
      Alert.alert("משהו השתבש ✋", "...סליחה אבל משהו השתבש בפרסום ההמלצה");
    }
    setIsLoading(false);
    if (temp !== null) {
      Alert.alert("👌", "ההמלצה נוספה בהצלחה");
      setBase64("");
      setImage(null);
      setRecommendation("");
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
      if (!destination) {
        Alert.alert("", "עלייך לבחור יעד קודם", [{ text: "אוקיי" }]);
        navigation.navigate(Routes.DESTINATION_SELECTION);
        return;
      }
    });
    return unsubscribe;
  }, [navigation, destination]);

  return (
    <>
      <Screen style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAware}>
          <UserImage user={user} onPress={() => alert("Move to user " + 1 + " page")} />
          <Text>{user.userName}</Text>
          {destination && <Text>{`פרסום המלצה ב ${destination?.description}`}</Text>}
          <TextInput
            multiline={true}
            numberOfLines={8}
            placeholder="גוף ההמלצה..."
            style={styles.postInput}
            maxLength={250}
            onChangeText={(txt) => setRecommendation(txt)}
          />
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
          <Button title="פרסם המלצה" onPress={_handleUploadRecommendation} />
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </KeyboardAwareScrollView>
      </Screen>
      <AppActivityIndicator visible={isLoading} />
    </>
  );
};

export default UploadRecommendationScreen;

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
    height: "35%",
  },
  keyboardAware: {
    flex: 1,
    height: "70%",
    alignItems: "center",
  },
  postInput: {
    fontSize: 25,
    textAlignVertical: "top",
    paddingTop: 15,
    height: 150,
  },
});
