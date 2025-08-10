import { Box, Button, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import styles from "../index.module.css";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { isEmailValid } from "../../../utils/validateEmail";
import { FcWorkflow } from "react-icons/fc";
import { InputComponent } from "../../../components/Input/Input";
import { Footer } from "../../../components/Input/Footer/Footer";
import { signUp } from "aws-amplify/auth";

interface LoginObject {
  email: string;
  password: string;
  repeatPassword: string;
  fullname: string;
}

interface ErrorObject {
  passwordError: string | undefined;
  emailError: string | undefined;
}

export const Route = createFileRoute(
  "/(unauthenticated)/(signup)/create-account"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [login, setLogin] = useState<LoginObject>({
    email: "",
    password: "",
    repeatPassword: "",
    fullname: "",
  });
  const [error, setError] = useState<ErrorObject>({
    emailError: "",
    passwordError: "",
  });
  const [nextAction, setNextAction] = useState<string | undefined>("");

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = isEmailValid(login.email);
    if (!result.isValid) {
      setError((oldError) => ({
        ...oldError,
        emailError: result.message,
      }));
    } else {
      setError((oldError) => ({
        ...oldError,
        emailError: undefined,
      }));
    }

    if (!error.emailError && !error.passwordError) {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setLogin((old) => {
      const nextLogin = { ...old, [name]: value };
      if (nextLogin.password && nextLogin.repeatPassword) {
        if (nextLogin.password !== nextLogin.repeatPassword) {
          setError((oldError) => ({
            ...oldError,
            passwordError: "Passwords do not match",
          }));
        } else {
          setError((oldError) => ({
            ...oldError,
            passwordError: undefined,
          }));
        }
      } else {
        setError((oldError) => ({
          ...oldError,
          passwordError: undefined,
        }));
      }

      return nextLogin;
    });

    if (name === "email") {
      const result = isEmailValid(value);
      if (result.isValid) {
        setError((oldError) => ({
          ...oldError,
          emailError: undefined,
        }));
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
          // If nextAction is set, show verification message
          <Title order={2} className={styles.heading}>
            {nextAction}
          </Title>
        ) : (
          // Else show the form
          <>
            <Title order={1} className={styles.heading}>
              Enter an email address to create an account
            </Title>

            <Box
              component="form"
              className={styles.formBox}
              onSubmit={formSubmit}
            >
              <InputComponent
                onChange={handleChange}
                value={login.email}
                name="email"
                placeholder="name@email.com"
                radius="md"
                w="50%"
                error={error.emailError}
                rootHeight="10%"
                wrapperHeight="100%"
                inputHeight="100%"
              />
              <InputComponent
                onChange={handleChange}
                value={login.fullname}
                name="fullname"
                placeholder="John Doe"
                radius="md"
                w="50%"
                rootHeight="10%"
                wrapperHeight="100%"
                inputHeight="100%"
              />
              <InputComponent
                onChange={handleChange}
                value={login.password}
                name="password"
                type="password"
                placeholder="********"
                radius="md"
                w="50%"
                rootHeight="10%"
                wrapperHeight="100%"
                inputHeight="100%"
              />
              <InputComponent
                onChange={handleChange}
                value={login.repeatPassword}
                name="repeatPassword"
                type="password"
                error={error.passwordError}
                placeholder="********"
                radius="md"
                w="50%"
                rootHeight="10%"
                wrapperHeight="100%"
                inputHeight="100%"
              />
              <Button
                w="50%"
                type="submit"
                disabled={!!error.emailError || !!error.passwordError}
                className={styles.loginButton}
              >
                Sign up
              </Button>
            </Box>
          </>
        )}
      </Box>

      <Footer />
    </Box>
  );
}
