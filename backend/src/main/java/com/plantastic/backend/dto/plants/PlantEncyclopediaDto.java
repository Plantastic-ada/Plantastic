package com.plantastic.backend.dto.plants;

public record PlantEncyclopediaDto(
        Long id,
        String commonName,
        String scientificName,
        String imageUrl, 
        String family, 
        String description
) {}