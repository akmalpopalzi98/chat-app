import { Box, Text } from "@mantine/core";

export const Footer = () => {
  return (
    <Box
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
