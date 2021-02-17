import { RecommendationControllerURLS } from "../utility/urls";

export const getAllRecommendations = async () => {
  const value = await fetch(RecommendationControllerURLS.GetAllFullRecommendations)
    .then((res) => {
      if (res.status == 200) return res.json();
      return null;
    })
    .catch((ex) => {
      console.log("getAllRecommendations ex", ex);
      return null;
    });
  return value;
};

export const getAllFullRecommendationsById = async (id) => {
  const value = await fetch(
    RecommendationControllerURLS.GetAllFullRecommendationsById + id
  )
    .then((res) => {
      if (res.status == 200) return res.json();
      return null;
    })
    .catch((ex) => {
      console.error("getAllFullRecommendationsById ex", ex);
      return null;
    });
  return value;
};

export const insertNewRecommendation = async (recommendation) => {
  const req = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(recommendation),
  };
  const value = await fetch(RecommendationControllerURLS.InsertNewRecommendation, req)
    .then((res) => {
      if (res.status === 201) return res.json();
      return null;
    })
    .catch((ex) => {
      console.error("insertNewRecommendation ex", ex);
      return null;
    });
  return value;
};

export const updateRecommendation = async (recommendation) => {
  const reqBody = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(recommendation),
  };
  const value = await fetch(
    RecommendationControllerURLS.UpdateRecommendation,
    reqBody
  ).then((res) => {
    if (res.status === 200) return res.json();
    else return null;
  });
  return value;
};

export const deleteRecommendation = async (recoId) => {
  const value = await fetch(RecommendationControllerURLS.DeleteRecommendation + recoId, {
    method: "DELETE",
  }).then((res) => {
    if (res.status === 200) return res.json();
    else return null;
  });
  return value;
};
