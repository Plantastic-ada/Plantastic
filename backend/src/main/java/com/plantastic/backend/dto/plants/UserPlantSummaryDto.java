package com.plantastic.backend.dto.plants;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class UserPlantSummaryDto {
    private long id;
    private String nickname;
    private String commonName;
    private LocalDate lastWatering;
    private LocalDate nextWatering;
    private String plantImageUrl;
    private String userPlantImageUrl;
}
