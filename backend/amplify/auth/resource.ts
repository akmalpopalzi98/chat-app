import { defineAuth } from "@aws-amplify/backend";
import { postConfirmation } from "./post-confirmation/resource";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "LINK",
      verificationEmailSubject: "Welcome! Please activate your account",
      verificationEmailBody(createLink) {
        return `Use this code to activate your account => ${createLink()}`;
      },
    },
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
