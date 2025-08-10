import "@mantine/core/styles.css";
import "./index.css";
import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { MantineProvider, createTheme } from "@mantine/core";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import outputs from "../../backend/amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs);

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const theme = createTheme({
  fontFamily: "Red Hat Text, sans-serif",
});

const App = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  useEffect(() => {
    console.log("auth status changed:", authStatus);
  }, [authStatus]);

  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Authenticator.Provider>
        <App />
      </Authenticator.Provider>
    </StrictMode>
  );
}
