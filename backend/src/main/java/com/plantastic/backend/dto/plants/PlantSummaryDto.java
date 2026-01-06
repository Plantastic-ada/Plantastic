package com.plantastic.backend.dto.plants;

public record PlantSummaryDto(
        Long id,
        String commonName,
        String scientificName,
        String imageUrl
) {}