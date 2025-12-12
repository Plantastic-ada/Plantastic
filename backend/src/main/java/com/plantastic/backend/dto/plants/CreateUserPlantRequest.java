package com.plantastic.backend.dto.plants;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

//We can't use a Record there, because nickname & lastWatering are not mandatory

@Data
@NoArgsConstructor
public class CreateUserPlantRequest {
    private Long plantId;
    private String nickname;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate acquisitionDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastWatering;
}
