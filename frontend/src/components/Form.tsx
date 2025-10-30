import { useEffect, useState } from "react";
import type { FormProps } from "../types/FormProps";
import { fetchAPI } from "../utils/api";
import { type Plant } from "../types/Plant";
// Is there a route http://localhost:8080/api/plants/{name} = name as search parameter

export default function Form({ onClose }: FormProps) {
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [suggestions, setSuggestions] = useState<Plant[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetchAPI("/plants/summaries",{
                method: "GET",
            })
            if (response.ok) {
                const data = await response.json()
                setAllPlants(data)
            }
        } catch(error) {
            console.error(error)
        }
    } 
    fetchData()
  }, []);

  useEffect (() => {
    if (searchValue.trim() === "") {
        setSuggestions([]);
        return;
    }

    const filtered = allPlants.filter(plant => 
        plant.commonName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchValue, allPlants]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form submitted");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2-xl text-black font-bold mb-4">Add a plant</h2>
      <div>
        <label className="block text-sm text-black font-medium mb-1">
          Search a plant:
        </label>
        <input
          value={searchValue}
          
          onChange={e => setSearchValue(e.target.value)}
          type="search"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
        />
        { suggestions.length > 0 && (
            <div className="border rounded-lg mt-2 maw-h-60 overflow-y-auto bg-white">
                {suggestions.map(plant => (
                    <div
                    key= {plant.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                        setSearchValue(plant.commonName);
                        setSuggestions([]);
                    }}>
                        {plant.commonName} - <span className="text-gray-500 text-sm">{plant.scientificName}</span>
                    </div>
                ))}
            </div>
        )}
        <label className="block text-sm text-black font-medium  mt-5 mb-1">
          Name:
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-5"
        />
        <label className="block text-sm text-black font-medium mb-1">
          Acquisition date:
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-5"
        />
        <label className="block text-sm text-black font-medium mb-1">
          Last watering date :
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 mb-5"
        />
      </div>
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
