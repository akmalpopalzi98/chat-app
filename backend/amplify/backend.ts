import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { webHostingBucket } from "./storage/resource";

const backend = defineBackend({
  auth,
  data,
  webHostingBucket,
});
