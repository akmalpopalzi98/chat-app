import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { User } from "./schemas/users";
import { postConfirmation } from "../auth/post-confirmation/resource";

const schema = a
  .schema({
    User,
  })
  .authorization((a) => [a.resource(postConfirmation)]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
