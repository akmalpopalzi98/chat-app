import { defineStorage } from "@aws-amplify/backend";

export const webHostingBucket = defineStorage({
  name: "webHostingBucket",
});
