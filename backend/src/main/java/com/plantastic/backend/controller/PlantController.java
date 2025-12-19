package com.plantastic.backend.controller;

import com.plantastic.backend.dto.plants.CreatePlantRequest;
import com.plantastic.backend.dto.plants.PlantEncyclopediaDto;
import com.plantastic.backend.dto.plants.PlantSummaryDto;
import com.plantastic.backend.models.entity.Plant;
import com.plantastic.backend.repository.PlantRepository;
import com.plantastic.backend.service.PlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/plants")
@RequiredArgsConstructor
public class PlantController {

    private final PlantRepository plantRepository;
    private final PlantService plantService;

    @GetMapping("/summaries")
    public ResponseEntity<List<PlantSummaryDto>> getAllPlantsSummaries() {
        List<PlantSummaryDto> plants = plantService.getAllPlantsSummaries();
        return ResponseEntity.ok(plants);
    }

    @GetMapping("/encyclopedia")
    public ResponseEntity<List<PlantEncyclopediaDto>> getAllPlantsEncyclopedia() {
        List<PlantEncyclopediaDto> plants = plantService.getAllPlantsEncyclopedia();
        return ResponseEntity.ok(plants);
    }

    @PostMapping(value = "/add-one", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Plant> addOnePlantToDb(
            @RequestPart("data") CreatePlantRequest request,
            @RequestPart("file")MultipartFile file) throws IOException {
        Plant plant = plantService.createPlantAndSaveToDb(request, file);
        return ResponseEntity.status(HttpStatus.CREATED).body(plant);
    }

}
