import { a } from "@aws-amplify/backend";

export const User = a
  .model({
    cognitoId: a.string().required(),
    email: a.string().required(),
    name: a.string().required(),
  })
  .identifier(["cognitoId"])
  .authorization((a) => [a.authenticated()]);
