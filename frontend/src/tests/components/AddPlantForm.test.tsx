import { http, HttpResponse } from "msw";
import { server } from "../../mocks/server";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddPlantForm from "../../components/AddPlantForm";
import { AuthProvider } from "../../context/AuthContext";
import GardenProvider from "../../context/GardenContext";
import { mockPlants } from "../../mocks/mockPlantData";
import { API_BASE_URL } from "../../mocks/config/constants";
// import { mockUserPlants } from "../../mocks/mockUserPlantsData";

// SETUP
const renderAddPlantForm = () => {
  const mockOnClose = vi.fn();

  return render(
    <MemoryRouter>
      <AuthProvider>
        <GardenProvider>
          <AddPlantForm onClose={mockOnClose} />
        </GardenProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

// CORRECT RENDERING OF THE COMPONENT
describe("AddPlantForm", () => {
  it("should render the form", () => {
    renderAddPlantForm();

    expect(screen.getByText(/Add a plant/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Search a plant:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Picture/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Acquisition date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last watering date/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send/i })).toBeInTheDocument();
  });
});

// AUTOCOMPLETE PLANT SEARCH
it("should show plant suggestions when typing", async () => {
  const user = userEvent.setup();

  server.use(
    http.get(`${API_BASE_URL}/api/plants/summaries`, () => {
      return HttpResponse.json(mockPlants, { status: 200 });
    })
  );

  renderAddPlantForm();

  const searchInput = screen.getByLabelText(/Search a plant/i);
  await user.type(searchInput, "Pot");

  await waitFor(() => {
    expect(screen.getByText(/Pothos/i)).toBeInTheDocument();
  });
});
