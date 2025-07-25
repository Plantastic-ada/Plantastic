package com.plantastic.backend.controller;

import com.plantastic.backend.dto.auth.LoginRequest;
import com.plantastic.backend.dto.auth.LoginResponse;
import com.plantastic.backend.repository.UserRepository;
import com.plantastic.backend.security.JwtUtil;
import com.plantastic.backend.service.UserDetailsImplService;
import com.plantastic.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationControllerTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserDetailsImplService userDetailsService;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthenticationController authenticationController;

    @Mock
    private UserService userService;

    @Test
    void shouldReturnJwtWhenCredentialsAreValid() {
        //Arrange
        LoginRequest loginRequest = new LoginRequest("admin", "admin");

        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("admin");
        when(authenticationManager.authenticate(any())).thenReturn(authentication);
        when(jwtUtil.generateToken("admin")).thenReturn("mocked-jwt-token");

        // Act
        ResponseEntity<LoginResponse> response = authenticationController.createLoginResponse(loginRequest);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());

        LoginResponse body = response.getBody();
        assertNotNull(body);
        assertTrue(body.isSuccess());
        assertEquals("mocked-jwt-token", body.getJwt());

        verify(userService).updateLastLogin("admin");

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    void shouldReturnUnauthorizedWhenCredentialsAreInvalid() {
        // Arrange
        LoginRequest loginRequest = new LoginRequest("admin", "wrongpassword");

        when(authenticationManager.authenticate(any()))
                .thenThrow(new BadCredentialsException("Invalid credentials"));

        //Act
        ResponseEntity<LoginResponse> response = authenticationController.createLoginResponse(loginRequest);

        // Assert
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());

        LoginResponse body = response.getBody();
        assertNotNull(body);
        assertFalse(body.isSuccess());
        assertTrue(body.getMessage().contains("Bad Credentials"));
    }
}