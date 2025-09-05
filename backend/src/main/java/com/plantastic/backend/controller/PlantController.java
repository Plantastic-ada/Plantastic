package com.plantastic.backend.controller;

import com.plantastic.backend.dto.plants.PlantSummaryDto;
import com.plantastic.backend.models.entity.Plant;
import com.plantastic.backend.repository.PlantRepository;
import com.plantastic.backend.service.PlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/plants")
@RequiredArgsConstructor
public class PlantController {

    private final PlantRepository plantRepository;
    private final PlantService plantService;

    @PostMapping
    public Plant addOnePlant(@RequestBody Plant plant) {
        return plantRepository.save(plant);
    }

    @GetMapping("/summaries")
    public ResponseEntity<List<PlantSummaryDto>> getAllPlantsSummaries() {
        List<PlantSummaryDto> plants = plantService.getAllPlantsSummaries();
        return ResponseEntity.ok(plants);
    }
}
