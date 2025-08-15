import { http, HttpResponse } from "msw";
import { mockUser } from "../mockUser";
import { loginSchema } from "../../schemas/loginSchema";
import { signUpSchema } from "../../schemas/signUpSchema";
import type { User } from "../../types/User";
import { sanitizeUser } from "../../utils/sanitize";
import { z } from "zod";


// let sessionToken: string | null = null;

export const loginHandlers = [http.post("/api/auth/login", async ({ request }) => {
    const body = await request.json();
    const result = loginSchema.safeParse(body);
    
    
    if (!result.success) {
      return HttpResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const { pseudoOrEmail, password } = result.data;
    const isEmail = z.email().safeParse(pseudoOrEmail).success;

    const isValidLogin =
      password === mockUser.password &&
      ((!isEmail && pseudoOrEmail === mockUser.pseudo) ||
        (isEmail && pseudoOrEmail === mockUser.email));

    if (isValidLogin) {
      const sessionToken = "faketoken123"
      return HttpResponse.json(
        sanitizeUser({
          id: 1,
          pseudo: mockUser.pseudo,
          email: mockUser.email,
          password: mockUser.password,
        }),
        {
          status: 200,
          headers: {
            "Set-Cookie":
              `token=${sessionToken}; HttpOnly; Secure; SameSite=Strict`,
          },
        }
      );
    }

    return HttpResponse.json(
      { message: "Invalid pseudo or password" },
      { status: 401 }
    );
  })];

export const signupHandlers = [http.post("/api/auth/signup", async ({ request }) => {
    const authToken = request.headers.get("Authorization");
    if (!authToken)
      return HttpResponse.json({ msg: "Not Authorized" }, { status: 401 });

    const requestBody = await request.json();
    const result = signUpSchema.safeParse(requestBody);
    console.debug("body: ", result);

    if (!result.success) {
      return HttpResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const parsed = result.data;
    const newUser: User = {
      id: 2,
      ...parsed,
    };

    console.debug("User créé :", newUser);

    return HttpResponse.json([newUser], { status: 201 });
  })];

export const logoutHandlers = [http.post("/api/auth/logout", () => {
    return HttpResponse.json(
      { message: "Logged out" },
      {
        status: 200,
        headers: {
          "Set-Cookie":
            "token=; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
        },
      }
    );
  })];