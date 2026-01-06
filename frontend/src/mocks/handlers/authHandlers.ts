import { http, HttpResponse } from "msw";
import { mockUser } from "../mockUser";
import { loginSchema } from "../../schemas/loginSchema";
import { signUpSchema } from "../../schemas/signUpSchema";
import type { User } from "../../types/User";
import { sanitizeUser } from "../../utils/sanitize";
import { z } from "zod";

const BASE_URL = "http://localhost:8080";

const generateToken = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const tokenStorage = {
  token: null as string | null,
  setToken(token: string | null) {
    this.token = token;
    if (token) {
      document.cookie = `token=${token}; path=/; SameSite=Strict`;
    } else {
      document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  },
  getToken() {
    if (this.token) {
      return this.token;
    }
    const match = document.cookie.match(/token=([^;]+)/);
    if (match) {
      this.token = match[1];
      return this.token;
    }
    return null;
  },
  reset() {
    this.token = null;
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  },
};

export const createAuthHandlers = () => [
  // Login
  http.post(`${BASE_URL}/api/auth/login`, async ({ request }) => {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return HttpResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const { username, password } = result.data;
    const isEmail = z.email().safeParse(username).success;

    const isValidLogin =
      password === mockUser.password &&
      ((!isEmail && username === mockUser.username) ||
        (isEmail && username === mockUser.email));

    if (isValidLogin) {
      const newToken = generateToken();
      tokenStorage.setToken(newToken);

      return HttpResponse.json(
        sanitizeUser({
          id: 1,
          username: mockUser.username,
          email: mockUser.email,
          password: mockUser.password,
        }),
        {
          status: 200,
          headers: {
            "Set-Cookie": `token=${newToken}; path=/; SameSite=Strict`,
          },
        }
      );
    }

    return HttpResponse.json(
      { message: "Invalid pseudo or password" },
      { status: 401 }
    );
  }),

  // Signup
  http.post(`${BASE_URL}/api/auth/register`, async ({ request }) => {
    const requestBody = await request.json();
    const result = signUpSchema.safeParse(requestBody);

    if (!result.success) {
      return HttpResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const parsed = result.data;
    const newUser: User = {
      id: 2,
      ...parsed,
    };

    const newToken = generateToken();
    tokenStorage.setToken(newToken);

    return HttpResponse.json([newUser], { status: 201 });
  }),

  // Logout
  http.post(`${BASE_URL}/api/auth/logout`, () => {
    tokenStorage.setToken(null);

    return HttpResponse.json(
      { message: "Logged out" },
      {
        status: 200,
        headers: {
          "Set-Cookie": "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
        },
      }
    );
  }),

  // Auth status
  http.get(`${BASE_URL}/api/auth/me`, () => {
    const currentToken = tokenStorage.getToken();

    if (!currentToken) {
      return HttpResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    return HttpResponse.json(
      sanitizeUser({
        id: 1,
        username: mockUser.username,
        email: mockUser.email,
        password: mockUser.password,
      }),
      { status: 200 }
    );
  }),

  // Garden
  http.get(`${BASE_URL}/api/me/my-digital-garden`, () => {
    return HttpResponse.json(
      {
        email: null,
        digitalGarden: [],
      },
      { status: 401 }
    );
  }),
];
