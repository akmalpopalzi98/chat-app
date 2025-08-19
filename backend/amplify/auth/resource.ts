import { defineAuth } from "@aws-amplify/backend";
import { postConfirmation } from "./post-confirmation/resource";

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    fullname: {
      required: true,
    },
  },
  triggers: {
    postConfirmation: postConfirmation,
  },
  name: "ChatAppUserPool",
});
