import React from "react";
import { FlatList, Animated, StyleSheet } from "react-native";
import { TripClubContext } from "../context";

import Screen from "./../components/Screen";
import AppActivityIndicator from "../components/AppActivityIndicator";
import RecommendationCard from "./../components/RecommendationCard";
import Text from "../components/AppText";

import {
  getAllFullRecommendationsById,
  getAllRecommendations,
} from "./../api/recommendationController";
import Header from "../components/Header";

const RecommendationFeed = () => {
  const { destination } = React.useContext(TripClubContext);

  const [recommendations, setRecommendations] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const renderItem = ({ item }) => <RecommendationCard fetchApi={fetchApi} {...item} />;

  async function fetchApi() {
    setIsLoading(true);
    let localRecommendations = null;
    if (!destination) {
      localRecommendations = await getAllRecommendations();
      setRecommendations(localRecommendations);
    } else {
      const { countryId, description } = destination;
      localRecommendations = await getAllFullRecommendationsById(countryId);
      setRecommendations(
        localRecommendations.filter((d) => d.destinationName === description)
      );
    }

    setIsLoading(false);
  }

  React.useEffect(() => {
    fetchApi();
  }, [destination]);

  const destinationMessage = `המלצות ב ${
    destination ? destination.description : "כל היעדים"
  }`;

  return (
    <>
      <Screen>
        <Header />
        <Text style={styles.destinationMessage}>{destinationMessage}</Text>
        {recommendations.length === 0 && (
          <Text style={styles.emptyMessage}>{`אין לנו במאגר ${destinationMessage}`}</Text>
        )}
        <FlatList
          refreshing={isLoading}
          onRefresh={fetchApi}
          data={recommendations}
          keyExtractor={(reco) => reco.recoId.toString()}
          renderItem={renderItem}
          //onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)}
        />
      </Screen>
      <AppActivityIndicator visible={isLoading} />
    </>
  );
};

const styles = StyleSheet.create({
  destinationMessage: { alignSelf: "center" },
  emptyMessage: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
  },

  separator: {
    height: 1,
    backgroundColor: "#000",
    width: "100%",
  },
});

export default RecommendationFeed;
