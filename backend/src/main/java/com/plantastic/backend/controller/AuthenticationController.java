package com.plantastic.backend.controller;


import com.plantastic.backend.dto.auth.LoginRequest;
import com.plantastic.backend.dto.auth.LoginResponse;
import com.plantastic.backend.dto.auth.RegisterRequest;
import com.plantastic.backend.models.entity.User;
import com.plantastic.backend.repository.UserRepository;
import com.plantastic.backend.security.JwtUtil;
import com.plantastic.backend.service.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Date;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsServiceImpl;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Method to authenticate a user
     *
     * @param loginRequest : contains the information of the user who wants to connect
     * @return authResponse
     * @throws BadCredentialsException : inform us that those credentials are wrong or not saved in db
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> createLoginResponse(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsernameOrEmail(),
                            loginRequest.getPassword()
                    )
            );
            String jwt = jwtUtil.generateToken(authentication.getName());
            return ResponseEntity.ok(LoginResponse.success(jwt));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(LoginResponse.failure("Bad Credentials : " + e));
        }

    }

//    @PostMapping("/register")
//    public ResponseEntity<String> createRegisterResponse(@RequestBody RegisterRequest registerRequest) {
//        String emailToCheck = registerRequest.getEmail();
//        if (userRepository.findByEmail(emailToCheck).isPresent()) {
//            log.warn("Email is already used: {}", emailToCheck);
//            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already used: " + emailToCheck);
//        }
//
//        String usernameToCheck = registerRequest.getUsername();
//        if (userRepository.findByUsername(usernameToCheck).isPresent()) {
//            log.warn("Username is already used: {}", usernameToCheck);
//            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already used: " + usernameToCheck);
//        }
//
//        User userToRegister = new User();
//        userToRegister.setEmail(emailToCheck);
//        userToRegister.setUsername(usernameToCheck);
//        userToRegister.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
//        userToRegister.setCreatedAt(LocalDate.now());
//    }
}
