package com.plantastic.backend.service;

import com.plantastic.backend.dto.plants.CreateUserPlantRequest;
import com.plantastic.backend.dto.plants.UserPlantDetailsDto;
import com.plantastic.backend.dto.plants.UserPlantSummaryDto;
import com.plantastic.backend.mapper.UserPlantMapper;
import com.plantastic.backend.models.entity.Plant;
import com.plantastic.backend.models.entity.User;
import com.plantastic.backend.models.entity.UserPlant;
import com.plantastic.backend.models.types.UserRole;
import com.plantastic.backend.models.types.WateringFrequency;
import com.plantastic.backend.repository.PlantRepository;
import com.plantastic.backend.repository.UserPlantRepository;
import com.plantastic.backend.repository.UserRepository;
import com.plantastic.backend.security.user.CustomUserDetails;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserPlantServiceTest {
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
        request.setAcquisitionDate(LocalDate.now());

        user = new User();
        user.setId(userId);

        plant = new Plant();
        plant.setId(plantId);
        plant.setWatering("frequent");
    }


    @Test
    void testCreateOneUserPlantSuccess2() {
        // Arrange
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(plantRepository.findById(plantId)).thenReturn(Optional.of(plant));

        // Repository return exactly the object we passed
        when(userPlantRepository.save(any()))
                .thenAnswer(invocation -> invocation.getArgument(0));

        ArgumentCaptor<UserPlant> captor = ArgumentCaptor.forClass(UserPlant.class);

        // Act
        UserPlant result = userPlantService.createOneUserPlant(request, currentUser);

        // We capture the exact object passed to the repo
        verify(userPlantRepository).save(captor.capture());
        UserPlant saved = captor.getValue();

        // Assert :
        Assertions.assertNotNull(result);
        Assertions.assertEquals(saved, result);

        Assertions.assertEquals(userId, saved.getUser().getId());
        Assertions.assertEquals(plantId, saved.getPlant().getId());

        Assertions.assertEquals("Mon ficus", saved.getNickname());

        // nextWatering : calculée automatiquement depuis lastWatering et la fréquence de la plante
        Assertions.assertNotNull(saved.getNextWatering());
    }

    @Test
    void testCreateOneUserPlantUserNotFound() {
        //Arrange
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        //Act inside the Assert
        Assertions.assertThrows(EntityNotFoundException.class, () ->
                userPlantService.createOneUserPlant(request, currentUser)
        );

        verify(userRepository).findById(userId);
    }

    @Test
    void testCreateOneUserPlantPlantnotFound() {
        //Arrange
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(plantRepository.findById(plantId)).thenReturn(Optional.empty());

        //Act inside the Assert
        Assertions.assertThrows(EntityNotFoundException.class, () ->
                userPlantService.createOneUserPlant(request, currentUser)
        );

        verify(userRepository).findById(userId);
        verify(plantRepository).findById(plantId);
    }

    @Test
    void testUpdateWateringDaysForOneUserPlantSuccess() {
        // Arrange
        Long userPlantId = 1L;

        plant.setWatering("frequent");

        UserPlant userPlant = new UserPlant();
        userPlant.setPlant(plant);

        when(userPlantRepository.findById(userPlantId))
                .thenReturn(Optional.of(userPlant));

        UserPlantDetailsDto expectedDto = Mockito.mock(UserPlantDetailsDto.class);
        when(userPlantRepository.findUserPlantDetailsById(userPlantId))
                .thenReturn(expectedDto);

        // Act
        UserPlantDetailsDto result =
                userPlantService.updateWateringDaysForOneUserPlant(userPlantId);

        int expectedFreq = WateringFrequency.fromString(plant.getWatering()).getDays();

        // Assert on logic
        Assertions.assertEquals(LocalDate.now(), userPlant.getLastWatering());
        Assertions.assertEquals(
                LocalDate.now().plusDays(expectedFreq),
                userPlant.getNextWatering()
        );

        // Assert interactions
        verify(userPlantRepository).save(userPlant);
        Assertions.assertEquals(expectedDto, result);
    }

    @Test
    void updateWateringDaysForOneUserPlant_shouldThrowExceptionWhenNotFound() {
        // Arrange
        Long userPlantId = 99L;

        when(userPlantRepository.findById(userPlantId))
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

        when(userPlantRepository.findUserPlantDetailsById(userPlantId))
                .thenReturn(expectedDto);

        // Act
        UserPlantDetailsDto result = userPlantService.getUserPlantDetailsById(userPlantId);

        // Assert
        verify(userPlantRepository).findUserPlantDetailsById(userPlantId);
        Assertions.assertEquals(expectedDto, result);
    }

    @Test
    void getUserPlantDetailsById_shouldReturnNullWhenNotFound() {
        // Arrange
        Long userPlantId = 42L;

        when(userPlantRepository.findUserPlantDetailsById(userPlantId))
                .thenReturn(null);

        // Act
        UserPlantDetailsDto result = userPlantService.getUserPlantDetailsById(userPlantId);

        // Assert
        verify(userPlantRepository).findUserPlantDetailsById(userPlantId);
        Assertions.assertNull(result);
    }

    @Test
    void updateWateringDaysForMultiplesUserPlants_shouldReturnSummaries() {
        //Arrange
        List<Long> userPlantIds = List.of(1L, 2L, 3L);

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

        when(userPlantMapper.toSummary(details1)).thenReturn(summary1);
        when(userPlantMapper.toSummary(details2)).thenReturn(summary2);
        when(userPlantMapper.toSummary(details3)).thenReturn(summary3);

        //Act
        List<UserPlantSummaryDto> result = userPlantService.updateWateringDaysForMultiplesUserPlants(userPlantIds);

        //Assert
        Assertions.assertEquals(3, result.size());
        Assertions.assertEquals(List.of(summary1, summary2, summary3), result);

        verify(userPlantService).updateWateringDaysForOneUserPlant(1L);
        verify(userPlantService).updateWateringDaysForOneUserPlant(2L);
        verify(userPlantService).updateWateringDaysForOneUserPlant(3L);

        verify(userPlantMapper).toSummary(details1);
        verify(userPlantMapper).toSummary(details2);
        verify(userPlantMapper).toSummary(details3);
    }
}
