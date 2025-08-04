import { Box, Text } from "@mantine/core";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <Box
      bg={"red"}
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      <Text>Privacy and terms</Text>
      <Text>Contact us</Text>
    </Box>
  );
};
