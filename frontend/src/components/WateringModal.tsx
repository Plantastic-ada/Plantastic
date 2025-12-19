import { useState } from "react";
import { useGarden } from "../context/GardenContext";
import { fetchAPI } from "../utils/api";
import toast from "react-hot-toast";

export const WateringModal = ({ onClose }: { onClose: () => void }) => {
  const { plants, refreshGarden } = useGarden();
  const [selectedPlantIds, setSelectedPlantIds] = useState<number[]>([]);
  // const [_apiMessage, setApiMessage] = useState<ReactNode>(null);
  const [wateringDate, setWateringDate] = useState(new Date());

  const handleCheckboxChange = (plantId: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedPlantIds([...selectedPlantIds, plantId]);
    } else {
      setSelectedPlantIds(selectedPlantIds.filter((id) => id !== plantId));
    }
  };

  const handleWatering = async () => {
    try {
      const response = await fetchAPI(
        `/user-plants/water-multiples?date=${
          wateringDate.toISOString().split("T")[0]
        }`,
        {
          method: "PATCH",
          body: JSON.stringify(selectedPlantIds),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast(`Error: ${data || "Error saving data"}`);
      } else {
        await refreshGarden();
        setTimeout(() => onClose(), 2000);
        toast("Your plants are no longer thirsty", { icon: "🌿" });
      }
    } catch (error) {
      toast(`Error: ${error}`);
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
      <div className="flex justify-center">
        <input
          type="date"
          value={wateringDate.toISOString().split("T")[0]}
          onChange={(e) => setWateringDate(new Date(e.target.value))}
        />
      </div>

      <button
        onClick={handleWatering}
        disabled={selectedPlantIds.length === 0}
        className="w-full font-montserrat font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 mb-1 text-white bg-[#4F674F] hover:bg-green-950  disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {selectedPlantIds.length === 0
          ? "Water your plants"
          : selectedPlantIds.length === 1
          ? "Water 1 plant"
          : `Water ${selectedPlantIds.length} plants`}
      </button>
    </div>
  );
};
