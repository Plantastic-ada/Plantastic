package com.plantastic.backend.service;

import com.plantastic.backend.dto.plants.CreateUserPlantRequest;
import com.plantastic.backend.models.entity.Plant;
import com.plantastic.backend.models.entity.User;
import com.plantastic.backend.models.entity.UserPlant;
import com.plantastic.backend.repository.PlantRepository;
import com.plantastic.backend.repository.UserPlantRepository;
import com.plantastic.backend.repository.UserRepository;
import com.plantastic.backend.security.user.CustomUserDetails;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserPlantService {
    private final UserRepository userRepository;
    private final PlantRepository plantRepository;
    private final UserPlantRepository userPlantRepository;

    public UserPlant createOneUserPlant(CreateUserPlantRequest request, CustomUserDetails currentUser) {
        //Get user
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> {
                    log.error("User not found with id: {}", currentUser.getId());
                    return new EntityNotFoundException("User not found with id: " + currentUser.getId());
                });

        //Get plant
        Plant plant = plantRepository.findById(request.getPlantId())
                .orElseThrow(() -> {
                    log.error("Plant not found with id: {}", request.getPlantId());
                    return new EntityNotFoundException("Plant not found with id: " + request.getPlantId());
                });

        //Create and save userPlant
        UserPlant userPlant = new UserPlant(user, plant, request);
        return userPlantRepository.save(userPlant);
    }
}
