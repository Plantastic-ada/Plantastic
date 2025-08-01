import { http, HttpResponse } from "msw";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { signUpSchema, type SignUpFormData } from "../schemas/signUpSchema";
import { sanitizeUser } from "../utils/sanitize";
import { type User } from "../types/User";
import { mockUser } from "./mockUser";

let sessionToken: string | null = null;

export const handlers = [
  
  // Mocks login with email or password
  http.post<never, LoginFormData>("/api/auth/login", async ({ request }) => {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    // console.debug("🧪 Body reçu:", body);
    // console.debug("✅ Zod result:", result);

    if (!result.success) {
      return HttpResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const { pseudoOrEmail, password } = result.data;

    const isEmail = pseudoOrEmail.includes("@");

    const isValidLogin =
      password === mockUser.password &&
      ((!isEmail && pseudoOrEmail === mockUser.pseudo) ||
        (isEmail && pseudoOrEmail === mockUser.email));

    if (isValidLogin) {
      sessionToken = "faketoken123";
      return HttpResponse.json(
        sanitizeUser({
          id: 1,
          pseudo: "toto",
          email: "toto@yopmail.fr",
          password: "User1234!",
        }),
        {
          status: 200,
          headers: {
            "Set-Cookie":
              "token=faketoken123; HttpOnly; Secure; SameSite=Strict",
          },
        }
      );
    }
    console.debug("isValidLogin:", isValidLogin);
    console.debug("➡️ sending user:", sanitizeUser(mockUser));
    return HttpResponse.json(
      { message: "Invalid pseudo or password" },
      { status: 401 }
    );
  }),


  // Mocks sign up
  http.post<never, SignUpFormData>("/api/auth/signup", async ({ request }) => {
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
  }),


  // Mocks JWT session with Http Only
  http.get("/api/auth/me", () => {
    if (sessionToken === "faketoken123") {
      return HttpResponse.json(
        {
          pseudo: "toto",
          email: "toto@yopmail.fr",
        },
        {
          status: 200,
          headers: {
            "Set-Cookie":
              "token=faketoken123 ; HttpOnly; Secure; SameSite=Strict",
          },
        }
      );
    }
    return HttpResponse.json({ message: "Invalid token" }, { status: 401 });
  }),


  // Mocks logout
  http.post("/api/auth/logout", () => {
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
  }),
];
