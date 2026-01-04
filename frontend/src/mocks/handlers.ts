import {
  loginHandlers,
  logoutHandlers,
  signupHandlers,
  authStatusHandlers,
  gardenHandlers,
} from "./handlers/authHandlers";

export const handlers = [
  ...loginHandlers,
  ...logoutHandlers,
  ...signupHandlers,
  ...authStatusHandlers,
  ...gardenHandlers,
];
