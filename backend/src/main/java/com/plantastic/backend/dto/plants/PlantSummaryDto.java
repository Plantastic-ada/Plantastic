package com.plantastic.backend.dto.plants;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PlantSummaryDto {
    private long id;
    private String commonName;
    private String scientificName;
    private String imageUrl;
}