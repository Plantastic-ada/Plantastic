package com.plantastic.backend.controller;

import com.plantastic.backend.dto.auth.LoginRequest;
import com.plantastic.backend.dto.auth.LoginResponse;
import com.plantastic.backend.repository.UserRepository;
import com.plantastic.backend.security.JwtUtil;
import com.plantastic.backend.service.UserDetailsServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthenticationControllerTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserDetailsServiceImpl userDetailsService;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthenticationController authenticationController;

    @Test
    void shouldReturnJwtWhenCredentialsAreValid() {
        // Set up the test
        LoginRequest loginRequest = new LoginRequest("admin", "admin");

        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("admin");
        when(authenticationManager.authenticate(any())).thenReturn(authentication);
        when(jwtUtil.generateToken("admin")).thenReturn("mocked-jwt-token");

        // Call the method we want to test
        ResponseEntity<LoginResponse> response = authenticationController.createLoginResponse(loginRequest);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());

        LoginResponse body = response.getBody();
        assertNotNull(body);
        assertTrue(body.isSuccess());
        assertEquals("mocked-jwt-token", body.getJwt());
    }

    @Test
    void shouldReturnUnauthorizedWhenCredentialsAreInvalid() {
        // Set up the test
        LoginRequest loginRequest = new LoginRequest("admin", "wrongpassword");

        when(authenticationManager.authenticate(any()))
                .thenThrow(new BadCredentialsException("Invalid credentials"));

        // Call the method we want to test
        ResponseEntity<LoginResponse> response = authenticationController.createLoginResponse(loginRequest);

        // Assert
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());

        LoginResponse body = response.getBody();
        assertNotNull(body);
        assertFalse(body.isSuccess());
        assertTrue(body.getMessage().contains("Bad Credentials"));
    }
}