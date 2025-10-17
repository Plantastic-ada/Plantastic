package com.plantastic.backend.dto.plants;

import java.time.LocalDate;

public record UserPlantSummaryDto(
        long id,
        String nickname,
        String commonName,
        LocalDate lastWatering,
        LocalDate nextWatering,
        String plantImageUrl,
        String userPlantImageUrl
) {}
