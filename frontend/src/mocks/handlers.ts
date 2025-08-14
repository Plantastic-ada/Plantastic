import { loginHandlers, logoutHandlers, signupHandlers } from "./handlers/authHandlers";
import { tokenHandlers } from "./handlers/tokenHandlers";

export const handlers = [
  ...loginHandlers,
  ...logoutHandlers, 
  ...signupHandlers,
  ...tokenHandlers,
]