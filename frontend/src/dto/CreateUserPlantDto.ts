export interface CreateUserPlantDto {
    plantId: number, 
    nickname?: string,
    acquisitionDate: string,
    lastWatering?: string,
    picture: string,
}