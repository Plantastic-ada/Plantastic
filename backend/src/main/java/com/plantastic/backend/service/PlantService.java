package com.plantastic.backend.service;

import com.plantastic.backend.dto.plants.CreatePlantRequest;
import com.plantastic.backend.dto.plants.PlantEncyclopediaDetailsDto;
import com.plantastic.backend.dto.plants.PlantEncyclopediaSummaryDto;
import com.plantastic.backend.dto.plants.PlantSummaryDto;
import com.plantastic.backend.mapper.PlantMapper;
import com.plantastic.backend.models.entity.Plant;
import com.plantastic.backend.repository.PlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlantService {
    private final PlantRepository plantRepository;
    private final PlantMapper plantMapper;
    private final CloudinaryService cloudinaryService;
    public List<PlantSummaryDto> getAllPlantsSummaries() {
        return plantRepository.findAllPlantsSummaries();
    }

    public List<PlantEncyclopediaSummaryDto> getAllPlantsEncyclopedia() {
        return plantRepository.findAllPlantsForEncyclopedia();
    }

    public PlantEncyclopediaDetailsDto getOnePlantEncylopediaDetails(Long plantId) {
        return plantRepository.findPlantEncyclopediaDetails(plantId);
    }

    public Plant createPlantAndSaveToDb(CreatePlantRequest request, MultipartFile image) throws IOException {
        Plant newPlantToSave = plantMapper.toEntity(request);
        String plantImageUrl = cloudinaryService.uploadFileAndGetUrl(image, "plants");
        newPlantToSave.setImageUrl(plantImageUrl);
        return plantRepository.save(newPlantToSave);
    }

}
