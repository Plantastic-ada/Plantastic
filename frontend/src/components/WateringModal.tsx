import { useState, type ReactNode } from "react";
import { useGarden } from "../context/GardenContext";
import { fetchAPI } from "../utils/api";

export const WateringModal = ({ onClose }: { onClose: () => void }) => {
  const { plants, refreshGarden } = useGarden();
  const [selectedPlantIds, setSelectedPlantIds] = useState<number[]>([]);
  const [_apiMessage, setApiMessage] = useState<ReactNode>(null);

  const handleCheckboxChange = (plantId: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedPlantIds([...selectedPlantIds, plantId]);
    } else {
      setSelectedPlantIds(selectedPlantIds.filter((id) => id !== plantId));
    }
  };

  const handleWatering = async () => {
    try {
      const response = await fetchAPI("/water-multiples", {
        method: "PUT",
        body: JSON.stringify(selectedPlantIds),
      });
      const data = await response.json();

      if (!response.ok) {
        setApiMessage(`Error: ${data || "Error saving data"}`);
      } else {
        await refreshGarden();
        onClose();
      }
    } catch (error) {
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

      <button
        onClick={handleWatering}
        className="w-full font-montserrat font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 mb-1 text-white bg-[#4F674F] hover:bg-green-950"
      >
        Water your plants
      </button>
    </div>
  );
};
