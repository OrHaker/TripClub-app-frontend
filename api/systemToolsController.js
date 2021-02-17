const { PasswordResetRequest } = require("../utility/urls");

export const passwordResetRequest = async (email) => {
  const value = await fetch(PasswordResetRequest + email)
    .then((res) => {
      if (res.status == 200) return { status: 200, message: "email has been sent" };
      else if (res.status == 401) return "Email not found on system";
      return null;
    })
    .catch((ex) => {
      console.error("passwordResetRequest ex", ex);
      return null;
    });
  return value;
};
