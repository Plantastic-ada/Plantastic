package com.plantastic.backend.dto.plants;

public record PlantEncyclopediaSummaryDto(
        Long id,
        String commonName,
        String scientificName,
        String imageUrl, 
        String family, 
        String description,
        String watering
) {}