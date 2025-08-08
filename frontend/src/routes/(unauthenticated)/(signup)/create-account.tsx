import { Box, Button, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import styles from "../index.module.css";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { isEmailValid } from "../../../utils/validateEmail";
import { FcWorkflow } from "react-icons/fc";
import { InputComponent } from "../../../components/Input/Input";
import { Footer } from "../../../components/Input/Footer/Footer";

interface LoginObject {
  email: string;
  password: string;
  repeatPassword: string;
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
  });
  const [error, setError] = useState<ErrorObject>({
    emailError: "",
    passwordError: "",
  });
  const formSubmit = (e: FormEvent) => {
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

    // Validate email separately
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
        <Title order={1} className={styles.heading}>
          Enter an email address to create an account
        </Title>

        <Box
          component="form"
          className={styles.formBox}
          onSubmit={formSubmit}
          // bg={"blue"}
        >
          <InputComponent
            onChange={handleChange}
            value={login.email}
            name="email"
            placeholder="name@email.com"
            radius={"md"}
            w={"50%"}
            error={error.emailError}
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
            radius={"md"}
            w={"50%"}
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
            radius={"md"}
            w={"50%"}
            rootHeight="10%"
            wrapperHeight="100%"
            inputHeight="100%"
          />
          <Button
            w={"50%"}
            type="submit"
            disabled={!!error.emailError || !!error.passwordError}
            className={styles.loginButton}
          >
            Sign up
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
