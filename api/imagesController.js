import { ImagesControllerURLS, PrefixProfileImageUrl } from "./../utility/urls";

export const recommendationImageUpload = async (base64, picName) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      base64string: base64,
      name: picName,
      path: "RecommendationImages",
    }),
  };

  const value = await fetch(ImagesControllerURLS.RecommendationImages, config)
    .then((res) => {
      if (res.status === 200) return res.json();
      else return null;
    })
    .catch((ex) => {
      alert("recommendationImageUpload ex" + ex);
    });
  return value;
};

export const postImageUpload = async (base64, picName) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      base64string: base64,
      name: picName,
      path: "PostsImages",
    }),
  };

  const value = await fetch(ImagesControllerURLS.PostsImages, config)
    .then((res) => {
      if (res.status === 200) return res.json();
      else return null;
    })
    .catch((ex) => {
      alert("postImageUpload ex" + ex);
    });
  return value;
};

export const profileImageUpload = async (base64, picName) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      base64string: base64,
      name: picName,
      path: "ProfileImages",
    }),
  };

  let value = await fetch(ImagesControllerURLS.PostsImages, config)
    .then((res) => {
      if (res.status === 200) return res.json();
      else return null;
    })
    .catch((ex) => {
      alert("postImageUpload ex" + ex);
    });
  if (value !== null) value = PrefixProfileImageUrl + picName + ".jpg";
  return value;
};
