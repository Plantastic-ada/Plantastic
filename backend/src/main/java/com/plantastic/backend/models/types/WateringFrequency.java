package com.plantastic.backend.models.types;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum WateringFrequency {
    FREQUENT(5),
    AVERAGE(10),
    MINIMUM(20);

    private final int days;

    public static WateringFrequency fromString(String value) {
        if (value == null) return AVERAGE;
        return switch (value.toLowerCase()) {
            case "frequent" -> FREQUENT;
            case "minimum" -> MINIMUM;
            default -> AVERAGE;
        };
    }
}