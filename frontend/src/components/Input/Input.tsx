import { TextInput, type TextInputProps } from "@mantine/core";
import styles from "./input.module.css";

interface CustomInputProps extends TextInputProps {
  wrapperHeight?: string;
  rootHeight?: string;
  inputHeight?: string;
}

export const InputComponent = ({
  wrapperHeight,
  rootHeight,
  inputHeight,
  ...props
}: CustomInputProps) => {
  return (
    <TextInput
      {...props}
      classNames={styles}
      styles={{
        root: {
          height: rootHeight,
        },
        wrapper: {
          height: wrapperHeight,
          margin: 0,
        },
        input: {
          height: inputHeight,
        },
      }}
    />
  );
};
