import { Box, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { FcWorkflow } from "react-icons/fc";
import { InputComponent } from "../../components/Input/Input";
import styles from "./index.module.css";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { validateEmail } from "../../utils/validateEmail";

export const Route = createFileRoute("/(unauthenticated)/")({
  component: WelcomeComponent,
});

function WelcomeComponent() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    validateEmail(email);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.headerBox}>
        <FcWorkflow size={80} />
        <Title order={2}>slack</Title>
      </Box>

      <Box className={styles.formWrapper}>
        <Title order={1} className={styles.heading}>
          Enter your email address and password to sign in
        </Title>

        <Box component="form" className={styles.formBox} onSubmit={formSubmit}>
          <InputComponent
            onChange={handleChange}
            name="email"
            placeholder="name@email.com"
            radius={"md"}
            w={"40%"}
          />
        </Box>
      </Box>
    </Box>
  );
}
