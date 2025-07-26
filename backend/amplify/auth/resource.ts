import { defineAuth } from "@aws-amplify/backend";

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
  triggers: {},
  name: "ChatAppUserPool",
});
