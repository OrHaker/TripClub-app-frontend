import React from "react";
import { FlatList } from "react-native";
import { TripClubContext } from "../context";

import AppActivityIndicator from "../components/AppActivityIndicator";
import Screen from "./../components/Screen";
import Text from "../components/AppText";
import TracksCard from "./../components/TracksCard";

import { getAllTracks } from "./../api/trackController";
import Header from "../components/Header";

const TracksFeed = () => {
  const [tracks, setTracks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const { destination, user } = React.useContext(TripClubContext);
  const renderItem = ({ item }) => (
    <TracksCard user={user} fetchApi={fetchApi} {...item} />
  );

  async function fetchApi() {
    setIsLoading(true);
    let localTracks = await getAllTracks();
    if (!destination) setTracks(localTracks);
    else
      setTracks(
        localTracks.filter((t) => t.trackLocations.includes(destination.description))
      );
    setIsLoading(false);
  }

  React.useEffect(() => {
    fetchApi();
  }, [destination]);

  const destinationMessage = `מסלולים ב ${
    destination ? destination.description : "כל היעדים"
  }`;

  return (
    <>
      <Screen>
        <Header />
        <Text style={{ alignSelf: "center" }}>{destinationMessage}</Text>
        <FlatList
          refreshing={isLoading}
          onRefresh={fetchApi}
          data={tracks}
          keyExtractor={(track) => track.trackCode.toString()}
          renderItem={renderItem}
        />
      </Screen>
      <AppActivityIndicator visible={isLoading} />
    </>
  );
};

export default TracksFeed;
