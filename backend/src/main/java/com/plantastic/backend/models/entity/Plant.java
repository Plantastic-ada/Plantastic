package com.plantastic.backend.models.entity;

import com.plantastic.backend.initdb.dto.api.*;
import com.plantastic.backend.initdb.dto.json.PlantDtoFromJson;
import com.plantastic.backend.util.StringUtil;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "plants")
@Slf4j
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "api_id")
    private Long apiId;
    @Column(name = "common_name")
    private String commonName;
    @Column(name = "other_name")
    private String otherName;
    @Column(name = "scientific_name")
    private String scientificName;
    @Column
    private String family;
    @Column(length = 2000)
    private String description;
    @Column(name = "care_level")
    private String careLevel;
    @Column
    private String imageUrl;
    @Column
    private String watering;
    @Column
    private String soil;
    @Column(name = "light_exposure")
    private String lightExposure;
    @Column(name = "growth_rate")
    private String growthRate;
    @Column(name = "poisonous_to_pet")
    private boolean poisonousToPet;
    @Column(name = "watering_details", length = 2000)
    private String wateringDetails;
    @Column(name = "sunlight_details", length = 2000)
    private String sunlightDetails;
    @Column(name = "pruning_details", length = 2000)
    private String pruningDetails;

    //Create a plant from JSON
    public Plant(PlantDtoFromJson dto) {
        this.apiId = dto.getApiId();
        this.commonName = StringUtil.emptyStringToNull(dto.getCommonName());
        this.otherName = StringUtil.emptyStringToNull(dto.getOtherName());
        this.scientificName = StringUtil.emptyStringToNull(dto.getScientificName());
        this.family = StringUtil.emptyStringToNull(dto.getFamily());
        this.description = StringUtil.emptyStringToNull(dto.getDescription());
        this.careLevel = StringUtil.emptyStringToNull(dto.getCareLevel());
        this.imageUrl = StringUtil.emptyStringToNull(dto.getImageUrl());
        this.watering = StringUtil.emptyStringToNull(dto.getWatering());
        this.soil = StringUtil.emptyStringToNull(dto.getSoil());
        this.lightExposure = StringUtil.emptyStringToNull(dto.getLightExposure());
        this.growthRate = StringUtil.emptyStringToNull(dto.getGrowthRate());
        this.poisonousToPet = dto.isPoisonousToPet();
        this.wateringDetails = StringUtil.emptyStringToNull(dto.getWateringDetails());
        this.sunlightDetails = StringUtil.emptyStringToNull(dto.getSunlightDetails());
        this.pruningDetails = StringUtil.emptyStringToNull(dto.getPruningDetails());
    }

    //Create a plant from API
    public Plant(PlantDetailApiResponse detailPlant, CareGuideApiResponse careGuide, Long apiId) {
        //Set details
        this.setApiId(apiId);
        this.commonName = StringUtil.emptyStringToNull(detailPlant.getCommonName());
        this.scientificName = StringUtil.emptyStringToNull(String.join(",",detailPlant.getScientificName()));
        this.otherName = StringUtil.emptyStringToNull(String.join(",",detailPlant.getOtherName()));
        this.family = StringUtil.emptyStringToNull(detailPlant.getFamily());
        this.watering = StringUtil.emptyStringToNull(detailPlant.getWatering());
        this.lightExposure = StringUtil.emptyStringToNull(String.join(",",detailPlant.getSunlight()));
        this.soil = StringUtil.emptyStringToNull(String.join(",",detailPlant.getSoil()));
        this.growthRate = StringUtil.emptyStringToNull(detailPlant.getGrowthRate());
        this.careLevel = StringUtil.emptyStringToNull(detailPlant.getCareLevel());
        this.poisonousToPet = detailPlant.isPoisonousToPets();
        this.description = StringUtil.emptyStringToNull(detailPlant.getDescription());

        ImageApi defaultImage = detailPlant.getDefaultImage();
        String originalUrl = (defaultImage!=null) ? defaultImage.getOriginalUrl() : null;
        this.imageUrl = StringUtil.emptyStringToNull(originalUrl);

        for (CareGuideApiItem item : careGuide.getData()) {
            for (CareGuideApiDescription careDescription : item.getData()) {
                //Set care guide details
                switch (careDescription.getType()) {
                    case "watering":
                        this.wateringDetails = StringUtil.emptyStringToNull(careDescription.getDescription());
                        break;
                    case "sunlight":
                        this.sunlightDetails = StringUtil.emptyStringToNull(careDescription.getDescription());
                        break;
                    case "pruning":
                        this.pruningDetails = StringUtil.emptyStringToNull(careDescription.getDescription());
                        break;
                    default:
                        log.debug("Type de care guide non géré : '{}' pour apiId {}", careDescription.getType(), apiId);
                }
            }
        }
    }

    public void updatePlantFromDto(PlantDtoFromJson dto) {
        this.commonName = StringUtil.emptyStringToNull(dto.getCommonName());
        this.otherName = StringUtil.emptyStringToNull(dto.getOtherName());
        this.scientificName = StringUtil.emptyStringToNull(dto.getScientificName());
        this.family = StringUtil.emptyStringToNull(dto.getFamily());
        this.description = StringUtil.emptyStringToNull(dto.getDescription());
        this.careLevel = StringUtil.emptyStringToNull(dto.getCareLevel());
        this.imageUrl = StringUtil.emptyStringToNull(dto.getImageUrl());
        this.watering = StringUtil.emptyStringToNull(dto.getWatering());
        this.soil = StringUtil.emptyStringToNull(dto.getSoil());
        this.lightExposure = StringUtil.emptyStringToNull(dto.getLightExposure());
        this.growthRate = StringUtil.emptyStringToNull(dto.getGrowthRate());
        this.poisonousToPet = dto.isPoisonousToPet();
        this.wateringDetails = StringUtil.emptyStringToNull(dto.getWateringDetails());
        this.sunlightDetails = StringUtil.emptyStringToNull(dto.getSunlightDetails());
        this.pruningDetails = StringUtil.emptyStringToNull(dto.getPruningDetails());
    }
}
