export interface UserPlant {
  id: number;
  nickname: string;
  commonName: string,
  lastWatering: string;
  nextWatering: string;
  imageUrl: string;
}

export interface CreatePlantData {
  id: number;
  image: string;
  commonName: string;
  scientificName: string;
  lastWatering: string;
  nextWatering: string;
}