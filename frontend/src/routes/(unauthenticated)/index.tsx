import { Box, Title, Text, Anchor, Button } from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FcWorkflow } from "react-icons/fc";
import { InputComponent } from "../../components/Input/Input";
import styles from "./index.module.css";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { isEmailValid } from "../../utils/validateEmail";
import { Footer } from "../../components/Footer/Footer";

interface LoginObject {
  email: string;
  password: string;
}

export const Route = createFileRoute("/(unauthenticated)/")({
  component: WelcomeComponent,
});

function WelcomeComponent() {
  const [login, setLogin] = useState<LoginObject>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<null | string>(null);

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = isEmailValid(login.email);
    if (!result.isValid) setError(result.message);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setLogin((old) => ({
      ...old,
      [name]: e.target.value,
    }));
    if (name == "email") {
      const result = isEmailValid(e.target.value);
      if (result.isValid) setError(null);
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

        <Box className={styles.headerBox2}>
          <Text
            style={{
              fontSize: "small",
            }}
          >
            New to slack?
          </Text>
          <Anchor
            className={styles.anchor}
            component={Link}
            to="/create-account"
          >
            Create account
          </Anchor>
        </Box>
      </Box>

      <Box className={styles.formWrapper}>
        <Title order={1} className={styles.heading}>
          Enter your email address and password to sign in
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
            error={error}
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
            radius={"md"}
            w={"50%"}
            rootHeight="10%"
            wrapperHeight="70%"
            inputHeight="80%"
          />
          <Button
            w={"50%"}
            type="submit"
            disabled={!!error}
            className={styles.loginButton}
          >
            Sign in
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
