import { DestinationControllerURLS } from "../utility/urls";

export const getAllDestinations = async () => {
  const value = await fetch(DestinationControllerURLS.GetAllDestinations)
    .then((res) => {
      if (res.status == 200) return res.json();
      return null;
    })
    .catch((ex) => {
      console.error("getAllDestinations ex", ex);
      return null;
    });
  return value;
};
