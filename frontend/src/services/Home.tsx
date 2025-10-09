import { useNavigate } from "react-router-dom";
import BackgroundWrapper from "../components/BackgroundWrapper";
import BottomNavBar from "../components/BottomNavBar";
import { Header } from "../components/Header";
import PlantCard from "../components/PlantCard";
import { useEffect, useState } from "react";
import type { UserPlant } from "../types/UserPlant";
import { fetchAPI } from "../utils/api";

function Home() {
  const navigate = useNavigate();
  const [plants, setPlants] = useState<UserPlant[]>([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      const response = await fetchAPI("/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        console.debug("Logout successful");
        try {
          const data = await response.text();
          console.log("Backend response:", data);
        } catch (e) {}
      } else {
        console.warn("Logout returned non-OK status:", response.status);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Removes token from local storage if it's needed
      localStorage.removeItem("authToken");
      console.debug("You are successfully logged out!");

      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetchAPI("/me/my-digital-garden", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPlants(data);
      } catch (error) {
        console.error("Failed to fetch plants:", error);
      }
    };

    fetchPlants();
  }, []);

  return (
    <BackgroundWrapper>
      <Header />
      <main className="flex flex-col items-center w-full px-4 pt-4">
        <div id="all-cards" className="flex flex-wrap gap-3 justify-center">
          {plants.length > 0 ? (
            plants.map((plant) => <PlantCard key={plant.id} plant={plant} />)
          ) : (
            <p className="text-gray-500">
              No plants yet. Add your first plant!
            </p>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </main>
      <BottomNavBar />
    </BackgroundWrapper>
  );
}

export default Home;
