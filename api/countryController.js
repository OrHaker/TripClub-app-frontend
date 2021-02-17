import { CountryControllerURLS } from "../utility/urls";

export const getAllCountries = async () => {
  const value = await fetch(CountryControllerURLS.GetAllCountries)
    .then((res) => {
      if (res.status == 200) return res.json();
      return null;
    })
    .catch((ex) => {
      console.error("getAllCountries ex", ex);
      return null;
    });
  return value;
};
