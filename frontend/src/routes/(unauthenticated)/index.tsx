import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(unauthenticated)/")({
  component: WelcomeComponent,
});

function WelcomeComponent() {
  return <div>About</div>;
}
