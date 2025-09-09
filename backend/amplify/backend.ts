import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { WebHostingStack } from "./hosting/resource";

const backend = defineBackend({
  auth,
  data,
});

export type Backend = typeof backend;

const hostingBucket = new WebHostingStack(backend, "HostingStack", {});
