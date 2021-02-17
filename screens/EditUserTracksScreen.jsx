import React from "react";
import { StyleSheet, Alert } from "react-native";

import MapView, { Marker } from "react-native-maps";

import ActivityIndicator from "./../components/AppActivityIndicator";
import Button from "../components/AppButton";
import Title from "./../components/Title";
import Picker from "./../components/Picker";
import Text from "../components/AppText";
import TextInput from "./../components/TextInput";
import Screen from "./../components/Screen";

import { getAllTracksByUser } from "../api/trackController";
import { getAllTracksLocationsData, updateTrack } from "./../api/trackController";
import { TripClubContext } from "../context";

import colors from "../utility/colors";

const toPickerSchema = (item) => {
  return { label: item.description, value: item.trackCode };
};

const EditUserTracksScreen = ({ navigation }) => {
  const { user } = React.useContext(TripClubContext);

  const [pickerItems, setPickerItems] = React.useState([]);
  const [selectedPickerItem, setSelectedPickerItem] = React.useState(null);

  const [latlangs, setLatlangs] = React.useState([]);

  const [region, setRegion] = React.useState({
    latitudeDelta: 100,
    longitudeDelta: 100,
    latitude: 32.19869002140408,
    longitude: 37.329504154622555,
  });

  const [userTracks, setUserTracks] = React.useState([]);
  const [selectedTrack, setSelectedTrack] = React.useState(null);
  const [trackLocations, setTrackLocations] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  //sort array by description comparer
  function compare(a, b) {
    if (a.locationName < b.locationName) return -1;
    if (a.locationName > b.locationName) return 1;
    return 0;
  }

  const renderMarkers = trackLocations.map(
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

  const _handleUpdateTrack = async () => {
    const { trackCode, description } = selectedTrack;
    const trackToUpload = {
      trackCode,
      userId: user.userId,
      description,
      active: true,
      trackLocations: JSON.stringify(trackLocations),
    };
    if (trackToUpload.trackLocations === "[]" || trackToUpload.description === "") {
      Alert.alert("✋", "חסר תיאור למסלול או שאין כלל מיקומים במפה");
      return;
    }
    setIsLoading(true);
    const returned = await updateTrack(trackToUpload);
    setIsLoading(false);
    if (returned !== null) {
      Alert.alert("👌", "המסלול עודן בהצלחה");
    } else Alert.alert("✋", "הייתה בעיה בעדכון המסלול");
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      async function fetchApi() {
        setIsLoading(true);
        const tempUserTracks = await getAllTracksByUser(user.userId);
        const tempLatlangs = await getAllTracksLocationsData();
        setUserTracks(tempUserTracks);
        if (tempLatlangs) setLatlangs(tempLatlangs.sort(compare));
        if (tempUserTracks) setPickerItems(tempUserTracks.map((t) => toPickerSchema(t)));
        setIsLoading(false);
      }
      fetchApi();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <Screen style={styles.container}>
        <Title>בחר מסלול לעריכה</Title>
        <Picker
          placeholder="בחר מסלול לעריכה"
          cancelButtonBG="black"
          items={pickerItems}
          selectedItem={selectedPickerItem}
          onSelectItem={(item) => {
            const track = userTracks.find((t) => t.trackCode == item.value);
            setSelectedPickerItem(toPickerSchema(track));
            setSelectedTrack(track);
            setTrackLocations(JSON.parse(track?.trackLocations) || []);
          }}
          icon="map-marker-multiple"
        />
        {selectedTrack && (
          <>
            <Text>שם המסלול</Text>
            <TextInput
              value={selectedTrack.description}
              onChangeText={(txt) =>
                setSelectedTrack({ ...selectedTrack, description: txt })
              }
            />
            <Picker
              placeholder="הוסף יעד למסלול"
              cancelButtonBG="secondary"
              items={latlangs.map((item) => {
                return { label: item.locationName, value: item.destinationCode };
              })}
              onSelectItem={(item) => {
                const temp = trackLocations.find((c) => c.destinationCode === item.value);
                if (temp) {
                  Alert.alert("✋", "...המיקום כבר קיים");
                }
                const dest = latlangs.find((c) => c.destinationCode === item.value);
                setTrackLocations([...trackLocations, dest]);
                setRegion({
                  ...region,
                  latitude: dest.latitude,
                  longitude: dest.longitude,
                });
              }}
              icon="map-marker-multiple"
            />
          </>
        )}
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
        {selectedTrack && <Button title="עדכן מסלול" onPress={_handleUpdateTrack} />}
      </Screen>
      <ActivityIndicator visible={isLoading} />
    </>
  );
};

export default EditUserTracksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  mapStyle: {
    width: "100%",
    height: "40%",
  },
});
