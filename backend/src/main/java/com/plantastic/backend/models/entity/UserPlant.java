package com.plantastic.backend.models.entity;

import com.plantastic.backend.dto.plants.CreateUserPlantRequest;
import com.plantastic.backend.models.types.WateringFrequency;
import jakarta.persistence.*;
import lombok.AccessLevel;
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
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plant_id", nullable = false)
    private Plant plant;

    @Column
    private String nickname;

    @Column(name = "acquisition_date", nullable = false)
    private LocalDate acquisitionDate;

    @Column(name = "last_watering", nullable = false)
    private LocalDate lastWatering;

    @Column(name = "next_watering", nullable = false)
    @Setter(AccessLevel.NONE)
    private LocalDate nextWatering;

    @Column(name = "image_url")
    private String imageUrl;

    public void setNextWatering() {
        if (this.lastWatering != null && this.plant != null) {
            int wateringFrequency = WateringFrequency.fromString(this.plant.getWatering()).getDays();
            this.nextWatering = this.lastWatering.plusDays(wateringFrequency);
        }
    }

    public UserPlant(User user, Plant plant, CreateUserPlantRequest request) {
        this.user = user;
        this.plant = plant;
        this.nickname = (request.getNickname() == null || request.getNickname().isEmpty()) ? plant.getCommonName() : request.getNickname();
        this.acquisitionDate = request.getAcquisitionDate();
        this.lastWatering = request.getLastWatering() == null ? request.getAcquisitionDate() : request.getLastWatering();

        //Calculate the next watering date from last watering date and plant watering delay
        WateringFrequency frequency = WateringFrequency.fromString(plant.getWatering());
        this.nextWatering = this.lastWatering.plusDays(frequency.getDays());
        this.imageUrl = request.getPicture() == null ? plant.getImageUrl() : request.getPicture();
    }
}
