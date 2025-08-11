import type { FormEvent } from "react";
import { isEmailValid } from "./validateEmail";

export interface ValidationError {
  errorType: "password" | "email" | "fullname";
  message: string | null;
}
interface ValidationOutput {
  isValid: boolean;
  errors: null | ValidationError[];
}

export const validateFormData = (e: FormEvent<HTMLFormElement>) => {
  let validationOutput: ValidationOutput = {
    isValid: true,
    errors: null,
  };

  const form = e.currentTarget;
  const email = form.email.value.trim();
  const fullname = form.fullname.value.trim();
  const password = form.password.value;
  const repeatPassword = form.repeatPassword.value;
  const emailValidation = isEmailValid(email);

  // Initialize error array only if needed
  const errors: ValidationError[] = [];

  // Email validations
  if (!email) {
    errors.push({
      errorType: "email",
      message: "Please enter your email address",
    });
  } else if (!emailValidation.isValid) {
    errors.push({
      errorType: "email",
      message: emailValidation.message,
    });
  }

  // Fullname validation
  if (!fullname) {
    errors.push({
      errorType: "fullname",
      message: "Please enter your full name",
    });
  }

  // Password validations
  if (!password) {
    errors.push({
      errorType: "password",
      message: "Please enter your password",
    });
  }

  if (!repeatPassword) {
    errors.push({
      errorType: "password",
      message: "Please confirm your password",
    });
  }

  // Password match check
  if (password && repeatPassword && password !== repeatPassword) {
    errors.push({
      errorType: "password",
      message: "Passwords do not match",
    });
  }

  // If any errors were found, update validationOutput accordingly
  if (errors.length > 0) {
    validationOutput.isValid = false;
    validationOutput.errors = errors;
  }

  return validationOutput;
};
