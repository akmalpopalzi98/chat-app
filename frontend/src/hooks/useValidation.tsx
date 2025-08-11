import { useState, type FormEvent } from "react";
import {
  validateFormData,
  type ValidationError,
} from "../utils/validateFormData";
import { signUp } from "aws-amplify/auth";

interface LoginObject {
  email: string;
  password: string;
  repeatPassword: string;
  fullname: string;
}

export const useValidation = () => {
  const [login, setLogin] = useState<LoginObject>({
    email: "",
    password: "",
    repeatPassword: "",
    fullname: "",
  });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [nextAction, setNextAction] = useState<string | undefined>("");

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationData = validateFormData(e);
    if (!validationData.isValid) {
      validationData.errors?.forEach(
        ({ errorType, message }: ValidationError) => {
          switch (errorType) {
            case "email":
              setEmailError(message);
              break;
            case "fullname":
              setNameError(message);
              break;
            case "password":
              setPasswordError(message);
          }
        }
      );
      return;
    }
    if (!emailError && !passwordError) {
      const { nextStep } = await signUp({
        username: login.email,
        password: login.password,
        options: {
          userAttributes: {
            name: login.fullname,
          },
        },
      });
      if (nextStep.signUpStep == "CONFIRM_SIGN_UP")
        setNextAction(
          "Please verify your account via the link send to your email"
        );
    }
  };

  return {
    emailError,
    setEmailError,
    login,
    setLogin,
    passwordError,
    setPasswordError,
    nextAction,
    setNextAction,
    formSubmit,
    nameError,
    setNameError,
  };
};
