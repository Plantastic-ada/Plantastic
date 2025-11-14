package com.plantastic.backend.dto.plants;

import java.time.LocalDate;

public record UserPlantSummaryDto(
        Long id,
        String nickname,
        String commonName,
        LocalDate lastWatering,
        LocalDate nextWatering,
        String plantImageUrl,
        String userPlantImageUrl
) {}
