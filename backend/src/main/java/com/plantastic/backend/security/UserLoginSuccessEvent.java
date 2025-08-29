package com.plantastic.backend.security;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserLoginSuccessEvent {
    private final String username;

}