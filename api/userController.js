import { UserControllerURLS } from "../utility/urls";

export const getAllUsers = async () => {
  const value = await fetch(UserControllerURLS.GetAllUsers)
    .then((res) => {
      if (res.status == 200) return res.json();
      return null;
    })
    .catch((ex) => {
      console.log("getAllUsers ex", ex);
      return null;
    });
  return value;
};

export const getUserById = async (id) => {
  const value = await fetch(UserControllerURLS.GetUserById + id)
    .then((res) => {
      if (res.status == 200) return res.json();
      return null;
    })
    .catch((ex) => {
      console.error("getUserById ex", ex);
      return null;
    });
  return value;
};

export const getUserByEmailAndPassword = async (email, password) => {
  const value = await fetch(
    UserControllerURLS.GetUserByEmailAndPassword + `?email=${email}&password=${password}`
  )
    .then((res) => {
      if (res.status == 200) return res.json();
      return null;
    })
    .catch((ex) => {
      console.error("getUserByEmailAndPassword ex", ex);
      return null;
    });
  return value;
};

export const insertNewUser = async (user) => {
  const req = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  };
  const value = await fetch(UserControllerURLS.InsertNewUser, req)
    .then((res) => {
      if (res.status === 201) return res.json();
      else if (res.status === 409) return "Conflict";
      return null;
    })
    .catch((ex) => {
      console.error("insertNewUser ex", ex);
      return null;
    });
  return value;
};

export const updateUser = async (user) => {
  const reqBody = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  };
  const value = await fetch(UserControllerURLS.UpdateUser, reqBody).then((res) => {
    if (res.status === 200) return res.json();
    else return null;
  });
  return value;
};

export const deleteUser = async (userId) => {
  const value = await fetch(UserControllerURLS.DeleteUser + userId, {
    method: "DELETE",
  }).then((res) => {
    if (res.status === 200) return res.json();
    else return null;
  });
  return value;
};
