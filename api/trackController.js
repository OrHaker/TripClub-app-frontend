import { TracksControllerURLS } from "../utility/urls";

export const getAllTracks = async () => {
  const value = await fetch(TracksControllerURLS.GetAllFullTracks)
    .then((res) => {
      if (res.status == 200) return res.json();
      return null;
    })
    .catch((ex) => {
      console.error("getAllTracks ex", ex);
      return null;
    });
  return value;
};

export const getAllTracksByUser = async (userId) => {
  const value = await fetch(TracksControllerURLS.GetAllFullTracksByUser + userId)
    .then((res) => {
      if (res.status == 200) return res.json();
      return null;
    })
    .catch((ex) => {
      console.error("getAllTracksByUser ex", ex);
      return null;
    });
  return value;
};

export const getAllTracksLocationsData = async () => {
  const value = await fetch(TracksControllerURLS.GetAllTracksLocationsData)
    .then((res) => {
      if (res.status == 200) return res.json();
      return null;
    })
    .catch((ex) => {
      console.error("getAllTracksLocationsData ex", ex);
      return null;
    });
  return value;
};

export const getTrackById = async (id) => {
  const value = await fetch(TracksControllerURLS.GetTrackById + id)
    .then((res) => {
      if (res.status == 200) return res.json();
      return null;
    })
    .catch((ex) => {
      console.error("getTrackById ex", ex);
      return null;
    });
  return value;
};

export const getAllFullTracksByDestination = async (id) => {
  const value = await fetch(TracksControllerURLS.GetAllFullTracksByDestination + id)
    .then((res) => {
      if (res.status == 200) return res.json();
      return null;
    })
    .catch((ex) => {
      console.error("getAllFullTracksByDestination ex", ex);
      return null;
    });
  return value;
};

export const insertNewTrack = async (track) => {
  const req = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(track),
  };
  const value = await fetch(TracksControllerURLS.InsertNewTrack, req)
    .then((res) => {
      if (res.status === 201) return res.json();
      return null;
    })
    .catch((ex) => {
      console.error("insertNewTrack ex", ex);
      return null;
    });
  return value;
};

export const updateTrack = async (track) => {
  const reqBody = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(track),
  };
  const value = await fetch(TracksControllerURLS.UpdateTrack, reqBody).then((res) => {
    if (res.status === 200) return res.json();
    else return null;
  });
  return value;
};

export const deleteTrack = async (trackId) => {
  const value = await fetch(TracksControllerURLS.DeleteTrack + trackId, {
    method: "DELETE",
  }).then((res) => {
    if (res.status === 200) return res.json();
    else return null;
  });
  return value;
};
