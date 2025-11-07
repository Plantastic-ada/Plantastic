package com.plantastic.backend.controller;


import com.plantastic.backend.dto.auth.RegisterRequest;
import com.plantastic.backend.repository.UserRepository;
import com.plantastic.backend.security.config.JwtUtil;
import com.plantastic.backend.security.user.UserDetailsImplService;
import com.plantastic.backend.service.UserService;
import com.plantastic.backend.util.UserUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsImplService userDetailsImplService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> createRegisterResponse(@Valid @RequestBody RegisterRequest registerRequest) {
        String emailToCheck = registerRequest.getEmail();
        String usernameToCheck = registerRequest.getUsername();

        //Verify that the email doesn't exist in db and is valid
        if (userService.emailExists(emailToCheck)) {
            log.warn("Email is already used: {}", emailToCheck);
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already used: " + emailToCheck);
        }

        //Verify that username doesn't exist in db
        if (userService.usernameExists(usernameToCheck)) {
            log.warn("Username is already used: {}", usernameToCheck);
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username is already used: " + usernameToCheck);
        }

        userService.createUser(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully: " + usernameToCheck);
    }
}
