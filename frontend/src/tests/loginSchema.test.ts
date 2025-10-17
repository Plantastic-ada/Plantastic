import { describe, expect, it } from "vitest";
import { mockUser } from "../mocks/mockUser";
import { loginSchema } from "../schemas/loginSchema";

describe("Login schema validation", () => {
  it("successfull login with correct credentials", async () => {
    const credentials = {
      pseudoOrEmail: mockUser.email,
      password: mockUser.password,
    };

    const result = loginSchema.safeParse(credentials);
    expect(result.success).toBe(true);
  });
});
