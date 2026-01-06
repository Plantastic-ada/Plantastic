package com.plantastic.backend.mapper;

import com.plantastic.backend.dto.plants.CreatePlantRequest;
import com.plantastic.backend.models.entity.Plant;
import com.plantastic.backend.util.StringUtil;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface PlantMapper {

    // DTO to entity
    @Mapping(target = "commonName", source = "commonName", qualifiedByName = "emptyToNull")
    @Mapping(target = "otherName", source = "otherName", qualifiedByName = "emptyToNull")
    @Mapping(target = "scientificName", source = "scientificName", qualifiedByName = "emptyToNull")
    @Mapping(target = "family", source = "family", qualifiedByName = "emptyToNull")
    @Mapping(target = "description", source = "description", qualifiedByName = "emptyToNull")
    @Mapping(target = "careLevel", source = "careLevel", qualifiedByName = "emptyToNull")
    @Mapping(target = "watering", source = "watering", qualifiedByName = "emptyToNull")
    @Mapping(target = "soil", source = "soil", qualifiedByName = "emptyToNull")
    @Mapping(target = "lightExposure", source = "lightExposure", qualifiedByName = "emptyToNull")
    @Mapping(target = "growthRate", source = "growthRate", qualifiedByName = "emptyToNull")
    @Mapping(target = "wateringDetails", source = "wateringDetails", qualifiedByName = "emptyToNull")
    @Mapping(target = "sunlightDetails", source = "sunlightDetails", qualifiedByName = "emptyToNull")
    @Mapping(target = "pruningDetails", source = "pruningDetails", qualifiedByName = "emptyToNull")
    Plant toEntity(CreatePlantRequest request);

    // Utility method to manage empty strings
    @Named("emptyToNull")
    static String emptyToNull(String value) {
        return StringUtil.emptyStringToNull(value);
    }
}