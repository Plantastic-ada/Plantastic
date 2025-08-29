import {
  loginHandlers,
  logoutHandlers,
  signupHandlers,
  authStatusHandlers,
} from "./handlers/authHandlers";

export const handlers = [
  ...loginHandlers,
  ...logoutHandlers,
  ...signupHandlers,
  ...authStatusHandlers,
];
