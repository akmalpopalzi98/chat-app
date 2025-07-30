import { Box, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { FcWorkflow } from "react-icons/fc";

export const Route = createFileRoute("/(unauthenticated)/")({
  component: WelcomeComponent,
});

function WelcomeComponent() {
  return (
    <Box
      style={{
        display: "flex",
        backgroundColor: "blue",
        flexDirection: "column",
        minHeight: "100%",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 0px 40px",
          width: "100%",
          backgroundColor: "brown",
        }}
      >
        <FcWorkflow size={80} />
        <Title order={2}>slack</Title>
      </Box>
      <Box
        style={{
          backgroundColor: "green",
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Title style={{ textAlign: "center" }}>
          Enter your email address and password to sign in
        </Title>
        <Box component="form" style={{ backgroundColor: "aqua" }}>
          laskdjalsjdlaks
        </Box>
      </Box>
    </Box>
  );
}
