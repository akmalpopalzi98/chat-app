import { Box, Button, Title, Text } from "@mantine/core";
import { InputComponent } from "../Input/Input";
import styles from "./verifyform.module.css";
import { useNavigate } from "@tanstack/react-router";
import { resendSignUpCode } from "aws-amplify/auth";
import { useEffect, useState } from "react";

interface VerifyFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  nextAction: string;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  confirmMessage: string;
  signUpError: string | null;
  email: string;
}

export const VerifyForm = (props: VerifyFormProps) => {
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  useEffect(() => {
    if (props.signUpError) {
      const timer = setTimeout(() => {
        setResendMessage(null);
      }, 2000);

      // Clean up existing timer before creating a new one
      return () => clearTimeout(timer);
    }
  }, [props.signUpError]);
  const navigate = useNavigate();
  return (
    <Box
      component="form"
      onSubmit={props.onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Title order={2} className={styles.heading}>
        {props.nextAction}
      </Title>
      <InputComponent
        name="code"
        value={props.verificationCode}
        onChange={(e) => props.setVerificationCode(e.target.value)}
        placeholder="Enter verification code"
        radius="md"
        w="50%"
      />
      <Button w="50%" type="submit" className={styles.loginButton}>
        Submit code
      </Button>
      <Button
        w="50%"
        type="submit"
        className={styles.loginButton}
        onClick={() => {
          resendSignUpCode({ username: props.email });
          setResendMessage("A new code has been sent to your email.");
        }}
      >
        Resend code
      </Button>
      {props.confirmMessage && !props.signUpError && (
        <Box>
          <Text c="green" mt={10}>
            {props.confirmMessage}
          </Text>
          <Button
            w={"100%"}
            className={styles.loginButton}
            onClick={() => {
              navigate({
                to: "/",
              });
            }}
          >
            Back to log in
          </Button>
        </Box>
      )}
      {resendMessage && (
        <Text c="green" mt={10}>
          {resendMessage}
        </Text>
      )}
      {props.signUpError && (
        <Text c="red" mt={10}>
          {props.signUpError}
        </Text>
      )}
      {props.signUpError && (
        <Text c="red" mt={10}>
          {props.signUpError}
        </Text>
      )}
    </Box>
  );
};
