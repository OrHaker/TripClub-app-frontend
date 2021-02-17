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
import Picker from "./../components/Picker";

import { TripClubContext } from "../context";

import { recommendationImageUpload } from "./../api/imagesController";
import {
  getAllFullRecommendationsById,
  updateRecommendation,
} from "./../api/recommendationController";

const toPickerSchema = (item) => {
  return {
    label:
      item.description.length > 25
        ? item.description.substr(0, 22) + "..."
        : item.description,
    value: item.recoId,
  };
};

const EditUserRecommendationScreen = ({ navigation }) => {
  const { user, destination } = React.useContext(TripClubContext);

  const [pickerItems, setPickerItems] = React.useState([]);
  const [selectedPickerItem, setSelectedPickerItem] = React.useState(null);

  const [fullRecommendations, setFullRecommendations] = React.useState([]);
  const [selectedRecommendation, setSelectedRecommendation] = React.useState(null);

  const [recommendation, setRecommendation] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [base64, setBase64] = React.useState("");

  function getDate() {
    const today = new Date();
    return `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  }

  const _handleUpdateRecommendation = async () => {
    if (!selectedRecommendation) {
      Alert.alert("😬✋🌍", "בחר המלצה לעידכון");
      return;
    } else if (recommendation.trim() === "") {
      Alert.alert("😬✋🌍", "גוף ההמלצה ריק");
      return;
    }
    setIsLoading(true);

    const updatedReco = await updateRecommendation({
      recoId: selectedRecommendation.recoId,
      userId: user.userId,
      destinationCode: selectedRecommendation.destinationCode,
      description: recommendation,
      postImage: selectedRecommendation.postImage || "",
      uploadDate: getDate(),
    });
    if (updatedReco !== null) {
      if (image !== null && base64 !== null) {
        const imgUri = await recommendationImageUpload(
          base64,
          `recommendation${updatedReco.recoId}`
        );
        if (imgUri === null)
          Alert.alert("משהו השתבש ✋", "...סליחה אבל משהו השתבש בפרסום התמונה");
      }
    } else {
      Alert.alert("משהו השתבש ✋", "...סליחה אבל משהו השתבש בעדכון ההמלצה");
    }
    setIsLoading(false);
    if (updatedReco !== null) {
      Alert.alert("👌", "ההמלצה עודכנה בהצלחה");
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
    const unsubscribe = navigation.addListener("focus", async () => {
      async function fetchApi() {
        setIsLoading(true);
        const { userId } = user;
        const userRecommendations = await getAllFullRecommendationsById(userId);
        setPickerItems(userRecommendations.map((r) => toPickerSchema(r)));
        setFullRecommendations(userRecommendations);
        setSelectedPickerItem(null);
        setBase64("");
        setImage(null);
        setRecommendation("");
        setIsLoading(false);
      }

      fetchApi();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <Screen style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAware}>
          <UserImage user={user} onPress={() => alert("Move to user " + 1 + " page")} />
          <Text>{user.userName}</Text>
          {destination && <Text>{`פרסום המלצה ב ${destination?.description}`}</Text>}
          <Text>עריכת ההמלצות שלי</Text>
          <Picker
            selectedItem={selectedPickerItem}
            placeholder="בחר המלצה"
            cancelButtonBG="secondary"
            items={pickerItems}
            onSelectItem={(item) => {
              const reco = fullRecommendations.find((r) => r.recoId === item.value);
              setSelectedPickerItem(toPickerSchema(reco));
              setRecommendation(reco.description);
              setSelectedRecommendation(reco);
              if (reco.postImage) setImage(reco.postImage);
            }}
            icon="select"
          />

          <TextInput
            value={recommendation}
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
          <Button title="עדכן המלצה" onPress={_handleUpdateRecommendation} />
          {image && (
            <Image source={{ uri: `${image}?date=${Date.now()}` }} style={styles.image} />
          )}
        </KeyboardAwareScrollView>
      </Screen>
      <AppActivityIndicator visible={isLoading} />
    </>
  );
};

export default EditUserRecommendationScreen;

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
    fontSize: 23,
    textAlignVertical: "top",
    paddingTop: 15,
    height: 150,
  },
});
