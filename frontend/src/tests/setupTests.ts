import { afterAll, afterEach, beforeEach } from "vitest";
import { server } from "../mocks/server";

beforeEach(() => server.listen({onUnhandledRequest: 'error'}));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());