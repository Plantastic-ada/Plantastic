package com.plantastic.backend.models.entity;

import com.plantastic.backend.dto.plants.CreateUserPlantRequest;
import com.plantastic.backend.models.types.WateringFrequency;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("test")
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
    }

    @Test
    void createOneUserPlantWithAllFields() {
        // GIVEN
        plant.setWatering("frequent");

        request.setNickname("My abutilon");
        request.setLastWatering(LocalDate.of(2025, 9, 3));

        // WHEN
        UserPlant userPlant = new UserPlant(user, plant, request);

        // THEN
        assertEquals(user, userPlant.getUser());
        assertEquals(plant, userPlant.getPlant());
        assertEquals("My abutilon", userPlant.getNickname());
        assertEquals(LocalDate.of(2025, 9, 1), userPlant.getAcquisitionDate());
        assertEquals(LocalDate.of(2025, 9, 3), userPlant.getLastWatering());

        // check next watering
        WateringFrequency frequency = WateringFrequency.fromString(plant.getWatering());
        assertEquals(
                request.getLastWatering().plusDays(frequency.getDays()),
                userPlant.getNextWatering()
        );
    }

    /**
     * Must set last watering to acquisition date
     * and nickname to common name if both are null
     */
    @Test
    void createOnePlantWithNullFields() {
        // GIVEN
        plant.setWatering("minimum");

        request.setLastWatering(null);
        request.setNickname(null);

        // WHEN
        UserPlant userPlant = new UserPlant(user, plant, request);

        // THEN
        assertEquals(plant.getCommonName(), userPlant.getNickname()); // fallback
        assertEquals(request.getAcquisitionDate(), userPlant.getLastWatering()); // fallback
        assertNotNull(userPlant.getNextWatering());
        assertEquals(
                request.getAcquisitionDate().plusDays(WateringFrequency.fromString("minimum").getDays()),
                userPlant.getNextWatering()
        );
    }

    @Test
    void setNextWateringTest() {
        plant.setWatering("average");

        UserPlant userPlant = new UserPlant(user, plant, request);

        assertEquals(userPlant.getNextWatering(), userPlant.getLastWatering().plusDays(10));
    }
}