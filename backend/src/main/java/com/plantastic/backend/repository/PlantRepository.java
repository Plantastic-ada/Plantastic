package com.plantastic.backend.repository;


import com.plantastic.backend.dto.plants.PlantEncyclopediaDto;
import com.plantastic.backend.dto.plants.PlantSummaryDto;
import com.plantastic.backend.models.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {
    Optional<Plant> findByApiId(Long apiId);

    //We override the default request since there is no plant summary in Plant entity
    @Query("SELECT new com.plantastic.backend.dto.plants.PlantSummaryDto(p.id, p.commonName, p.scientificName, p.imageUrl) FROM Plant p")
    List<PlantSummaryDto> findAllPlantsSummaries();

    @Query("SELECT new com.plantastic.backend.dto.plants.PlantSummaryDto(p.id, p.commonName, p.scientificName, p.imageUrl, p.family, p.description) FROM Plant p")
    List<PlantEncyclopediaDto> findAllPlantsForEncyclopedia();
}

