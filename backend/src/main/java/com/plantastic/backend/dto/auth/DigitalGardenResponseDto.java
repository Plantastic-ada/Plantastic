package com.plantastic.backend.dto.auth;

import com.plantastic.backend.dto.plants.UserPlantSummaryDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class DigitalGardenResponseDto {
    private final AuthUserDto user;
    private final List<UserPlantSummaryDto> digitalGarden;
}
