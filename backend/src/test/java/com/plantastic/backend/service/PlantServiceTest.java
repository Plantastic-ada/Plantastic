package com.plantastic.backend.service;

import com.plantastic.backend.dto.plants.PlantEncyclopediaDto;
import com.plantastic.backend.dto.plants.PlantSummaryDto;
import com.plantastic.backend.repository.PlantRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

@ExtendWith(MockitoExtension.class)
class PlantServiceTest {

    @Mock
    private PlantRepository plantRepository;

    @InjectMocks
    private PlantService plantService;

    @Test
    void testGetAllPlantsSummariesSuccess() {
        // Arrange
        PlantSummaryDto p1 = Mockito.mock(PlantSummaryDto.class);
        PlantSummaryDto p2 = Mockito.mock(PlantSummaryDto.class);
        List<PlantSummaryDto> expectedList = List.of(p1, p2);

        Mockito.when(plantRepository.findAllPlantsSummaries())
                .thenReturn(expectedList);

        // Act
        List<PlantSummaryDto> result = plantService.getAllPlantsSummaries();

        // Assert
        Mockito.verify(plantRepository).findAllPlantsSummaries();
        Assertions.assertEquals(expectedList, result);
    }

    @Test
    void testGetAllPlantsSummariesEmpty() {
        // Arrange
        Mockito.when(plantRepository.findAllPlantsSummaries())
                .thenReturn(List.of());

        // Act
        List<PlantSummaryDto> result = plantService.getAllPlantsSummaries();

        // Assert
        Mockito.verify(plantRepository).findAllPlantsSummaries();
        Assertions.assertTrue(result.isEmpty());
    }

    @Test
    void testGetAllPlantsEncyclopediaSuccess() {
        // Arrange
        PlantEncyclopediaDto e1 = Mockito.mock(PlantEncyclopediaDto.class);
        PlantEncyclopediaDto e2 = Mockito.mock(PlantEncyclopediaDto.class);
        List<PlantEncyclopediaDto> expectedList = List.of(e1, e2);

        Mockito.when(plantRepository.findAllPlantsForEncyclopedia())
                .thenReturn(expectedList);

        // Act
        List<PlantEncyclopediaDto> result = plantService.getAllPlantsEncyclopedia();

        // Assert
        Mockito.verify(plantRepository).findAllPlantsForEncyclopedia();
        Assertions.assertEquals(expectedList, result);
    }

    @Test
    void testGetAllPlantsEncyclopediaEmpty() {
        // Arrange
        Mockito.when(plantRepository.findAllPlantsForEncyclopedia())
                .thenReturn(List.of());

        // Act
        List<PlantEncyclopediaDto> result = plantService.getAllPlantsEncyclopedia();

        // Assert
        Mockito.verify(plantRepository).findAllPlantsForEncyclopedia();
        Assertions.assertTrue(result.isEmpty());
    }
}
