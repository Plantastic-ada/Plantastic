import { useNavigate } from "react-router-dom";
import BackgroundWrapper from "../components/BackgroundWrapper";
import BottomNavBar from "../components/BottomNavBar";
import { Header } from "../components/Header";
import PlantCard from "../components/PlantCard";
import { useEffect, useState } from "react";
import instance from "./axios";
import type { Plant } from "../types/Plant";

function Home() {
  const navigate = useNavigate();
  const [isRead, setIsRead] = useState(false);
  const [plants, setPlants] = useState<Plant[]>([]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      // Will delete the token if it's in the local storage, even if it's not supposed to be
      localStorage.removeItem("authToken");
      console.debug("Log out successfull!");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Log out failed", error);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await instance.get(`/my-digital-garden`);
      console.log("Response.data", response.data);
      setPlants(response.data);
      setIsRead(true);
    })();
  }, []);

return (
  <BackgroundWrapper>
    <Header />
    <main className="flex flex-col items-center w-full px-4 pt-4">
      <div id="all-cards" className="flex flex-wrap gap-3 justify-center">
        {plants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
      <button onClick={handleLogout} className="mt-4">
        Logout
      </button>
    </main>
    <BottomNavBar />
  </BackgroundWrapper>
);
}

export default Home;
