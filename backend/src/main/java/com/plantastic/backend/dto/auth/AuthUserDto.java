package com.plantastic.backend.dto.auth;

public record AuthUserDto(
        Long id,
        String email,
        com.plantastic.backend.models.types.UserRole role
) {}