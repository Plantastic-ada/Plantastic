import { useState, type ReactNode } from "react";
import { useGarden } from "../context/GardenContext";
import { fetchAPI } from "../utils/api";
import toast from "react-hot-toast";

export const WateringModal = ({ onClose }: { onClose: () => void }) => {
  const { plants, refreshGarden } = useGarden();
  const [selectedPlantIds, setSelectedPlantIds] = useState<number[]>([]);
  const [_apiMessage, setApiMessage] = useState<ReactNode>(null);
  const [wateringDate, setWateringDate] = useState(new Date());

  const handleCheckboxChange = (plantId: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedPlantIds([...selectedPlantIds, plantId]);
    } else {
      setSelectedPlantIds(selectedPlantIds.filter((id) => id !== plantId));
    }
  };

  const handleWatering = async () => {
      const dateParam = wateringDate.toISOString().split("T")[0];
      console.log("Sent date:", dateParam);
    try {
      const response = await fetchAPI(`/user-plants/water-multiples?date=${wateringDate.toISOString().split("T")[0]}`, {
        method: "PATCH",
        body: JSON.stringify(selectedPlantIds),
      });

      const data = await response.json();
      console.log("3. data", data);

      if (!response.ok) {
        setApiMessage(`Error: ${data || "Error saving data"}`);
      } else {
        await refreshGarden();
        setTimeout(() => onClose(), 2000);
        toast("Your plants are no longer thirsty", { icon: "🌿" });
      }
    } catch (error) {
      console.log("Error catch:", error);
      console.error(error);
    }
  };

  return (
    <div>
      {plants.length > 0 ? (
        plants.map((plant) => (
          <div key={plant.id}>
            <input
              type="checkbox"
              onChange={(e) => handleCheckboxChange(plant.id, e.target.checked)}
            />
            {plant.commonName} - Last watering: {plant.lastWatering}
          </div>
        ))
      ) : (
        <p>You have no plant to water!</p>
      )}

      <input
        type="date"
        value={wateringDate.toISOString().split("T")[0]}
        onChange={(e) => setWateringDate(new Date(e.target.value))}
      />

      <button
        onClick={handleWatering}
        className="w-full font-montserrat font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 mb-1 text-white bg-[#4F674F] hover:bg-green-950"
      >
        Water your plants
      </button>
    </div>
  );
};
