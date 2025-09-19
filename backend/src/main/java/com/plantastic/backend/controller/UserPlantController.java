package com.plantastic.backend.controller;

import com.plantastic.backend.dto.plants.CreateUserPlantRequest;
import com.plantastic.backend.dto.plants.UserPlantDto;
import com.plantastic.backend.models.entity.UserPlant;
import com.plantastic.backend.security.user.CustomUserDetails;
import com.plantastic.backend.service.UserPlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user-plants")
@RequiredArgsConstructor
public class UserPlantController {

    private final UserPlantService userPlantService;

    @PostMapping("/create-one")
    public ResponseEntity<String> createOneUserPlant(
            @RequestBody CreateUserPlantRequest request,
            @AuthenticationPrincipal CustomUserDetails currentUser //Automatic injection of the current user by Spring
    ) {
        UserPlant userPlant = userPlantService.createOneUserPlant(request, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body("UserPlant successfully created: " + userPlant.getId());
    }

//    @GetMapping("/details/{id}")
//    public ResponseEntity<UserPlantDto> getUserPlantDetailsById(long userPlantId) {
//        //@Todo
//    }
}
