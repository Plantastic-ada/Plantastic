import { useEffect, useState } from "react";
import type { FormProps } from "../types/FormProps";
import { fetchAPI } from "../utils/api";
import { type Plant } from "../types/Plant";
import { type CreateUserPlantDto } from "../dto/CreateUserPlantDto";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createPlantSchema } from "../schemas/createPlantSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Form({ onClose }: FormProps) {
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [suggestions, setSuggestions] = useState<Plant[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [userPicture, setUserPicture] = useState<string | null>(null);
  const [apiMessage, setApiMessage] = useState<React.ReactNode>(null);
  const [isPlantSelected, setIsPlantSelected] = useState(false);

  const { register, handleSubmit, formState, setValue } =
    useForm<CreateUserPlantDto>({
      resolver: zodResolver(createPlantSchema),
    });

  const onSubmit: SubmitHandler<CreateUserPlantDto> = async (
    formData: CreateUserPlantDto
  ) => {
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
    if (searchValue.trim().length < 3  || isPlantSelected) {
        setSuggestions([])
      return
    }
    const timeOutId = setTimeout(() => {
      const filtered = allPlants.filter((plant) =>
        plant.commonName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSuggestions(filtered);
    }, 300);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [searchValue, allPlants, isPlantSelected]);

  const imageToDisplay = userPicture || selectedPlant?.imageUrl;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2-xl text-black font-bold mb-4">Add a plant</h2>
      <div>
        {/* PLANT SEARCH */}
        <label className="block text-sm text-black font-medium mb-1">
          Search a plant:
        </label>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="search"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
        />
        {suggestions.length > 0 && (
          <div className="border rounded-lg mt-2 maw-h-60 overflow-y-auto bg-white">
            {suggestions.map((plant) => (
              <div
                key={plant.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => {
                  setSearchValue(plant.commonName);
                  setSuggestions([]);
                  setSelectedPlant(plant);
                  setValue("plantId", plant.id);
                  setValue("picture", plant.imageUrl);
                }}
              >
                <span className="text-gray-800 text-sm flex">
                  {plant.commonName} - {plant.scientificName}{" "}
                  <img
                    className="h-16 w-16"
                    src={plant.imageUrl}
                    alt={plant.commonName}
                  />
                </span>
              </div>
            ))}
          </div>
        )}

        {/* PICTURE  */}
        <label className="block text-sm text-black font-medium  mt-5 mb-1">
          Picture:
        </label>
        <div className="h-36 w-36">
          {imageToDisplay && <img src={imageToDisplay} alt="Plant" />}
        </div>
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
        <label className="block text-sm text-black font-medium  mt-5 mb-1">
          Name:
        </label>
        <input
          {...register("nickname")}
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-5"
        />

        {/* ACQUISITION DATE  */}
        <label className="block text-sm text-black font-medium mb-1">
          Acquisition date:
        </label>
        <input
          {...register("acquisitionDate")}
          type="date"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-5"
        />

        {/* LAST WATERING DATE  */}
        <label className="block text-sm text-black font-medium mb-1">
          Last watering date :
        </label>
        <input
          {...register("lastWatering")}
          type="date"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-5"
        />
        {Object.keys(formState.errors).length > 0 && (
          <div className="bg-red-100 p-2 rounded">
            {JSON.stringify(formState.errors)}
          </div>
        )}
      </div>

      {/* SUBMIT FORM  */}
      <button
        type="submit"
        id="form"
        className="w-full bg-red text-black py-2 rounded-lg hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  );
}
