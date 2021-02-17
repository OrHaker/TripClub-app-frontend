import React from "react";

const TripClubContext = React.createContext({});

function TripClubProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [destination, setDestination] = React.useState(null);
  const [country, setCountry] = React.useState(null);

  const value = { user, setUser, destination, setDestination, country, setCountry };

  return <TripClubContext.Provider value={value}>{children}</TripClubContext.Provider>;
}
const TripClubConsumer = TripClubContext.Consumer;
export { TripClubProvider, TripClubConsumer, TripClubContext };
