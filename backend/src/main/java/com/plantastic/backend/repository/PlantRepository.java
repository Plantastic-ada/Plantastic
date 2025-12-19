package com.plantastic.backend.repository;


import com.plantastic.backend.dto.plants.PlantEncyclopediaDetailsDto;
import com.plantastic.backend.dto.plants.PlantEncyclopediaSummaryDto;
import com.plantastic.backend.dto.plants.PlantSummaryDto;
import com.plantastic.backend.models.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {
    Optional<Plant> findByApiId(Long apiId);

    //We override the default request since there is no plant summary in Plant entity
    @Query("SELECT new com.plantastic.backend.dto.plants.PlantSummaryDto(p.id, p.commonName, p.scientificName, p.imageUrl) FROM Plant p")
    List<PlantSummaryDto> findAllPlantsSummaries();

    @Query("SELECT new com.plantastic.backend.dto.plants.PlantEncyclopediaSummaryDto(" +
            "p.id, p.commonName, p.scientificName, p.imageUrl, p.family, p.description, " +
            "CASE p.watering WHEN 'FREQUENT' THEN 'Frequent (5 days)' WHEN 'MINIMUM' THEN 'Minimum (20 days)' ELSE 'Average (10 days)' END) " +
            "FROM Plant p")
    List<PlantEncyclopediaSummaryDto> findAllPlantsForEncyclopedia();

    @Query("SELECT new com.plantastic.backend.dto.plants.PlantEncyclopediaDetailsDto(" +
            "p.id, p.commonName, p.otherName, p.scientificName, p.family, p.description, p.careLevel, p.imageUrl, p.soil, " +
            "p.lightExposure, p.growthRate, p.wateringDetails, p.sunlightDetails, p.pruningDetails, " +
            "CASE WHEN p.poisonousToPet = true THEN 'Toxic for pets' ELSE 'Safe for pets' END, " +
            "CASE p.watering WHEN 'FREQUENT' THEN 'Frequent (5 days)' WHEN 'MINIMUM' THEN 'Minimum (20 days)' ELSE 'Average (10 days)' END) " +
            "FROM Plant p " +
            "WHERE p.id = :plantId")
    PlantEncyclopediaDetailsDto findPlantEncyclopediaDetails(@Param("plantId") Long plantId);
}

