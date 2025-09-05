package com.plantastic.backend.models.entity;

import com.plantastic.backend.dto.plants.CreateUserPlantRequest;
import com.plantastic.backend.models.types.WateringFrequency;
import com.plantastic.backend.util.StringUtil;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "user_plant")

public class UserPlant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plant_id", nullable = false)
    private Plant plantId;

    @Column
    private String nickname;

    @Column(name = "acquisition_date", nullable = false)
    private LocalDate acquisitionDate;

    @Column(name = "last_watering", nullable = false)
    private LocalDate lastWatering;

    @Column(name = "next_watering", nullable = false)
    private LocalDate nextWatering;

    @Column
    private String picture;

    public UserPlant(User user, Plant plant, CreateUserPlantRequest request) {
        this.userId = user;
        this.plantId = plant;
        this.nickname = (request.getNickname() == null || request.getNickname().isEmpty()) ? plant.getCommonName() : request.getNickname();
        this.acquisitionDate = request.getAcquisitionDate();
        this.lastWatering = request.getLastWatering() == null ? request.getAcquisitionDate() : request.getLastWatering();

        //Calculate the next watering date from last watering date and plant watering delay
        WateringFrequency frequency = WateringFrequency.fromString(plant.getWatering());
        this.nextWatering = this.lastWatering.plusDays(frequency.getDays());
        this.picture = request.getPicture();
    }
}
