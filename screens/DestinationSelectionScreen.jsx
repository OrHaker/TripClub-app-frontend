import React from "react";
import { FlatList, StyleSheet, View, ScrollView, Image, Dimensions } from "react-native";

import Swiper from "react-native-swiper";
import LottieView from "lottie-react-native";

import Button from "./../components/AppButton";
import Screen from "./../components/Screen";
import Title from "../components/Title";
import AppActivityIndicator from "../components/AppActivityIndicator";
import Picker from "./../components/Picker";
import Text from "../components/AppText";

import colors from "../utility/colors";
import { getAllDestinations } from "./../api/destinationController";
import { getAllCountries } from "./../api/countryController";
import { TripClubContext } from "../context";
import Routes from "../navigation/routes";

const DestinationSelectionScreen = ({ navigation }) => {
  const [countries, setCountries] = React.useState([]);
  const [destinations, setDestinations] = React.useState([]);

  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [selectedDestination, setSelectedDestination] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(false);

  const {
    user,
    setDestination: setCotextDestination,
    destination: CotextDestination,
    setCountry: setCotextCountry,
  } = React.useContext(TripClubContext);

  React.useEffect(() => {
    async function fetchApi() {
      setIsLoading(true);
      const localDestinations = await getAllDestinations();
      const localCountries = await getAllCountries();
      if (localDestinations) setDestinations(localDestinations.sort(compare));
      if (localCountries) setCountries(localCountries.sort(compare));
      setIsLoading(false);
    }
    fetchApi();
  }, []);

  //picker Schema util methods
  const countryToPickerSchema = (item) => {
    if (!item) return null;
    return { label: item.description, value: item.countryId };
  };
  const countryFromPickerSchema = (item) => {
    if (!item) return null;
    return {
      description: item.label,
      countryId: item.value,
    };
  };
  //sort array by description comparer
  function compare(a, b) {
    if (a.description < b.description) return -1;
    if (a.description > b.description) return 1;
    return 0;
  }

  const allDestinations = { label: "כל היעדים", value: -1 };

  const userAddMessage = user.gender === "m" ? "הוסף" : "הוסיפי";

  const destinationTitle =
    selectedCountry === null
      ? ` כדי לראות את היעדים \nבחר מדינה בעמוד ליד`
      : selectedDestination === null
      ? "בחר עיר"
      : `עיר נבחרת ${selectedDestination.description}`;

  const countryTitle = `מדינה נבחרת ${
    selectedCountry === null ? "" : selectedCountry.description
  }`;

  return (
    <>
      <Swiper
        removeClippedSubviews={false}
        activeDot={<View style={styles.activeDot} />}
        index={1}
      >
        <Screen style={[styles.container, styles.countryScreen]}>
          <Title>{countryTitle}</Title>

          <Picker
            placeholder="בחר מדינה"
            cancelButtonBG="secondary"
            items={[allDestinations, ...countries.map((i) => countryToPickerSchema(i))]}
            onSelectItem={(item) => {
              setSelectedCountry(countryFromPickerSchema(item));
              setCotextCountry(countries.find((c) => c.countryId === item.value));
              setSelectedDestination(null);
              setCotextDestination(null);
            }}
            selectedItem={countryToPickerSchema(selectedCountry)}
            icon="map-marker-multiple"
          />
          <Text style={styles.helpMessage}>
            ♦לאחר בחירת יעד בדף הבא יהיה סינון בעמודים - מסלולים והמלצות
          </Text>
          <LottieView
            autoPlay
            loop={false}
            source={require("../assets/animations/mountain.json")}
            style={[styles.logo]}
          />
          {/* <Image style={[styles.logo]} source={require("../assets/travelerfemale.png")} /> */}
        </Screen>
        {/*-------------------------------------------------------------------------------------------- */}
        <Screen style={[styles.container, styles.destinationScreen]}>
          <Title>{destinationTitle}</Title>
          <Text style={styles.helpMessage}>
            ♦לאחר בחירת יעד יהיה סינון בעמודים - מסלולים והמלצות
          </Text>
          {/* <Text>{JSON.stringify(CotextDestination)}</Text> */}
          <View style={styles.scrollViewWrapper}>
            {/* <ScrollView> */}
            <FlatList
              data={destinations.filter(
                (d) => d.countryId === selectedCountry?.countryId
              )}
              keyExtractor={(item) => item.destinationCode.toString()}
              renderItem={({ item }) => (
                <Button
                  onPress={() => {
                    setCotextDestination(item);
                    setSelectedDestination(item);
                  }}
                  title={item.description}
                />
              )}
            />
            {/* </ScrollView> */}
          </View>
          <Button
            icon="wallet-travel"
            color="secondary"
            title={`${userAddMessage} פוסט חיפוש שותפ/ה לטיול ב`}
            onPress={() => {
              navigation.navigate(Routes.UPLOAD_POSTS_CREEN);
            }}
          />
          {selectedDestination && (
            <>
              <View style={styles.divider} />
              <Button
                icon="thumb-up-outline"
                color="white"
                title={`${userAddMessage} המלצה על ${selectedDestination.description}`}
                onPress={() => navigation.navigate(Routes.UPLOAD_RECOMMENDATION_SCREEN)}
              />
              <Button
                icon="go-kart-track"
                color="dark"
                title={`${userAddMessage} מסלול ב${selectedDestination.description}`}
                onPress={() => navigation.navigate(Routes.UPLOAD_TRACK_SCREEN)}
              />
            </>
          )}
        </Screen>
      </Swiper>
      <AppActivityIndicator visible={isLoading} />
    </>
  );
};

export default DestinationSelectionScreen;

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: colors.primary,
    width: 22,
    height: 12,
    borderRadius: 6,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  container: {
    backgroundColor: colors.cream,
    flex: 1,
    alignItems: "center",
  },
  countryScreen: { backgroundColor: "#cdcdcd" },
  destinationScreen: {},
  divider: {
    height: 3,
    width: "95%",
    backgroundColor: colors.medium,
    borderRadius: 3,
  },
  helpMessage: { alignSelf: "center", fontSize: 13, marginBottom: 3 },
  scrollViewWrapper: { width: "70%", height: "50%" },
  logo: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").width,
  },
});
