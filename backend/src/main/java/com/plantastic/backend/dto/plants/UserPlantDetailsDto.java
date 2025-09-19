package com.plantastic.backend.dto.plants;

import com.plantastic.backend.models.types.WateringFrequency;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

public record UserPlantDetailsDto(
        long id,
        String nickname,
        String commonName,
        LocalDate acquisitionDate,
        String scientificName,
        LocalDate lastWatering,
        LocalDate nextWatering,
        int waterFreq,
        String plantImageUrl,
        String userPlantImageUrl,
        String lightExposure
) {
    public UserPlantDetailsDto(long id,
                               String nickname,
                               String commonName,
                               LocalDate acquisitionDate,
                               String scientificName,
                               LocalDate lastWatering,
                               LocalDate nextWatering,
                               String waterFreq,
                               String plantImageUrl,
                               String userPlantImageUrl,
                               String lightExposure) {
        this(id, nickname, commonName, acquisitionDate, scientificName,
                lastWatering, nextWatering,
                WateringFrequency.fromString(waterFreq).getDays(),
                plantImageUrl, userPlantImageUrl, lightExposure);
    }
}