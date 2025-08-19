import { Box, Button, Title, Text } from "@mantine/core";
import { InputComponent } from "../Input/Input";
import styles from "./signup.module.css";

interface SignUpFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  signUpError: string | null;
  emailError: string | null;
  nameError: string | null;
  passwordError: string | null;
  login: {
    email: string;
    fullname: string;
    password: string;
    repeatPassword: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SignUpForm = (props: SignUpFormProps) => {
  return (
    <>
      <Title order={1} className={styles.heading}>
        Enter an email address to create an account
      </Title>
      <Box
        component="form"
        className={styles.formBox}
        onSubmit={props.onSubmit}
      >
        <InputComponent
          onChange={props.handleChange}
          value={props.login.email}
          name="email"
          placeholder="name@email.com"
          radius="md"
          w="50%"
          error={props.emailError}
          rootHeight="10%"
          wrapperHeight="70%"
          inputHeight="80%"
        />
        <InputComponent
          onChange={props.handleChange}
          value={props.login.fullname}
          error={props.nameError}
          name="fullname"
          placeholder="John Doe"
          radius="md"
          w="50%"
          rootHeight="10%"
          wrapperHeight="70%"
          inputHeight="80%"
        />
        <InputComponent
          onChange={props.handleChange}
          value={props.login.password}
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
          onChange={props.handleChange}
          value={props.login.repeatPassword}
          name="repeatPassword"
          type="password"
          error={props.passwordError}
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
          disabled={
            !!props.emailError || !!props.passwordError || !!props.nameError
          }
          className={styles.loginButton}
        >
          Sign up
        </Button>
        {props.signUpError && (
          <Text mt={10} c={"red"}>
            {props.signUpError}
          </Text>
        )}
      </Box>
    </>
  );
};
