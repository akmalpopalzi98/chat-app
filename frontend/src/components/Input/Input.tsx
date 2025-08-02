import { TextInput, type TextInputProps } from "@mantine/core";
import styles from "./input.module.css";

export const InputComponent = (props: TextInputProps) => {
  return <TextInput {...props} classNames={styles} />;
};
