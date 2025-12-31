import { useState, type useRef } from "react";
import type { UserPlant } from "../types/UserPlant";
import Modal from "./Modal";
import UserPlantCard from "./UserPlantCard";

export default function PlantCard({ plant }: { plant: UserPlant }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div
      id="plant-card"
      className="w-full max-w-sm h-36 flex bg-amber-50/95 rounded-lg p-2 shadow-lg transform transition-all hover:-translate-y-1 duration-300 hover:shadow"
    >
      <div
        id="plant-img"
        className="w-28 h-28 flex-shrink-0 rounded-lg bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            plant.userPlantImageUrl || plant.plantImageUrl
          })`,
        }}
      />

      <div
        id="plant-card-desc"
        className="flex-1 flex flex-col font-bellota p-2 justify-between"
      >
        {/* Infos compactes */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 truncate">
            {plant.nickname}
          </h3>
          <p className="text-xs text-gray-600 italic truncate">
            Common name: {plant.commonName}
          </p>
          <p className="text-xs text-gray-500 truncate">
            Last watering: {plant.lastWatering}
          </p>
          <p className="text-xs text-gray-500 truncate">
            Next watering: {plant.nextWatering}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-1 px-3 py-1 text-xs bg-[#4f674f] text-white rounded hover:bg-[#232c23] w-full"
        >
          Consult
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="lg"
        >
          <UserPlantCard plantId={plant.id}></UserPlantCard>
        </Modal>
      </div>
    </div>
  );
}
