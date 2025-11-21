package com.plantastic.backend.service;

import com.plantastic.backend.dto.plants.CreateUserPlantRequest;
import com.plantastic.backend.dto.plants.UserPlantDetailsDto;
import com.plantastic.backend.dto.plants.UserPlantSummaryDto;
import com.plantastic.backend.mapper.UserPlantMapper;
import com.plantastic.backend.models.entity.Plant;
import com.plantastic.backend.models.entity.User;
import com.plantastic.backend.models.entity.UserPlant;
import com.plantastic.backend.models.types.UserRole;
import com.plantastic.backend.repository.PlantRepository;
import com.plantastic.backend.repository.UserPlantRepository;
import com.plantastic.backend.repository.UserRepository;
import com.plantastic.backend.security.user.CustomUserDetails;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class UserPlantServiceTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private PlantRepository plantRepository;
    @Mock
    private UserPlantRepository userPlantRepository;
    @Mock
    private UserPlantMapper userPlantMapper;
    @InjectMocks
    @Spy
    private UserPlantService userPlantService;

    private Long userId;
    private Long plantId;
    private User user;
    private Plant plant;
    private CreateUserPlantRequest request;
    private CustomUserDetails currentUser;

    @BeforeEach
    void init() {
        userId = 1L;
        plantId = 10L;

        currentUser = new CustomUserDetails(userId, "user@example.com", "user", "password", UserRole.USER);

        request = new CreateUserPlantRequest();
        request.setPlantId(plantId);
        request.setNickname("Mon ficus");

        user = new User();
        user.setId(userId);

        plant = new Plant();
        plant.setId(plantId);
    }

    @Test
    void testCreateOneUserPlantSuccess() {
        //Arrange
        UserPlant savedUserPlant = new UserPlant(user, plant, request);

        Mockito.when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        Mockito.when(plantRepository.findById(plantId)).thenReturn(Optional.of(plant));
        Mockito.when(userPlantRepository.save(Mockito.any())).thenReturn(savedUserPlant);

        //Act
        UserPlant result = userPlantService.createOneUserPlant(request, currentUser);

        //Assert
        Assertions.assertNotNull(result);
        Assertions.assertEquals(userId, result.getUser().getId());
        Assertions.assertEquals(plantId, result.getPlant().getId());
        Assertions.assertEquals("Mon ficus", result.getNickname());

        Mockito.verify(userRepository).findById(userId);
        Mockito.verify(plantRepository).findById(plantId);
        Mockito.verify(userPlantRepository).save(Mockito.any(UserPlant.class));
    }

    @Test
    void testCreateOneUserPlantUserNotFound() {
        //Arrange
        Mockito.when(userRepository.findById(userId)).thenReturn(Optional.empty());

        //Act inside the Assert
        Assertions.assertThrows(EntityNotFoundException.class, () ->
                userPlantService.createOneUserPlant(request, currentUser)
        );

        Mockito.verify(userRepository).findById(userId);
    }

    @Test
    void testCreateOneUserPlantPlantnotFound() {
        //Arrange
        Mockito.when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        Mockito.when(plantRepository.findById(plantId)).thenReturn(Optional.empty());

        //Act inside the Assert
        Assertions.assertThrows(EntityNotFoundException.class, () ->
                userPlantService.createOneUserPlant(request, currentUser)
        );

        Mockito.verify(userRepository).findById(userId);
        Mockito.verify(plantRepository).findById(plantId);
    }

    @Test
    void testUpdateWateringDaysForOneUserPlantSuccess() {
        //Arrange
        Long userPlantId = 1L;

        UserPlant userPlant = Mockito.mock(UserPlant.class);
        UserPlantDetailsDto expectedDto = Mockito.mock(UserPlantDetailsDto.class);

        Mockito.when(userPlantRepository.findById(userPlantId))
                .thenReturn(Optional.of(userPlant));

        Mockito.when(userPlantRepository.findUserPlantDetailsById(userPlantId))
                .thenReturn(expectedDto);

        //Act
        UserPlantDetailsDto result = userPlantService.updateWateringDaysForOneUserPlant(userPlantId);

        //Assert
        Mockito.verify(userPlant).setLastWatering(LocalDate.now());
        Mockito.verify(userPlant).setNextWatering();
        Mockito.verify(userPlantRepository).save(userPlant);
        Assertions.assertEquals(expectedDto, result);
    }

    @Test
    void updateWateringDaysForOneUserPlant_shouldThrowExceptionWhenNotFound() {
        // Arrange
        Long userPlantId = 99L;

        Mockito.when(userPlantRepository.findById(userPlantId))
                .thenReturn(Optional.empty());

        // Act inside the Assert
        Assertions.assertThrows(EntityNotFoundException.class, () ->
                userPlantService.updateWateringDaysForOneUserPlant(userPlantId)
        );
    }

    @Test
    void getUserPlantDetailsById_shouldReturnDto() {
        // Arrange
        Long userPlantId = 1L;
        UserPlantDetailsDto expectedDto = Mockito.mock(UserPlantDetailsDto.class);

        Mockito.when(userPlantRepository.findUserPlantDetailsById(userPlantId))
                .thenReturn(expectedDto);

        // Act
        UserPlantDetailsDto result = userPlantService.getUserPlantDetailsById(userPlantId);

        // Assert
        Mockito.verify(userPlantRepository).findUserPlantDetailsById(userPlantId);
        Assertions.assertEquals(expectedDto, result);
    }

    @Test
    void getUserPlantDetailsById_shouldReturnNullWhenNotFound() {
        // Arrange
        Long userPlantId = 42L;

        Mockito.when(userPlantRepository.findUserPlantDetailsById(userPlantId))
                .thenReturn(null);

        // Act
        UserPlantDetailsDto result = userPlantService.getUserPlantDetailsById(userPlantId);

        // Assert
        Mockito.verify(userPlantRepository).findUserPlantDetailsById(userPlantId);
        Assertions.assertNull(result);
    }

    @Test
    void updateWateringDaysForMultiplesUserPlants_shouldReturnSummaries() {
        //Arrange
        List<Long> ids = List.of(1L, 2L, 3L);

        //Details mocks (updateWateringDaysForOneUserPlant)
        UserPlantDetailsDto details1 = Mockito.mock(UserPlantDetailsDto.class);
        UserPlantDetailsDto details2 = Mockito.mock(UserPlantDetailsDto.class);
        UserPlantDetailsDto details3 = Mockito.mock(UserPlantDetailsDto.class);

        Mockito.doReturn(details1).when(userPlantService).updateWateringDaysForOneUserPlant(1L);
        Mockito.doReturn(details2).when(userPlantService).updateWateringDaysForOneUserPlant(2L);
        Mockito.doReturn(details3).when(userPlantService).updateWateringDaysForOneUserPlant(3L);

        //Summaries mocks (
        UserPlantSummaryDto summary1 = Mockito.mock(UserPlantSummaryDto.class);
        UserPlantSummaryDto summary2 = Mockito.mock(UserPlantSummaryDto.class);
        UserPlantSummaryDto summary3 = Mockito.mock(UserPlantSummaryDto.class);

        Mockito.when(userPlantMapper.toSummary(details1)).thenReturn(summary1);
        Mockito.when(userPlantMapper.toSummary(details2)).thenReturn(summary2);
        Mockito.when(userPlantMapper.toSummary(details3)).thenReturn(summary3);

        //Act
        List<UserPlantSummaryDto> result = userPlantService.updateWateringDaysForMultiplesUserPlants(ids);

        //Assert
        Assertions.assertEquals(3, result.size());
        Assertions.assertEquals(List.of(summary1, summary2, summary3), result);

        Mockito.verify(userPlantService).updateWateringDaysForOneUserPlant(1L);
        Mockito.verify(userPlantService).updateWateringDaysForOneUserPlant(2L);
        Mockito.verify(userPlantService).updateWateringDaysForOneUserPlant(3L);

        Mockito.verify(userPlantMapper).toSummary(details1);
        Mockito.verify(userPlantMapper).toSummary(details2);
        Mockito.verify(userPlantMapper).toSummary(details3);
    }
}
