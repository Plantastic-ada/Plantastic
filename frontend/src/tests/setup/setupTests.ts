import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "../../mocks/server";
import "@testing-library/jest-dom";
import { tokenStorage } from "../../mocks/handlers/authHandlers";

const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args: any[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("React Router Future Flag Warning")
    ) {
      return;
    }
    originalWarn(...args);
  };

  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  server.resetHandlers();
  tokenStorage.reset();
});

afterAll(() => {
  console.warn = originalWarn;
  server.close();
});
