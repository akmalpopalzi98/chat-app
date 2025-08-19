import { useEffect, useState, type FormEvent } from "react";
import {
  validateFormData,
  type ValidationError,
} from "../utils/validateFormData";
import { confirmSignUp, signUp } from "aws-amplify/auth";

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
  const [nextAction, setNextAction] = useState<string | null>(null);
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  useEffect(() => {
    if (signUpError) {
      const timer = setTimeout(() => {
        setSignUpError(null);
      }, 2000);

      // Clean up existing timer before creating a new one
      return () => clearTimeout(timer);
    }
  }, [signUpError]);

  const handleVerificationSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const {} = await confirmSignUp({
        username: login.email,
        confirmationCode: verificationCode,
      });
      setConfirmMessage("Account verified successfully!");
      // Reset states
      // setNextAction(null);
      // setVerificationCode("");
      // setLogin({
      //   email: "",
      //   password: "",
      //   repeatPassword: "",
      //   fullname: "",
      // });
    } catch (err) {
      setSignUpError(
        err instanceof Error ? err.message : `Verification failed: ${err}`
      );
    }
  };
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
    if (validationData.isValid) {
      try {
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
            "A code has been sent to the email. Please enter the code to verify your email"
          );
      } catch (err) {
        if (err instanceof Error) {
          setSignUpError(err.message);
        } else setSignUpError(`Unknown Error: ${err}`);
      }
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
    signUpError,
    verificationCode,
    setVerificationCode,
    confirmMessage,
    setConfirmMessage,
    handleVerificationSubmit,
  };
};
