import { Box, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import styles from "../index.module.css";
import { type ChangeEvent } from "react";
import { isEmailValid } from "../../../utils/validateEmail";
import { FcWorkflow } from "react-icons/fc";
import { Footer } from "../../../components/Footer/Footer";
import { useValidation } from "../../../hooks/useValidation";
import { SignUpForm } from "../../../components/SignUpForm/SignUpForm";
import { VerifyForm } from "../../../components/VerifyForm/VerifyForm";

export const Route = createFileRoute(
  "/(unauthenticated)/(signup)/create-account"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    setLogin,
    setPasswordError,
    setEmailError,
    nameError,
    passwordError,
    emailError,
    nextAction,
    formSubmit,
    login,
    signUpError,
    setNameError,
    confirmMessage,
    setVerificationCode,
    verificationCode,
    handleVerificationSubmit,
  } = useValidation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setLogin((old) => {
      const nextLogin = { ...old, [name]: value };
      if (nextLogin.password && nextLogin.repeatPassword) {
        if (nextLogin.password !== nextLogin.repeatPassword) {
          setPasswordError("Passwords do not match");
        } else {
          setPasswordError(null);
        }
      } else {
        setPasswordError(null);
      }

      return nextLogin;
    });

    if (name == "fullname") {
      setNameError(value ? null : "Please enter your full name");
    }

    if (name === "email") {
      const result = isEmailValid(value);
      if (result.isValid) {
        setEmailError(null);
      }
    }
  };
  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.headerBox}>
        <Box></Box>
        <Box className={styles.headerBox1}>
          <FcWorkflow size={50} />
          <Title order={2}>slack</Title>
        </Box>
      </Box>

      <Box className={styles.formWrapper}>
        {nextAction ? (
          <VerifyForm
            onSubmit={handleVerificationSubmit}
            nextAction={nextAction}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            confirmMessage={confirmMessage}
            signUpError={signUpError}
            email={login.email}
          />
        ) : (
          <SignUpForm
            signUpError={signUpError}
            login={login}
            onSubmit={formSubmit}
            handleChange={handleChange}
            nameError={nameError}
            passwordError={passwordError}
            emailError={emailError}
          />
        )}
      </Box>
      <Footer />
    </Box>
  );
}
