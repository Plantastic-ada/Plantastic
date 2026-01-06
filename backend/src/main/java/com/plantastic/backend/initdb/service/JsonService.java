package com.plantastic.backend.initdb.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.plantastic.backend.initdb.dto.json.PlantDtoFromJson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
@Slf4j
public class JsonService {

    public List<PlantDtoFromJson> readBackupPlantDbJson(String jsonFilePathFromResources) {
        ClassPathResource resource = new ClassPathResource(jsonFilePathFromResources);

        try (InputStream inputStream = resource.getInputStream()) {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(inputStream, new TypeReference<List<PlantDtoFromJson>>() {
            });
        } catch (IOException e) {
            throw new IllegalStateException("Error while reading JSON file: " + jsonFilePathFromResources, e);
        }
    }
}
