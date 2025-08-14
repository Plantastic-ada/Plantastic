import { describe, expect, it } from "vitest";
import { mockUser } from "../mocks/mockUser"

describe("LoginSchema validation", () => {
  it("logs successfully with correct credentials with MSW", async () => {
    const result = await ({
      email: mockUser.email,
      password: mockUser.password,
    });

  })
  });
