// import React from 'react'
import { useEffect, useState } from "react";
import BackgroundWrapper from "../components/BackgroundWrapper";
import BottomNavBar from "../components/BottomNavBar";
import { Header } from "../components/Header";
import { fetchAPI } from "../utils/api";
import type { PlantSummary } from "../types/PlantSummary.ts";
import PlantCardEncyclopedia from "../components/EncyclopediaSummaryCard";
import Modal from "../components/Modal";
import EncyclopediaDetailsCard from "../components/EncyclopediaDetailsCard.tsx";

export default function Encyclopedia() {
	const [plants, setPlants] = useState<PlantSummary[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedPlant, setSelectedPlant] = useState<PlantSummary | null>(null);

	useEffect(() => {
		const fetchPlants = async () => {
			try {
				const response = await fetchAPI("/plants/encyclopedia", { method: "GET" });
				if (!response.ok) {
					throw new Error("Failed to fetch plants");
				}
				const data: PlantSummary[] = await response.json();
				setPlants(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "An unknown error occurred");
			} finally {
				setIsLoading(false);
			}
		};

		fetchPlants();
	}, []);

	const handleCardClick = (plant: PlantSummary) => {
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
					<EncyclopediaDetailsCard selectedPlant={selectedPlant} />
				</Modal>
			)}
			<BottomNavBar />
		</BackgroundWrapper>
	);
}
