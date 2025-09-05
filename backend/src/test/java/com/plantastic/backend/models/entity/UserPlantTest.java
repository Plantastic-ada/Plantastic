package com.plantastic.backend.models.entity;

import com.plantastic.backend.dto.plants.CreateUserPlantRequest;
import com.plantastic.backend.models.types.WateringFrequency;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class UserPlantTest {

    private User user;
    private Plant plant;
    private CreateUserPlantRequest request;

    @BeforeEach
    void init() {
        user = new User();
        user.setId(1L);

        plant = new Plant();
        plant.setId(1L);
        plant.setCommonName("Abuliton");

        request = new CreateUserPlantRequest();
        request.setPlantId(plant.getId());
        request.setAcquisitionDate(LocalDate.of(2025, 9, 1));
        request.setPicture("https://example.com/pic.jpg");
    }

    @Test
    void createOneUserPlantWithAllFields() {
        // GIVEN
        plant.setWatering("frequent");

        request.setPlantId(plant.getId());
        request.setNickname("Mon abutilon");
        request.setAcquisitionDate(LocalDate.of(2025, 9, 1));
        request.setLastWatering(LocalDate.of(2025, 9, 3));
        request.setPicture("https://example.com/pic.jpg");

        // WHEN
        UserPlant userPlant = new UserPlant(user, plant, request);

        // THEN
        assertEquals(user, userPlant.getUserId());
        assertEquals(plant, userPlant.getPlantId());
        assertEquals("Mon abutilon", userPlant.getNickname());
        assertEquals(LocalDate.of(2025, 9, 1), userPlant.getAcquisitionDate());
        assertEquals(LocalDate.of(2025, 9, 3), userPlant.getLastWatering());
        assertEquals("https://example.com/pic.jpg", userPlant.getPicture());

        // Vérif calcul du nextWatering
        WateringFrequency frequency = WateringFrequency.fromString(plant.getWatering());

        assertEquals(
                request.getLastWatering().plusDays(frequency.getDays()),
                userPlant.getNextWatering()
        );
    }

    /**
     * Must set last watering to acquisition date
     * and nickname to common name
     */
    @Test
    void createOnePlantWithNullFields() {
        // GIVEN
        plant.setWatering("minimum");

        request.setLastWatering(null); // volontaire
        request.setNickname(null);     // volontaire

        // WHEN
        UserPlant userPlant = new UserPlant(user, plant, request);

        // THEN
        assertEquals(plant.getCommonName(), userPlant.getNickname()); // fallback
        assertEquals(request.getAcquisitionDate(), userPlant.getLastWatering()); // fallback
        assertEquals(
                request.getAcquisitionDate().plusDays(WateringFrequency.fromString("minimum").getDays()),
                userPlant.getNextWatering()
        );
        assertNotNull(userPlant.getNextWatering());
    }
}