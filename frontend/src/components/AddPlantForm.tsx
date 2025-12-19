import { useEffect, useState } from "react";
import type { FormProps } from "../types/FormProps";
import { fetchAPI } from "../utils/api";
import { type PlantSelection } from "../types/PlantSelection";
import { type CreateUserPlantDto } from "../dto/CreateUserPlantDto";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createUserPlantSchema } from "../schemas/createUserPlantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ReactNode } from "react";

export default function AddPlantForm({ onClose }: FormProps) {
	const [allPlants, setAllPlants] = useState<PlantSelection[]>([]);
	const [suggestions, setSuggestions] = useState<PlantSelection[]>([]);
	const [searchValue, setSearchValue] = useState<string>("");
	const [selectedPlant, setSelectedPlant] = useState<PlantSelection | null>(null);
	const [userPicture, setUserPicture] = useState<string | null>(null);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_apiMessage, setApiMessage] = useState<ReactNode>(null);
	const [isPlantSelected, setIsPlantSelected] = useState(false);
	// TODO: Keyboard navigation
	// const [activeIndex, setActiveIndex] = useState(-1);

	const { register, handleSubmit, formState, setValue } = useForm<CreateUserPlantDto>({
		resolver: zodResolver(createUserPlantSchema),
	});

	// CALL FOR USER PLANT CREATION
	const onSubmit: SubmitHandler<CreateUserPlantDto> = async (formData: CreateUserPlantDto) => {
		try {
			const dataToSend = {
				plantId: selectedPlant?.id,
				nickname: formData.nickname,
				acquisitionDate: formData.acquisitionDate,
				lastWatering: formData.lastWatering,
				picture: userPicture || selectedPlant?.imageUrl,
			};
			const response = await fetchAPI("/user-plants/create-one", {
				method: "POST",
				body: JSON.stringify(dataToSend),
			});
			const data = await response.text();
			if (!response.ok) {
				setApiMessage(`Error: ${data || "Error saving data"}`);
			} else {
				onClose();
			}
		} catch (error) {
			console.error(error);
			setApiMessage("An error occured.");
		}
		if (!selectedPlant) {
			setApiMessage("Please select a plant first");
			return;
		}
	};

	// CALL FOR AUTOCOMPLETION LIST
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchAPI("/plants/summaries", {
					method: "GET",
				});
				if (response.ok) {
					const data = await response.json();
					setAllPlants(data);
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	// DEBOUNCING
	useEffect(() => {
		if (searchValue.trim().length < 3 || isPlantSelected) {
			setSuggestions([]);
			return;
		}
		const timeOutId = setTimeout(() => {
			const lowerSearch = searchValue.toLowerCase();
			const filtered = allPlants.filter((plant) => plant.commonName.toLowerCase().includes(lowerSearch));
			setSuggestions(filtered);
		}, 300);
		return () => {
			clearTimeout(timeOutId);
		};
	}, [searchValue, allPlants, isPlantSelected]);

	// Display user-uploaded picture or fallback to plant's default image
	const imageToDisplay = userPicture || selectedPlant?.imageUrl;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
			<h1 className="text-2-xl text-black font-bold mb-4">Add a plant</h1>
			<div>
				{/* PLANT SEARCH */}
				<label className="block text-sm text-black font-medium mb-1">Search a plant:</label>
				<input
					value={searchValue}
					onChange={(e) => {
						setSearchValue(e.target.value);
						setIsPlantSelected(false);
					}}
					onBlur={() => {
						setSuggestions([]);
					}}
					type="search"
					className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 placeholder:italic placeholder:text-gray-500"
				/>
				<>
					{suggestions.length > 0 && (
						<div className="border rounded-lg mt-2 max-h-60 overflow-y-auto bg-white">
							{suggestions.map((plant) => (
								<div
									key={plant.id}
									className="p-2 hover:bg-gray-100 cursor-pointer"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setSearchValue(plant.commonName);
										setSelectedPlant(plant);
										setValue("plantId", plant.id);
										setValue("picture", plant.imageUrl);
										setSuggestions([]);
										setIsPlantSelected(true);
									}}
								>
									<span className="text-gray-800 text-sm flex">
										{plant.commonName} - {plant.scientificName}{" "}
										<img className="h-16 w-16" src={plant.imageUrl} alt={plant.commonName} />
									</span>
								</div>
							))}
						</div>
					)}
					{/* UNCONCLUSIVE SEARCH */}
					{suggestions.length === 0 && searchValue.length >= 3 && !isPlantSelected && (
						<p className="text-gray-500 text-sm p-4 text-center">No results found!</p>
					)}
				</>

				{/* PICTURE  */}
				<label className="block text-sm text-black font-medium  mt-5 mb-1">Picture:</label>
				<div className="h-36 w-36">{imageToDisplay && <img src={imageToDisplay} alt="Plant" />}</div>
				<input
					type="file"
					accept="image/*"
					onChange={(e) => {
						const file = e.target.files?.[0];
						if (file) {
							const imageUrl = URL.createObjectURL(file);
							setUserPicture(imageUrl);
							setValue("picture", imageUrl);
						}
					}}
					className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-5"
				/>

				{/* NICKNAME  */}
				<label className="block text-sm text-black font-medium  mt-5 mb-1">Name:</label>
				<input
					{...register("nickname")}
					type="text"
					className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-5"
				/>

				{/* ACQUISITION DATE  */}
				<label className="block text-sm text-black font-medium mb-1">Acquisition date:</label>
				<input
					{...register("acquisitionDate")}
					type="date"
					className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-5 "
				/>

				{/* LAST WATERING DATE  */}
				<label className="block text-sm text-black font-medium mb-1">Last watering date :</label>
				<input
					{...register("lastWatering")}
					type="date"
					className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-5"
				/>
				{Object.keys(formState.errors).length > 0 && (
					<div className="bg-red-100 p-2 rounded">{JSON.stringify(formState.errors)}</div>
				)}
			</div>

			{/* SUBMIT FORM  */}
			<button
				type="submit"
				id="form"
				className="w-full bg-red bg-[#4f674f] text-white py-2 rounded-lg hover:bg-[#374737]"
			>
				Send
			</button>
		</form>
	);
}
