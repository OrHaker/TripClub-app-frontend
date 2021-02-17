import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Dimensions, Alert } from "react-native";

import MapView, { Marker } from "react-native-maps";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AppActivityIndicator from "../components/AppActivityIndicator";
import Picker from "./../components/Picker";
import Button from "./../components/AppButton";
import colors from "../utility/colors";
import UserImage from "../components/UserImage";
import Screen from "./../components/Screen";
import Text from "./../components/AppText";
import TextInput from "./../components/TextInput";

import { TripClubContext } from "../context";
import { getAllTracksLocationsData } from "../api/trackController";
import { insertNewTrack } from "./../api/trackController";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const UploadTrackScreen = ({ navigation }) => {
  const { user, destination } = React.useContext(TripClubContext);

  const [description, setDescription] = React.useState("");
  const [locationName, setLocationName] = React.useState("");

  const [pickerLocations, setPickerLocations] = React.useState([]);

  const [trackLocations, setTrackLocations] = React.useState([]);

  const [marker, setMarker] = React.useState({});
  const [region, setRegion] = React.useState({
    latitudeDelta: 100,
    longitudeDelta: 100,
    latitude: 32.19869002140408,
    longitude: 37.329504154622555,
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const [destinations, setDestinations] = React.useState([]);

  const renderMarkers = trackLocations?.map(
    ({ latitude, longitude, locationName }, index) => (
      <Marker
        key={index}
        coordinate={{
          latitude,
          longitude,
        }}
        title={locationName}
        pinColor={colors.primary}
        onPress={() =>
          Alert.alert(`🚨 🗺 `, `תרצה להסיר את ${locationName} מהמפה?`, [
            {
              text: "לא",
              style: "cancel",
            },
            {
              text: "כן",
              onPress: () =>
                setTrackLocations(
                  trackLocations.filter((t) => t.locationName !== locationName)
                ),
            },
          ])
        }
      />
    )
  );

  const _handleAddLocation = () => {
    if (locationName.trim() === "") {
      Alert.alert("✋", "... אנא הוסף שם למיקום", [{ text: "הבנתי" }]);
      return;
    } else if (trackLocations.find((t) => t.locationName === locationName)) {
      Alert.alert("✋", "המקום כבר קיים ", [{ text: "הבנתי" }]);
      return;
    }
    setTrackLocations([...trackLocations, { ...marker, locationName }]);
    setModalVisible(false);
    Alert.alert("👌", "המיקום נוסף בהצלחה", [{ text: "אוקיי" }]);
  };

  const toPickerSchema = (item) => {
    return { label: item.locationName, value: item.destinationCode };
  };

  const _handleAddTrack = async () => {
    const trackToUpload = {
      trackCode: 1,
      userId: user.userId,
      description,
      active: true,
      trackLocations: JSON.stringify(trackLocations),
    };
    if (trackToUpload.trackLocations === "[]" || trackToUpload.description === "") {
      Alert.alert("✋", "חסר תיאור למסלול או שאין כלל מיקומים במפה", [{ text: "הבנתי" }]);
      return;
    }
    setIsLoading(true);
    const returned = await insertNewTrack(trackToUpload);
    setIsLoading(false);
    if (returned !== null) {
      setDescription("");
      setTrackLocations([]);
      Alert.alert("👌", "המסלול נוסף בהצלחה", [{ text: "👌" }]);
    } else Alert.alert("✋", "הייתה בעיה בפרסום המסלול", [{ text: "הבנתי" }]);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      async function fetchApi() {
        setIsLoading(true);
        const destLatLangs = await getAllTracksLocationsData();
        if (destLatLangs) {
          setDestinations(destLatLangs);
          setPickerLocations(destLatLangs.map((i) => toPickerSchema(i)).sort(compare));
        }
        setIsLoading(false);
      }
      fetchApi();
    });
    return unsubscribe;
  }, [navigation, destination]);

  //sort array by description comparer
  function compare(a, b) {
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
  }
  return (
    <>
      <Screen style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAware}>
          <View style={styles.formContainer}>
            <UserImage user={user} />
            <Text>{user.userName}</Text>
            {destination && (
              <Text>{`פרסום מסלול שעובר ב ${destination?.description}`}</Text>
            )}
            <TextInput
              multiline={true}
              numberOfLines={6}
              placeholder="תיאור המסלול..."
              style={styles.descriptionInput}
              maxLength={250}
              onChangeText={(txt) => setDescription(txt)}
            />
            <Picker
              placeholder="הוסף יעד למסלול"
              cancelButtonBG="secondary"
              items={pickerLocations}
              onSelectItem={(item) => {
                const temp = trackLocations.find((c) => c.destinationCode === item.value);
                if (temp) {
                  Alert.alert("✋", "...המיקום כבר קיים", [{ text: "אוקיי" }]);
                }
                const dest = destinations.find((c) => c.destinationCode === item.value);
                setTrackLocations([...trackLocations, dest]);
                setRegion({
                  ...region,
                  latitude: dest.latitude,
                  longitude: dest.longitude,
                });
              }}
              icon="map-marker-multiple"
            />
            <Text style={{ fontSize: 10 }}>
              🌟 ניתן להוסיף מיקום גם על ידי לחיצה ארוכה על המיקום הרצוי במפה
            </Text>
            <Button title="הוסף מסלול" onPress={_handleAddTrack} color="secondary" />
          </View>
          <MapView
            region={region}
            style={styles.mapStyle}
            onLongPress={(e) => {
              const latlan = e.nativeEvent.coordinate;
              setMarker({ latitude: latlan.latitude, longitude: latlan.longitude });
              setModalVisible(true);
            }}
          >
            {renderMarkers}
          </MapView>
        </KeyboardAwareScrollView>
      </Screen>
      <Modal visible={modalVisible}>
        <View style={styles.container}>
          <Text
            style={{ textAlign: "center" }}
          >{`לשים ♥️ \nלא ניתן לסנן מסלולים לפי מיקומים שנוספו בצורה זאת`}</Text>
          <TextInput
            backgroundColor="white"
            placeholder="שם המיקום הנבחר"
            onChangeText={(txt) => setLocationName(txt)}
          />
          <Button
            title="הוסף מיקום"
            onPress={_handleAddLocation}
            icon="map-marker"
            color="secondary"
          />
          <Button
            color="danger"
            title="בטל"
            onPress={() => {
              setLocationName("");
              setMarker({});
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
      <AppActivityIndicator visible={isLoading} />
    </>
  );
};

export default UploadTrackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.cream,
  },
  descriptionInput: {
    fontSize: 25,
    textAlignVertical: "top",
    paddingTop: 15,
    height: 150,
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.6,
  },
  keyboardAware: {
    flex: 1,
    alignItems: "center",
  },

  mapStyle: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.37,
  },
});
