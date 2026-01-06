package com.plantastic.backend.mapper;

import com.plantastic.backend.dto.plants.UserPlantDetailsDto;
import com.plantastic.backend.dto.plants.UserPlantSummaryDto;
import org.springframework.stereotype.Component;

@Component
public class UserPlantMapper {

    /**
     * Transform a UserPlantDetailsDto to a UserPlantSummaryDto
     * @param details UserPlantDetailsDto
     * @return UserPlantSummaryDto corresponding to details
     */
    public UserPlantSummaryDto toSummary(UserPlantDetailsDto details) {
        return new UserPlantSummaryDto(
                details.id(),
                details.nickname(),
                details.commonName(),
                details.lastWatering(),
                details.nextWatering(),
                details.plantImageUrl(),
                details.userPlantImageUrl()
        );
    }
}