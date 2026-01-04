import { describe, it, expect, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "../../../context/AuthContext";
import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";
import { TEST_CONFIG } from "../../../mocks/config";

function TestComponent() {
  const { isAuthenticated, isLoading, user } = useAuth();

  return (
    <div>
      <div>isAuthenticated: {String(isAuthenticated)}</div>
      <div>isLoading: {String(isLoading)}</div>
      <div>email: {user?.email || "null"}</div>
    </div>
  );
}

// GARDEN CONTEXT TEST
describe("AuthContext", () => {
  afterEach(() => {
    server.resetHandlers();
  });
  it("should have current initial state", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/isLoading: true/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/isLoading: false/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/isAuthenticated: false/i)).toBeInTheDocument();
    expect(screen.getByText(/email: null/i)).toBeInTheDocument();
  });
});

// LOGIN TEST
it("should update the context after successful login", async () => {
  // 1. COMPONENT CREATION AND refreshauth()
  function LoginTestComponent() {
    const { isAuthenticated, user, refreshAuth, isLoading } = useAuth();

    return (
      <div>
        <div>isAuthenticated: {String(isAuthenticated)} </div>
        <div>isLoading: {String(isLoading)} </div>
        <div>email: {user?.email || "null"} </div>
        <button onClick={refreshAuth}>Refresh</button>
      </div>
    );
  }
  // 2. COMPONENT RENDERING
  render(
    <MemoryRouter>
      <AuthProvider>
        <LoginTestComponent />
      </AuthProvider>
    </MemoryRouter>
  );
  // 3. DEFAULT HANDLER WTH UNCONNECTED USER
  await waitFor(() => {
    expect(screen.getByText(/isLoading: false/i)).toBeInTheDocument();
  });
  expect(screen.getByText(/isAuthenticated: false/i)).toBeInTheDocument();
  expect(screen.getByText(/email: null/i)).toBeInTheDocument();
  // 4. MOCK FOR CONNECTED USER
  server.use(
    http.get(`${TEST_CONFIG.API_BASE_URL}/api/me/my-digital-garden`, () => {
      return HttpResponse.json(
        {
          user: {
            id: 1,
            email: "test@example.com",
            role: "ROLE_USER",
          },
          digitalGarden: [
            {
              id: 1,
              nickname: "Ma plante test",
              commonName: "Pothos",
              lastWatering: "2026-01-01",
              nextWatering: "2026-01-11",
              plantImageUrl: "http://test.jpg",
              userPlantImageUrl: "http://test.jpg",
            },
          ],
        },
        { status: 200 }
      );
    })
  );
  // 5. LOGIN CLIC SIMULATION
  const refreshButton = screen.getByText("Refresh");
  refreshButton.click();
  // 6. LOADING + VERIFICATION
  await waitFor(() => {
    expect(screen.getByText(/isLoading: false/i)).toBeInTheDocument();
  });
  expect(screen.getByText(/isAuthenticated: true/i)).toBeInTheDocument();
  expect(screen.getByText(/email: test@example.com/i)).toBeInTheDocument();
});

// LOGOUT TEST
it("should update the context after successful logout", async () => {
  // 1. MOCK FOR CONNECTED USER
  server.use(
    http.get(`${TEST_CONFIG.API_BASE_URL}/api/me/my-digital-garden`, () => {
      return HttpResponse.json(
        {
          user: {
            id: 1,
            email: "test@example.com",
            role: "ROLE_USER",
          },
          digitalGarden: [
            {
              id: 1,
              nickname: "Ma plante test",
              commonName: "Pothos",
              lastWatering: "2026-01-01",
              nextWatering: "2026-01-11",
              plantImageUrl: "http://test.jpg",
              userPlantImageUrl: "http://test.jpg",
            },
          ],
        },
        { status: 200 }
      );
    })
  );
  // 2. COMPONENT CREATION AND refreshAuth()
  function LogoutTestComponent() {
    const { isAuthenticated, user, logout, isLoading } = useAuth();

    return (
      <div>
        <div>isAuthenticated: {String(isAuthenticated)} </div>
        <div>isLoading: {String(isLoading)} </div>
        <div>email: {user?.email || "null"} </div>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
  // 3. COMPONENT RENDERING
  render(
    <MemoryRouter>
      <AuthProvider>
        <LogoutTestComponent />
      </AuthProvider>
    </MemoryRouter>
  );
  // 4. DEFAULT HANDLER WITH CONNECTED USER
  await waitFor(() => {
    expect(screen.getByText(/isLoading: false/i)).toBeInTheDocument();
  });
  expect(screen.getByText(/isAuthenticated: true/i)).toBeInTheDocument();
  expect(screen.getByText(/email: test@example.com/i)).toBeInTheDocument();
  // 5. LOGOUT CLIC SIMULATION
  const logoutButton = screen.getByText("Logout");
  logoutButton.click();
  // 6. LOADING + VERIFICATION
  await waitFor(() => {
    expect(screen.getByText(/isLoading: false/i)).toBeInTheDocument();
  });
  expect(screen.getByText(/isAuthenticated: false/i)).toBeInTheDocument();
  expect(screen.getByText(/email: null/i)).toBeInTheDocument();
});
