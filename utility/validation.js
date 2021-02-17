export const isEmail = (email) => {
  const regEx = /^[a-zA-Z0-9._$!%^]{3,}@{1}[a-zA-Z]{2,20}[.]{1,}[a-zA-Z]{2,10}$/;
  return email.match(regEx);
};

export const isPassword = (password) => {
  try {
    const localPassword = password.trim();
    return localPassword.length > 4 && localPassword.length < 25;
  } catch (error) {
    console.log(error);
  }
};

//check if data is empty func
export const isEmpty = (string) => {
  return string.trim() === "";
};
