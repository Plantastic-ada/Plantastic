import { http, HttpResponse } from "msw";

export const tokenHandlers =[ http.post("/api/auth/me", async ({ request }) => {
  const cookie = request.headers.get("cookie") || "";
  if (cookie.includes("token=faketoken123")) {
    return HttpResponse.json(
      {
        pseudo: "toto",
        email: "toto@yopmail.fr",
      },
      { status: 200 }
    );
  }
  return HttpResponse.json({ message: "Invalid token" }, { status: 401 });
})];
