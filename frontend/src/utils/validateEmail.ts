export const validateEmail = (email: string) => {
  const domains = ["yahoo.com", "gmail.com", "outlook.com", "hotmail.com"];
  const parts = email.split("@");
  console.log(parts.length);

  return true;
};
