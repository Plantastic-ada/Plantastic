package com.plantastic.backend.event;

public record UserLoginSuccessEvent(String username, Long userId) {}