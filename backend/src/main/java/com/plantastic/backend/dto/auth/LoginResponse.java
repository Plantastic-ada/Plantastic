package com.plantastic.backend.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private boolean isSuccess;
    private String jwt;
    private String message;

    public static LoginResponse success(String jwt) {
        return new LoginResponse(true, jwt, "Successful authentication.");
    }

    public static LoginResponse failure(String message) {
        return new LoginResponse(false, null, message);
    }
}
