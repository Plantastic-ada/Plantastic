// import React from 'react'
import { useEffect, useState } from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import BottomNavBar from "../components/BottomNavBar";
import { Header } from "../components/Header";
import { fetchAPI } from "../utils/api";
import type { Plant } from "../types/Plant";
import PlantCardEncyclopedia from "../components/PlantCardEncyclopedia";
import Modal from "../components/Modal";

export default function Encyclopedia() {
	const [plants, setPlants] = useState<Plant[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

	useEffect(() => {
		const fetchPlants = async () => {
			try {
				const response = await fetchAPI("/plants/encyclopedia", { method: "GET" });
				if (!response.ok) {
					throw new Error("Failed to fetch plants");
				}
				const data: Plant[] = await response.json();
				setPlants(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "An unknown error occurred");
			} finally {
				setIsLoading(false);
			}
		};

		fetchPlants();
	}, []);

	const handleCardClick = (plant: Plant) => {
		setSelectedPlant(plant);
	};

	const closeModal = () => {
		setSelectedPlant(null);
	};

	return (
		<BackgroundWrapper>
			<Header />
			<main className="flex flex-col items-center w-full px-4 pt-4">
				<h1 className="text-white flex justify-center font-montserrat">This is the Encyclopedia page 📚</h1>

				{isLoading && <p className="text-white mt-4">Loading plants...</p>}
				{error && <p className="text-red-400 mt-4">Error: {error}</p>}
				{!isLoading && !error && (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mt-6">
						{plants.map((plant) => (
							<PlantCardEncyclopedia
								key={plant.id}
								plant={plant}
								onClick={() => handleCardClick(plant)}
							/>
						))}
					</div>
				)}
			</main>
			{selectedPlant && (
				<Modal isOpen={!!selectedPlant} onClose={closeModal} size="lg">
					<div className="text-black">
						<h2 className="text-2xl font-bold mb-4">{selectedPlant.commonName}</h2>
						<img
							src={selectedPlant.imageUrl}
							alt={selectedPlant.commonName}
							className="w-full h-64 object-cover rounded-lg mb-4"
						/>
						<p>
							<strong>Scientific Name:</strong> {selectedPlant.scientificName}
						</p>
						<p>
							<strong>Family:</strong> {selectedPlant.family}
						</p>
						<p>
							<strong>Description:</strong> {selectedPlant.description}
						</p>
						<p>
							<strong>Watering:</strong> {selectedPlant.watering}
						</p>
						<p>
							<strong>Care Level:</strong> {selectedPlant.careLevel}
						</p>
						{/* Ajoutez ici d'autres champs que vous souhaitez afficher */}
					</div>
				</Modal>
			)}
			<BottomNavBar />
		</BackgroundWrapper>
	);
}
