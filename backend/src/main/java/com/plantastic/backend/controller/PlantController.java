package com.plantastic.backend.controller;

import com.plantastic.backend.models.entity.Plant;
import com.plantastic.backend.repository.PlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/plants")
@RequiredArgsConstructor
public class PlantController {

    private PlantRepository plantRepository;

    @PostMapping
    public Plant addOnePlant(@RequestBody Plant plant) {
        return plantRepository.save(plant);
    }
}
