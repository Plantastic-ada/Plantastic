package com.plantastic.backend.dto.plants;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateUserPlantRequest {
    private long plantId;
    private String nickname;
    private LocalDate acquisitionDate;
    private LocalDate lastWatering;
    private String picture; //@Todo how do we manage the picture there
}
