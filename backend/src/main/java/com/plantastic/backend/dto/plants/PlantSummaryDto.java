package com.plantastic.backend.dto.plants;

public record PlantSummaryDto(
        long id,
        String commonName,
        String scientificName,
        String imageUrl
) {}