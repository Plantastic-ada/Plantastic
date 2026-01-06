export interface CreateUserPlantDto {
  plantId: number;
  nickname: string | null;
  acquisitionDate: string;
  lastWatering?: string | null;
  picture: string;
}
