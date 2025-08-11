export const isEmailValid = (
  email: string | undefined
): { isValid: boolean; message: string | null } => {
  if (!email)
    return {
      isValid: false,
      message: "Please enter your email",
    };
  const allowedDomains = [
    "yahoo.com",
    "gmail.com",
    "outlook.com",
    "hotmail.com",
  ];

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return {
      isValid: false,
      message: "Invalid email format",
    };
  }

  const domain = email.split("@")[1];
  if (!allowedDomains.includes(domain)) {
    return {
      isValid: false,
      message: "Email domain not supported",
    };
  }

  return { isValid: true, message: null };
};
