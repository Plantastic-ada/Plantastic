import { it, describe, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Login from "../../services/Login";
import { AuthProvider } from "../../context/AuthContext";
import userEvent from "@testing-library/user-event";
import { server } from "../../mocks/server";
import { TEST_CONFIG } from "../../mocks/config";
import { http, HttpResponse } from "msw";

// CORRECT PAGE RENDERING TEST
describe("Login Page", () => {
  it("should render the login form"),
    () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </MemoryRouter>
      );
      expect(screen.getByText(/Login/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/Enter pseudo or email/i)
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/Enter password/i)
      ).toBeInTheDocument();
    };
});

// LOGIN SUCCESSFULL WITH EMAIL
it("should login successfully with email", async () => {
  const user = userEvent.setup();
  // 1. MOCK API LOGIN SUCCESS AND NAVIGATION
  server.use(
    http.post(`${TEST_CONFIG.API_BASE_URL}/api/auth/login`, () => {
      return HttpResponse.json({ success: true }, { status: 200 });
    }),
    http.get(`${TEST_CONFIG.API_BASE_URL}/api/me/my-digital-garden`, () => {
      return HttpResponse.json(
        {
          user: { id: 1, email: "test@example.com", role: "ROLE_USER" },
          digitalGarden: [],
        },
        { status: 200 }
      );
    })
  );
  // 2. COMPONENET RENDERING WITH initialEntries TO TRACK NAVIGATION
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
  // 3. FIL THE FORM WITH EMAIL
  const emailInput = screen.getByPlaceholderText(/Enter pseudo or email/i);
  const passwordInput = screen.getByPlaceholderText(/Enter password/i);

  await user.type(emailInput, "test@example.com");
  await user.type(passwordInput, "Password123!");

  //4. CLIC SIMULATION
  const submitButton = screen.getByRole("button", { name: /Login/i });
  await user.click(submitButton);

  // 5. VALIDATION AND HOME PAGE LANDING
  await waitFor(() => {
    expect(screen.queryByText(/Invalid credentials/i)).not.toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });
});

// LOGIN SUCCESSFULL WITH USERNAME
it("should login successfully with username", async () => {
  const user = userEvent.setup();
  // 1. MOCK API LOGIN SUCCESS AND NAVIGATION
  server.use(
    http.post(`${TEST_CONFIG.API_BASE_URL}/api/auth/login`, () => {
      return HttpResponse.json({ success: true }, { status: 200 });
    }),
    http.get(`${TEST_CONFIG.API_BASE_URL}/api/me/my-digital-garden`, () => {
      return HttpResponse.json(
        {
          user: {
            id: 1,
            username: "testuser",
            email: "test@example.com",
            role: "ROLE_USER",
          },
          digitalGarden: [],
        },
        { status: 200 }
      );
    })
  );
  // 2. COMPONENET RENDERING WITH initialEntries TO TRACK NAVIGATION
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
  // 3. FIL THE FORM WITH EMAIL
  const usernameInput = screen.getByPlaceholderText(/Enter pseudo or email/i);
  const passwordInput = screen.getByPlaceholderText(/Enter password/i);

  await user.type(usernameInput, "testuser");
  await user.type(passwordInput, "Password123!");

  //4. CLIC SIMULATION
  const submitButton = screen.getByRole("button", { name: /Login/i });
  await user.click(submitButton);

  // 5. VALIDATION AND HOME PAGE LANDING
  await waitFor(() => {
    expect(screen.queryByText(/Invalid credentials/i)).not.toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });
});
