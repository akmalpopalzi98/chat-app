import { Box, Button, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import styles from "../index.module.css";
import { type ChangeEvent } from "react";
import { isEmailValid } from "../../../utils/validateEmail";
import { FcWorkflow } from "react-icons/fc";
import { InputComponent } from "../../../components/Input/Input";
import { Footer } from "../../../components/Footer/Footer";
import { useValidation } from "../../../hooks/useValidation";

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
                error={emailError}
                rootHeight="10%"
                wrapperHeight="70%"
                inputHeight="80%"
              />
              <InputComponent
                onChange={handleChange}
                value={login.fullname}
                error={nameError}
                name="fullname"
                placeholder="John Doe"
                radius="md"
                w="50%"
                rootHeight="10%"
                wrapperHeight="70%"
                inputHeight="80%"
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
                wrapperHeight="70%"
                inputHeight="80%"
              />
              <InputComponent
                onChange={handleChange}
                value={login.repeatPassword}
                name="repeatPassword"
                type="password"
                error={passwordError}
                placeholder="********"
                radius="md"
                w="50%"
                rootHeight="10%"
                wrapperHeight="70%"
                inputHeight="80%"
              />
              <Button
                w="50%"
                mt={10}
                type="submit"
                disabled={!!emailError || !!passwordError}
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
