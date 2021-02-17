import { PostsControllerURLS } from "../utility/urls";

export const getAllPosts = async () => {
  const value = await fetch(PostsControllerURLS.GetAllPostOfPartners)
    .then((res) => {
      if (res.status == 200) return res.json();
      return null;
    })
    .catch((ex) => {
      console.error("getAllPosts ex", ex);
      return null;
    });
  return value;
};

export const getAllPostsByUserId = async (id) => {
  const value = await fetch(PostsControllerURLS.PostsOfPartnersByUserId + id)
    .then((res) => {
      if (res.status == 200) return res.json();
      return null;
    })
    .catch((ex) => {
      console.error("getAllPostsByUserId ex", ex);
      return null;
    });
  return value;
};

export const insertNewPost = async (post) => {
  const req = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(post),
  };

  const value = await fetch(PostsControllerURLS.InsertNewPost, req)
    .then((res) => {
      if (res.status === 201) return res.json();
      return null;
    })
    .catch((ex) => {
      console.error("insertNewPost ex", ex);
      return null;
    });
  return value;
};

export const updatePost = async (post) => {
  const reqBody = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(post),
  };
  const value = await fetch(PostsControllerURLS.UpdatePost, reqBody).then((res) => {
    if (res.status === 200) return res.json();
    else return null;
  });
  return value;
};

export const deletePost = async (postId) => {
  const value = await fetch(PostsControllerURLS.DeletePost + postId, {
    method: "DELETE",
  }).then((res) => {
    if (res.status === 200) return res.json();
    else return null;
  });
  return value;
};
