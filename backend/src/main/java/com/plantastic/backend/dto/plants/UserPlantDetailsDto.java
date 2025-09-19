package com.plantastic.backend.dto.plants;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class UserPlantDetailsDto {
    //@Todo define what will go in this dto, and use it for get /user-plant/details/{userPlantId}
    private long id;
    private String nickname;
    private String commonName;
    private LocalDate lastWatering;
    private LocalDate nextWatering;
    private String imageUrl;
}
