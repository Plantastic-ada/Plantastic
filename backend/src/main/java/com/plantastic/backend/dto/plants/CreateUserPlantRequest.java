package com.plantastic.backend.dto.plants;

import lombok.Data;

import java.time.LocalDate;

//We can't use a Record there, because nickname & lastWatering are not mandatory

@Data
public class CreateUserPlantRequest {
    private Long plantId;
    private String nickname;
    private LocalDate acquisitionDate;
    private LocalDate lastWatering;
    private String picture; //@Todo how do we manage the picture there
}
