import { http, HttpResponse } from "msw";
import { z } from "zod";

export interface User {
  id: number;
  pseudo: string;
  email: string;
  password: string;
}

const UserSchema = z.object({
  pseudo: z.string().min(3),
  email: z.string().min(6),
  password: z.string(),
});

const LoginSchema = z.object({
  pseudoOrEmail: z.string().min(3),
  password: z.string(),
});

export const handlers = [
  // Mocks login with email or password
  http.post<never, User[]>("/api/auth/login", async ({ request }) => {
    const body = await request.json();
    const result = LoginSchema.safeParse(body);

    console.log("🧪 Body reçu:", body);
    console.log("✅ Zod result:", result);

    if (!result.success) {
      return HttpResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const { pseudoOrEmail, password } = result.data;

    const isEmail = pseudoOrEmail.includes("@")

    const isValidLogin = password === "User1234!" && 
    (!isEmail && pseudoOrEmail === 'toto' || isEmail && pseudoOrEmail === "toto@yopmail.fr")

    if (isValidLogin) {
      return HttpResponse.json({ token: "faketoken123" }, { status: 200 });
    }

    return HttpResponse.json(
      { message: "Invalid pseudo or password" },
      { status: 401 }
    );
  }
),

  // Mocks sign up
  http.post<never, User[]>("/api/auth/signup", async ({ request }) => {
    const authToken = request.headers.get("Authorization");
    if (!authToken)
      return HttpResponse.json({ msg: "Not Authorized" }, { status: 401 });

    const requestBody = await request.json();
    const result = UserSchema.safeParse(requestBody);
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

  // JWT
  http.get("/api/auth/me", ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (authHeader === "Bearer faketoken123") {
      return HttpResponse.json(
        {
          pseudo: "toto",
          email: "toto@yopmail.fr",
          password: "User1234!",
        },
        { status: 200 }
      );
    }
    return HttpResponse.json({ message: "Invalid token" }, { status: 401 });
  }),
];
