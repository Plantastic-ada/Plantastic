package com.plantastic.backend.dto.plants;

import lombok.Data;

@Data
public class CreatePlantRequest {
    private String commonName;
    private String otherName;
    private String scientificName;
    private String family;
    private String description;
    private String careLevel;
    private String watering;
    private String soil;
    private String lightExposure;
    private String growthRate;
    private boolean poisonousToPet;
    private String wateringDetails;
    private String sunlightDetails;
    private String pruningDetails;
}