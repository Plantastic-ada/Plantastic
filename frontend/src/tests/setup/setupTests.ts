import { afterAll, afterEach, beforeEach } from "vitest";
import { server } from "../../mocks/server";
import "@testing-library/jest-dom";

beforeEach(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
