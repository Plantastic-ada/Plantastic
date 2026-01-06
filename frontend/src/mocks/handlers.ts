import { createAuthHandlers } from "./handlers/authHandlers";
import { createPlantHandlers } from "./handlers/plantHandlers";
// import { API_BASE_URL } from "./config/constants";

// const API_BASE_URL = "http://localhost:8080";

export const handlers = [...createAuthHandlers(), ...createPlantHandlers()];
