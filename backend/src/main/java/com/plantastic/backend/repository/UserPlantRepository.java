package com.plantastic.backend.repository;

import com.plantastic.backend.dto.plants.UserPlantDetailsDto;
import com.plantastic.backend.dto.plants.UserPlantSummaryDto;
import com.plantastic.backend.models.entity.UserPlant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPlantRepository extends JpaRepository<UserPlant, Long> {
    @Query("SELECT new com.plantastic.backend.dto.plants.UserPlantSummaryDto(" +
            "up.id, up.nickname, p.commonName, up.lastWatering, up.nextWatering, p.imageUrl, up.imageUrl) " +
            "FROM UserPlant up JOIN up.plant p " +
            "WHERE up.user.id = :userId")
    List<UserPlantSummaryDto> findDigitalGardenByUserId(@Param("userId") Long userId);
    
    @Query("SELECT new com.plantastic.backend.dto.plants.UserPlantDetailsDto(" +
            "up.id, up.nickname, p.commonName, up.acquisitionDate, p.scientificName, up.lastWatering, up.nextWatering, p.watering, p.imageUrl, up.imageUrl, p.lightExposure) " +
            "FROM UserPlant up JOIN up.plant p " +
            "WHERE up.id = :userPlantId")
    UserPlantDetailsDto findUserPlantDetailsById(@Param("userPlantId") Long userPlantId);
}
