package com.plantastic.backend.service;

import com.plantastic.backend.dto.plants.PlantSummaryDto;
import com.plantastic.backend.repository.PlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlantService {
    private final PlantRepository plantRepository;

    public List<PlantSummaryDto> getAllPlantsSummaries() {
        return plantRepository.findAllPlantsSummaries();
    }
}
