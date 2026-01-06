package com.plantastic.backend.dto.plants;

public record PlantEncyclopediaDetailsDto(
        Long id,
        String commonName,
        String otherName,
        String scientificName,
        String family,
        String description,
        String careLevel,
        String imageUrl,
        String soil,
        String lightExposure,
        String growthRate,
        String wateringDetails,
        String sunlightDetails,
        String pruningDetails,
        String poisonousToPet,
        String watering
) {}
