import { useState } from "react";
import { useGarden } from "../context/GardenContext";
import { getTodayLocal } from "../utils/date";
import { fetchAPI } from "../utils/api";
import toast from "react-hot-toast";
import { type WateringOneModalProps } from "../types/WateringOneModalProps";

const WateringOneModal = ({
  onClose,
  plantId,
  plantNickname,
  plantCommonName,
}: WateringOneModalProps) => {
  const { refreshGarden } = useGarden();
  const [wateringDate, setWateringDate] = useState(new Date());
  const today = getTodayLocal();

  const handleWatering = async () => {
    try {
      const response = await fetchAPI(
        `/user-plants/water-one/${plantId}?date=${
          wateringDate.toISOString().split("T")[0]
        }`,
        {
          method: "PATCH",
          body: JSON.stringify(plantId),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast(`Error: ${data || "Error saving data"}`);
      } else {
        await refreshGarden();
        toast(`Your ${plantNickname || plantCommonName} is no longer thirsty`, {
          icon: "🌿",
        });
      }
    } catch (error) {
      toast(`Error: ${error}`);
    }
  };
  return (
    <div>
      <h2>When did you water your plants?</h2>
      <input
        type="date"
        value={wateringDate.toISOString().split("T")[0]}
        max={today}
        onChange={(e) => setWateringDate(new Date(e.target.value))}
      />
    </div>
  );
};

export default WateringOneModal;
