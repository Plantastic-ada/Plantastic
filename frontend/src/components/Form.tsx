import { useEffect, useState, type ChangeEventHandler } from "react";
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

  useForm<CreateUserPlantDto>({
    resolver: zodResolver(createPlantSchema),
  });

  const onSubmit: SubmitHandler<CreateUserPlantDto> = async (
    formData: CreateUserPlantDto
  ) => {
    try {
      const { ...registerData } = formData;
      const response = await fetchAPI("//user-plants/create-one", {
        method: "POST",
        body: JSON.stringify(registerData),
      });
      const data = await response.text();
      if (!response.ok) {
        setApiMessage(`Error: ${data || "Error saving data"}`);
      }
    } catch (error) {
      console.error(error);
      setApiMessage("An error occured.");
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

  useEffect(() => {
    if (searchValue.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = allPlants.filter((plant) =>
      plant.commonName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchValue, allPlants]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form submitted");
    onClose();
  };

  const imageToDisplay = userPicture || selectedPlant?.imageUrl;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
                onClick={() => {
                  setSearchValue(plant.commonName);
                  setSuggestions([]);
                  setSelectedPlant(plant);
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
            }
          }}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-5"
        />

        {/* NICKNAME  */}
        <label className="block text-sm text-black font-medium  mt-5 mb-1">
          Name:
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-5"
        />

        {/* ACQUISITION DATE  */}
        <label className="block text-sm text-black font-medium mb-1">
          Acquisition date:
        </label>
        <input
          type="date"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-5"
        />

        {/* LAST WATERING DATE  */}
        <label className="block text-sm text-black font-medium mb-1">
          Last watering date :
        </label>
        <input
          type="date"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-5"
        />
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
