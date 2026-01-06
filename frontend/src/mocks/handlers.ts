import { createAuthHandlers } from "./handlers/authHandlers";
import { createPlantHandlers } from "./handlers/plantHandlers";
import { API_BASE_URL } from "./config/constants";

export const handlers = [
  ...createAuthHandlers(API_BASE_URL),
  ...createPlantHandlers(API_BASE_URL),
];
