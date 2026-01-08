import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "../../mocks/server";
import "@testing-library/jest-dom";
import { tokenStorage } from "../../mocks/handlers/authHandlers";

Object.defineProperty(window, "location", {
  value: {
    href: "http://localhost:8080",
    origin: "http://localhost:8080",
  },
  writable: true,
});

const originalWarn = console.warn;

beforeAll(() => {
  console.warn = (...args: Parameters<typeof console.warn>) => {
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
